const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const mdwr = require('../auth/restricted-middleware')


const model = require("../model.js");
const router = express.Router();


router.get('/', (req,res)=> {
  let thing = req.baseUrl.slice(1)

  model.getAll(thing)
    .then(things => {res.status(200).json({'things':things})})
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

//create
router.post('/add', /*mdwr.restricted,*/ (req,res) => {
  const rest = req.body
  
  console.log(req.body)
  res.json(rest)
  model.add('restaurants', rest)
  .then(saved =>{ res.status(201).json(saved)})
  .catch(err => {
    res.status(500).json({message: err})
    console.log(err)
  })
})

//update 
router.put('/:id', (req,res) => {
  const { id } = req.params
  const changes = req.body
  console.log(changes)
  console.log(id, changes)

  model.findById('restaurants', id)
    .update(changes)
    .then(count => {
      if(count) res.json({update: count})
      else res.status(404).json({message: 'could not find restaurant with given id'})
    })
    .catch(err => {res.status(500).json(err)})
})

//delete
router.delete('/:id', (req,res) => {
  const { id } = req.params

  model.findById('restaurants', id)
    .del()
    .then(count => {
      if(count) res.json({delete: count})
      else res.status(404).json({message: 'could not find restaurant with given id'})
    })
    .catch(err => {res.status(500).json(err)})
})


module.exports = router;
