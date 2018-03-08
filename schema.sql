CREATE TABLE users (
  id serial PRIMARY KEY,
  name text NOT NULL,
  age text NOT NULL,
  username character varying(50) NOT NULL,
  password character varying(60) NOT NULL 
);

CREATE TABLE activities (
  id serial PRIMARY KEY,
  title character varying(50) NOT NULL,
  description text NOT NULL, 
  location character varying(50) NOT NULL
);