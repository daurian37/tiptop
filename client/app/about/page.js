import React from "react";
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";

const About = () => {
    return (
        <div>
            <Header />

            <div className="about_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="about_taital">About Our shop</h1>
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
                            <p className="about_text">has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editorhas a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editor</p>
                            <div class="readmore_btn">
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
