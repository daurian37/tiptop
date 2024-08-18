import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";

const TicketsAdmin = () => {
    const [pageNumber] = useState(15);
    const [tickets, setTickets] = useState([]);
    const [isEdit, setIsEdit] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [editedTicket, setEditedTicket] = useState({ idTicket: null, title: "", jeuTitle: "" });

    useEffect(() => {
        axios
            .get("https://tiptop-server.vercel.app/list/ticket")
            .then((response) => {
                const ticketList = response.data.tickets;
                setTickets(ticketList);

                // Calculer le nombre total de pages
                const pages = Math.ceil(ticketList.length / pageNumber);
                setTotalPages(pages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pageNumber]);

    const indexOfLastTicket = currentPage * pageNumber;
    const indexOfFirstTicket = indexOfLastTicket - pageNumber;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEditTicket = (ticket) => {
        setIsEdit(ticket.idTicket);
        setEditedTicket({ idTicket: ticket.idTicket, title: ticket.title });
    };

    const handleCancelTicket = () => {
        setIsEdit(null);
    };

    const handleChangeTicket = (e) => {
        setEditedTicket({ ...editedTicket, title: e.target.value });
    };

    const handleSaveTicket = (idTicket) => {
        axios
            .put(`https://tiptop-server.vercel.app/api/lot/${idTicket}`, { title: editedTicket.title })
            .then((response) => {
                const updatedTicket = response.data;
                const updatedTickets = tickets.map((ticket) => (ticket.idTicket === updatedTicket.idTicket ? updatedTicket : ticket));
                setTickets(updatedTickets);
                setIsEdit(null);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h3 className="text-center">Liste des tickets</h3>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th className="text-center">Titre</th>
                        <th className="text-center">Jeu</th>
                    </tr>
                    {currentTickets.map((ticket) => (
                        <tr key={ticket.idTicket}>
                            <td className="text-center" data-th="titre">
                                <input type="text" name="title" value={isEdit === ticket.idTicket ? editedTicket.ticketTitle : ticket.ticketTitle} onChange={handleChangeTicket} className={`form-control border bgeditlot ${isEdit === ticket.idTicket ? "editlot" : ""}`} disabled={isEdit !== ticket.idTicket} />
                            </td>
                            <td className="text-center" data-th="jeu">
                                <select name="jeu" className="form-control">
                                    <option value={isEdit === ticket.idTicket ? editedTicket.jeuTitle : ticket.jeuTitle}>{ticket.jeuTitle}</option>
                                </select>
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

export default TicketsAdmin;
