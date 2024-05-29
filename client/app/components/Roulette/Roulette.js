import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "../../../public/assets/css/roulette.css";

const data = [{ option: "Infuseur à Thé" }, { option: "Thé détox" }, { option: "Thé signature" }, { option: "Coffret D mini" }, { option: "Coffret D max" }];

const Roulette = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6">
                    <strong>Comment jouer ?</strong>
                    <ol>
                        <li>1. Obtenez un ticket de participation après un achat en magasin ou en ligne</li>
                        <li>2. Saisissez le code ticket pour vérifier votre participation</li>
                        <li>3. Tournez la roulette et gagnez un prix </li>
                    </ol>

                    <strong>Comment récupérer votre prix ?</strong>
                    <p>Une fois que vous avez gagné, vous recevrez un email de confirmation avec les détails de votre gain et les instructions pour le récupérer</p>

                    <form>
                        <input type="text" placeholder="Code ticket" />
                        <button className="submit-btn">Valider</button>
                    </form>

                    <button onClick={handleSpinClick} className="game-btn">
                        Jouer
                    </button>
                </div>
                <div className="col-lg-6">
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
        </div>
    );
};

export default Roulette;
