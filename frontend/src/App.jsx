import React, { useMemo, useState } from "react";
import LoginPage from "./components/LoginPage.jsx"
import MainPage from "./components/MainPage.jsx"
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { Routes, Route } from 'react-router-dom';
import UserDataContext from "../context/UserDataContext.jsx";

const App = () => {

  const [userData, setUserData] = useState(null);

  const contextValue = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData],
  );

  return (

    <div>            
      <UserDataContext.Provider value={contextValue}>
        <Layout>
          <Routes>

            <Route path="/" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>} />

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </UserDataContext.Provider>
    </div>

  )
}

export default App