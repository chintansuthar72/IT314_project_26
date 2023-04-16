import React, { useState } from 'react'
import SignIn from './signin'
import SignUp from './signup'
import CourseCreation from './CourseCreation';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './Student_DashBoard_components/Dashboard';
// import Chat from './Forum';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<CourseCreation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/forum" element={<Chat />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}