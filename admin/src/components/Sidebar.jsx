import React from 'react'
import { NavLink } from 'react-router-dom'
import { ChartBarStacked, BookCheck, LibraryBig } from 'lucide-react';


const Sidebar = () => {

    const activeLinkStyles = ({ isActive }) =>
        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2.5 rounded-l transition-all duration-200 ${isActive
            ? 'bg-red-50 border-red-600 border-r-[3px] text-red-600 font-bold'
            : 'text-gray-600 hover:bg-gray-50'
        }`;

    return (
        <div className='w-[18%] min-h-screen border-r-2 bg-white'>
            <div className='flex flex-col gap-4 pt-10 pl-[15%] text-[14px] font-medium'>    

                <NavLink className={activeLinkStyles} to="/category">
                    <ChartBarStacked size={20} />
                    <p className='hidden md:block'>Categories</p>
                </NavLink>

                <NavLink className={activeLinkStyles} to="/course">
                    <LibraryBig size={18} />
                    <p className='hidden md:block'>Courses</p>
                </NavLink>

                <NavLink className={activeLinkStyles} to="/enrollments">
                    <BookCheck size={20} />
                    <p className='hidden md:block'>Enrolled Courses</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar