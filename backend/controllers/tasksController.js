import pool from "../db/db.js";

export const createTask = async (req, res) => {
  const { title, description, created_at, due_date } = req.body;
  const user_id = req.session.user.id;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, created_at, due_date, user_id)" +
      "VALUES ($1, $2, $3, $4, $5)",
      [title, description, created_at, due_date || null, user_id]
    );

    res.json({
      success: true,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
}

export const fetchTasks = async (req, res) => {
  const user_id = req.session.user.id;
  
  try{
    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date ASC NULLS LAST",
        [user_id]
    );
    
    res.json(result.rows);
    
  }catch(err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
}

export const removeTask = async (req, res) => {
    
}

export const markDone = async (req, res) => {
    
}