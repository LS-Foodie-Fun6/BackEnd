const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const mdwr = require('../auth/restricted-middleware')



//const db = require("../data/db-config.js");
const model = require("../model.js");

const router = express.Router();


router.get('/', (req,res)=> {
  let thing = req.baseUrl.slice(1)
  model.getAll(thing)
    .then(things => {res.status(200).json(things)})
    .catch(err => {res.status(500).json(err)})
})

router.post('/register', (req,res) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash

  model.add('users', user)
  .then(saved =>{ res.status(201).json(saved)})
  .catch(err => {res.status(500).json(err)})
})

router.post("/login", (req, res) => {
  const {username, password} = req.body;

  model.findByUsername({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user); 
        console.log(token)
        req.session.user = user;
        res.status(200).json(token);
      } else {res.status(401).json({ message: "Invalid Credentials" })}
    })
    .catch(err => {res.status(500).json(err)});
});

router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {res.status(500).json(err);} 
      else {res.status(200).json({ message: "logged out" });}
    });
  } else {res.status(200).end()}
});

function signToken(user) {
  const payload = {username: user.username,};
  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";
  const options = {expiresIn: "1h",};
  return jwt.sign(payload, secret, options);
}

router.get('/all', mdwr.restricted, (req,res) => {
  model.getAll('users')
    .then(users => {res.json(users)})
    .catch(err => {res.status(500).json(err);});

})

module.exports = router;
