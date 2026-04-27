import React, { useEffect, useContext } from "react";
// Prop Types
import PropTypes from "prop-types";
// User Data Context
import UserDataContext from "../../../context/UserDataContext";
// Navigation Bar
import Navbar from "./Navbar";

/**
 * @prop        children, anything goes between the starting and the closing brackets of the component
 * @summary     Layout of the app
 * @exports     Layout
 */

const Layout = ({ children }) => {
  // Context State
  const { userData } = useContext(UserDataContext);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 min-h-0 flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
