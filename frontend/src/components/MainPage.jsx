import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import GeneralButton from "../components/general/GeneralButton";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 p-6">

      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div onClick={() => navigate(-1)}>
            <GeneralButton
              text={
                <span className="flex items-center gap-2">
                  <FaArrowLeft />
                  Back
                </span>
              }
            />
        </div>

        <h1 className="text-3xl font-bold text-gray-700">Planner Dashboard</h1>

        <div
          onClick={() => navigate("/create")}
        >
          <GeneralButton
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
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Upcoming
          </h2>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Completed
          </h2>
            
        </div>

      </div>
    </div>
  );
};

export default MainPage;