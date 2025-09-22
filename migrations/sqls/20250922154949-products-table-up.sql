CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(64) NOT NULL,
    price integer NOT NULL,
    category varchar(32)
);