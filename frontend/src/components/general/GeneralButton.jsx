import React from "react";
// React Router Dom
import { Link } from "react-router-dom";
// Prop Types
import PropTypes from "prop-types";

/**
 * @prop        color, the color of the button
 * @prop        text, the text of the button
 * @prop        to, the URL the app goes to if the button is clicked
 * @prop        disabled, the condition where the button is disabled
 * @prop        extraClassAttributes, extra class attributes
 * @prop        openInNewTab, the condition where the URL opens in a new tab
 * @summary     General button
 * @exports     GeneralButton
 */
const GeneralButton = ({
  color = null,
  text,
  icon = null,
  to = null,
  disabled = false,
  extraClassAttributes = "",
  openInNewTab = false,
}) => {
  const colorVariants = {
    red: "border-red-900 text-red-900 hover:bg-red-900 disabled:text-red-900",
    blue: "border-blue-900 text-blue-900 hover:bg-blue-900 disabled:text-blue-900",
    black: "border-black text-black hover:bg-black",
    green:
      "border-green-900 text-green-900 hover:bg-green-900 disabled:text-green-900",
  };
  return (
    <Link to={to} target={openInNewTab ? "_blank" : "_self"}>
      <button
        type="button"
        disabled={disabled}
        className={
          color
            ? `w-full min-w-max border-2 px-1 py-2 font-primary font-bold transition-all duration-500 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent ${extraClassAttributes} ${colorVariants[color]}`
            : `w-full min-w-max border-2 border-black px-1 py-2 font-primary font-bold text-black transition-all duration-500 hover:bg-black hover:text-white disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-black ${extraClassAttributes}`
        }
      >
        {icon}
        {text}
      </button>
    </Link>
  );
};

GeneralButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  extraClassAttributes: PropTypes.string,
  openInNewTab: PropTypes.bool,
};

export default GeneralButton;