require('dotenv').config();

//Quickfix for database updates
const {fixHashing, fixColWaterMeters} = require('./src/server/services/databaseServices');
//Remove comment below to fix hashed password in database
//fixHashing();
//Remove comment below to fix new column in water_meters
//fixColWaterMeters();


//Imports npm packages
const express = require('express');
const bodyParser = require('body-parser');

//Import files
const sessionApi = require('./src/server/sessionApi.js');
const userApi = require('./src/server/userApi.js');
const waterUsageApi = require('./src/server/waterusageApi.js');
const waterMetersApi = require('./src/server/watermetersApi.js');
const factApi = require('./src/server/factApi.js');

//Initialize server
const app = express();


//Serving static files
app.use(express.static('build'));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Logging to console
app.use((req, res, next)=>{
  const { method, path } = req;
  console.log(`New request of type ${method} to endpoint '${path}'`)
  next();
})

//Routing
app.use('/api/user', userApi);
app.use('/api/session', sessionApi);
app.use('/api/waterusage', waterUsageApi);
app.use('/api/watermeters', waterMetersApi);
app.use('/api/facts', factApi);

//Listening to port
let port = process.env.PORT;
if (port == null || port === "") {
  port = 8000;
}

app.listen(port)
console.log(`Running on port ${port}`);