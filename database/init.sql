CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

INSERT INTO users (username, password_hash)
VALUES (
  'admin',
  '$2b$10$FolB2p8DRAGlgg.SzkkMduTmT1nKbY5Qvxje3D/4iT.fLP3QDRSby'
)
ON CONFLICT (username) DO NOTHING;