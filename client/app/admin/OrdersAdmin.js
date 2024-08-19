import axios from "axios";
import React, { useEffect, useState } from "react";
import formatDate from "../components/utils/formatDate";
import BasicModal from "../profile/BasicModal";

const OrdersAdmin = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/tickets/users")
            .then((response) => {
                setTickets(response.data.tickets);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const isExpired = (dateFin) => {
        const now = new Date();
        const endDate = new Date(dateFin);
        return endDate < now;
    };

    const truncate = (str, n) => {
        return str.length > n ? str.substring(0, n) + "..." : str;
    };

    return (
        <div>
            <h3 className="text-center">Mes tickets</h3>
            {tickets.length > 0 ? (
                <div className="row justify-content-start">
                    {tickets.map((ticket) => (
                        <div className="col-md-4 mb-3" key={ticket.idTicket}>
                            <div className="card p-2">
                                <div className="d-flex justify-content-between">
                                    <strong>Identité : </strong>
                                    <p className="m-0">
                                        {ticket.userLastname} - {ticket.userFirstname}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <strong>Ticket : </strong>
                                    <p className="m-0">{ticket.ticketTitle}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <strong>Jeu :</strong>
                                    <p className="m-0">{ticket.gameTitle}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <strong>Date Début :</strong>
                                    <p className="m-0">{formatDate(ticket.dateDebut)}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <strong>Date Fin :</strong>
                                    <p className="m-0">{formatDate(ticket.dateFin)}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <strong>Lot :</strong>
                                    <p className="m-0">{ticket.lotTitle ? truncate(ticket.lotTitle, 20) : "Aucun lot associé"}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <strong>Statut :</strong>
                                    <p className="m-0">{isExpired(ticket.dateFin) ? <span className="badge text-bg-danger">Expiré</span> : <span className="badge text-bg-success">Actif</span>}</p>
                                </div>
                                <div className="mt-2 mx-auto">
                                    <BasicModal ticket={ticket} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mx-auto">Aucune commande disponible.</div>
            )}
        </div>
    );
};

export default OrdersAdmin;
