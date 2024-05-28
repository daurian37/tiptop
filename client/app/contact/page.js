import React from "react";
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";

const Contact = () => {
  return (
    <div>
      <Header />

      <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="contact_taital">Nous contacter </h1>
              <div className="bulit_icon">
                <img src="assets/images/bulit-icon.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="contact_section_2">
            <div className="row">
              <div className="col-md-12">
                <div className="mail_section_1">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="votre nom"
                      name="nom"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="votre Email"
                      name="email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="numéro portable"
                      name="phone"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="votre message"
                      name="message"
                    />
                  </div>
                  <button className="send_bt mb-5">Envoyer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
