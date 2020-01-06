require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sessionApi = require('./src/server/sessionApi.js');
const userApi = require('./src/server/userApi.js');
const waterUsageApi = require('./src/server/waterUsageApi.js');
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)=>{
  const { method, path } = req;
  console.log(`New request of type ${method} to endpoint '${path}'`)
  next();
})
//Serving static files
app.use(express.static('build'));

//Routing
app.use('/api/user', userApi);
app.use('/api/session', sessionApi);
app.use('/api/waterusage', waterUsageApi);

//Listening to port
const port = process.env.PORT;

app.listen(port)
console.log(`Running on port ${port}`);