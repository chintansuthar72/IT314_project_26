import React, { useState } from 'react'
import SignIn from './signin'
import SignUp from './signup'
import CourseCreation from './CourseCreation';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './Student_DashBoard_components/Dashboard';
// import Chat from './Forum';
import DashboardStudentRegister from './student_registration_component/Register';
import ManageInstructor from './Course_manage_instructor_components/Manage';
import ManageStudent from './Course_manage_student_components/Manage';
import Profile from './Profile';
import Progress from './Progress';


export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<CourseCreation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<DashboardStudentRegister />} />
          {localStorage.getItem('role') === 'INSTRUCTOR' ? <Route path="/manage" element={<ManageInstructor />} /> : <Route path="/manage" element={<ManageStudent />} />}
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
          {/* <Route path="/forum" element={<Chat />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}