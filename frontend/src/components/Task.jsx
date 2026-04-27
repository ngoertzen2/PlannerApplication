import React, { useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useDraggable } from "@dnd-kit/core";

const TaskItem = ({ task, toggleDone, onEdit, deleteTask }) => {

  const { title, description, due_date, completed } = task;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });
  
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1)`
      : undefined,
    transition: "transform 1ms linear",
    zIndex: isDragging ? 50 : 1,
    position: "relative",
  };

  return (
    <div 
      data-task-id={task.id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="task-item relative mb-5 p-4 bg-gray-100 rounded shadow flex justify-between items-start gap-4 hover:bg-gray-200 transition cursor-grab"
    >

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

      <div className="flex flex-col gap-3 justify-between items-center h-full">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={completed}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={() => toggleDone(task.id)}
          className="w-5 h-5 hover:cursor-pointer"
        />

        {/* Edit button */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onEdit(task)}
          className="text-gray-400 hover:text-blue-500 transition cursor-pointer"
        >
          <FaPencilAlt />
        </button>

        {/* Trash button */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => deleteTask(task.id)}
          className="text-gray-400 hover:text-red-500 transition cursor-pointer"
        >
          <FaTrash />
        </button>
      </div>

    </div>
  );
};

export default TaskItem;