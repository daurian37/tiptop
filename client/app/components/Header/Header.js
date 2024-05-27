"use client";

import React, { useEffect, useState } from "react";
import "../../../public/assets/css/style.css";
import { redirect } from "next/navigation";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Vérifiez si un token est présent dans le localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // !! converts token to boolean
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        redirect("/");
    };
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">
                    <img src="/assets/images/logo.png" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">
                                Accueil
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/gains">
                                Gains
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">
                                A propos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">
                                Contact
                            </a>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">
                                        Profile
                                    </a>
                                </li>
                                <li className="nav-item ms-2">
                                    <button className="btn btn-danger" onClick={handleLogout}>
                                        Déconnexion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#!" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Participer
                                    </a>
                                    <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="servicesDropdown">
                                        <li>
                                            <a className="dropdown-item" href="/login">
                                                Connexion
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/subscribe">
                                                Inscription
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
