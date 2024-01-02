import './App.css'
import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import RegisterForm from "./components/RegisterForm"
import Login from "./components/Login"
import Reset from "./components/Reset"
import Recover from './components/RecoverPassword/Recover';
import PageNotFound from "./components/PageNotFound"
import Dashboard from './pages/dashboard';
// root routes

const router = createBrowserRouter([
  {
    path : '/',
    element : <Login></Login>
  },
  {
    path : '/register',
    element  : <RegisterForm></RegisterForm>
  },
  {
    path : '/login',
    element  : <Login></Login>
  },
  {
    path : '/dashboard',
    element  : <Dashboard></Dashboard>
  },
  {
    path : '/recover',
    element  : <Recover></Recover>
  },
  {
    path : '/recover/reset',
    element  : <Reset></Reset>
  },
  {
    path : '*',
    element  : <PageNotFound></PageNotFound>
  }

])


export default function App() {
  return (

    <main>
      <RouterProvider router={router}>
    

      </RouterProvider>
    </main>   

  )
}