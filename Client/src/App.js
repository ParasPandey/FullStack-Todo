import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/LandingPage/HomePage";
import SignIn from "./Components/LandingPage/SignIn";
import SignUp from "./Components/LandingPage/SignUp";
import StartApp from "./Components/MainTodo/StartApp";
import { login, selectuser, setToken } from "./Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("setUSer");
    if (localStorage.getItem("token")) {
      dispatch(login(JSON.parse(localStorage.getItem("user"))));
      dispatch(setToken({ token: JSON.parse(localStorage.getItem("token")) }));
    }
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {user !== null ? <StartApp /> : <HomePage />}
          </Route>
          <Route exact path="/login">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
