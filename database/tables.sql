-- waiters table
CREATE TABLE waiters (
    waiter_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

--days table
CREATE TABLE days (
    day_id SERIAL PRIMARY KEY,
    day_name VARCHAR(255) NOT NULL
);

--shifts table
CREATE TABLE shifts (
    shift_id SERIAL PRIMARY KEY,
    waiter_id INT REFERENCES waiters(waiter_id),
    day_id INT REFERENCES days(day_id)
);


