import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/edly-logo.svg'

const Navbar = ({ setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken('');
        navigate('/login');
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">

            <div className="flex flex-col">
                <img  onClick={() => navigate('/')} src={logo} alt="" />
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-500">Server Online</span>
                </div>

                <div className="hidden md:block w-px h-6 bg-gray-200"></div>

                <button
                    onClick={handleLogout}
                    className="cursor-pointer group flex items-center gap-2 bg-gray-900 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 shadow-md hover:shadow-red-200"
                >
                    Logout
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
