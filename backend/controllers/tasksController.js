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

export const deleteTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const user_id = req.session.user.id;

    const result = await pool.query(
        `DELETE FROM tasks
             WHERE id = $1 AND user_id = $2
             RETURNING id`,
        [task_id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(402).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted", id: task_id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

export const toggleDone = async (req, res) => {
  try{
    const {task_id} = req.params;
    const result = await pool.query(
        "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
        [task_id]
    );

    res.json(result.rows[0]);

  }catch(err) {
    console.error(err);
    res.status(500).json({ message: "Failed to adjust task" });
  }
}

export const updateTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { title, description, due_date, completed } = req.body;
    const user_id = req.session.user.id;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, due_date = $3, completed = $4
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [title, description, due_date || null, completed, task_id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
}