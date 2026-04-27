import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import GeneralButton from "../general/GeneralButton.jsx";
import API_BASE from "../../constants.js";

const CreatePage = () => {
  const navigate = useNavigate();
  const today = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

  const [task, setTask] = React.useState({
    title: "",
    description: "",
    created_at: today,
    due_date: "",
  });

  const [errors, setErrors] = React.useState({
    title: false,
  });

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: false,
    }));
  };

  const createTask = async () => {
    const newErrors = {
      title: !task.title,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    Swal.fire({
      title: "Creating task...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(`${API_BASE}/tasks/createTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(task),
      });

      const data = await res.json();

      Swal.close();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create task");
      }

      Swal.fire({
        icon: "success",
        title: "Task Created",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/");

    } catch (err) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 p-6">

      {/* Top Navigation */}
      <div className="mb-6 flex mr-auto" onClick={() => navigate(-1)}>
        <GeneralButton
          color={"red"}
          text={
            <span className="flex items-center gap-2">
              <FaArrowLeft />
              Back
            </span>
          }
        />
      </div>

      {/* Form Container */}
      <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Create Planner Task
        </h1>

        {/* Title */}
        <div className="mb-4">
          <p className="font-primary text-lg font-bold">
            Title
          </p>

          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Task title..."
            className="w-full border border-black p-2 outline-none"
          />

          {errors.title && (
            <p className="text-xs text-red-500">
              * Title is required
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="font-primary text-lg font-bold">
            Description
          </p>

          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Task details..."
            rows={4}
            className="w-full border border-black p-2 outline-none resize-none"
          />
        </div>

        {/* Due Date */}
        <div className="mb-6">
          <p className="font-primary text-lg font-bold">
            Due Date
          </p>

          <input
            type="date"
            name="due_date"
            value={task.due_date}
            min={today}
            onChange={handleChange}
            className="w-full border border-black p-2 outline-none"
          />
        </div>

        {/* Create Button */}
        <div onClick={createTask}>
          <GeneralButton text="Create Task" color="blue" />
        </div>

      </div>
    </div>
  );
};

export default CreatePage;