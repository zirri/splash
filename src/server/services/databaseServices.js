const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
  });

const users = [
  {
    userid:1,
    username: 'blobb',
    password: 'passordblobb',
    email: 'blobb@123.no'
  },
  {
    userid:2,
    username: 'blubb',
    password: 'passordblubb',
    email: 'blubb@123.no'
  }
];

const waterUsage = [
  {
    id: 0,
    meterId: 123456,
    date: "2020-01-01 12:22",
    amount: 4,
    userId: 1,
    room: 'bathroom',
    source: 'sink'
  },
  {
    id: 1,
    meterId: 123456,
    date: "2020-01-02 12:52",
    amount: 3,
    userId: 1,
    room: 'bathroom',
    source: 'sink'
  },
  {
    id: 2,
    meterId: 6789678,
    date: "2020-01-01 14:44",
    amount: 4,
    userId: 1,
    room: 'bathroom',
    source: 'sink'
  },
  {
    id: 3,
    meterId: 6789678,
    date: "2020-01-01 14:44",
    amount: 1,
    userId: 1,
    room: 'bathroom',
    source: 'sink'
  },
  {
    id: 4,
    meterId: 345678,
    date: "2020-01-01 14:44",
    amount: 1,
    userId: 2,
    room: 'kitchen',
    source: 'sink'
  }
];


function getUserInformation(userid){
  const user = users.filter(user => user.userid == userid);
  return user[0];
}

function getWaterUsage(userid){
  const waterUsageUser = waterUsage.filter(record => record.userid == userid);
  return waterUsageUser;
}

module.exports = {
  getUserInformation,
  getWaterUsage
}