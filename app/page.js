"use client";
import Header from "./components/Header/Header";
import HomeGrid from "./components/HomeGrid/HomeGrid";
import Footer from "./components/Footer/Footer";
import "./globals.css";
import Partenariat from "./components/Partenariat/Partenariat";

export default function Home() {
  return (
    <div>
      <Header />
      <HomeGrid />
      <Partenariat />
      <Footer />
    </div>
  );
}
