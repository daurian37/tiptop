import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import formatDate from "../components/utils/formatDate";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ ticket }) {
    const { ticketTitle, gameTitle, dateDebut, dateFin, lotTitle } = ticket;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isExpired = (dateFin) => {
        const now = new Date();
        const endDate = new Date(dateFin);
        return endDate < now;
    };

    return (
        <div>
            <Button onClick={handleOpen}>En savoir plus</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                        INFOS DU TICKET
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <p className="m-0">
                            <span style={{ fontWeight: "600" }}>Ticket :</span> {ticketTitle}
                        </p>
                        <p className="m-0">
                            <span style={{ fontWeight: "600" }}>Jeu :</span> {gameTitle}
                        </p>
                        <p className="m-0">
                            <span style={{ fontWeight: "600" }}>Date Début :</span> {formatDate(dateDebut)}
                        </p>
                        <p className="m-0">
                            <span style={{ fontWeight: "600" }}>Date Fin :</span> {formatDate(dateFin)}
                        </p>
                        <p className="m-0">
                            <span style={{ fontWeight: "600" }}>Lot :</span> {lotTitle ? lotTitle : "Aucun lot associé"}
                        </p>
                        <p className="m-0">
                            <span style={{ fontWeight: "600" }}>Statut :</span> {isExpired(dateFin) ? <span className="badge text-bg-danger">Expiré</span> : <span className="badge text-bg-success">Actif</span>}
                        </p>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
