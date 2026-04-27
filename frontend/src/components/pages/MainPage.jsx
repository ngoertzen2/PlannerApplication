import React from "react";
import { useNavigate} from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import GeneralButton from "../general/GeneralButton.jsx";
import TaskItem from "../Task.jsx";
import API_BASE from "../../constants.js";
import ColumnWrapper from "../ColumnWrapper.jsx";

import { DndContext, closestCenter } from "@dnd-kit/core";

const MainPage = () => {
  const navigate = useNavigate();
  
  const [tasks, setTasks] = React.useState([]);
  
  React.useEffect(() => {
    const fetchTasks = async () => {
      try {

        const res = await fetch(`${API_BASE}/tasks/fetchTasks`, {
          method: "GET",
          credentials: "include",
        });
        
        const data = await res.json();
        setTasks(data);
        
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchTasks();
  }, []);

  const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const today = formatter.format(new Date());
  const tomorrow = formatter.format(new Date(Date.now() + 86400000));
  
  const categorizedTasks = tasks.reduce(
    (acc, task) => {
      if (task.completed) acc.completed.push(task);
      else if (!task.due_date || task.due_date.slice(0,10) === today) acc.today.push(task);
      else acc.upcoming.push(task);
      return acc;
    },
    {today: [], upcoming: [], completed: []}
  );
  
  const toggleDone = async (task_id) => {
    try{
      const res = await fetch(`${API_BASE}/tasks/toggleDone/${task_id}`, {
        method: "PATCH",
        credentials: "include"
      });

      const updatedTask = await res.json();

      setTasks(prev =>
        prev.map(task =>
          task.id === task_id ? updatedTask : task
        )
      );
    }catch (error) {
      console.log(error);
    }
  }

  const deleteTask = async (task_id) => {
    try {
      await fetch(`${API_BASE}/tasks/deleteTask/${task_id}`, {
        method: "DELETE",
        credentials: "include"
      });

      setTasks(prev => prev.filter(task => task.id !== task_id));

    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/updateTask/${taskId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const updatedTask = await res.json();

      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newColumn = over.id;
    const task = tasks.find(t => t.id === taskId);
      if (!task) return;

    const currentColumn = task.completed
      ? "completed"
      : (!task.due_date || task.due_date.slice(0,10) === today)
        ? "today"
        : "upcoming";

    if (newColumn === currentColumn) return;

   

    let updates = {};

    if (newColumn === "completed") {
      updates = { completed: true };
    }

    if (newColumn === "today") {
      updates = { completed: false, due_date: today };
    }

    if (newColumn === "upcoming") {
      updates = { completed: false, due_date: tomorrow };
    }

    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );

    const fullTask = tasks.find(t => t.id === taskId);
    if (!fullTask) return;

    updateTask(taskId, {
      title: fullTask.title,
      description: fullTask.description,
      due_date: updates.due_date ?? fullTask.due_date,
      completed: updates.completed ?? fullTask.completed,
    });
  };

  return (
  <div className="min-h-screen flex flex-col bg-gray-200 p-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
      <div
        onClick={() => navigate("/create")}
      >
        <GeneralButton
        color={"blue"}
        text={
          <span className="flex items-center gap-2">
          <FaPlus />
          New Task
          </span>
        }
        />
      </div>
    </div>

    {/* Planner Sections */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* Today's Tasks */}
        <ColumnWrapper id="today" title="Today">
          {categorizedTasks.today.map((task) => (
            <TaskItem key={task.id} task={task} toggleDone={toggleDone} deleteTask={deleteTask}/>
          ))}
        </ColumnWrapper>

        {/* Upcoming */}
        <ColumnWrapper id="upcoming" title="Upcoming">
          {categorizedTasks.upcoming.map((task) => (
            <TaskItem key={task.id} task={task} toggleDone={toggleDone} deleteTask={deleteTask}/>
          ))}
        </ColumnWrapper>

        {/* Completed */}
        <ColumnWrapper id="completed" title="Completed">
          {categorizedTasks.completed.map((task) => (
            <TaskItem key={task.id} task={task} toggleDone={toggleDone} deleteTask={deleteTask}/>
          ))}
        </ColumnWrapper>
      </DndContext>
    </div>
  </div>
  );
};

export default MainPage;