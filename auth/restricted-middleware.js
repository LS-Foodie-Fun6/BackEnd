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
    res.status(201).json({message: 'go away, you dont belong here'})
    next()
  }
}

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
