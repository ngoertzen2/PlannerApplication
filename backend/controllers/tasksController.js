import pool from "../db/db.js";

export const create = async (req, res) => {
    const { title, description, due_date } = req.body;
    const user_id = req.user.id;
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description, due_date, user_id)" +
            "VALUES ($1, $2, $3, $4)",
            [title, description, due_date, user_id]
        );

        res.json({
            success: true,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create task" });
    }
}

export const remove = async (req, res) => {
    
}

export const mark_done = async (req, res) => {
    
}