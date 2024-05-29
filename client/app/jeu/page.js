"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

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
    return <div>jeu</div>;
  } else {
    return null;
  }
};

export default Jeu;
