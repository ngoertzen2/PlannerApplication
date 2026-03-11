import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserDataContext from "../../../context/UserDataContext";
import { FaUserCircle } from "react-icons/fa";
import API_BASE from "../../constants.js";

const AccountModal = ({ openState, handleClose }) => {

  const { userData, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      setUserData(null);
      navigate("/login");
      handleClose();

    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (openState) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [openState, handleClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          openState ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${
          openState ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full justify-center items-center">
          <h2 className="text-xl text-gray-800 font-primary font-bold">Account</h2>
          
          <FaUserCircle className="text-gray-500 text-8xl mt-12" />
          <p className="mt-2 text-gray-600">
            {userData.username}
          </p>

          <button
            className="mt-4 px-4 py-0 text-red-500 hover:text-red-600"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

          <button
            className="mt-auto mr-auto px-4 py-0 text-red-500 hover:text-red-600"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountModal