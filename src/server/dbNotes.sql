-- create database
CREATE DATABASE splash;

-- change to the new database:
\c splash

-- create tables and dummy data
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR,
    password VARCHAR,
    location VARCHAR,
    full_name VARCHAR,
    no_in_household INTEGER
);

INSERT INTO users (email, password, location, full_name, no_in_household)
VALUES ('123@test.com', 'password123', 'Oslo', 'Frank Doe', 1);
INSERT INTO users (email, password, location, full_name, no_in_household)
VALUES ('kongen@test.com', 'password321', 'Oslo', 'Kong Harald', 1);
INSERT INTO users (email, password, location, full_name, no_in_household)
VALUES ('minister@test.com', '123password', 'Oslo', 'Sylvi', 4);


CREATE TABLE water_meters (
    id SERIAL PRIMARY KEY,
    meter_id INTEGER,
    user_id INTEGER,
    room VARCHAR,
    source VARCHAR
);

INSERT INTO water_meters (meter_id, user_id, room, source) VALUES (123123, 1, 'bathroom', 'sink');
INSERT INTO water_meters (meter_id, user_id, room, source) VALUES (123456, 1, 'bathroom', 'shower');
INSERT INTO water_meters (meter_id, user_id, room, source) VALUES (456123, 2, 'bathroom', 'sink');
INSERT INTO water_meters (meter_id, user_id, room, source) VALUES (123789, 1, 'kitchen', 'sink');
INSERT INTO water_meters (meter_id, user_id, room, source) VALUES (789123, 3, 'bathroom', 'washing machine');

CREATE TABLE water_usage (
    id SERIAL PRIMARY KEY,
    meter_id INTEGER,
    amount NUMERIC,
    timestamp TIMESTAMPTZ
);

INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (123123, 2, current_timestamp);
INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (123123, 4, current_timestamp);
INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (123123, 1, current_timestamp);
INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (123456, 6, current_timestamp);
INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (123456, 2, current_timestamp);
INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (123789, 1, current_timestamp);
INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (456123, 1, current_timestamp);
INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (456123, 2, current_timestamp);
INSERT INTO water_usage (meter_id, amount, timestamp) VALUES (789123, 1, current_timestamp);