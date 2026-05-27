import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, User, Layers } from 'lucide-react';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const PopularCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/course/list');
                if (response.data) {
                    setCourses(response.data);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                toast.error("Failed to load courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="w-full py-20 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="w-full bg-[#FFF9FA] py-16 px-4 font-sans relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                <div className="text-center space-y-2 mb-12 relative">
                    <span className="text-pink-500 text-sm font-bold tracking-wider uppercase block">
                        Popular Courses
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D2A6E] inline-block relative px-4">
                        Discover Your Perfect Program In Our Courses
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.slice(0, 3).map((course) => {
                        const isFree = !course.price || parseFloat(course.price) === 0;

                        return (
                            <Link
                                to={`/course/${course.id}`} 
                                key={course.id}
                                className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group text-left cursor-pointer"
                            >
                                <div>
                                    <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={course.thumbnail_url}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        <div className={`absolute -bottom-3 right-6 w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-base shadow-md border-4 border-white z-20 transition-transform group-hover:scale-110 ${
                                            isFree ? 'bg-pink-500' : 'bg-[#10B981]'
                                        }`}>
                                            {isFree ? 'Free' : `$${Math.round(course.price)}`}
                                        </div>
                                    </div>

                                    <div className="p-6 pt-8 space-y-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-[#E6F7F0] text-[#10B981] flex items-center justify-center">
                                                <User size={14} strokeWidth={2.5} />
                                            </div>
                                            <span className="truncate">{course.instructor_name}</span>
                                        </div>

                                        <h3 className='text-xl font-bold tracking-tight leading-snug line-clamp-2 min-h-14 transition-colors duration-200 text-gray-700 group-hover:text-pink-500'>
                                            {course.title}
                                        </h3>

                                        <p className="text-slate-400 text-sm font-normal leading-relaxed line-clamp-3">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mx-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={15} className="text-[#10B981]" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Layers size={15} className="text-[#10B981]" />
                                        <span>Difficulty: {course.course_level}</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="h-0.75 bg-pink-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out"></p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <p className="text-slate-400 text-sm font-medium max-w-2xl mx-auto leading-relaxed">
                        Enjoy top-notch learning methods and achieve next-level skills! You are the creator of your own future.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default PopularCourses;