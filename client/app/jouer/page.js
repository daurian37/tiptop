import React from "react";
import Participer from "../components/Participer/Participer";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Jouer = () => {
  return (
    <div>
      <Header />
      <div className="mb-5">
        <Participer />
      </div>
      <Footer />
    </div>
  );
};

export default Jouer;
