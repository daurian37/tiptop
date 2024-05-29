import React from "react";
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import Gain from "../components/Gain/Gain";

const Gains = () => {
  return (
    <div>
      <Header />
      <div className="mb-5">
        <Gain />
      </div>
      <Footer />
    </div>
  );
};

export default Gains;
