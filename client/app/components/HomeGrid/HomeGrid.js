import React from "react";

function HomeGrid() {
  return (
    <div>
      <div className="coffee_section layout_padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="presentation_jeu">
                Présentation du jeu-concours
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eligendi, nisi! Adipisci quaerat sint, reiciendis, doloremque
                nesciunt exercitationem ipsam sed, architecto tenetur eos
                voluptate sequi corrupti repudiandae consequatur? Quidem, minus
                similique?
              </p>
            </div>
            <div className="col-lg-6">
              <img src="/assets/images/jeu-concours.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="coffee_section layout_padding">
        <div className="container">
          <div className="row">
            <h1 className="coffee_taital">Lots à gagner</h1>
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
                        <img src="/assets/images/lot-1.jpeg" />
                      </div>
                      <h3 className="types_text">TEA</h3>
                      <p className="looking_text">
                        looking at its layout. The point of
                      </p>
                      <div className="read_bt">
                        <a href="#">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src="/assets/images/lot-2.jpeg" />
                      </div>
                      <h3 className="types_text">TEA</h3>
                      <p className="looking_text">
                        looking at its layout. The point of
                      </p>
                      <div className="read_bt">
                        <a href="#">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src="/assets/images/lot-3.jpeg" />
                      </div>
                      <h3 className="types_text">TEA</h3>
                      <p className="looking_text">
                        looking at its layout. The point of
                      </p>
                      <div className="read_bt">
                        <a href="#">Read More</a>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src="/assets/images/lot-4.jpg" />
                      </div>
                      <h3 className="types_text">TEA</h3>
                      <p className="looking_text">
                        looking at its layout. The point of
                      </p>
                      <div className="read_bt">
                        <a href="#">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
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
            </a>
          </div>
        </div>
      </div>

      <div className="participer_section layout_padding mb-5">
        <div className="container">
          <div className="row">
            <h1 className="coffee_taital mb-5">Participer</h1>
            <div className="col-lg-4">
              <div className="card">
                <p className="looking_text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, expedita?
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <p className="looking_text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, expedita?
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <p className="looking_text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, expedita?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeGrid;
