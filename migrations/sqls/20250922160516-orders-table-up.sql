CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status varchar(10) NOT NULL
);