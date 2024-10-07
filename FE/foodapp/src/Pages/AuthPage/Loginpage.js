import React, { useEffect, useState } from "react";
import "../AuthPage/Loginpage.css";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from "react-router-dom";

const Loginpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isError, message, user } = useSelector((state) => state.authslice);

  const [showmessage, setShowMessage] = useState(false);

  const [userLoginData, setUserLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleinp = (e) => {
    setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  };

  const handleloginsubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userLoginData));
  };

  useEffect(() => {
    if (user && !isError) {
      setShowMessage(true);
      setUserLoginData({
        username: "",
        email: "",
        password: "",
      });
      // navigate("/");
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } else if (isError) {
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [isError, user, dispatch, navigate, location.state]);

  return (
    <div className="loginmaindiv">
      <Header />
      <div className="logintitlediv">
        <h2 className="logintitle">Amma Unavagam</h2>
      </div>
      <div className="logindiv">
        <h4 className="loginheading">Login</h4>
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
      <form className="loginform" onSubmit={handleloginsubmit}>
        <input
          className="loginuser-inp"
          type="username"
          name="username"
          placeholder="Username"
          value={userLoginData.username}
          onChange={handleinp}
        />
        <input
          className="loginemail-inp"
          type="email"
          name="email"
          placeholder="Email ID"
          value={userLoginData.email}
          onChange={handleinp}
        />
        <input
          className="loginpass-inp"
          type="password"
          name="password"
          placeholder="Password"
          value={userLoginData.password}
          onChange={handleinp}
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Loginpage;
