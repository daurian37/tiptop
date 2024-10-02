import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Paginate from "../app/admin/paginate";

describe("Composant Paginate", () => {
  const mockPaginate = jest.fn();
  const mockPreviousPage = jest.fn();
  const mockNextPage = jest.fn();

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

  test("affiche le bon nombre de pages", () => {
    setup(1, 2, 10);
    const pageItems = screen.getAllByRole("button", { name: /\d+/ });
    expect(pageItems).toHaveLength(5); // 10 / 2 = 5 pages
  });

  test('affiche les boutons "Précédent" et "Suivant"', () => {
    setup(1, 2, 10);
    expect(screen.getByText("Précédent")).toBeInTheDocument();
    expect(screen.getByText("Suivant")).toBeInTheDocument();
  });

  test('désactive le bouton "Précédent" sur la première page', () => {
    setup(1, 2, 10);
    expect(screen.getByText("Précédent").closest("button")).toHaveClass(
      "disabled"
    );
  });

  test('désactive le bouton "Suivant" sur la dernière page', () => {
    setup(5, 2, 10);
    expect(screen.getByText("Suivant").closest("button")).toHaveClass(
      "disabled"
    );
  });

  test("appelle paginate avec le bon numéro de page lors du clic sur un numéro de page", () => {
    setup(1, 2, 10);
    fireEvent.click(screen.getByText("2"));
    expect(mockPaginate).toHaveBeenCalledWith(2);
  });

  test('appelle previousPage lorsque "Précédent" est cliqué', () => {
    setup(2, 2, 10);
    fireEvent.click(screen.getByText("Précédent"));
    expect(mockPreviousPage).toHaveBeenCalled();
  });

  test('appelle nextPage lorsque "Suivant" est cliqué', () => {
    setup(1, 2, 10);
    fireEvent.click(screen.getByText("Suivant"));
    expect(mockNextPage).toHaveBeenCalled();
  });


  test("met en surbrillance la page actuelle", () => {
    setup(3, 2, 10);
    const currentPageButton = screen.getByText("3").closest("button");
    expect(currentPageButton).toHaveClass("active");
  });
});
