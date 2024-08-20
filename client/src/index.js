import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider , createBrowserRouter } from "react-router-dom"

import './global.css'
import Home from "./views/Home/Home"
import SignUp from "./views/SignUp/SignUp"
import Login from "./views/Login/Login"
import AddTransaction from './views/AddTransaction/AddTransaction';

const root = ReactDOM.createRoot(document.getElementById('root'));


  const router =  createBrowserRouter([
  {
    path :'/',
    element : <Home/>
  },
  {
    path :'/signup',
    element : <SignUp/>
  },
  {
    path :'/login',
    element : <Login/>
  },
  {
    path :'/add-transaction',
    element : <AddTransaction/>
  },
  {
    path :'*',
    element : <h1>Not Found</h1>
  }
])

root.render(<RouterProvider router={router}/>)