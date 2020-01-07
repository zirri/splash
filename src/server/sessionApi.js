//Router file for endpoint /session. setting and cheking token 

const express = require('express');
const router = express.Router();

const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

module.exports = router;