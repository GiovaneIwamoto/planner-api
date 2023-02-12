//========== EVENTS ROUTE ==========
const express = require('express');

const eventsController = require('./../controllers/events-controller');

//========== ROUTES ==========
const router = express.Router();

//EVENTS
router
.route('/')
.get(eventsController.getAllEvents)
.post(eventsController.createEvent);

//EVENT ID OR WEEKDAY
router
.route('/:idOrWeekDay')
.get(eventsController.getEvent)
.delete(eventsController.deleteEvent);


//========== EXPORTING ==========
module.exports = router;