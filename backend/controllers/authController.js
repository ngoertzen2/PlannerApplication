import pool from "../db/db.js";
import bcrypt from "bcrypt";

const invalidCredentialsMessage = "Username or password is incorrect";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: invalidCredentialsMessage });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({ message: invalidCredentialsMessage });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
    };

    res.json({
      success: true,
      user: req.session.user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid", { path: "/" });
    res.json({ success: true });
  });
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1,$2) RETURNING id, username",
      [username, hash]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};
