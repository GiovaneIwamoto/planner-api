//========== PLANNER API ==========
//FOR JSON FILE shift + alt + f

//========== GLOBAL CONST ==========
const fs = require('fs');
const express = require("express"); //Write handlers for requests with different HTTP verbs at different URL paths
const morgan = require('morgan');   //HTTP request logger middleware for node.js

const app = express();

//========== MIDDLE WARE ==========
app.use(morgan('dev'));
app.use(express.json());


//Middleware that request time in ISO 8601 UTC format
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


//========== JSON FILE CONNECTION ==========
const events = JSON.parse(
    fs.readFileSync(`${__dirname}/data/events.json`)
);

const usersSignUp = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users-sign-up.json`)
);

const usersSignIn = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users-sign-in.json`)
);


//========== ROUTE HANDLERS ==========

//---------- EVENTS ----------

//GET ALL EVENTS
const getAllEvents = (req, res) => {
        
    res.status(200).json({
        status: 'sucess',
        results: events.length,
        data: {
            events
        }
    });
};


//GET EVENT BY ID AND WEEKDAY
const getEvent = (req, res) => {
    
    //Return the respective event by id
    const id = req.params.idOrWeekDay * 1;
    const event = events.find(el => el._id === id)

    if(event){
        return res.status(200).json({
            status: 'sucess',
            data: {
                event
            }
        });
    }

    //Return the respective event by weekday
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const filteredEvents = events.filter(event => {
        const date = new Date(event.dateTime);
        const eventDayOfTheWeek = daysOfWeek[date.getUTCDay()];
        return eventDayOfTheWeek === req.params.idOrWeekDay;
    });

    if(!filteredEvents.length){
        return res.status(404).json({
            status: 'fail',
            message: 'WRONG ID OR NO EVENTS FOR THIS WEEK DAY'
        });
    }

    res.status(200).json({
        status: 'sucess',
        data: {
            filteredEvents
        }
    });
} 
    
 
//CREATE EVENT
const createEvent = (req, res) => {

    //Creating new ID for the new event
    const newId = events[events.length - 1]._id + 1;

    //Event creation time
    const newTime = req.requestTime;

    const newEvent = Object.assign({_id : newId}, req.body, {createdAt : newTime});

    if( !newEvent.description   ||
        !newEvent.dateTime){
            res.status(400).json({
                status: 'fail',
                message: 'INVALID BODY'
            });
        }
    
    else{
        events.push(newEvent);
        fs.writeFile(`${__dirname}/data/events.json`,
        JSON.stringify(events), err => {
            res.status(200).json({
                status: 'sucess',
                data: {
                    event: newEvent
                }
            });
        });
    }
}

//DELETE EVENT BY ID AND WEEKDAY
const deleteEvent = (req, res) => {
    //Delete by id const
    const id = req.params.idOrWeekDay * 1;
    const eventIndex = events.findIndex(el => el._id === id);
  
    //Delete by weekday const
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const filteredEvents = events.filter(event => {
        const date = new Date(event.dateTime);
        const eventDayOfTheWeek = daysOfWeek[date.getUTCDay()];
        return eventDayOfTheWeek === req.params.idOrWeekDay;
    });
  
    if (eventIndex !== -1) { //Check id existence and delete
        events.splice(eventIndex, 1);
        fs.writeFile(`${__dirname}/data/events.json`, JSON.stringify(events), err => {

        return res.status(204).json({
            status: 'no content',
            message: 'SUCCESSFULLY DELETED'
        });
    });
    
} else if (filteredEvents.length) { //Check filteredEvents and delete
        filteredEvents.forEach(filteredEvent => {
            const filteredEventIndex = events.findIndex(event => event._id === filteredEvent._id);
            events.splice(filteredEventIndex, 1);
        });
      
        fs.writeFile(`${__dirname}/data/events.json`, JSON.stringify(events), err =>{
            return res.status(204).json({
            status: 'no content',
            message: 'SUCCESSFULLY DELETED'
        });
    });

} else {
    return res.status(400).json({
        status: 'fail',
        message: 'INVALID ID OR NO EVENTS FOR THIS WEEKDAY TO DELETE'
        });
    }
};

//---------- USERS ----------

//CREATE USER SIGN UP  
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
                message: 'INVALID BODY'
            });
        }
    
    else{
        usersSignUp.push(newUserSignUp);
        fs.writeFile(`${__dirname}/data/users-sign-up.json`, 
        JSON.stringify(usersSignUp), err => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    user: newUserSignUp
                }
            })
        })
    }
}

//CREATE USER SIGN IN
const createUserSignIn = (req, res) => {
    const newUserSignIn = Object.assign(req.body);

    if( !newUserSignIn.email || 
        !newUserSignIn.password){
            res.status(404).json({
                status: 'fail',
                message: 'INVALID BODY'
            }); 
        }
    
    else{
        usersSignIn.push(newUserSignIn);
        fs.writeFile(`${__dirname}/data/users-sign-in.json`,
        JSON.stringify(usersSignIn), err => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    user: newUserSignIn
                }
            })
        })
    }
}

//========== ROUTES ==========

//EVENTS
app
.route('/api/v1/events')
.get(getAllEvents)
.post(createEvent);

//EVENT ID AND WEEKDAY
app
.route('/api/v1/events/:idOrWeekDay')
.get(getEvent)
.delete(deleteEvent);

//USER SIGN UP
app
.route('/api/v1/users/signUp')
.post(createUserSignUp);

//USER SIGN IN
app
.route('/api/v1/users/signIn')
.post(createUserSignIn);


//========== SERVER ==========

//127.0.0.1:3000
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});