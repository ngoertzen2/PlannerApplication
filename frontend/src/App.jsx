import React, { useMemo, useState } from "react";
import LoginPage from "./components/pages/LoginPage.jsx"
import MainPage from "./components/pages/MainPage.jsx"
import Layout from "./components/layout/Layout.jsx";
import CreatePage from "./components/pages/CreatePage.jsx"
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

    <div className="h-screen flex flex-col">            
      <UserDataContext.Provider value={contextValue}>
        <Layout>
          <Routes>

            <Route path="/" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>} />

            <Route path="/create" element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>} />

          <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </UserDataContext.Provider>
    </div>

  )
}

export default App