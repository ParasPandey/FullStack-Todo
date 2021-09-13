import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./../../CssFiles/LandingPage/Reviews.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import userImg1 from "./../../assets/images/user.webp";
import userImg2 from "./../../assets/images/user2.webp";
import userImg3 from "./../../assets/images/user3.webp";
import userImg4 from "./../../assets/images/user4.webp";
import userImg5 from "./../../assets/images/user5.webp";
import Carousel from "react-bootstrap/Carousel";

const Reviews = () => {
  const reviews = [
    {
      review:
        "I kept track of all my school tasks in Todoist and, in 2016, Ibecame the first one in my family to obtain a bachelor’s degree.",
      name: "Samantha Houston",
      designation: "Software Engineer",
      image: userImg1,
    },
    {
      review:
        "I literally couldn’t do my job or even manage all the business of being a fully functioning parent and spouse without Todoist.",
      name: "Khoi Vinh",
      designation: "Principal Designer at Adobe",
      image: userImg2,
    },
    {
      review:
        "As a software engineer, it’s useful to break down big projects into smaller tasks, and Todoist is perfect for that purpose.",
      name: "Tigran Hakobyan",
      designation: "Senior Product Engineer at Buffer",
      image: userImg3,
    },
    {
      review:
        "Todoist has revolutionized the way we run our small business by helping us simplify projects and coordinate tons of details.",
      name: "Trevor Stephens",
      designation: "General Manager at Topline Builders",
      image: userImg4,
    },
    {
      review:
        "Todoist gave us the focus to scale our company from 2 to 75 employees, $12M in VC financing, and 350+ happy enterprise customers.",
      name: "Andrew Montalenti",
      designation: "CTO at Parse.ly",
      image: userImg5,
    },
  ];
  return (
    <Container className="reviews">
      <Carousel fade>
        {reviews.map((el,i) => {
          return (
            <Carousel.Item interval={4000} key={i}>
              <Row className="each_review">
                <Col xs={12} md={6} className="left_side_box">
                  <Card className="card">
                    <CardContent>
                      <h3>{el.review}</h3>
                      <Row className="review_user">
                        <strong>{el.name}</strong>
                        <p>{el.designation}</p>
                      </Row>
                    </CardContent>
                  </Card>
                </Col>
                <Col xs={12} md={6} className="user_image">
                  <img src={el.image} alt="user_img" />
                </Col>
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>
     
    </Container>
  );
};

export default Reviews;
