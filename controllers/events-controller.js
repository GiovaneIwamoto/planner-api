//========== EVENTS CONTROLLER ==========
const fs = require('fs');


//========== JSON FILE CONNECTION ==========
const events = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/events.json`)
);


//========== ROUTE HANDLERS ==========

//GET ALL EVENTS
exports. getAllEvents = (req, res) => {
        
    res.status(200).json({
        status: 'sucess',
        results: events.length,
        data: {
            events
        }
    });
};


//GET EVENT BY ID AND WEEKDAY
exports. getEvent = (req, res) => {
    
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
exports. createEvent = (req, res) => {

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
        fs.writeFile(`${__dirname}/../data/events.json`,
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
exports. deleteEvent = (req, res) => {
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
        fs.writeFile(`${__dirname}/../data/events.json`, JSON.stringify(events), err => {

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
      
        fs.writeFile(`${__dirname}/../data/events.json`, JSON.stringify(events), err =>{
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