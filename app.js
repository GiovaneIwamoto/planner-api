//Giovane Hashinokuti Iwamoto - PLANNER API

//---------- GLOBAL CONST ----------
const fs = require('fs');
const express = require("express"); //Write handlers for requests with different HTTP verbs at different URL paths (routes)
const morgan = require('morgan');   //HTTP request logger middleware for node.js

const app = express();

//---------- MIDDLE WARE ----------
app.use(morgan('dev'));
app.use(express.json());

//Just testing middleware
app.use((req, res, next) => {
    console.log('Middleware is here');
    next();
});

//Middleware that shows ISO 8601 UTC (Coordinated Universal Time).
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


//---------- JSON FILE CONNECTION ----------
const events = JSON.parse(
    fs.readFileSync(`${__dirname}/data/events.json`)
);


//---------- ROUTE HANDLERS ----------

//GET ALL EVENTS
const getAllEvents = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'sucess',
        requestedAt: req.requestTime,
        results: events.length,
        data: {
            events
        }
    });
};

//---------- ROUTES ----------
app
.route('/api/v1/events')
.get(getAllEvents);


//---------- SERVER ----------

//127.0.0.1:3000
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});