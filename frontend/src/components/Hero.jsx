import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import heroImage from '../assets/main.png';

const Hero = () => {

    return (
        <div className="w-full bg-linear-to-r from-green-100 via-pink-100 to-white to overflow-hidden font-sans">
            <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-137.5">

                    <div className="lg:col-span-6 space-y-6 z-10 text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-[1.15] tracking-tight">
                            <span className="text-[#10B981]">5500+</span> Courses Upgrade your learning Skills and Upgrade Life
                            <span className="block mt-2 relative">
                       
                                <span className="absolute left-0 bottom-1 w-40 h-1.5 bg-linear-to-r from-red-400 to-pink-500 rounded-full opacity-80 hidden lg:block"></span>
                            </span>
                        </h1>

                        <p className="text-slate-500 text-base sm:text-lg font-medium max-w-xl mx-auto lg:mx-0">
                            Learn 100% online with world class universities and industry experts.
                        </p>

       
                        <form className="flex items-center w-full max-w-xl mx-auto lg:mx-0 bg-white rounded-md shadow-md overflow-hidden p-1 border border-transparent focus-within:border-emerald-500 transition-all duration-200">
                            <div className="flex items-center pl-4 pr-2 flex-1 gap-2">
                                <Search className="text-slate-400 w-5 h-5 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search our 12,500+ courses"
                                    className="w-full py-3 bg-transparent text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none"
                                />
                            </div>
                            <button
                                className="bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-md transition-all duration-200 text-sm tracking-wide shadow-sm shrink-0"
                            >
                                Search Now
                            </button>
                        </form>
                    </div>


                    <div className="lg:col-span-6 flex justify-center lg:justify-end relative w-full mt-8 lg:mt-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-200/40 rounded-full blur-3xl -z-10"></div>
                        <img
                            src={heroImage}
                            alt="Learning Illustration"
                            className="w-full max-w-md sm:max-w-lg lg:max-w-xl object-contain drop-shadow-md transform hover:scale-[1.01] transition-transform duration-300"
                        />
                    </div>
                </div>



            </div>
        </div>
    );
}

export default Hero;