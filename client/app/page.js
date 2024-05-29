"use client";
import Header from "./components/Header/Header";
import HomeGrid from "./components/HomeGrid/HomeGrid";
import Footer from "./components/Footer/Footer";
import "./globals.css";
import "../public/assets/css/style.css";

import Partenariat from "./components/Partenariat/Partenariat";
import Banner from "./components/Banner/Banner";

export default function Home() {
    return (
        <div>
            <Header />
            <Banner />
            <HomeGrid />
            <Partenariat />
            <Footer />
        </div>
    );
}
