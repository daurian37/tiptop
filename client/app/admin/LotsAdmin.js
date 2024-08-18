import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";

const LotsAdmin = () => {
    const [pageNumber] = useState(15);
    const [lots, setLots] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEdit, setIsEdit] = useState(null);
    const [editedLot, setEditedLot] = useState({ idLot: null, title: "" });

    useEffect(() => {
        axios
            .get("https://tiptop-snowy.vercel.app/list/lots")
            .then((response) => {
                const lotList = response.data;
                setLots(lotList);

                // Calculer le nombre total de pages
                const pages = Math.ceil(lotList.length / pageNumber);
                setTotalPages(pages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pageNumber]);

    const indexOfLastLot = currentPage * pageNumber;
    const indexOfFirstLot = indexOfLastLot - pageNumber;
    const currentLots = lots.slice(indexOfFirstLot, indexOfLastLot);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEditLot = (lot) => {
        setIsEdit(lot.idLot);
        setEditedLot({ idLot: lot.idLot, title: lot.title });
    };

    const handleCancelLot = () => {
        setIsEdit(null);
    };

    const handleChangeLot = (e) => {
        setEditedLot({ ...editedLot, title: e.target.value });
    };

    const handleSaveLot = (idLot) => {
        axios
            .put(`https://tiptop-snowy.vercel.app/api/lot/${idLot}`, { title: editedLot.title })
            .then((response) => {
                const updatedLot = response.data;
                const updatedLots = lots.map((lot) => (lot.idLot === updatedLot.idLot ? updatedLot : lot));
                setLots(updatedLots);
                setIsEdit(null);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h3 className="text-center">Liste des lots</h3>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th className="text-center">Titre</th>
                    </tr>
                    {currentLots.map((lot) => (
                        <tr key={lot.idLot}>
                            <td className="text-center" data-th="titre">
                                <input type="text" name="title" value={isEdit === lot.idLot ? editedLot.title : lot.title} onChange={handleChangeLot} className={`form-control border bgeditlot ${isEdit === lot.idLot ? "editlot" : ""}`} disabled={isEdit !== lot.idLot} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="container justify-content-center">
                <ResponsivePagination total={totalPages} current={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default LotsAdmin;
