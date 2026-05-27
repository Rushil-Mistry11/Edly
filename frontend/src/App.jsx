import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer';
import CourseDetails from './pages/CourseDetails';
import ScrollToTop from './components/ScrollToTop';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const location = useLocation();

  return (
    <div className='relative'>
      <ScrollToTop />
      <ToastContainer />
      {location.pathname !== '/login' && <Navbar token={token} setToken={setToken} />}

      <Routes>
        <Route path='/' element={<Home />} />
         <Route path='/login' element={<Login setToken={setToken} backendUrl={backendUrl} />} />
         <Route path="/courses" element={<Courses />} />
         <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-courses" element={<MyCourses />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;