"use client";
import Header from "./components/Header/Header";
import HomeGrid from "./components/HomeGrid/HomeGrid";
import Footer from "./components/Footer/Footer";
import "./globals.css";
import Partenariat from "./components/Participer/Participer";
import Banner from "./components/Banner/Banner";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <HomeGrid />
      <Footer />
    </div>
  );
}
