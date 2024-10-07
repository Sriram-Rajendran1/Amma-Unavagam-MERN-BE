import React from "react";
import "../Homepage/Homepage.css";
import Header from "../../Components/Header/Header";
import Homecontent1 from "../../Components/Home/Homecontent1";
import Homecontent2 from "../../Components/Home/Homecontent2";
import Homecontent3 from "../../Components/Home/Homecontent3";
import Homecontent4 from "../../Components/Home/Homecontent4";
import Contactus from "../../Components/Contact/Contactus";
import Footer from "../../Components/Footer/Footer";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Homecontent1 />
      <div className="content1-div1"></div>
      <div className="content1-div1"></div>
      <Homecontent2 />
      <div className="content1-div1"></div>
      <div className="content1-div1"></div>
      <Homecontent3 />
      <div className="content1-div1"></div>
      <div className="content1-div1"></div>
      <Homecontent4 />
      <div className="content1-div1"></div>
      <div className="content1-div1"></div>
      <Contactus />
      <div className="content1-div1"></div>
      <div className="content1-div1"></div>
      <Footer />
    </div>
  );
};

export default Homepage;
