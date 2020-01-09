const jwt = require('jsonwebtoken')

module.exports = {
  restricted, authenticate
}

function restricted (req,res,next) {
  console.log('Authorization:', req.headers.authorization)
  console.log('session:', res.session)
  console.log('user:', req.session.user)
  if(req.session && req.session.user) next()
  else {
    console.log('restricted')
    res.status(401).json({message: 'go away, you dont belong here'})
  }
}

// function restricted(req, res, next) {
//   console.log(req.headers.authorization)
//   //console.log(req.session)
//   if (req.session && req.session.user) next();
//   else {
//     console.log('restricted')
//     res.status(401).json({ message: "You shall not pass!!" });
//   }
// };

function authenticate(req, res, next) {
  const {Authorization} = req.headers
  if(Authorization) {
    const secret = process.env.JWT_SECRET ||'did you do it right?'
    jwt.verify(Authorization, secret, function(err, decodedToken) {
      if(err) res.status(401).json({message:'wrong token dude'})
      else{
        req.token = decodedToken
        next()
      }
    })
  }
  else res.status(400).json({message:'come back after you log in'})
}


// function authenticate(req, res, next) {
//   const { authorization } = req.headers;
//   if (authorization) {
//     const secret = process.env.JWT_SECRET || "is it secret, is it safe?";
//     jwt.verify(authorization, secret, function(err, decodedToken) {
//       if (err) res.status(401).json({ message: "Invalid Token" }) 
//       else {
//         req.token = decodedToken;
//         next();
//       }
//     });
//   } 
//   else res.status(400).json({ message: "Please login and try again" })
// };