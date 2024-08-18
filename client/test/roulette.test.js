import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// import fetchMock from 'fetch-mock-jest';
import Roulette from "../client/app/components/Roulette/Roulette";

// beforeEach(() => {
//   fetchMock.restore();
// });

describe("Roulette Component", () => {
    test("handleTicketValidation function", async () => {
        render(<Roulette />);

        // Mock de fetch pour simuler l'appel API de validation de ticket
        fetchMock.get("https://tiptop-server.vercel.app/api/ticket/ticket_1", {
            valid: false,
        });

        // Sélectionnez l'input et le bouton de validation
        const input = screen.getByPlaceholderText("Code ticket");
        const submitButton = screen.getByText("Valider");

        // Simulez la saisie dans l'input et cliquez sur le bouton de validation
        fireEvent.change(input, { target: { value: "ticket_1" } });
        fireEvent.click(submitButton);

        // Attendez que l'API soit simulée
        await waitFor(() => {
            // Vérifiez que le message d'erreur approprié est affiché en cas de ticket invalide
            expect(screen.getByText("Numéro de ticket invalide. Veuillez réessayer.")).toBeInTheDocument();
        });
    });

    test("savePrizeToDatabase function", async () => {
        render(<Roulette />);

        // Mock de fetch pour simuler l'appel POST
        fetchMock.post("https://tiptop-server.vercel.app/api/lot", {
            status: 201,
            body: { message: "Lot enregistré avec succès", lotId: 1 },
        });

        // Simulez le clic sur le bouton "Jouer" pour appeler la fonction savePrizeToDatabase
        fireEvent.click(screen.getByText("Jouer"));

        // Vérifiez que la fenêtre de succès est affichée
        // await waitFor(() => {
        //   expect(
        //     screen.getByText("Vous avez gagné Infuseur à Thé")
        //   ).toBeInTheDocument();
        // });
    });
});
