import React from "react";
import { useNavigate} from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import GeneralButton from "../components/general/GeneralButton";
import API_BASE from "../constants.js";

const TaskItem = ({ task, toggleDone, deleteTask }) => {
    const { title, description, due_date, completed } = task;

    return (
        <div className="task-item relative mb-5 p-4 bg-white rounded shadow flex justify-between items-start gap-4">

            <div className="flex flex-col gap-1 flex-1">
                <h3 className={`text-lg font-bold ${completed ? "line-through text-gray-400" : ""}`}>
                    {title}
                </h3>

                <p className={`text-sm ${completed ? "text-gray-400" : "text-gray-600"}`}>
                    {description}
                </p>

                <p className="text-xs text-gray-500">
                    {due_date && !completed && (() => {
                        const [year, month, day] = due_date.slice(0,10).split("-");
                        return `Due: ${month}/${day}/${year}`;
                    })()}
                </p>
            </div>

            {/* Checkbox */}
            <div>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleDone(task.id)}
                    className="w-5 h-5"
                />
            </div>

            {/* Trash button */}
            <button
                onClick={() => deleteTask(task.id)}
                className="absolute bottom-2 right-4.5 text-gray-400 hover:text-red-500 transition"
            >
                <FaTrash />
            </button>

        </div>
    );
};

export default TaskItem;