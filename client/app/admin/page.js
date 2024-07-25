import React from "react";
import NavAdmin from "./NavAdmin";
import Header from "../components/Header/Header";
import "./styles.css";

const page = () => {
    return (
        <div className="container-fluid">
            <Header />
            <NavAdmin />
        </div>
    );
};

export default page;
