"use client";
import React, { useEffect, useState } from "react";
import DashboardEmployee from "./DashboardEmployee";

const NavEmployee = () => {
    const [currentSection, setCurrentSection] = useState("dashboardEmployee");

    const renderSectionEmployee = () => {
        switch (currentSection) {
            case "dashboardEmployee":
                return <DashboardEmployee />;
            default:
                return <DashboardEmployee />;
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
                    <li className={`nav-item ${currentSection === "dashboardEmployee" ? "active bg-secondary text-light" : ""}`} onClick={() => handleTabChange("dashboardEmployee")}>
                        Tableau de bord
                    </li>
                </ul>
            </nav>
            <main className="main-content flex-grow-1">{renderSectionEmployee()}</main>
        </div>
    );
};

export default NavEmployee;
