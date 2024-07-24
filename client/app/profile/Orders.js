import axios from "axios";
import React, { useEffect, useState } from "react";
import formatDate from "../components/utils/formatDate";

const Orders = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:8000/tickets", {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setTickets(response.data.tickets);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const currentDate = formatDate(Date.now());

    return (
        <div className="mx-auto">
            <table class="rwd-table">
                <tbody>
                    <tr>
                        <th>Titre</th>
                        <th>Jeu de concours</th>
                        <th>Date début</th>
                        <th>Date fin</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                    {tickets.length > 0 ? (
                        tickets.map((ticket) => (
                            <tr key={ticket.idTicket}>
                                <td data-th="Titre">{ticket.ticketTitle}</td>
                                <td data-th="Jeu de concours">{ticket.gameTitle}</td>
                                <td data-th="Date début">{formatDate(ticket.dateDebut)}</td>
                                <td data-th="Date fin">{formatDate(ticket.dateFin)}</td>
                                <td data-th="Statut">{ticket.dateFin < currentDate ? <span className="badge text-bg-success">Actif</span> : <span className="badge text-bg-danger">Expiré</span>} </td>
                                <td data-th="Action">
                                    <button className="btn btn-outline-danger" onClick={() => alert("bientot")}>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                Aucune commande actuellement disponible.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
