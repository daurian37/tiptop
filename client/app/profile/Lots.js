import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";

const Lots = () => {
    const [pageNumber] = useState(15);
    const [lots, setLots] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("https://tiptop-server.vercel.app/lots", {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const lotList = response.data.lots;
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

    return (
        <div>
            <h3 className="text-center">Liste des lots</h3>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th className="text-center">Titre</th>
                        <th className="text-center">Ticket</th>
                        <th className="text-center">Action</th>
                    </tr>
                    {currentLots.map((lot) => (
                        <tr key={lot.id}>
                            <td className="text-center" data-th="titre">
                                {lot.lotTitle}
                            </td>
                            <td className="text-center" data-th="ticket">
                                {lot.ticketTitle}
                            </td>
                            <td className="text-center" data-th="Action">
                                <div className="d-flex justify-content-around" style={{ cursor: "pointer" }}>
                                    <i class="fa fa-trash text-danger" aria-hidden="true" onClick={() => alert("bientot")}></i>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="container justify-content-center">
                <ResponsivePagination total={totalPages} current={currentPage} onPageChange={(page) => handlePageChange(page)} />
            </div>
        </div>
    );
};

export default Lots;
