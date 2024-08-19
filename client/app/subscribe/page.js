"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Subscribe = () => {
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let tempErrors = {};

        if (value.firstname === "") {
            tempErrors.firstname = "Le prénom est obligatoire.";
        }
        if (value.lastname === "") {
            tempErrors.lastname = "Le nom est obligatoire.";
        }
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
            .post("http://localhost:8000/register", value)
            .then((res) => {
                router.push("/login");
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
        <div className="page-container">
            <div className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="contact_taital">INSCRIPTION</h1>
                            <div className="bulit_icon">
                                <img src="assets/images/bulit-icon.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="contact_section_2">
                        <form onSubmit={handleSubmit} noValidate className="needs-validation">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mail_section_1">
                                        <div className="mb-3">
                                            <input type="text" onChange={handleChange} className={`form-control ${errors.lastname ? "is-invalid" : ""}`} placeholder="Votre nom" name="lastname" />
                                            {errors.lastname && <div className="invalid-feedback text-start">{errors.lastname}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" onChange={handleChange} className={`form-control ${errors.firstname ? "is-invalid" : ""}`} placeholder="Votre prénom" name="firstname" />
                                            {errors.firstname && <div className="invalid-feedback text-start">{errors.firstname}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" onChange={handleChange} className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Votre email" name="email" />
                                            {errors.email && <div className="invalid-feedback text-start">{errors.email}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" onChange={handleChange} className={`form-control ${errors.password ? "is-invalid" : ""}`} placeholder="Votre mot de passe" name="password" />
                                            {errors.password && <div className="invalid-feedback text-start">{errors.password}</div>}
                                        </div>
                                        <a href="/login">Vous avez déjà un compte ?</a>
                                        {errorMessage && <div className="my-3 text-danger text-center">{errorMessage}</div>}
                                        <button type="submit" className="send_bt my-3">
                                            Inscription
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
