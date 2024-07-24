"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import axios from "axios";
import { useRouter } from "next/navigation.js";

const login = () => {
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();

    const [value, setValue] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let tempErrors = {};

        if (value.email === "") {
            tempErrors.email = "L'email est obligatoire.";
        }
        if (value.password === "") {
            tempErrors.password = "Le mot de passe est obligatoire.";
        }

        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            return;
        }

        axios
            .post("http://localhost:8000/login", value)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                setIsLoggedIn(true);
                router.push("/profile");
            })
            .catch((err) => {
                setErrors({}); // Réinitialiser les erreurs précédentes
                setErrorMessage(err.response.data);
            });
    };

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setErrorMessage("");
    };

    return (
        <div>
            <Header />

            <div className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="contact_taital">CONNEXION</h1>
                            <div className="bulit_icon">
                                <img src="assets/images/bulit-icon.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid my-2">
                    <form onSubmit={handleSubmit} noValidate className="needs-validation">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mail_section_1">
                                    <div className="mb-3">
                                        <input type="email" onChange={handleChange} className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Votre email" name="email" />
                                        {errors.email && <div className="invalid-feedback text-start">{errors.email}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" onChange={handleChange} className={`form-control ${errors.password ? "is-invalid" : ""}`} placeholder="Votre mot de passe" name="password" />
                                        {errors.password && <div className="invalid-feedback text-start">{errors.password}</div>}
                                    </div>
                                    {errorMessage && <div className="my-3 text-danger text-center">{errorMessage}</div>}
                                    <a href="/subscribe">Vous n'avez pas de compte ?</a>
                                    <button type="submit" className="send_bt my-3">
                                        Connexion
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default login;
