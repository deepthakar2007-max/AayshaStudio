const express = require("express")

const {
  register,
  login,
  getUsers,
  
} = require("./../controller/authcontroller.js");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/users", getUsers);


module.exports = router;