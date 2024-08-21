"use client";
import axios from "axios";
import React, { useState } from "react";

const Contact = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [mailer, setMailer] = useState({
        fullname: "",
        subject: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setMailer({ ...mailer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mailer.fullname === "" || mailer.email === "" || mailer.subject === "" || mailer.message === "") {
            setError("Tous les champs sont obligatoires !");
            return;
        }
        axios
            .post("http://localhost:8000/api/contact", mailer)
            .then((response) => {
                setMessage(response.data.message);
                setError("");
                setMailer({
                    fullname: "",
                    subject: "",
                    email: "",
                    message: "",
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="page-container">
            <div className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="contact_taital">Nous contacter</h1>
                            <div className="bulit_icon">
                                <img src="assets/images/bulit-icon.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <form className="contact_section_2" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mail_section_1">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" onChange={handleChange} placeholder="votre nom" name="fullname" value={mailer.fullname} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" onChange={handleChange} placeholder="sujet" name="subject" value={mailer.subject} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" onChange={handleChange} placeholder="votre Email" name="email" value={mailer.email} />
                                    </div>
                                    <div className="mb-3">
                                        <textarea className="form-control" onChange={handleChange} placeholder="votre message" name="message" value={mailer.message} />
                                        <div className="text-success text-center">{message}</div>
                                        <div className="text-danger text-center">{error}</div>
                                    </div>
                                    <button type="submit" className="send_bt mb-5">
                                        Envoyer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
