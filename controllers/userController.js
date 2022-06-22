const Users = require("../models/User");
const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  // check user input
  if (!email || !password) {
    return res.json({ message: "All fields required" });
  }
  try {
    // check if user exists or not
    const isUser = await Users.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    // match the password
    const matchPassword = await compare(password, isUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // generate the JWT token
    const token = await sign({ id: isUser._id }, process.env.TOKEN_SECRET);
    res.cookie("authtoken", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
    });
    return res.status(200).json({ isUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "All fields are required" });
  }
  try {
    // find an user with input email in database
    const isUser = await Users.findOne({ email });
    // check if user already exists
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash the user input password
    const hashPassword = await hash(password, 10);
    // create/register a new user
    const newUser = await new Users({ name, email, password: hashPassword });
    await newUser.save();
    return res.status(201).json({ newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("authtoken");
    return res.status(200).json({ message: "User Logout!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { login, register, logout };
