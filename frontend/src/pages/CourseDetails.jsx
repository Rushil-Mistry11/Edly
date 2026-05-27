import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import { User, Users, Calendar, BarChart, Clock, Award, Languages, Unlock } from 'lucide-react';
import { backendUrl } from '../App';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollMsg, setEnrollMsg] = useState({ type: '', text: '' });
    const [isEnrolling, setIsEnrolling] = useState(false);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(backendUrl + `/api/course/get/${id}`);

                if (response.data && response.data.message !== 'Course not found') {
                    setCourse(response.data);
                } else {
                    setError('The requested course details could not be found.');
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.response?.data?.error || 'Server communication error. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    const handleEnrollment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setEnrollMsg({ type: 'error', text: 'Please sign in to enroll in courses.' });
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        try {
            setIsEnrolling(true);
            setEnrollMsg({ type: '', text: '' });

            const response = await axios.post(
                backendUrl + `/api/course/enroll`,
                { courseId: id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setEnrollMsg({ type: 'success', text: 'Enrolled successfully! Redirecting...' });
                setTimeout(() => navigate('/my-courses'), 1500);
            } else {
                setEnrollMsg({ type: 'error', text: 'Enrollment failed.' });
            }
        } catch (err) {
            console.error("Enrollment error:", err);
            const errorMsg = err.response?.data?.message || 'Failed to enroll.';
            setEnrollMsg({ type: 'error', text: errorMsg });
        } finally {
            setIsEnrolling(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md border border-slate-100">
                    <p className="text-red-500 font-medium mb-4">{error || 'Course details missing'}</p>
                    <button onClick={() => navigate('/courses')} className="bg-[#2D2A6E] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-pink-600 transition-colors">
                        Back to Catalog
                    </button>
                </div>
            </div>
        );
    }

    const formattedDate = course.created_at
        ? new Date(course.created_at).toLocaleDateString('en-GB')
        : '27/12/22';

    const isFree = !course.price || parseFloat(course.price) === 0;

    return (
        <div className="w-full min-h-screen bg-white font-sans pb-24">

            <section className="w-full bg-[#ffdce2] pt-20 pb-16 px-4 relative overflow-hidden border-b border-pink-100/30">
               
                <div className="max-w-7xl mx-auto text-center space-y-3 relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D2A6E] tracking-tight relative inline-block max-w-4xl leading-tight">
                        {course.title}
                        <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.75 bg-pink-500 rounded-full"></span>
                    </h1>

                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 pt-4">
                        <Link to="/" className="hover:text-pink-500 transition-colors">Dashboard</Link>
                        <span>•</span>
                        <Link to="/courses" className="hover:text-pink-500 transition-colors">Courses</Link>
                        <span>•</span>
                        <span className="text-slate-800 font-semibold truncate max-w-xs">{course.title}</span>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white p-6 sm:p-10 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden text-left">
                            <div className={`absolute top-6 right-6 w-16 h-16 text-white font-extrabold rounded-full flex items-center justify-center text-sm shadow-md border-4 border-white ${
                                isFree ? 'bg-pink-500' : 'bg-[#10B981]'
                            }`}>
                                {isFree ? 'Free' : `$${Math.round(course.price)}`}
                            </div>

                            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2D2A6E] leading-tight max-w-[90%] mb-4">
                                {course.title}
                            </h2>

                            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mb-6">
                                Break into a field like information technology or digital management. No prior experience necessary to register and get started.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100 text-sm font-semibold text-slate-400">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <User size={15} className="text-pink-500" />
                                    <span>{course.instructor_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={15} className="text-pink-500" />
                                    <span>{formattedDate}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-left space-y-3">
                            <h3 className="text-xl font-bold text-[#2D2A6E]">Course Description</h3>
                            <p className="text-slate-500 text-sm font-normal leading-relaxed whitespace-pre-line">
                                {course.description}
                            </p>
                        </div>
                    </div>


                    <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-4">
                        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="w-full aspect-video bg-slate-100 relative overflow-hidden">
                                <img 
                                    src={course.thumbnail_url} 
                                    alt={course.title} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>

                            <div className="p-6 text-left space-y-5">
                                <div>
                                    <div className="text-3xl font-black text-[#2D2A6E]">
                                        {isFree ? 'Free' : `$${Math.round(course.price)}`}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">
                                        Price Value
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleEnrollment}
                                    disabled={isEnrolling}
                                    className="w-full bg-[#3F3A60] hover:bg-pink-600 disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded transition-all duration-200 text-center text-sm shadow-sm tracking-wide"
                                >
                                    {isEnrolling ? 'Processing...' : 'Enroll Now'}
                                </button>

                                {enrollMsg.text && (
                                    <div className={`p-3 rounded text-xs font-semibold text-center ${
                                        enrollMsg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                    }`}>
                                        {enrollMsg.text}
                                    </div>
                                )}

                                <div className="divide-y divide-slate-100 pt-2 text-xs font-medium">
                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <BarChart size={15} className="text-pink-500" />
                                            <span>Course Level</span>
                                        </div>
                                        <span className="text-slate-700 font-semibold">{course.course_level}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Clock size={15} className="text-pink-500" />
                                            <span>Duration</span>
                                        </div>
                                        <span className="text-slate-700 font-semibold">{course.duration}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Award size={15} className="text-pink-500" />
                                            <span>Certificate</span>
                                        </div>
                                        <span className="text-slate-700 font-semibold">{course.certificate === 1 ? 'Yes' : 'No'}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Languages size={15} className="text-pink-500" />
                                            <span>Language</span>
                                        </div>
                                        <span className="text-slate-700 font-semibold">{course.language}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Unlock size={15} className="text-pink-500" />
                                            <span>Access</span>
                                        </div>
                                        <span className="text-slate-700 font-semibold">{course.access}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CourseDetails;