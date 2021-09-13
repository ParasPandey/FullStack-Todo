const express = require("express");
const router = express.Router();
const AuthContoller = require("./../Controllers/AuthController");

// auth router
router.post("/signup", AuthContoller.signup);
router.post("/login", AuthContoller.login);



module.exports = router;