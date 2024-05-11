import React from "react";

function Footer() {
  return (
    <div>

      
      <div className="footer_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="address_text">Address</h1>
              <p className="footer_text">
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use
              </p>
              <div className="location_text">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <span className="padding_left_10">+01 1234567890</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
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
