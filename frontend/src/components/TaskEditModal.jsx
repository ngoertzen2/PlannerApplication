import React, { useState, useEffect } from "react";

const TaskEditModal = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const today = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.due_date ? task.due_date.slice(0, 10) : "");
    }
  }, [task]);

  if (!isOpen || !task) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[var(--surface-1)] rounded-lg p-6 w-96 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-3"
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-3"
          placeholder="Description"
        />

        <input
          type="date"
          value={dueDate}
          min={today}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] px-3 py-1 rounded transition hover:bg-[var(--surface-2)] hover:text-[var(--text)] active:scale-95"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSave({
                title,
                description,
                due_date: dueDate || null,
              });
              onClose();
            }}
            className="bg-[var(--primary)] text-white px-3 py-1 rounded transition hover:bg-[var(--primary-hover)] hover:shadow-md active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;