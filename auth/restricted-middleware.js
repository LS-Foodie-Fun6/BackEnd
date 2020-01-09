const jwt = require("jsonwebtoken");

module.exports = {
  restricted,
  authenticate
}

function restricted(req, res, next) {
  console.log(req.headers.authorization)
  //console.log(req.session)
  if (req.session && req.session.user) next();
  else {
    console.log('restricted')
    res.status(401).json({ message: "You shall not pass!!" });
  }
};

function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";
    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) res.status(401).json({ message: "Invalid Token" }) 
      else {
        req.token = decodedToken;
        next();
      }
    });
  } 
  else res.status(400).json({ message: "Please login and try again" })
};