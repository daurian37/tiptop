"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Roulette from "../components/Roulette/Roulette";

const Jeu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      redirect("/login");
    }
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <Roulette />
      </div>
    );
  } else {
    return null;
  }
};

export default Jeu;
