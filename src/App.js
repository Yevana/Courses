import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Courselist from "./components/courses/Courselist";
import Navbar from "./components/utilities/navbar";
import CourseDetails from "./components/courses/CourseDeatils";
import Dashboard from "./components/student/Dashboard";


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route exact path='/' element={<Courselist />} />
            <Route path='/:id' element={<CourseDetails />} />
            <Route exact path='/student' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
