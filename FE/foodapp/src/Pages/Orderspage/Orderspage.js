import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "../Orderspage/Orderspage.css";
import Ordercontent1 from "../../Components/Order/Ordercontent1";
import Ordercontent2 from "../../Components/Order/Ordercontent2";

const Orderspage = () => {
  return (
    <div>
      <Header />
      <Ordercontent1 />
      <Ordercontent2 />
      <Footer />
    </div>
  );
};

export default Orderspage;
