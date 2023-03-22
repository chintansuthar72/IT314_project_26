import React, { useState } from 'react'
import Toggle from './misc/toggle'

export const Login = (props) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
  }

  return (
    <div className='auth-form-container'>
      {/* <Toggle /> */}
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Enter Your Email Address'
          id='email'
          name='email'
        />
        <label htmlFor='password'>Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type='password'
          placeholder='Enter Your Password'
          id='password'
          name='password'
        />
        <button type='submit'>Log In</button>
      </form>
      <button
        className='link-btn'
        onClick={() => props.onFormSwitch('register')}
      >
        Don't have an account? SignUp here.
      </button>
    </div>
  )
}
