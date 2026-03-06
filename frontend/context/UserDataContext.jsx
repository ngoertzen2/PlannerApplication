import React from "react";

/**
 * @summary     User data context, used across the app
 * @exports     UserDataContext
 */

const UserDataContext = React.createContext({
  userData: null,
  setUserData: () => {},
});

export default UserDataContext;
