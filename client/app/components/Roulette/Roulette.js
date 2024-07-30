import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import swal from "sweetalert";
import "../../../public/assets/css/roulette.css";
import Confetti from "../utils/confetti";

const data = [{ option: "Infuseur à Thé" }, { option: "Thé détox" }, { option: "Thé signature" }, { option: "Coffret D mini" }, { option: "Coffret D max" }];

const Roulette = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [ticketNumber, setTicketNumber] = useState("");
    const [isValidTicket, setIsValidTicket] = useState(false);
    const [isTicketInLot, setIsTicketInLot] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [totalLots, setTotalLots] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [availablePrizes, setAvailablePrizes] = useState({
        infuseur: 0,
        detox: 0,
        signature: 0,
        mini: 0,
        max: 0,
    });

    useEffect(() => {
        const fetchTotalLots = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/totalLots`);
                const result = await response.json();
                setTotalLots(result.length);
            } catch (error) {
                console.error("Erreur lors de la récupération du nombre total de lots :", error);
            }
        };

        const fetchAvailablePrizes = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/totalLots`);
                const result = await response.json();

                if (Array.isArray(result)) {
                    const newAvailablePrizes = { infuseur: 0, detox: 0, signature: 0, mini: 0, max: 0 };
                    result.forEach((lot) => {
                        switch (lot.title) {
                            case "Infuseur à Thé":
                                newAvailablePrizes.infuseur++;
                                break;
                            case "Thé détox":
                                newAvailablePrizes.detox++;
                                break;
                            case "Thé signature":
                                newAvailablePrizes.signature++;
                                break;
                            case "Coffret D mini":
                                newAvailablePrizes.mini++;
                                break;
                            case "Coffret D max":
                                newAvailablePrizes.max++;
                                break;
                            default:
                                break;
                        }
                    });
                    setAvailablePrizes(newAvailablePrizes);
                } else {
                    console.error("Réponse inattendue:", result);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des lots disponibles :", error);
            }
        };

        fetchTotalLots();
        fetchAvailablePrizes();
    }, []);

    const handleSpinClick = () => {
        if (totalLots >= 20) {
            setErrorMessage("Tous les lots ont été attribués. Merci de revenir plus tard.");
            return;
        }

        const newPrizeNumber = getPrizeNumberBasedOnAvailability();
        if (newPrizeNumber === null) {
            setErrorMessage("Erreur lors du tirage. Veuillez réessayer.");
            return;
        }

        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const getPrizeNumberBasedOnAvailability = () => {
        const totalTickets = 20;
        const availablePrizesList = [];

        if (availablePrizes.infuseur < 0.6 * totalTickets) {
            availablePrizesList.push(0); // Infuseur à Thé
        }
        if (availablePrizes.detox < 0.2 * totalTickets) {
            availablePrizesList.push(1); // Thé détox
        }
        if (availablePrizes.signature < 0.1 * totalTickets) {
            availablePrizesList.push(2); // Thé signature
        }
        if (availablePrizes.mini < 0.06 * totalTickets) {
            availablePrizesList.push(3); // Coffret D mini
        }
        if (availablePrizes.max < 0.04 * totalTickets) {
            availablePrizesList.push(4); // Coffret D max
        }

        if (availablePrizesList.length === 0) {
            return null;
        }

        return availablePrizesList[Math.floor(Math.random() * availablePrizesList.length)];
    };

    const handleTicketValidation = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const token = localStorage.getItem("token");

            // Valider le ticket
            const response = await fetch(`http://localhost:8000/api/ticket/${ticketNumber}`);
            const result = await response.json();

            if (result.valid) {
                // Vérifier si le ticket existe déjà dans la table lot
                const checkResponse = await fetch(`http://localhost:8000/api/checkTicketInLot/${ticketNumber}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                if (!checkResponse.ok) {
                    const errorResult = await checkResponse.json();
                    setErrorMessage(errorResult.message);
                    setIsValidTicket(false);
                    return;
                }

                const checkResult = await checkResponse.json();

                if (!checkResult.exists) {
                    setIsValidTicket(true);
                    setIsTicketInLot(false);
                } else {
                    setIsValidTicket(false);
                    setIsTicketInLot(true);
                    setErrorMessage("Ce ticket a déjà été utilisé pour gagner un lot.");
                }
            } else {
                setIsValidTicket(false);
                setErrorMessage("Numéro de ticket invalide. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Erreur lors de la validation du ticket :", error);
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    const savePrizeToDatabase = async (title, idTicket) => {
        try {
            const response = await fetch(`http://localhost:8000/api/lot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    idTicket: idTicket,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Une erreur est survenue lors de l'enregistrement.");
            }

            setIsConfirmed(true);
            swal({
                title: "Félicitations",
                text: `Vous avez gagné ${title}`,
                icon: "success",
                buttons: false,
            });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du lot (client):", error.message);
        }
    };

    return (
        <div className="page-container">
            <div className="container-roulette">
                <div className="sidebar">
                    <div className="container">
                        <strong>Comment jouer ?</strong>
                        <ol>
                            <li>1. Obtenez un ticket de participation après un achat en magasin ou en ligne</li>
                            <li>2. Saisissez le code ticket pour vérifier votre participation</li>
                            <li>3. Tournez la roulette et gagnez un prix</li>
                        </ol>

                        <strong>Comment récupérer votre prix ?</strong>
                        <p>
                            Une fois que vous avez gagné, dirigez-vous dans la page <b>Mon profil</b> puis <b>Mes participations</b> vous trouverez les détails de votre gain et les instructions pour le récupérer.
                        </p>

                        <form onSubmit={handleTicketValidation} className="position-relative">
                            <input className="form-control" type="text" placeholder="Code ticket" required value={ticketNumber} onChange={(e) => setTicketNumber(e.target.value)} />
                            <button type="submit" className="submit-btn">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </form>

                        {errorMessage && (
                            <p className="error text-danger my-2" style={{ fontWeight: "bold" }}>
                                {errorMessage}
                            </p>
                        )}

                        {isConfirmed && <Confetti />}
                        {isValidTicket && (
                            <button onClick={handleSpinClick} className="game-btn">
                                Jouer
                            </button>
                        )}
                    </div>
                </div>
                <div className="main-content">
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        backgroundColors={["#3e3e3e", "#98a86c"]}
                        textColors={["#ffffff"]}
                        onStopSpinning={() => {
                            setMustSpin(false);
                            const prizeWon = data[prizeNumber].option;
                            savePrizeToDatabase(prizeWon, ticketNumber);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Roulette;
