const { verify } = require("jsonwebtoken");
const Users = require("../models/User");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.authtoken;
    if (token) {
      let user = verify(token, process.env.TOKEN_SECRET);
      const isUser = await Users.findById(user.id);
      if (!isUser) {
        res.clearCookie("authtoken");
        return res.render("error");
      }
      req.userId = user.id;
    } else {
      return res.render("error");
    }
    next();
  } catch (err) {
    console.log(err);
    return res.render("error");
  }
};

module.exports = auth;
