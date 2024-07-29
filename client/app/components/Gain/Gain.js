import React from "react";

function Gain() {
  return (
    <div className="page-container">
      <div className="coffee_section layout_padding">
        <div className="container">
          <div className="row">
            <h2 className="coffee_taital">Lots à gagner</h2>
            <div className="bulit_icon">
              <img src="/assets/images/bulit-icon.png" />
            </div>
          </div>
        </div>
        <div className="coffee_section_2">
          <div id="main_slider" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src="/assets/images/lot-1.jpeg" alt="image d'illustration infuseur de thé" />
                      </div>
                      <h3 className="types_text">Infuseur de thé</h3>
                      <p className="looking_text">
                        looking at its layout. The point of
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src="/assets/images/lot-2.jpeg" alt="image d'illustration thé détox"/>
                      </div>
                      <h3 className="types_text">Thé détox</h3>
                      <p className="looking_text">
                        looking at its layout. The point of
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src="/assets/images/lot-3.jpeg" alt="image d'illustration thé signature" />
                      </div>
                      <h3 className="types_text">Thé signature</h3>
                      <p className="looking_text">
                        looking at its layout. The point of
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src="/assets/images/lot-4.jpg" alt="image d'illustration coffret découverte"/>
                      </div>
                      <h3 className="types_text">Coffret découverte</h3>
                      <p className="looking_text">
                        looking at its layout. The point of
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <a
              className="carousel-control-prev"
              href="#main_slider"
              role="button"
              data-slide="prev"
            >
              <i className="fa fa-arrow-left"></i>
            </a>
            <a
              className="carousel-control-next"
              href="#main_slider"
              role="button"
              data-slide="next"
            >
              <i className="fa fa-arrow-right"></i>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gain;
