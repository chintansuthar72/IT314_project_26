import React, { useState } from 'react'
import './App.css'
import { Login } from './Login'
import { Register } from './Register'
import Toggle from './misc/toggle'

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div className='App'>
      {/* <div className='container'>
        <Toggle />
      </div> */}
      {currentForm === 'login' ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  )
}

export default App
