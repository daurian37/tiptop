import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Roulette from "../app/components/Roulette/Roulette.js";
import fetchMock from "jest-fetch-mock";
import '@testing-library/jest-dom';

fetchMock.enableMocks();

describe("Roulette component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("afficher le composant", () => {
    render(<Roulette />);
    expect(screen.getByText(/Comment jouer ?/i)).toBeInTheDocument();
  });

  test("simuler un numero de ticket invalide", async () => {
    fetch.mockResponses(
      [JSON.stringify({ valid: true }), { status: 200 }],
      [JSON.stringify({ exists: false }), { status: 200 }]
    );
  
    render(<Roulette />);
  
    userEvent.type(screen.getByPlaceholderText(/Code ticket/i), "123456{enter}");
  
    await waitFor(() => {
      expect(screen.queryByText(/Numéro de ticket invalide/i)).not.toBeInTheDocument();
    });
  });
  

  test("simuler un numero de ticket attribue a un lot", async () => {
    fetch.mockResponses(
      [JSON.stringify({ valid: true }), { status: 200 }],
      [JSON.stringify({ exists: false }), { status: 200 }]
    );
  
    render(<Roulette />);
  
    userEvent.type(screen.getByPlaceholderText(/Code ticket/i), "ticket_1{enter}");
  
    await waitFor(() => {
      expect(screen.queryByText(/Ce ticket a déjà été utilisé pour gagner un lot./i)).not.toBeInTheDocument();
    });
  });
  

  test("simulez un ticket gagnant", async () => {

    fetch.mockResponses(
      [JSON.stringify({ valid: true }), { status: 200 }],
      [JSON.stringify({ exists: false }), { status: 200 }],
      [JSON.stringify({}), { status: 200 }]
    );

    const { container } = render(<Roulette />);

    userEvent.type(screen.getByPlaceholderText(/Code ticket/i), "ticket_3{enter}");

    const playButton = container.querySelector(".game-btn");
    userEvent.click(playButton);

  });

});

