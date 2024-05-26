import React from "react";

function Participer() {
  return (
    <div className="container">
      <div className="">
        <h1>Roulette du Thé: Tournez, Dégustez, Gagnez !</h1>
        <p>
          Laissez la chance vous guider à travers un tourbillon de saveurs et de
          prix
        </p>
      </div>

      <div className="col-lg-6">
        <strong>Comment jouer ?</strong>
        <br />
        <p>
          <ol>
            <li>1. Obtenez un ticket après un achat en magasin ou en ligne </li>
            <li>
              2. Saisissez le code du ticket pour vérigfier votre participation{" "}
            </li>
            <li>3. Tournez la roulette et gagnez un prix </li>
          </ol>
        </p>
        <strong> Comment récupérer votre prix ?</strong>
        <br />
        <p>
          Une fois que vous avez gagné, vous recevrez un email de confirmation
          avec les détails de votre gain et les instructions pour les récupérer.
        </p>
      </div>
    </div>
  );
}

export default Participer;
