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
      className="task-item relative mb-5 p-4 bg-[var(--surface-2)] rounded shadow flex justify-between items-start gap-4 hover:bg-[var(--bg)] transition cursor-grab"
    >

      <div className="flex flex-col gap-1 flex-1">
        <h3 className={`text-lg font-bold ${completed ? "line-through text-[var(--text-muted)]" : ""}`}>
          {title}
        </h3>

        <p className={`text-sm ${completed ? "text-[var(--text-muted)]" : "text-[var(--text-secondary)]"}`}>
          {description}
        </p>

        <p className="text-xs text-[var(--text-secondary)]">
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
          className="w-5 h-5 accent-[var(--primary)] hover:cursor-pointer"
        />

        {/* Edit button */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onEdit(task)}
          className="text-[var(--text-muted)] hover:text-[var(--primary)] transition cursor-pointer"
        >
          <FaPencilAlt />
        </button>

        {/* Trash button */}
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => deleteTask(task.id)}
          className="text-[var(--text-muted)] hover:text-[var(--danger)] transition cursor-pointer"
        >
          <FaTrash />
        </button>
      </div>

    </div>
  );
};

export default TaskItem;