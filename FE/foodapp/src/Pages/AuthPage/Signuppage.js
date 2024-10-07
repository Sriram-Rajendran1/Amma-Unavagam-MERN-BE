import React, { useEffect, useState } from "react";
import "../../Pages/AuthPage/Signuppage.css";
import { signupUser } from "../../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from "react-router-dom";

const Signuppage = () => {
  const { isError, isLoading, message, user } = useSelector(
    (state) => state.authslice
  );

  const [showmessage, setShowMessage] = useState(false);
  // const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleinput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlenavtologin = () => {
    console.log("login");
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  useEffect(() => {
    if (user && !isError) {
      setShowMessage(true);
      // setRedirect(true);
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      });

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } else if (isError) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
  }, [user, isError, navigate, location.state]);

  // if (redirect) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="signupmaindiv">
      <Header />
      <div className="signuptitlediv">
        <h2 className="signuptitle">Amma Unavagam</h2>
      </div>
      <div className="signupdiv">
        <h4 className="signupheading">Signup</h4>
      </div>
      {showmessage && (
        <>
          {user && !isError ? (
            <p className="responsemessagesuccess">{message}</p>
          ) : (
            <p className="responsemessagefail">{message}</p>
          )}
        </>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="user-inp"
          type="username"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleinput}
        />
        <input
          className="email-inp"
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleinput}
        />
        <input
          className="pass-inp"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleinput}
        />
        <input
          className="cpass-inp"
          type="password"
          name="confirmpassword"
          placeholder="Confirm-Password"
          value={formData.confirmpassword}
          onChange={handleinput}
        />
        <div className="aleadydiv" onClick={handlenavtologin}>
          <h5 className="alreadyheading">
            Already a Existing User ? Please Click Here to Login
          </h5>
        </div>
        <button className="signup-button" type="submit">
          {isLoading ? <p>Signing-Up</p> : <p>Sign Up</p>}
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default Signuppage;
