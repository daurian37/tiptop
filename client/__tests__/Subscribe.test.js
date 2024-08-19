import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Subscribe from '@/app/subscribe/page';


// Mock des modules nécessaires
jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Composant Subscribe', () => {
  const mockedRouter = { push: jest.fn() };
  useRouter.mockReturnValue(mockedRouter);

  // Test pour vérifier que le formulaire est rendu correctement
  test('affiche le formulaire d\'inscription', () => {
    render(<Subscribe />);

    // Vérifier la présence des champs du formulaire
    expect(screen.getByPlaceholderText('Votre nom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre prénom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre mot de passe')).toBeInTheDocument();

    // Vérifier la présence du bouton d'inscription
    expect(screen.getByText('Inscription')).toBeInTheDocument();
  });

  // Test pour vérifier que les erreurs sont affichées lorsque les champs sont vides
  test('affiche des messages d\'erreur lorsque les champs sont vides et le formulaire est soumis', async () => {
    render(<Subscribe />);

    // Soumettre le formulaire sans remplir les champs
    fireEvent.click(screen.getByText('Inscription'));

    // Vérifier la présence des messages d'erreur
    expect(await screen.findByText('Le prénom est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('Le nom est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('L\'email est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('Le mot de passe est obligatoire.')).toBeInTheDocument();
  });

  // Test pour vérifier que le formulaire se soumet correctement avec des données valides
  test('soumet le formulaire avec des données valides et redirige vers /login', async () => {
    // Simuler une réponse positive d'axios
    axios.post.mockResolvedValueOnce({ data: {} });

    render(<Subscribe />);

    // Remplir les champs du formulaire
    fireEvent.change(screen.getByPlaceholderText('Votre nom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Votre prénom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Votre email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), { target: { value: 'password123' } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByText('Inscription'));

    // Vérifier que la fonction axios.post a été appelée avec les bonnes données
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://tiptop-server.vercel.app/register', {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
    });

    // Vérifier que l'utilisateur est redirigé vers la page de connexion
    expect(mockedRouter.push).toHaveBeenCalledWith('/login');
  });

  // Test pour vérifier que les erreurs du serveur sont gérées correctement
  test('affiche un message d\'erreur si la soumission échoue', async () => {
    // Simuler une réponse d'erreur d'axios
    axios.post.mockRejectedValueOnce({ response: { data: 'Erreur du serveur' } });

    render(<Subscribe />);

    // Remplir les champs du formulaire
    fireEvent.change(screen.getByPlaceholderText('Votre nom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Votre prénom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Votre email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), { target: { value: 'password123' } });

    // Soumettre le formulaire
    fireEvent.click(screen.getByText('Inscription'));

    // Vérifier que l'erreur du serveur est affichée
    expect(await screen.findByText('Erreur du serveur')).toBeInTheDocument();
  });
});
