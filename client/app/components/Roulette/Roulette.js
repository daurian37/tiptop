import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "../../../public/assets/css/roulette.css";
import "./Roulette.css"; 

const data = [
  { option: "Infuseur à Thé" },
  { option: "Thé détox" },
  { option: "Thé signature" },
  { option: "Coffret D mini" },
  { option: "Coffret D max" },
];

const Roulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [ticketNumber, setTicketNumber] = useState("");
  const [isValidTicket, setIsValidTicket] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleTicketValidation = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(
        `http://localhost:8000/api/ticket/${ticketNumber}`
      );
      const result = await response.json();

      if (result.valid) {
        setIsValidTicket(true);
      } else {
        setIsValidTicket(false);
        setErrorMessage("Numéro de ticket invalide. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la validation du ticket :", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="container-roulette">
      <div className="sidebar">
        <div className="container">
          <strong>Comment jouer ?</strong>
          <ol>
            <li>
              1. Obtenez un ticket de participation après un achat en magasin ou
              en ligne
            </li>
            <li>
              2. Saisissez le code ticket pour vérifier votre participation
            </li>
            <li>3. Tournez la roulette et gagnez un prix </li>
          </ol>

          <strong>Comment récupérer votre prix ?</strong>
          <p>
            Une fois que vous avez gagné, vous recevrez un email de confirmation
            avec les détails de votre gain et les instructions pour le récupérer
          </p>

          <form onSubmit={handleTicketValidation}>
            <input
              type="text"
              placeholder="Code ticket"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              Valider
            </button>
          </form>

          {errorMessage && <p className="error">{errorMessage}</p>}

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
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
      </div>
    </div>
  );
};

export default Roulette;
