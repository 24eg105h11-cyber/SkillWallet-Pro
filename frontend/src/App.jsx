import { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem("userData"));

  useEffect(() => {
    const syncAuthState = () => {
      setUserLoggedIn(!!localStorage.getItem("userData"));
    };

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);
  return (
    <div className="App">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/adminhome" element={userLoggedIn ? <AdminHome /> : <Navigate to="/login" replace />} />
            <Route path="/userhome" element={userLoggedIn ? <UserHome /> : <Navigate to="/login" replace />} />
            <Route path="/userhome/userappointments/:doctorId" element={userLoggedIn ? <UserAppointments /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3">© 2023 Copyright: MediCareBook</div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
