const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const sessions = require("express-session"); // <<<<< install express-session
const KnexSessionStore = require("connect-session-knex")(sessions); // to store sessions in database
const knex = require("./data/db-config.js");


const user = require('./routers/user-router.js');
const RestaurantRouter = require('./routers/restaurant-router.js')
// const ReviewRouter = require('./reviews/reviews-router.js');

const sessionConfiguration = {
  name: "chocolatechip", 
  secret: "keep it secret, keep it safe!",
  saveUninitialized: true, 
  resave: false,

  // how to store the sessions
  store: new KnexSessionStore({
    knex,
    createtable: true,

    // optional
    clearInterval: 1000 * 60 * 10, 
    sidfieldname: "sid",
    tablename: "sessions"
  }),

  cookie: {
    maxAge: 1000 * 60 * 10, 
    secure: false,
    httpOnly: true
  }
};

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfiguration)); 

server.use('/users', user);
server.use('/restaurants', RestaurantRouter);
// server.use('/reviews', ReviewRouter);

module.exports = server;
