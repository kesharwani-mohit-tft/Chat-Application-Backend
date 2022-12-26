const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.addingUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    // console.log("signup...", req.body);
    const insertUser = await newUser.save();
    res.status(201).send(insertUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.signingUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // console.log("100", user);
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  jwt.sign(
    { email: user.email },
    JWT_SECRET,
    { expiresIn: "2h" },
    (err, token) => {
      if (err) {
        res.json({ result: "some thing went wrong" });
      }
      // console.log("Token", token);
      res.json({ user, token: token, status: "ok" });
    }
  );
};
