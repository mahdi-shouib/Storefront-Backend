CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName varchar(32) NOT NULL,
    lastName varchar(32) NOT NULL,
    password varchar(256) NOT NULL
);