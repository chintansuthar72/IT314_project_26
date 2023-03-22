import React, { useState } from 'react'
import Toggle from './misc/toggle'
export const Register = (props) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
    console.log(pass)
  }

  return (
    <div className='auth-form-container'>
      {/* <Toggle /> */}
      <h2>SignUp</h2>
      <form className='register-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          value={name}
          name='name'
          onChange={(e) => setName(e.target.value)}
          id='name'
          placeholder='Enter Your Name'
        />
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
        <button type='submit'>Sign Up</button>
      </form>
      <button className='link-btn' onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here.
      </button>
    </div>
  )
}
