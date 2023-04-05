import React, { useState } from 'react'
// import './App.css'
import SignIn from './signin'
import SignUp from './signup'
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

