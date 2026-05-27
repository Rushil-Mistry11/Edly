import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/edly-logo.svg';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ token, setToken }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setShowDropdown(false);
        setIsOpen(false);
        navigate('/');
    };

    const handleMenuRedirect = (path) => {
        setShowDropdown(false);
        setIsOpen(false);
        navigate(path);
    };

    const profileTriggerClass = "w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-pink-500 hover:bg-slate-50 border border-slate-200 cursor-pointer transition-all text-2xl";

    return (
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
            <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8"> 
                <div className="flex items-center justify-between h-20">

                    <div className="flex items-center gap-8 flex-1">
                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <img src={logo} alt="Edly Logo" className="h-10 cursor-pointer" />
                        </Link>

                        <div className="hidden lg:block relative w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Search for anything"
                                className="w-full bg-slate-50 text-slate-600 pl-4 pr-10 py-3 rounded-md border border-transparent focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-200 text-sm placeholder:text-slate-400"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 cursor-pointer hover:text-emerald-500 transition-colors" />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium text-slate-600">
                        <Link to="/" className="hover:text-pink-500 transition-colors py-2">Home</Link>
                        <Link to="/courses" className="flex items-center gap-1 hover:text-pink-500 transition-colors py-2">
                            Courses <ChevronDown className="w-4 h-4 opacity-70" />
                        </Link>
                        <a href="#" className="flex items-center gap-1 hover:text-pink-500 transition-colors py-2">
                            Pages <ChevronDown className="w-4 h-4 opacity-70" />
                        </a>
                        <a href="#" className="flex items-center gap-1 hover:text-pink-500 transition-colors py-2">
                            Blog <ChevronDown className="w-4 h-4 opacity-70" />
                        </a>
                        <a href="#" className="hover:text-pink-500 transition-colors py-2">Contact Us</a>
                        <a href="#" className="flex items-center gap-1 hover:text-pink-500 transition-colors py-2 text-slate-500">
                            English (en) <ChevronDown className="w-4 h-4 opacity-70" />
                        </a>
                    </div>

                    <div className="hidden md:flex items-center gap-4 ml-6 lg:ml-8">
                        {!token && (
                            <button 
                                onClick={() => navigate('/login')} 
                                className="bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-sm tracking-wide"
                            >
                                Get Started
                            </button>
                        )}
                        
                        <div className="relative">
                            <div 
                                className={profileTriggerClass}
                                onClick={() => token ? setShowDropdown(!showDropdown) : navigate('/login')}
                            >
                                <FaUserCircle />
                            </div>

                            {token && showDropdown && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-xl py-2 z-50 text-black border border-gray-100">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Account</p>
                                    </div>
                                    
                                    <div 
                                        onClick={() => handleMenuRedirect('/my-courses')} 
                                        className="cursor-pointer hover:bg-red-50 text-slate-700 font-medium px-4 py-2.5 text-sm transition-colors flex items-center justify-between"
                                    >
                                        <span>My Courses</span>
                                    </div>
                                    
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between border-t border-slate-50"
                                    >
                                        Logout
                                        <FaSignOutAlt size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-3">
                        <button className="p-2 text-slate-600 hover:text-pink-500">
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-600 hover:text-pink-500 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Responsive */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-inner">
                    <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-pink-500">Home</Link>
                    <Link to="/courses" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-pink-500">Courses</Link>
                    
                    {token && (
                        <Link to="/my-courses" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-pink-500">
                            My Courses
                        </Link>
                    )}
                    
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-pink-500">Pages</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-pink-500">Blog</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-pink-500">Contact Us</a>
                    
                    <div className="border-t border-slate-100 my-2 pt-2">
                        <a href="#" className="block px-3 py-2 text-base font-medium text-slate-500">Language: English (en)</a>
                    </div>
                    
                    <div className="pt-2 flex flex-col gap-3 px-3">
                        {!token ? (
                            <button 
                                onClick={() => { navigate('/login'); setIsOpen(false); }} 
                                className="w-full bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold py-3 rounded-md text-center"
                            >
                                Get Started
                            </button>
                        ) : (
                            <div className="border-t border-gray-100 pt-3">
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-50 text-red-600 font-semibold py-3 rounded-md flex items-center justify-center gap-2 border border-red-100"
                                >
                                    <FaSignOutAlt /> Logout Account
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;