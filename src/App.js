import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobCard from "./components/JobCard";
import JobSearch from "./pages/JobSearch";
import Navbar from "./components/Navbar";
import JobDescription from "./pages/JobDescription";

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/*" element={<Navbar/>}></Route>
          {/* <Route path="/home" element={<JobSearch/>}></Route>
          <Route path="/job/:id" element={<JobDescription/>}></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
