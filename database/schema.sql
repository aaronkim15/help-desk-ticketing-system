DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('support','customer'))
);

CREATE TABLE ticket (
  ticket_id SERIAL PRIMARY KEY,
  subject VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('unassigned','assigned','in_progress','resolved','closed')),
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('low','medium','high','urgent')),
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  assignee_id INT NULL REFERENCES "user"(user_id) ON DELETE SET NULL,
  creator_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE RESTRICT
);

CREATE TABLE note (
  note_id SERIAL PRIMARY KEY,
  ticket_id INT NOT NULL REFERENCES ticket(ticket_id) ON DELETE CASCADE,
  details TEXT NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);