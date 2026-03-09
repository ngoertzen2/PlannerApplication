import React from "react";
import { useNavigate} from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import GeneralButton from "../components/general/GeneralButton";
import API_BASE from "../constants.js";

const TaskItem = ({ task, onToggleComplete }) => {
    const { title, description, due_date, created_at, completed } = task;

    return (
        <div className="task-item p-4 bg-white rounded shadow flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1 flex-1">
                <h3 className={`text-lg font-bold ${completed ? "line-through text-gray-400" : ""}`}>
                    {title}
                </h3>
                <p className={`text-sm ${completed ? "text-gray-400" : "text-gray-600"}`}>
                    {description}
                </p>
                <p className="text-xs text-gray-500">
                    {due_date && (() => {
                        const [year, month, day] = due_date.slice(0, 10).split("-");
                        return `Due: ${day}/${month}/${year}`;
                    })()}
                </p>
            </div>

            <div>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggleComplete(task.id)}
                    className="w-5 h-5"
                />
            </div>
        </div>
    );
};

export default TaskItem;