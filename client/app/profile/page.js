"use client";
import React, { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "./styles.css";

const Page = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");

  return (
    <>
      <Header />
      <div className="container d-flex flex-column flex-md-row">
        <Sidebar setCurrentSection={setCurrentSection} />
        <MainContent currentSection={currentSection} />
      </div>
    </>
  );
};

export default Page;
