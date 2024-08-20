import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Subscribe from '@/app/subscribe/page';


jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Composant Subscribe', () => {
  const mockedRouter = { push: jest.fn() };
  useRouter.mockReturnValue(mockedRouter);

  test('affiche le formulaire d\'inscription', () => {
    render(<Subscribe />);

    expect(screen.getByPlaceholderText('Votre nom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre prénom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre mot de passe')).toBeInTheDocument();

    expect(screen.getByText('Inscription')).toBeInTheDocument();
  });

  test('affiche des messages d\'erreur lorsque les champs sont vides et le formulaire est soumis', async () => {
    render(<Subscribe />);

    fireEvent.click(screen.getByText('Inscription'));

    expect(await screen.findByText('Le prénom est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('Le nom est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('L\'email est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('Le mot de passe est obligatoire.')).toBeInTheDocument();
  });

  test('soumet le formulaire avec des données valides et redirige vers /login', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    render(<Subscribe />);

    fireEvent.change(screen.getByPlaceholderText('Votre nom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Votre prénom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Votre email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Inscription'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://tiptop-server.vercel.app/register', {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
    });

    expect(mockedRouter.push).toHaveBeenCalledWith('/login');
  });


  test('affiche un message d\'erreur si la soumission échoue', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: 'Erreur du serveur' } });

    render(<Subscribe />);

    fireEvent.change(screen.getByPlaceholderText('Votre nom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Votre prénom'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Votre email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Inscription'));

    expect(await screen.findByText('Erreur du serveur')).toBeInTheDocument();
  });
});
