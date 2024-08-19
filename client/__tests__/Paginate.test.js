import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Paginate from "../app/admin/paginate";

describe("Composant Paginate", () => {
  // Création des mocks pour les fonctions de pagination
  const mockPaginate = jest.fn();
  const mockPreviousPage = jest.fn();
  const mockNextPage = jest.fn();

  // Fonction utilitaire pour rendre le composant avec des props spécifiques
  const setup = (currentPage, pageNumber, totalPage) => {
    return render(
      <Paginate
        currentPage={currentPage}
        pageNumber={pageNumber}
        totalPage={totalPage}
        paginate={mockPaginate}
        previousPage={mockPreviousPage}
        nextPage={mockNextPage}
      />
    );
  };

  // Test pour vérifier le nombre correct de pages générées
  test("affiche le bon nombre de pages", () => {
    setup(1, 2, 10);
    // Le nombre de boutons de page devrait être égal à totalPage / pageNumber
    const pageItems = screen.getAllByRole("button", { name: /\d+/ });
    expect(pageItems).toHaveLength(5); // 10 / 2 = 5 pages
  });

  // Test pour vérifier que les boutons "Précédent" et "Suivant" sont rendus
  test('affiche les boutons "Précédent" et "Suivant"', () => {
    setup(1, 2, 10);
    expect(screen.getByText("Précédent")).toBeInTheDocument();
    expect(screen.getByText("Suivant")).toBeInTheDocument();
  });

  // Test pour vérifier que le bouton "Précédent" est désactivé sur la première page
  test('désactive le bouton "Précédent" sur la première page', () => {
    setup(1, 2, 10);
    expect(screen.getByText("Précédent").closest("button")).toHaveClass(
      "disabled"
    );
  });

  // Test pour vérifier que le bouton "Suivant" est désactivé sur la dernière page
  test('désactive le bouton "Suivant" sur la dernière page', () => {
    setup(5, 2, 10);
    expect(screen.getByText("Suivant").closest("button")).toHaveClass(
      "disabled"
    );
  });

  // Test pour vérifier que la fonction paginate est appelée avec le bon numéro de page
  test("appelle paginate avec le bon numéro de page lors du clic sur un numéro de page", () => {
    setup(1, 2, 10);
    fireEvent.click(screen.getByText("2"));
    expect(mockPaginate).toHaveBeenCalledWith(2);
  });

  // Test pour vérifier que la fonction previousPage est appelée lors du clic sur "Précédent"
  test('appelle previousPage lorsque "Précédent" est cliqué', () => {
    setup(2, 2, 10);
    fireEvent.click(screen.getByText("Précédent"));
    expect(mockPreviousPage).toHaveBeenCalled();
  });

  // Test pour vérifier que la fonction nextPage est appelée lors du clic sur "Suivant"
  test('appelle nextPage lorsque "Suivant" est cliqué', () => {
    setup(1, 2, 10);
    fireEvent.click(screen.getByText("Suivant"));
    expect(mockNextPage).toHaveBeenCalled();
  });

  // Test pour vérifier que la page actuelle est bien mise en surbrillance
  test("met en surbrillance la page actuelle", () => {
    setup(3, 2, 10);
    const currentPageButton = screen.getByText("3").closest("button");
    expect(currentPageButton).toHaveClass("active");
  });
});
