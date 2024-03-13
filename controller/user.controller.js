const bcrypt = require("bcrypt");
const { User } = require("../models/user.models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(303).json({ msg: "user already exists, please login" });
    }
    bcrypt.hash(password, 5, async (err, hashed) => {
      if (hashed) {
        await User.create({ name, email, password: hashed });
        return res.status(201).json({ msg: "user created successfully" });
      }
      if (err) {
        console.log(err);
        return res.status(204).json({ msg: "user not created" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(303).json({ msg: "user not exists, please register" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log(err);
        res.status(502).json({ msg: "something went wrong" });
      }
      if (result) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.jwtSec
        );
        res.status(200).json({ token, msg: "login success" });
      } else {
        res.status(403).json({ msg: "wrong email or password" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { register, login };
