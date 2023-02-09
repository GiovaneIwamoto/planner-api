//Giovane Hashinokuti Iwamoto - PLANNER API

//---------- GLOBAL CONST ----------
const fs = require('fs');
const express = require("express"); //Write handlers for requests with different HTTP verbs at different URL paths (routes)
const morgan = require('morgan');   //HTTP request logger middleware for node.js

const app = express();

//---------- MIDDLE WARE ----------
app.use(morgan('dev'));
app.use(express.json());


//Middleware that shows ISO 8601 UTC (Coordinated Universal Time).
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


//---------- JSON FILE CONNECTION ----------
const events = JSON.parse(
    fs.readFileSync(`${__dirname}/data/events.json`)
);

const usersSignUp = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users-sign-up.json`)
);


//---------- ROUTE HANDLERS ----------

//---------- EVENTS ----------

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


//GET EVENT BY ID
const getEventById = (req, res) => {
    console.log('Event:', req.params);
    const id = req.params.id * 1;
    const event = events.find(el => el._id === id)

    //Case Invalid ID
    if(!event){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    //Case Valid ID
    res.status(200).json({
        status:'sucess',
        data: {
            event
        }
    });
};

//---------- USERS ----------

//FOR JSON FILE shift + alt + f
const createUserSignUp = (req, res) => {
const newUserSignUp = Object.assign(req.body);
    
    if( !newUserSignUp.firstName  ||
        !newUserSignUp.lastName   ||
        !newUserSignUp.birthDate  ||
        !newUserSignUp.city       ||
        !newUserSignUp.country    ||
        !newUserSignUp.email      ||
        !newUserSignUp.password   ||
        !newUserSignUp.confirmPassword){
             res.status(400).json({
                status: 'fail',
                message: 'Invalid'
            });
        }
    
    else{
        usersSignUp.push(newUserSignUp);
        fs.writeFile(`${__dirname}/data/users-sign-up.json`, JSON.stringify(usersSignUp), err => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    user: newUserSignUp
                }
            })
        })
    }
}


//---------- ROUTES ----------

//GET ALL EVENTS
app
.route('/api/v1/events')
.get(getAllEvents);

//GET EVENT BY ID
app
.route('/api/v1/events/:id')
.get(getEventById);

//POST USER SIGN UP
app
.route('/api/v1/users/signUp')
.post(createUserSignUp);


//---------- SERVER ----------

//127.0.0.1:3000
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});