const { Pool } = require('pg');
const camelcaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
  });

async function getUserInformation(userid){
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
      users.user_id=${userid};`
  let user = await pool.query(sql);
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

function getWaterUsage(userid){
  const waterUsageUser = waterUsage.filter(record => record.userid == userid);
  return waterUsageUser;
}

module.exports = {
  getUserInformation,
  createNewUser,
  getWaterUsage
}