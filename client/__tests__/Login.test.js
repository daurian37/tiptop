import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../app/login/page.js';
import { useRouter } from 'next/navigation.js';
import jwtDecode from 'jwt-decode';

jest.mock('next/navigation.js', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');
jest.mock('jwt-decode', () => jest.fn()); 

describe('Login Component', () => {
    const mockedRouter = { push: jest.fn(), replace: jest.fn() };

    beforeEach(() => {
      useRouter.mockReturnValue(mockedRouter);
      jwtDecode.mockReturnValue({ category: 1 }); 
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  

  it('rendu initial du formulaire', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Votre email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre mot de passe')).toBeInTheDocument();
    expect(screen.getByText("Connexion")).toBeInTheDocument();
  });

  it('validation des champs de formulaire', async () => {
    render(<Login />);
    fireEvent.click(screen.getByText("Connexion"));

    expect(await screen.findByText("L'email est obligatoire.")).toBeInTheDocument();
    expect(await screen.findByText("Le mot de passe est obligatoire.")).toBeInTheDocument();
  });

  it('Affichage du message d\'erreur lors d\'une tentative de connexion echouee', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: 'Invalid credentials' }
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Votre email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByText("Connexion"));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });

  it('redirection de l\'utilisateur apres une connexion réussie', async () => {
    const mockedToken = 'mocked.jwt.token';
    const mockedResponse = {
      data: { token: mockedToken }
    };

    axios.post.mockResolvedValueOnce(mockedResponse);

    delete window.location;
    window.location = { href: '/admin' };

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Votre email'), { target: { value: 'admin@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), { target: { value: 'Password@2024' } });

    fireEvent.click(screen.getByText("Connexion"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://tiptop-server.vercel.app/login', {
        email: 'admin@mail.com',
        password: 'Password@2024',
      });
    });
    expect(window.location.href).toBe('/admin');
  });
});
