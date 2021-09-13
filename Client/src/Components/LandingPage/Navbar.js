import React from "react";
import "../../CssFiles/LandingPage/Navbar.css";
import logo from "./../../assets/images/logo.png";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history  = useHistory()
  return (
    <div className="my_navbar">
      <div className="left_nav">
        <img src={logo} alt="logo" />
        <ul className="left_options">
          <li>Features</li>
          <li>Templates</li>
          <li>For Teams</li>
          <li>About Us</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div className="right_nav">
        <ul className="right_options">
          <li onClick= {()=> history.push("/login")}>Log In</li>
          <li onClick= {()=> history.push("/signup")}>Sign Up</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
