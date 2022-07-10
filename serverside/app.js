import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

import c_contacts from './src/controllers/contacts.controller.js';
import c_attendance from './src/controllers/attendance.controller.js';
import c_events from './src/controllers/events.controller.js'

var app = express();
var jsonParser = bodyParser.json()
app.use(cors());
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api/events', c_events)
app.use('/api/contacts', c_contacts)
app.use('/api/attendance', c_attendance)
app.listen(8080);
export default app;

