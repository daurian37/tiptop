"use client";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import AccountDetails from "./AccountDetails";
import Lots from "./Lots";

const Nav = () => {
    const [currentSection, setCurrentSection] = useState("dashboard");

    const renderSection = () => {
        switch (currentSection) {
            case "dashboard":
                return <Dashboard />;
            case "orders":
                return <Orders />;
            case "accountDetails":
                return <AccountDetails />;
            case "lots":
                return <Lots />;
            default:
                return <Dashboard />;
        }
    };

    useEffect(() => {
        const savedSection = localStorage.getItem("currentSection");
        if (savedSection) {
            setCurrentSection(savedSection);
        }
    }, []);

    const handleTabChange = (section) => {
        setCurrentSection(section);
        localStorage.setItem("currentSection", section);
    };

    return (
        <div className="container d-flex flex-column flex-md-row">
            <nav className="sidebar col-md-3">
                <ul className="nav flex-column">
                    <li className={`nav-item ${currentSection === "dashboard" ? "active bg-secondary text-light" : ""}`} onClick={() => handleTabChange("dashboard")}>
                        Tableau de bord
                    </li>
                    <li className={`nav-item ${currentSection === "orders" ? "active bg-secondary text-light" : ""}`} onClick={() => handleTabChange("orders")}>
                        Mes tickets
                    </li>
                    <li className={`nav-item ${currentSection === "lots" ? "active bg-secondary text-light" : ""}`} onClick={() => handleTabChange("lots")}>
                        Mes Lots
                    </li>
                    <li className={`nav-item ${currentSection === "accountDetails" ? "active bg-secondary text-light" : ""}`} onClick={() => handleTabChange("accountDetails")}>
                        Détails du compte
                    </li>
                </ul>
            </nav>
            <main className="main-content flex-grow-1">{renderSection()}</main>
        </div>
    );
};

export default Nav;
