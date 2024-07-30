"use client";
import React, { useEffect, useState } from "react";
import DashboardAdmin from "./DashboardAdmin";
import OrdersAdmin from "./OrdersAdmin";
import LotsAdmin from "./LotsAdmin";

const NavAdmin = () => {
    const [currentSection, setCurrentSection] = useState("dashboardAdmin");

    const renderSectionAdmin = () => {
        switch (currentSection) {
            case "dashboardAdmin":
                return <DashboardAdmin />;
            case "ordersAdmin":
                return <OrdersAdmin />;
            case "lotsAdmin":
                return <LotsAdmin />;
            default:
                return <DashboardAdmin />;
        }
    };

    useEffect(() => {
        const savedSection = localStorage.getItem("currentSectionAdmin");
        if (savedSection) {
            setCurrentSection(savedSection);
        }
    }, []);

    const handleTabChange = (section) => {
        setCurrentSection(section);
        localStorage.setItem("currentSectionAdmin", section);
    };

    return (
        <div className="container d-flex flex-column flex-md-row">
            <nav className="sidebar col-md-3">
                <ul className="nav flex-column">
                    <li className={`nav-item ${currentSection === "dashboardAdmin" ? "active bg-secondary text-light" : ""}`} onClick={() => handleTabChange("dashboardAdmin")}>
                        Tableau de bord
                    </li>
                    <li className={`nav-item ${currentSection === "ordersAdmin" ? "active bg-secondary text-light" : ""}`} onClick={() => handleTabChange("ordersAdmin")}>
                        Commandes
                    </li>
                    <li className={`nav-item ${currentSection === "lotsAdmin" ? "active bg-secondary text-light" : ""}`} onClick={() => handleTabChange("lotsAdmin")}>
                        Lots
                    </li>
                </ul>
            </nav>
            <main className="main-content flex-grow-1">{renderSectionAdmin()}</main>
        </div>
    );
};

export default NavAdmin;
