import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "../Menupage/Menupage.css";
import Menucomponent1 from "../../Components/Menu/Menucomponent1";

const Menupage = () => {
  return (
    <div>
      <Header />
      <div className="menuheaddiv1">
        <div className="menudiv1">
          <h1 className="menuheading1">Menu</h1>
        </div>
        <div className="menudiv2">
          <label className="menusearch" for="Search">
            Search Dishes:
          </label>
          <input className="menusearchinput" />
          <button className="menusearchbutton" type="button">
            Search
          </button>
        </div>
        <Menucomponent1 />
      </div>
      <Footer />
    </div>
  );
};

export default Menupage;
