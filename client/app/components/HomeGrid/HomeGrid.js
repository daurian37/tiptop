import React from "react";
import Gain from "../Gain/Gain";

function HomeGrid() {
  return (
    <div>
      <div className="coffee_section layout_padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="presentation_jeu">Présentation du jeu-concours</h1>
              <p>
                A l'occasion de l'ouverture de notre 10ème boutique à Nice. Nous
                organisons un jeu concours par tirage au sort pour promouvoir
                nos produits.
              </p>
              <div className="read_bt">
                <a href="/about">En savoir plus</a>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/assets/images/jeu-concours.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <Gain />
      </div>
    </div>
  );
}

export default HomeGrid;
