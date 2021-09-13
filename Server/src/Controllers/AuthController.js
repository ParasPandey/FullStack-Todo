const User = require("../Models/UserModal.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { checkPassword } = require("./../Util/PasswordChecker");
const { createToken } = require("./../Util/JwtToken");
const { promisify } = require("util");
const { nextTick } = require("process");

exports.signup = async (req, res) => {
  try {
    console.log("signup");
    const { username, email, password } = req.body;
    console.log(username, email, password);
    // check if user already existed
    const reqUser = await User.findOne({ email });
    if (reqUser) {
      console.log(reqUser);
      return res.status(200).json({
        success: false,
        message: `User with ${email} already registered`,
      });
    }

    // If User not registered
    const newUser = await User.create({
      username,
      email,
      password,
    });

    newUser.password = undefined;
    res.status(200).json({
      success: true,
      message: "User Successfully Registered",
      data: newUser,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Something goes wrong, Please try again later!!",
      data: newUser,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // check if user exist or not
    const reqUser = await User.findOne({ email }).select("+password");
    // if user no present
    if (!reqUser) {
      return res.status(200).json({
        success: false,
        message:
          "Invalid email or password!!.Please enter Valid email and Password",
      });
    }
    console.log(reqUser);

    if (!(await checkPassword(password, reqUser.password))) {
      return res.status(200).json({
        success: false,
        message:
          "Invalid email or password!!.Please enter Valid email and Password2",
      });
    }
    // is valid user create a jwt token
    const token = createToken(reqUser._id);

    // not send password to clientS
    reqUser.password = undefined;

    res.status(200).json({
      success: true,
      message: "User login Successfully",
      token,
      data: reqUser,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: "Somthing goes wrong, Please try again later!!!",
    });
  }
};

exports.protects = async (req, res, next) => {
  let token;
  if (
    req.header.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    token = req.header.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Yor are not logged in! Please login to get access",
    });

    const decoded = await promisify(jwt.verift)(token, process.env.JWT_SECRET);
    const freshUser = await User.findOne(decoded.id);
    if (!freshUser) {
      res.status(401).json({
        success: false,
        message: "Error",
      });
    }
    req.user = freshUser;
    next();
  }
};
