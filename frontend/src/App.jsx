import { FaRegCalendarAlt } from "react-icons/fa"
import LoginPage from "./components/LoginPage.jsx"
import MainPage from "./components/MainPage.jsx"
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      
            
      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App