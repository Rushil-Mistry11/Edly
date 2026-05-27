import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Category from './pages/Category';
import Courses from './pages/Courses';
import Enrolled from './pages/Enrolled';
import Dashboard from './pages/Dashboard';

export const backendUrl = import.meta.env.VITE_BACKEND_URL


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '');

  useEffect(() => {
    localStorage.setItem('adminToken', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/category' element={<Category />} />
                <Route path='/course' element={<Courses />} />
                <Route path='/enrollments' element={<Enrolled />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default App;
