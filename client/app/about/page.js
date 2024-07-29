import React from "react";

const About = () => {
  return (
    <div className="page-container">
      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="about_taital">à propos du jeu</h1>
              <div className="bulit_icon">
                <img src="assets/images/bulit-icon.png" />
              </div>
            </div>
          </div>
          <div className="about_section_2 layout_padding">
            <div className="image_iman">
              <img src="assets/images/about-img.png" className="about_img" />
            </div>
            <div className="about_taital_box">
              <h4 className="about_taital_1">Présentation du jeu-concours</h4>
              <p className="about_text">
                A l'occasion de l'ouverture de notre 10ème boutique à Nice. Nous
                organisons un jeu concours par tirage au sort pour promouvoir
                nos produits. La participation est ouverte à tout client ayant
                un ticket de caisse ou une facture supérieure à 49€.
                <br />
                Participez dès maintenant pour gagner des prix fantastiques !{" "}
                <br />
                En prime, vous serez automatiquement inscrit pour avoir la
                chance de remporter un an entier de thé d'une valeur de 360€
              </p>
              <div className="read_bt">
                <a href="/gains">Lots à gagner</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
