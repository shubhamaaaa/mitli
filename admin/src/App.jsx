import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import Orders from './pages/Orders';
import List from './pages/List';
import Contact from './pages/Contact';
import Subscription from './pages/Subscription';
import ReferrelCount from './pages/ReferrelCount';


export const backendUrl=import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  useEffect(()=>{
  localStorage.setItem('token',token)
  },[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token===""?
      <Login setToken={setToken}/>:
      <>
      <Navbar setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
      <Sidebar/>
      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <Routes>
          <Route path='/add' element={<Add token={token}/>}/>
          <Route path='/orders' element={<Orders token={token}/> }/>
          <Route path='/list' element={<List token={token}/>}/>
          <Route path='/contacts' element={<Contact token={token}/>}/>
          <Route path='/subscriber' element={<Subscription token={token}/>}/>
          <Route path='/refreels' element={<ReferrelCount token={token}/>}/>
          </Routes>
          </div>

      </div>
      </>
      }
     </div>
  )
}

export default App
