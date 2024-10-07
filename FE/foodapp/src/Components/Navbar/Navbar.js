import React from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, isLoggedIn } = useSelector((state) => state.authslice);
  // const userlogin = useSelector((state) => state.loginslice.userDetails);
  // console.log(usersignup.data.username);

  return (
    <div className="nav-main">
      <div className="logo-container-main">
        <div className="logo">Amma-Unavagam</div>
      </div>
      <div className="nav-container-main">
        <ul className="nav-ul">
          <li className="nav-li">
            <Link className="nav-li" to="/">
              Home
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-li" to="/menu">
              Menu
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-li" to="/orders">
              Orders
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-li" to="/contactus">
              Contactus
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-li" to="/profile">
              {isLoggedIn && user
                ? `${user.data.username}'s Profile`
                : `Signup/Login`}

              {/* {usersignup && `${usersignup.data.username}'s Profile`
                ? userlogin && `${userlogin.data.username}'s Profile`
                : "Signup/Login"} */}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
