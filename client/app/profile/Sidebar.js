import React from "react";

const Sidebar = ({ setCurrentSection }) => {
  return (
    <nav className="sidebar col-md-2">
      <ul className="nav flex-column">
        <li className="nav-item" onClick={() => setCurrentSection("dashboard")}>
          Tableau de bord
        </li>
        <li className="nav-item" onClick={() => setCurrentSection("orders")}>
          Commandes
        </li>
        <li
          className="nav-item"
          onClick={() => setCurrentSection("accountDetails")}
        >
          Détails du compte
        </li>
        <li className="nav-item" onClick={() => setCurrentSection("logout")}>
          Déconnexion
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
