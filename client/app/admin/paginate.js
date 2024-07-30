import React from "react";

const Paginate = ({ pageNumber, totalPage, paginate, previousPage, nextPage, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPage / pageNumber); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <ul className="pagination">
                <button className={`page-item ${currentPage === 1 ? "disabled" : ""}`} onClick={previousPage}>
                    <span className="page-link">Précédent</span>
                </button>
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => paginate(number)} className={`page-item ${currentPage === number ? "active" : ""}`}>
                        <span className="page-link">{number}</span>
                    </button>
                ))}
                <button className={`page-item ${currentPage === Math.ceil(totalPage / pageNumber) ? "disabled" : ""}`} onClick={nextPage}>
                    <span className="page-link">Suivant</span>
                </button>
            </ul>
        </div>
    );
};

export default Paginate;
