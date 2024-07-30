"use client";

import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
    const [windowDimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [isVisible, setIsVisible] = useState(true);

    const detectSize = () => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        window.addEventListener("resize", detectSize);
        return () => window.removeEventListener("resize", detectSize);
    }, []);

    useEffect(() => {
        // Hide confetti after 1 second
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    return isVisible ? <ReactConfetti width={windowDimension.width} height={windowDimension.height} /> : null;
};

export default Confetti;
