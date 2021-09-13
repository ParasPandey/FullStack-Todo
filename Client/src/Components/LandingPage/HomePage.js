import React from "react";
import Navbar from "./Navbar";
import HomeContainer from "./HomeContainer"
import "../.."
import "./../../CssFiles/LandingPage/HomePage.css";
// import Container from "react-bootstrap/Container";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="main_heading">
        <h1>
          We believe that managing your team's work should be easy... That's why
          we built TurboTask!
        </h1>
      </div>
      <HomeContainer/>

    </div>
  );
};

export default HomePage;
