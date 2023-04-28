import React, { useEffect, useState } from 'react'
import SignIn from './signin'
import SignUp from './signup'
import CourseCreation from './CourseCreation';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from './Student_DashBoard_components/Dashboard';
// import Chat from './Forum';
import DashboardStudentRegister from './student_registration_component/Register';
import ManageInstructor from './Course_manage_instructor_components/Manage';
import Profile from './Profile';
import Progress from './Progress';
import JoinCourse from './student_registration_component/Register';
import EditAssignment from './instructor/edit_assignment';
import ForgotPassword from './forgot_password';

const set = (keyName, keyValue, ttl) => {
  const data = {
      value: keyValue,                  // store the value within this object
      ttl: Date.now() + (ttl * 1000),   // store the TTL (time to live)
  }
  localStorage.setItem(keyName, JSON.stringify(data));
};
const get = (keyName) => {
  const data = localStorage.getItem(keyName);
  if (!data) {     // if no value exists associated with the key, return null
      return null;
  }
  const item = JSON.parse(data);
  if (Date.now() > item.ttl) {
      localStorage.removeItem(keyName);
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      return null;
  }
  return item.value;
};

export default function App() {
  // const {state} = useLocation();
  // const [isLoggedIn, setIsLoggedIn] = React.useState(get('token') !== null);
  // React.useEffect(() => {
  //   if(get('token') === null ){
  //     navigate('/');
  //   }
  //   if( state === null) {
  //     localStorage.removeItem('token');
  //     navigate('/');
  //   }
  // },[isLoggedIn]);

  // useEffect(()=>{
  //   if(get('token') === null){
  //     window.location.href = "/dashboard";
  //   }
  // },[])

  return (
    <div className='App'>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<CourseCreation />} />
          <Route path="/join" element={<JoinCourse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<DashboardStudentRegister />} />
          <Route path="/manage" element={<ManageInstructor />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}