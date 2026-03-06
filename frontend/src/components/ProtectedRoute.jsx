import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserDataContext from "../../context/UserDataContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(UserDataContext);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;