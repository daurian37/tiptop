import React, { useState } from "react";
import Gain from "../Gain/Gain";
import Modal from "react-modal";
import Cookies from "js-cookie";
import "../../../public/assets/css/modal.css";

function HomeGrid() {
  const [modalIsOpen, setModalIsOpen] = useState(!Cookies.get("cookieConsent"));

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const acceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    closeModal();
  };

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
        <Modal
           isOpen={modalIsOpen}
           onRequestClose={closeModal}
           className="react-modal-content"
           overlayClassName="react-modal-overlay"
           contentLabel="Cookie Consent"
        >
          <h2>Nous utilisons des cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l'expérience utilisateur.{" "}
            <a
              href="/politique-de-confidentialite"
              style={{ color: "#4e9c81" }}
            >
              En savoir plus
            </a>
          </p>
          <button onClick={acceptCookies} className="btn-cookies accept">J'accepte</button>
          <button onClick={closeModal} className="btn-cookies reject">Je refuse</button>
        </Modal>
        <Gain />
      </div>
    </div>
  );
}

export default HomeGrid;
