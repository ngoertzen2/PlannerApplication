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

  // Getting the first path of the window href

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
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
