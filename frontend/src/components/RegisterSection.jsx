import React from 'react';
import leftImg from '../assets/overview.png';

const RegisterSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="w-full bg-[#F5F7FA] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-100 relative px-6 sm:px-12 lg:px-16 py-12 lg:py-0">

          <div className="lg:col-span-5 flex justify-center lg:justify-start items-center relative h-full lg:pt-8">
            <img 
              src={leftImg} 
              alt="Become an Instructor Illustration" 
              className="w-full  max-h-100 sm:max-w-sm lg:max-w-md object-contain"
            />
          </div>

          <div className="lg:col-span-7 ml-0 md:ml-20 space-y-5 text-left lg:pl-6 z-10">

            <span className="text-pink-500 text-sm font-bold tracking-wide block">
              Join as Instructor
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D2A6E] leading-tight max-w-xl relative">
              Become an instructor Join the millions learning
            </h2>

            <div className="pt-2">
              <button 
                type="button"
                className="bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-sm tracking-wide py-4 px-8 rounded-md"
              >
                Start Teaching Today
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default RegisterSection;