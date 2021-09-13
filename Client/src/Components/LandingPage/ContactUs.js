import React from "react";
import Container from "react-bootstrap/Container";
import "./../../CssFiles/LandingPage/ContactUs.css";
import Button from "@material-ui/core/Button";

const ContactUs = () => {
  return (
    <Container className="contact">
      <h1 className="contact_heading">Contact Us</h1>
      <p className="contact_para">
        Got any questions? Don't hesitate to reach out.
      </p>
      <form className="form-contactUs">
        <div className="form-label-group">
          <div className="each_item">
            <label htmlFor="text" className="mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
        </div>

        <div className="form-label-group containe_2_fields">
          <div className="each_item">
            <label htmlFor="inputEmail" className="mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="each_item">
            <label htmlFor="inputEmail" className="mb-1">
              Phone(Optional)
            </label>
            <input
              type="text"
              id="inputNumber"
              className="form-control"
              placeholder="(123) 456-7890"
            />
          </div>
        </div>
        <div className="form-label-group">
          <div className="each_item">
            <label htmlFor="text" className="mb-1">
              Your Message
            </label>
            <textarea
              type="text"
              id="text"
              className="form-control"
              required
              rows="5"
            />
          </div>
        </div>
        <Button variant="contained" color="primary" type="submit">
          Send Message
        </Button>
      </form>
    </Container>
  );
};

export default ContactUs;
