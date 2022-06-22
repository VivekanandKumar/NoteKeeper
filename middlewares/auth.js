const { verify } = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.authtoken;
    if (token) {
      let user = verify(token, process.env.TOKEN_SECRET);
      req.userId = user.id;
    } else {
      return res.status(401).json({ message: "Unauthorized User..." });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized User..." });
  }
};

module.exports = auth;
