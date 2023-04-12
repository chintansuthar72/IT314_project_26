import React, { useState } from 'react'
// import './App.css'
import SignIn from './signin'
import SignUp from './signup'
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {

  return (
    <div className='App'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

