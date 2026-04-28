import React, { useEffect, useContext, use } from "react";
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
  const { userData } = React.useContext(UserDataContext);
  const theme = userData?.theme || "light";

  document.documentElement.setAttribute("data-theme", theme);

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
