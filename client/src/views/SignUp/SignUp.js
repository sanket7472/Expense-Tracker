import React, { useState } from 'react'
import './SignUp.css'
import axios from "axios"
import toast from "react-hot-toast"
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

function SignUp() {

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: ''
  })

  const signup = async () => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      dob: user.dob
    })

    if (response.data.success) {
      toast.success(response.data.message)

      setUser({
        fullName: '',
        email: '',
        password: '',
        dob: ''

      })
    }

    else {
      toast.error(response.data.message)
    }
    console.log(response)

  }

  return (
    <div>
      <h1 className='title'> User Registration</h1>

      <form className='FormContainer'>
        <input
          type='text'
          placeholder='Full Name'
          className='userInput'
          value={user.fullName}
          onChange={(e) => { setUser({ ...user, fullName: e.target.value }) }}
        />

        <input
          type='email'
          placeholder='Email'
          className='userInput'
          value={user.email}
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
        />

        <input
          type='password'
          placeholder='Password'
          className='userInput'
          value={user.password}
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
        />

        <input
          type='Date'
          placeholder='Date of Birth'
          className='userInput'
          value={user.dob}
          onChange={(e) => { setUser({ ...user, dob: e.target.value }) }}
        />

        <button
          type='button'
          className='btnAuth'
          onClick={signup}
        >
          Register
        </button>
      </form>
      <Link to='/login' className='switchAccount'>Already have an account ? Login</Link>
      <Toaster />
    </div>
  )
}

export default SignUp
