import React from "react";
import "../Contact/Contactus.css";

const Contactus = () => {
  return (
    <div className="content5-maindiv">
      <div className="content5-titlediv">Looking to Contact Us</div>
      <div className="content5-form">
        <form className="form-maindiv">
          <div className="form-div1">
            <div className="divname">
              <label className="label" for="name">
                Name :
              </label>
              <input className="input" />
            </div>
            <div className="divname">
              <label className="label" for="name">
                Phone :
              </label>
              <input className="input" />
            </div>
            <div className="divname">
              <label className="label" for="name">
                E-mail :
              </label>
              <input className="input" />
            </div>
          </div>
          <div className="form-div2">
            <div className="divname">
              <label className="label">Leave your Message : </label>
              <textarea className="input1" />
            </div>
            <div className="submit-contactdiv">
              <button className="submit-contact" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
