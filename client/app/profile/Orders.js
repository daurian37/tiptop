import axios from "axios";
import React, { useEffect, useState } from "react";
import formatDate from "../components/utils/formatDate";
import BasicModal from "./BasicModal";

const Orders = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("https://tiptop-snowy.vercel.app/tickets", {
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
            {tickets.length > 0 ? (
                <div className="row justify-content-start">
                    {tickets.map((ticket) => (
                        <>
                            <div className="col-md-4 mb-3">
                                <div className="card p-2" key={ticket.idTicket}>
                                    <p className="m-0">
                                        <strong>Ticket :</strong> {ticket.ticketTitle}
                                    </p>
                                    <p className="m-0">
                                        <strong>Jeu :</strong> {ticket.gameTitle}
                                    </p>
                                    <p className="m-0">
                                        <strong>Date Début :</strong> {formatDate(ticket.dateDebut)}
                                    </p>
                                    <p className="m-0">
                                        <strong>Date Fin :</strong> {formatDate(ticket.dateFin)}
                                    </p>
                                    <p className="m-0">
                                        <strong>Lot :</strong> {ticket.lotTitle ? truncate(ticket.lotTitle, 20) : "Aucun lot associé"}
                                    </p>
                                    <p className="m-0">
                                        <strong>Statut :</strong> {isExpired(ticket.dateFin) ? <span className="badge text-bg-danger">Expiré</span> : <span className="badge text-bg-success">Actif</span>}
                                    </p>
                                    <div className="mt-2 mx-auto">
                                        <BasicModal ticket={ticket} />
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            ) : (
                <div className="mx-auto">Aucune commande disponible.</div>
            )}
        </div>
    );
};

export default Orders;
