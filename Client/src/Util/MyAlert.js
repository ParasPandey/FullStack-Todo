import React from "react";
import Alert from "@material-ui/lab/Alert";
import "./MyAlert.css"



const MyAlert = ({ message, type }) => {
  return <Alert className="myAlert" severity={type}>{message}</Alert>;
};

export default MyAlert;
