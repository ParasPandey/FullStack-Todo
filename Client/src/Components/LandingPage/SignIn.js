import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./../../CssFiles/LandingPage/SignIn.css";
import google from "./../../assets/images/google.svg";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { userAxios } from "../../AxiosConfig";
import MyAlert from "./../../Util/MyAlert";
import { login, selectuser, setToken } from "./../../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const history = useHistory();
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  const signInUser = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (email && password) {
      const res = await userAxios({
        method: "post",
        url: "/login",
        data: {
          email,
          password,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          "Access-Control-Allow-Credentials": true,
          // Secure: true,
          HttpOnly: true,
        },
      });
      console.log(res);
      const user = {
        email: res.data.data.email,
        username: res.data.data.username,
        id: res.data.data._id,
      };
      dispatch(login(user));
      dispatch(
        setToken({
          token: res.data.token,
        })
      );
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(user));
      setAlert(true);
      setAlertMessage(res.data.message);
      res.data.success ? setAlertType("success") : setAlertType("error");
      if (res.data.success) {
        setTimeout(() => {
          history.push("/");
        }, 2000);

        e.target[0].value = "";
        e.target[1].value = "";
      }
      setTimeout(() => {
        setAlert(false);
        setAlertMessage("");
        setAlertType("");
      }, 2000);
    } else {
      setAlert(true);
      setAlertMessage("Please Provide Valid Details");
      setAlertType("error");
      setTimeout(() => {
        setAlert(false);
        setAlertMessage("");
        setAlertType("");
      }, 3000);
    }
  };

  return (
    <section>
      {alert && <MyAlert message={alertMessage} type={alertType} />}
      <div className="container">
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
              alt=""
            />
          </div>
          <div className="formBx">
            <IconButton
              className="back_to_homepage"
              onClick={() => history.push("/")}
            >
              <ArrowBackIcon />
            </IconButton>

            <form action="" onSubmit={signInUser}>
              <h2>Sign In</h2>
              <input type="email" name="" placeholder="Email Address" />
              <input type="password" name="" placeholder="Password" />
              <input type="submit" name="" value="Login" />
              <div className="social_signin">
                <Button variant="outlined" color="secondary">
                  <svg
                    xmlns={google}
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  continue with Google
                </Button>
              </div>
              <p className="signup">
                Don't have an account ?
                <a href="#" onClick={() => history.push("/signup")}>
                  Sign Up.
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
