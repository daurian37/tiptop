"use client";
import HomeGrid from "./components/HomeGrid/HomeGrid";
import "./globals.css";
import "../public/assets/css/style.css";
import Banner from "./components/Banner/Banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <HomeGrid />
    </div>
  );
}
