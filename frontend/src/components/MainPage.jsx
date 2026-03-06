import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import GeneralButton from "../components/general/GeneralButton";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-200">
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
    </div>
  );
};

export default MainPage;