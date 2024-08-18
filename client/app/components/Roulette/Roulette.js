import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import "../../../public/assets/css/roulette.css";
import Confetti from "../utils/confetti";
import dynamic from "next/dynamic";

const Wheel = dynamic(() => import("react-custom-roulette").then((mod) => mod.Wheel), { ssr: false });

const data = [
    { option: "Infuseur à Thé", weight: 60 },
    { option: "Thé détox", weight: 20 },
    { option: "Thé signature", weight: 10 },
    { option: "Coffret D mini", weight: 6 },
    { option: "Coffret D max", weight: 4 },
];

const Roulette = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [ticketNumber, setTicketNumber] = useState("");
    const [isValidTicket, setIsValidTicket] = useState(false);
    const [isTicketInLot, setIsTicketInLot] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [totalLots, setTotalLots] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [lotCounts, setLotCounts] = useState({});

    useEffect(() => {
        const fetchTotalLots = async () => {
            try {
                const response = await fetch("https://tiptop-server.vercel.app/api/totalLots");
                const result = await response.json();
                setTotalLots(result.length);
                const counts = result.reduce((acc, lot) => {
                    acc[lot.title] = (acc[lot.title] || 0) + 1;
                    return acc;
                }, {});
                setLotCounts(counts);
            } catch (error) {
                console.error("Erreur lors de la récupération du nombre total de lots :", error);
            }
        };

        fetchTotalLots();
    }, []);

    const getWeightedPrizeNumber = () => {
        const totalWeight = data.reduce((sum, item) => sum + item.weight, 0);
        const random = Math.floor(Math.random() * totalWeight);
        let weightSum = 0;

        for (let i = 0; i < data.length; i++) {
            weightSum += data[i].weight;
            if (random < weightSum) {
                return i;
            }
        }
        return 0;
    };

    const handleSpinClick = () => {
        if (totalLots == 20) {
            setErrorMessage("Tous les lots ont été attribués. Merci de revenir plus tard.");
            return;
        }

        const newPrizeNumber = getWeightedPrizeNumber();
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const handleTicketValidation = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const token = localStorage.getItem("token");

            // Valider le ticket
            const response = await fetch(`https://tiptop-server.vercel.app/api/ticket/${ticketNumber}`);
            const result = await response.json();

            if (result.valid) {
                // Vérifier si le ticket existe déjà dans la table lot
                const checkResponse = await fetch(`https://tiptop-server.vercel.app/api/checkTicketInLot/${ticketNumber}`, {
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
            const response = await fetch("https://tiptop-server.vercel.app/api/lot", {
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
            setTicketNumber("");
            setIsValidTicket(false);
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

                        <strong>Comment voir votre gain ?</strong>
                        <p>
                            Une fois que vous avez gagné, dirigez-vous dans la page <b>Mon profil</b> puis <b>Mes lots</b> vous trouverez les détails de votre gain.
                        </p>

                        <form onSubmit={handleTicketValidation} className="position-relative">
                            <input className="form-control" type="text" placeholder="Code ticket" required value={ticketNumber} onChange={(e) => setTicketNumber(e.target.value)} />
                            <button type="submit" className="submit-btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
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
