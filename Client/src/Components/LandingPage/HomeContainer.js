import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./../../CssFiles/LandingPage/HomeContainer.css";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SmsIcon from "@material-ui/icons/Sms";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import homeImage from "./../../assets/images/todo.png";
import demoImage from "./../../assets/images/main_img.webp";
import Button from "@material-ui/core/Button";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Review from "./Reviews";
import ContactUs from "./ContactUs";
import copyLogo from "./../../assets/images/logo.png";

const HomeContainer = () => {
  return (
    <>
      <Container className="home_container">
        <Row>
          <Col xs={12} md={7} className="left_part">
            <h3>The easy way to organize your team's tasks:</h3>
            <ul className="options">
              <li>
                <CheckBoxOutlinedIcon />
                <div className="context">
                  <strong>
                    Start with a simple To-Do-List and add more Details as you
                    go!
                  </strong>
                  <p>
                    Every big idea starts small. We help you to concentrate on
                    the essentials. Add what you want to start, with the
                    intuitive drag & drop you can re-organize and ad more
                    details and tasks any time later.
                  </p>
                </div>
              </li>
              <li>
                <SupervisorAccountIcon />
                <div className="context">
                  <strong>Instant Team Collaboration!</strong>
                  <p>
                    Send your team a TurboTask link and they can join
                    immediately with just one click! All information is always
                    up-to date and everyone is updated instantly. On Mobile and
                    Desktop!
                  </p>
                </div>
              </li>
              <li>
                <SmsIcon />
                <div className="context">
                  <strong>Instant Messaging!</strong>
                  <p>
                    Each of your Team-To-Do-List comes with a persistent chat
                    room. Making your Teamwork faster, easier and more
                    efficient!
                  </p>
                </div>
              </li>
              <li>
                <DoneOutlineIcon className="green_tick" />
                <div className="context">
                  <p>100% Free for up to 50 Users</p>
                </div>
              </li>
              <li>
                <DoneOutlineIcon className="green_tick" />
                <div className="context">
                  <p>Tested and approved by over 1,000 successful teams!</p>
                </div>
              </li>
              <li>
                <DoneOutlineIcon className="green_tick" />
                <div className="context">
                  <p>
                    Very high acceptance rate among co-workers! Everybody loves
                    our hassle free onboarding!
                  </p>
                </div>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={5} className="right_part">
            <img src={homeImage} alt="homeimage" />
          </Col>
        </Row>
      </Container>
      {/* Demo Image of Product */}
      <Container className="demo_image_box">
        <Row className="demo_box_text">
          <h2>It’s more than work. It’s a way of working together.</h2>
          <p>
            Start with a Todoist board, lists, and cards. Customize and expand
            with more features as your teamwork grows. Manage projects, organize
            tasks, and build team spirit—all in one place.
          </p>
          <Button variant="outlined" color="primary">
            Start Doing
            <ArrowRightAltIcon />
          </Button>
        </Row>
        <Row className="demo_box_image">
          <img src={demoImage} alt="demo_image" />
        </Row>
      </Container>
      {/* Help Compainer */}
      <Container className="help_container">
        <Row>
          <Col xs={12} md={6} className="help_text">
            <h4>Todoist has helped millions of people complete</h4>
            <h1>over 1.5 billion tasks in 150+ million projects.</h1>
          </Col>
          <Col xs={12} md={6} className="help_video">
            <iframe
              width="90%"
              height="315px"
              src="https://www.youtube.com/embed/GNlh5T711gc"
              title="YouTube video player"
              frameBorder="0"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Col>
        </Row>
      </Container>

      {/* Review */}
      <Review />

      {/* Contact */}
      <ContactUs />
      {/* footer */}
      <hr />
      <Container className="footer">
        <div className="footer_items">
          <span>Pricing</span>
          <span>Features</span>
          <span>About Us</span>
          <span>Templates</span>
          <span>Help Center</span>
          <span>Privacy Policy</span>
        </div>
        <div className="logo_copyright">
          <img src={copyLogo} alt="logo" />
          <p>{` © Copyright ${new Date().getFullYear()}. All rights reserved. `}</p>
        </div>
      </Container>
    </>
  );
};

export default HomeContainer;
