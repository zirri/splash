const { Pool } = require('pg');
const camelcaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
  });

async function getUserInformation(userid){
  if(typeof userid != 'number'){return}
  const sql = `
    SELECT 
      email, 
      full_name, 
      user_id, 
      location, 
      no_in_household 
    FROM 
      users 
    WHERE 
      users.user_id=$1;`
  let user = await pool.query(sql,[userid]);
  if(!user.rows[0]){
    return;
  }
  user = camelcaseKeys(user.rows[0]);
  return user;
}

async function getUserByEmail(email){
  if(typeof email != 'string'){return}
  const sql = `
    SELECT 
      email, 
      full_name,
      user_id, 
      password
    FROM 
      users 
    WHERE 
      users.email=$1;`
  let user = await pool.query(sql, [email]);
  if(!user.rows[0]){
    return;
  }
  user = camelcaseKeys(user.rows[0]);
  return user;
}

async function createNewUser(user){
  user = snakeCaseKeys(user);
  const sql = `
  INSERT INTO users (
    email, 
    password, 
    full_name, 
    location, 
    no_in_household
    )  
  VALUES
    ($1, $2, $3, $4, $5)
  RETURNING *;`
  const { email, password, full_name, location, no_in_household } = user;
  let newUser = await pool.query(sql, [email, password, full_name, location, no_in_household]);
  newUser = camelcaseKeys(newUser.rows[0]);
  return newUser;
}

async function getWaterUsage(userId){
  if(typeof userId != 'number'){return}
  const sql = `
    SELECT 
      user_id, 
      room,
      source,
      water_meters.meter_id,
      timestamp,
      amount
    FROM 
      water_meters, 
      water_usage
    WHERE 
      water_meters.user_id = $1 AND
      water_meters.meter_id = water_usage.meter_id;`
  let waterUsage = await pool.query(sql, [userId]);
  waterUsage = waterUsage.rows.map(record => camelcaseKeys(record));
  return waterUsage;
}


async function updateWaterMetering(waterData){
  waterData = snakeCaseKeys(waterData);
  const sql = `
  INSERT INTO users (
    water_meter_id, 
    timestamp,
    amount
    )  
  VALUES
    ($1, $2, $3)
  RETURNING *;`
  console.log(sql)
  const { water_meter_id, timestamp, amount } = waterData;
  let newRecord = await pool.query(sql, [water_meter_id, timestamp, amount]);
  newRecord = camelcaseKeys(newRecord.rows[0]);
  return newRecord;
}

async function getFacts() {
  const sql = `
  SELECT 
    *
  FROM 
    facts
  `
  let facts = await pool.query(sql);
  facts = camelcaseKeys(facts.rows)
  if(!facts){
    return "There are no facts available";
  }
  return facts;
}

module.exports = {
  getUserInformation,
  getUserByEmail,
  createNewUser,
  getWaterUsage,
  updateWaterMetering,
  getFacts
}