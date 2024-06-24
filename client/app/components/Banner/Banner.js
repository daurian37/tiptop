import React, { useEffect, useState } from "react";
import "../../../public/assets/css/style.css";
import swal from "sweetalert";

function Banner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifiez si un token est présent dans le localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // !! converts token to boolean
  }, []);

  return (
    <div>
      <div className="header_section">
        <div className="banner_section layout_padding">
          <div className="container">
            <div
              id="banner_slider"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="banner_img">
                        <img src="/assets/images/banner-img.png" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="banner_taital_main">
                        <h1 className="banner_taital">
                          PARTICIPEZ AU JEU CONCOURS
                        </h1>
                        <p className="banner_text">
                          A l'occasion de l'ouverture de notre 10ème boutique à
                          Nice. Nous organisons un jeu concours par tirage au
                          sort pour promouvoir nos produits.
                        </p>
                        <div className="btn_main mt-3">
                          {isLoggedIn ? (
                            <div className="about_bt">
                              <a href="/jeu">Jouer</a>
                            </div>
                          ) : (
                            <div className="about_bt">
                              <a href="/login">Jouer</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
