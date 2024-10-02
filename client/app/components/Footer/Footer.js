import React from "react";

function Footer() {
    return (
        <div className="footer_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="footer_text mb-4">Copyright © 2024 Thé Tip Top | Powered by</p>
                        <div className="footer_links mb-4">
                            <ul>
                                <li>
                                    <a href="/contact">Nous contacter</a>
                                </li>
                                <li>
                                    <a href="#">Service client</a>
                                </li>
                                <li>
                                    <a href="/politique-de-confidentialite">Politique de confidentialité</a>
                                </li>
                                <li>
                                    <a href="/cgv">CGV</a>
                                </li>
                                <li>
                                    <a href="/cgu">CGU</a>
                                </li>
                            </ul>
                        </div>
                        <div className="social_icon mb-4">
                            <ul>
                                <li>
                                    <a href="https://www.instagram.com/the_tip_top2?igsh=MXRreWN0ZW5zNTVoYQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.tiktok.com/@the.tip.top?_t=8qD1xjGWnyq&_r=1" target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
