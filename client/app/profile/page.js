"use client";
import React, { useState } from "react";
import Header from "../components/Header/Header";
import "./styles.css"; // Importez le fichier CSS ici

const Page = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");

  const renderSection = () => {
    switch (currentSection) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "accountDetails":
        return <AccountDetails />;
      case "logout":
        return <Logout />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column flex-md-row">
        <nav className="sidebar col-md-2">
          <ul className="nav flex-column">
            <li
              className="nav-item"
              onClick={() => setCurrentSection("dashboard")}
            >
              Tableau de bord
            </li>
            <li
              className="nav-item"
              onClick={() => setCurrentSection("orders")}
            >
              Commandes
            </li>
            <li
              className="nav-item"
              onClick={() => setCurrentSection("accountDetails")}
            >
              Détails du compte
            </li>
            <li
              className="nav-item"
              onClick={() => setCurrentSection("logout")}
            >
              Déconnexion
            </li>
          </ul>
        </nav>
        <main className="main-content flex-grow-1">{renderSection()}</main>
      </div>
    </>
  );
};

const Dashboard = () => (
  <div className="alert alert-success" role="alert">
    <p>
      Bonjour <strong>toto</strong> (vous n’êtes pas <strong>toto</strong>
      &nbsp;?{" "}
      <a href="/" role="link">
        Déconnexion
      </a>
      )
    </p>
  </div>
);

const Orders = () => (
  <div
    className="alert alert-success d-flex justify-content-between align-items-center"
    role="alert"
  >
    <div>Aucune commande actuellement disponible.</div>
    <button className="btn btn-primary">Parcourir les produits</button>
  </div>
);

const AccountDetails = () => (
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
        />
      </div>
      <div className="col-md-8  mb-3">
        <label htmlFor="email" className="form-label">
          E-mail *
        </label>
        <input type="email" className="form-control" id="email" name="email" />
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
        />
      </div>
      <div className="col-md-8  mb-3">
        <label htmlFor="newPassword" className="form-label">
          Nouveau mot de passe{" "}
        </label>
        <input
          type="password"
          className="form-control"
          id="newPassword"
          name="newPassword"
        />
      </div>
      <div className="col-md-8  mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmer le nouveau mot de passe
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
        />
      </div>
      <div className="col-md-8 mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => alert("Form cancelled")}
        >
          Enregistrer
        </button>
      </div>
    </div>
  </form>
);

const Logout = () => <div>Vous avez été déconnecté.</div>;

export default Page;
