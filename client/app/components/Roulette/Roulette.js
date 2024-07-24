import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import swal from "sweetalert";
import "../../../public/assets/css/roulette.css";


// Importez le module styleInject
// import styleInject from 'style-inject';

// Définissez votre CSS en tant que chaîne de caractères
// const css = `
//   /* Roulette */
//   .container-roulette {
//     display: flex;
//     width: 100%;
//     height: 100vh;
//     margin: 5rem;
//     margin-top: 0;
//   }
  
//   .sidebar {
//     width: 30%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
  
//   .main-content {
//     width: 70%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
  
//   .game-btn {
//     margin-top: 20px;
//     padding: 10px 20px;
//     font-size: 16px;
//     background-color: #98a86c;
//     color: #fff;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//   }
  
//   .submit-btn {
//     margin-top: 20px;
//     padding: 5px 10px;
//     font-size: 16px;
//     background-color: #98a86c;
//     color: #fff;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//   }
  
//   button:hover {
//     background-color: #dfe7c9;
//   }
// `;

// styleInject(css);


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
  const [isTicketInLot, setIsTicketInLot] = useState(false);
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
      // Valider le ticket
      const response = await fetch(
        `http://localhost:8000/api/ticket/${ticketNumber}`
      );
      const result = await response.json();

      if (result.valid) {
        // Vérifier si le ticket existe déjà dans la table lot
        const checkResponse = await fetch(
          `http://localhost:8000/api/checkTicketInLot/${ticketNumber}`
        );
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

      console.log(title);

      if (!response.ok) {
        throw new Error(
          result.message || "Une erreur est survenue lors de l'enregistrement."
        );
      }

      swal({
        title: "Félicitations",
        text: `Vous avez gagné ${title}`,
        icon: "success",
        buttons: true,
      }).then((willUpdate) => {
        if (willUpdate) {
          window.location.reload();
        }
      });

      console.log("Enregistrement réussi:", result);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du lot (client):",
        error.message
      );
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
            Une fois que vous avez gagné, dirigez vous dans la page{" "}
            <b>Mon profil</b> puis <b> Mes participations</b> vous trouverez les
            détails de votre gain et les instructions pour le récupérer
          </p>

          <form onSubmit={handleTicketValidation}>
            <input
              type="text"
              placeholder="Code ticket"
              required
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
  );
};

export default Roulette;
