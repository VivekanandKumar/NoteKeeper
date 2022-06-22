const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const { login, register, logout } = require("../controllers/userController");

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/logout", auth, logout);

module.exports = userRouter;
