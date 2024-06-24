"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Roulette from "../components/Roulette/Roulette";

const Jeu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      redirect("/");
    }
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <Header />
        <div>
          <Roulette />
        </div>
        <Footer />
      </div>
    );
  } else {
    return null;
  }
};

export default Jeu;
