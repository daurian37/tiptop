import React from "react";

function Footer() {
  return (
    <div>

      
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h6 className="address_text">Addresse</h6>
              <p className="footer_text">
              Siège social : 18 rue Léon Frot, 75011 Paris <br/>
              Tout droits reservés 
              </p>
              
              <div className="location_text">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-phone"></i>
                      <span className="padding_left_10">+01 1234567890</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope"></i>
                      <span className="padding_left_10">demo@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
