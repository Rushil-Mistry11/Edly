import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User, Layers, ChevronDown, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const coursesResponse = await axios.get(`${backendUrl}/api/course/list`);
                const categoriesResponse = await axios.get(`${backendUrl}/api/category`);

                if (coursesResponse.data) {
                    setCourses(coursesResponse.data);
                    setFilteredCourses(coursesResponse.data);
                }
                if (categoriesResponse.data.categories) {
                    setCategories(categoriesResponse.data.categories);
                }
            } catch (error) {
                console.error("Error loading data:", error);
                toast.error("Failed to load catalog options.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let updateList = courses;

        if (selectedCategory !== 'All') {
            updateList = updateList.filter(course => 
                course.category_id === parseInt(selectedCategory)
            );
        }

        if (searchQuery.trim() !== '') {
            updateList = updateList.filter(course =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredCourses(updateList);
    }, [searchQuery, selectedCategory, courses]);

    const getSelectedCategoryName = () => {
        if (selectedCategory === 'All') return 'All Courses';
        const found = categories.find(c => c.id === parseInt(selectedCategory));
        return found ? found.name : 'All Courses';
    };

    if (loading) {
        return (
            <div className="w-full py-32 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white font-sans pb-24">

            <section className="w-full bg-[#ffdce2] pt-20 pb-16 px-4 relative overflow-hidden border-b border-pink-100/30">
  
                <div className="max-w-7xl mx-auto text-center space-y-3 relative z-10">

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2D2A6E] tracking-tight relative inline-block">
                        {getSelectedCategoryName()}
                        <span className="absolute -bottom-1.5 left-1/4 right-1/4 0.75 bg-pink-500 rounded-full"></span>
                    </h1>

                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 pt-2">
                        <Link to="/" className="hover:text-pink-500 transition-colors">Dashboard</Link>
                        <span>•</span>
                        <span onClick={() => setSelectedCategory('All')} className="cursor-pointer hover:text-pink-500 transition-colors">Courses</span>
                        {selectedCategory !== 'All' && (
                            <>
                                <span>•</span>
                                <span className="text-slate-800 font-semibold">{getSelectedCategoryName()}</span>
                            </>
                        )}
                    </div>
                </div>
            </section>


            <div className="max-w-7xl mx-auto px-4 mt-12 mb-10">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-start max-w-2xl">

                    <div className="relative w-full sm:w-56">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between px-4 py-2 bg-white border border-slate-300 rounded text-gray-700 font-normal text-sm transition-all shadow-sm hover:border-slate-400"
                        >
                            <span className="truncate">
                                {selectedCategory === 'All' ? 'All categories' : getSelectedCategoryName()}
                            </span>
                            <ChevronDown size={15} className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-1 w-full bg-white border border-slate-200 rounded shadow-lg z-50 max-h-64 overflow-y-auto py-0.5">
                                <button
                                    onClick={() => { setSelectedCategory('All'); setIsDropdownOpen(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedCategory === 'All' ? 'bg-pink-50 text-pink-600 font-semibold' : 'text-gray-700 hover:bg-slate-50'}`}
                                >
                                    All Categories
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => { setSelectedCategory(category.id.toString()); setIsDropdownOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedCategory === category.id.toString() ? 'bg-pink-50 text-pink-600 font-semibold' : 'text-gray-700 hover:bg-slate-50'}`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative w-full flex items-center shadow-sm rounded border border-slate-300 overflow-hidden bg-white focus-within:border-pink-500 transition-all">
                        <input
                            type="text"
                            placeholder="Search courses"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-12 py-2 text-sm outline-none text-gray-700 placeholder:text-slate-400"
                        />
                        <button className="absolute right-0 top-0 bottom-0 px-3.5 bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-colors">
                            <Search size={16} strokeWidth={2.5} />
                        </button>
                    </div>

                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-gray-400 text-base font-medium">No courses found matching the selected filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => {
                            const isFree = !course.price || parseFloat(course.price) === 0;

                            return (
                                <Link
                                    to={`/course/${course.id}`} 
                                    key={course.id}
                                    className="bg-white rounded shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group text-left border border-slate-100"
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
                                            <span className="text-slate-400">{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Layers size={14} className="text-[#10B981]" />
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
                )}
            </div>
        </div>
    );
};

export default Courses;