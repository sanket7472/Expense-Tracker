import React, { useState } from 'react'
import './Login.css'
import axios from "axios"
import toast, { LoaderIcon } from "react-hot-toast"
import { Toaster } from 'react-hot-toast'
import { Link } from "react-router-dom"


function Login() {

  const [email , setEmail ] = useState('')
  const [password , setPassword ] = useState('')
  const [user, setUser] = useState({
    email:'',
    password: ''
  })

  const loginNow = async () => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,{
      email :email,
      password:password
    })

    if(response.data.success){   
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

      toast.loading(`Redirecting to Dashboard....`)
      setTimeout(() =>{
           window.location.href = '/'
      }, 3000)
     }
    else{
      toast.error(response.data.message)
      setUser({
          email: '',
          password: '',  
      })
    }

    console.log(response.data)
  }

  return (
    <div >
        <h1 className='title'> User Login</h1>

        <form className='FormContainer'>

        <input
          type='email'
          placeholder='Email'
          className='userInput'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          className='userInput'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
        type='button' 
        onClick={loginNow}
        className='btnAuth'
        >
          Login 
          </button>
          
      </form>
      <Link to='/signup' className='switchAccount'> Don't have an account ? Register</Link>

      <Toaster/>
    </div>
  )
}
export default Login
