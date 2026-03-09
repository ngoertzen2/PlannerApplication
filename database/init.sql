CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    completed BOOLEAN default FALSE,
    created_at DATE,
    due_date DATE,
    
    FOREIGN KEY (user_id)
                   REFERENCES users(id)
                   on DELETE CASCADE
);

INSERT INTO users (username, password_hash)
VALUES (
  'admin',
  '$2b$10$FolB2p8DRAGlgg.SzkkMduTmT1nKbY5Qvxje3D/4iT.fLP3QDRSby'
)
ON CONFLICT (username) DO NOTHING;