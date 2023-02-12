//========== PLANNER API ==========

//========== GLOBAL CONST ==========
const express = require("express"); //Write handlers for requests with different HTTP verbs at different URL paths
const morgan = require('morgan');   //HTTP request logger middleware for node.js

//----- IMPORTING ROUTERS -----
const eventsRouter = require('./routes/events-route');
const usersRouter = require('./routes/users-route');

//----- EXPRESS -----
const app = express();

//========== MIDDLE WARE ==========
app.use(morgan('dev'));
app.use(express.json());

//Middleware that request time in ISO 8601 UTC format
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//========== MOUNTING MULTIPLE ROUTES ==========

app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/users', usersRouter);

//========== SERVER ==========

module.exports = app;