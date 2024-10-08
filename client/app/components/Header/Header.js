"use client";

import React, { useEffect, useState } from "react";
import "../../../public/assets/css/style.css";
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);

    useEffect(() => {
        // Vérifiez si un token est présent dans le localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // !! converts token to boolean

        if (token) {
            const user = jwtDecode(token);

            if (user.category === 1) {
                setIsAdmin(true);
            } else if (user.category === 3) {
                setIsEmployee(true);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/";
    };
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a href="/">
                    <img src="/assets/images/logo.png" className="logo" alt="logo thé tip top" />
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
                            <a className="nav-link" href="/jeu">
                                Jeu
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
                        {isAdmin ? (
                            <li className="nav-item">
                                <a className="nav-link" href="/admin">
                                    Admin
                                </a>
                            </li>
                        ) : isEmployee ? (
                            <li className="nav-item">
                                <a className="nav-link" href="/employee">
                                    Employee
                                </a>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">
                                    Contact
                                </a>
                            </li>
                        )}
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
