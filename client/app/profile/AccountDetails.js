"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountDetails = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const { email, firstName, lastName } = res.data;
        setUser({ ...user, email, firstName, lastName });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        "http://localhost:8000/user",
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.newPassword,
          confirmPassword: user.confirmPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(() => alert("Informations mises à jour avec succès"))
      .catch((err) => alert("Erreur lors de la mise à jour des informations"));
  };

  return (
    <form>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="firstName" className="form-label">
            Prénom *
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="lastName" className="form-label">
            Nom *
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-8 mb-3">
          <label htmlFor="email" className="form-label">
            E-mail *
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="col-md-8 mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Mot de passe actuel
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            name="currentPassword"
            value={user.password}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="col-md-8 mb-3">
          <label htmlFor="newPassword" className="form-label">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-8 mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-8 mb-3">
          <button
            type="button"
            className="btn btn-primary button-spacing"
            onClick={handleSave}
            disabled={user.newPassword !== user.confirmPassword}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountDetails;
