import React, { useState, useEffect, useContext } from "react";
import { IoMenu } from "react-icons/io5";
// React Router Dom
import { useLocation } from "react-router-dom";
import UserDataContext from "../../../context/UserDataContext";
import AccountModal from "./AccountModal.jsx";


const Navbar = () => {

  const [openState, setOpenState] = React.useState(false);
  const { userData } = useContext(UserDataContext);
  const location = useLocation();
  
  return (
    <nav className="bg-blue-900 text-white p-4 flex items-center">
      <h1 className="text-2xl font-bold">Planner Application</h1>
      {userData && (
        <div className="ml-auto gap-15 flex items-center">
          <p className="text-sm mt-1 mr-50">{userData.username}</p>
          <IoMenu 
            className=" ml-auto text-2xl ml-4 cursor-pointer transition-all duration-200 hover:text-gray-400" 
            onClick={() => {
              setOpenState(true);
            }}
          />
        </div>
        
      )}
      {userData && (
        <AccountModal 
          handleClose={() => setOpenState(false)}
          openState={openState}
        />
      )}
    </nav>
    );
};

export default Navbar;  

    