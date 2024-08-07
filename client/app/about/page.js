import React from "react";

const About = () => {
  return (
    <div className="page-container">
      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="about_taital">À propos du jeu</h2>
              <div className="bulit_icon">
                <img src="assets/images/bulit-icon.png" alt="Icone bulit" />
              </div>
            </div>
          </div>
          <div className="about_section_2 layout_padding">
            <div className="image_iman">
              <img
                src="assets/images/about-img.png"
                className="about_img"
                alt="Image de présentation du jeu concours"
              />
            </div>
            <div className="about_taital_box">
              <h3 className="about_taital_1">Présentation du jeu-concours</h3>
              <p className="about_text">
                À l'occasion de l'ouverture de notre 10ème boutique à Nice. Nous
                organisons un jeu concours tirage au sort pour promouvoir nos
                produits. La participation est ouverte à tout client ayant un
                ticket de caisse ou une facture supérieure à 49€.
                <br />
                Participez dès maintenant pour gagner des cadeaux thé de luxe !
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
