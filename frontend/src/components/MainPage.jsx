import React from "react";
import { useNavigate} from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import GeneralButton from "../components/general/GeneralButton";
import TaskItem from "../components/Task";
import API_BASE from "../constants.js";

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

    const today = new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date());
    
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 p-6">

      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div onClick={() => navigate(-1)}>
            {/* <GeneralButton
              text={
                <span className="flex items-center gap-2">
                  <FaArrowLeft />
                  Back
                </span>
              }
            /> */}
        </div>

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

        {/* Today's Tasks */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Today's Tasks
          </h2>
            {categorizedTasks.today.map((task) => (
                <TaskItem key={task.id} task={task} toggleDone={toggleDone} deleteTask={deleteTask}/>
            ))}
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Upcoming
          </h2>
            {categorizedTasks.upcoming.map((task) => (
                <TaskItem key={task.id} task={task} toggleDone={toggleDone} deleteTask={deleteTask}/>
            ))}
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Completed
          </h2>
            {categorizedTasks.completed.map((task) => (
                <TaskItem key={task.id} task={task} toggleDone={toggleDone} deleteTask={deleteTask}/>
            ))}
        </div>

      </div>
    </div>
  );
};

export default MainPage;