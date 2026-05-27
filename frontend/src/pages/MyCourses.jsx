import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios'; 
import { BookOpen, User, ArrowRight, Layers, GraduationCap, LogOut } from 'lucide-react';
import { backendUrl } from '../App';

const MyCourses = () => {
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false); 

    const fetchMyCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication required. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            const response = await axios.get(`${backendUrl}/api/course/my-courses`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data && response.data.success) {
                setEnrolledCourses(response.data.courses || []);
            } else {
                setEnrolledCourses([]);
            }
        } catch (err) {
            console.error("Fetch enrolled courses error:", err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                setError("Session expired. Please sign in again.");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(err.response?.data?.error || "Could not retrieve your dashboard profile.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyCourses();
    }, [navigate]);

    const handleUnenroll = async (courseId, courseTitle) => {
        const confirmLeave = window.confirm(`Are you sure you want to unenroll from "${courseTitle}"? All your course history will be removed.`);
        if (!confirmLeave) return;

        try {
            setActionLoading(true);
            const token = localStorage.getItem('token');
            
            const response = await axios.post(`${backendUrl}/api/course/unenroll`, 
                { courseId }, 
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.data.success) {
                setEnrolledCourses(prev => prev.filter(course => course.course_id !== courseId));
            }
        } catch (err) {
            console.error("Unenroll action exception:", err);
            alert(err.response?.data?.message || "Failed to process cancellation request.");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white font-sans pb-24 relative">
            {actionLoading && (
                <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center backdrop-blur-2xs">
                    <div className="bg-white px-5 py-3 rounded-lg shadow-md font-semibold text-xs text-slate-700 animate-pulse">
                        Updating Enrollments...
                    </div>
                </div>
            )}

            <section className="w-full bg-[#ffdce2] pt-20 pb-16 px-4 relative overflow-hidden border-b border-pink-100/30">
                <div className="max-w-7xl mx-auto text-center space-y-3 relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2D2A6E] tracking-tight relative inline-block">
                        My Enrolled Courses
                        <span className="absolute -bottom-1.5 left-1/4 right-1/4 h-0.75 bg-pink-500 rounded-full"></span>
                    </h1>
                    
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 pt-2">
                        <RouterLink to="/" className="hover:text-pink-500 transition-colors">Dashboard</RouterLink>
                        <span>•</span>
                        <span className="text-slate-800 font-semibold">Enrolled Courses</span>
                    </div>
                </div>
            </section>

            {error && (
                <div className="max-w-md mx-auto mt-20 p-4 bg-red-50 text-red-600 text-center rounded border border-red-100 text-sm font-medium">
                    {error}
                </div>
            )}
      
            {!error && (
                <main className="max-w-7xl mx-auto px-4 mt-16">
                    {enrolledCourses.length === 0 ? (
                        <div className="max-w-xl mx-auto text-center py-16 px-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl space-y-5">
                            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                <GraduationCap size={32} />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-xl font-bold text-[#2D2A6E]">No active course registrations</h3>
                                <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                                    You haven't signed up for any skills tracks or educational material yet. Explore our open library!
                                </p>
                            </div>
                            <RouterLink 
                                to="/courses" 
                                className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm px-6 py-2.5 rounded shadow-sm transition-colors duration-200"
                            >
                                Browse All Courses
                                <ArrowRight size={16} />
                            </RouterLink>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {enrolledCourses.map((course) => (
                                <div 
                                    key={course.course_id} 
                                    className="bg-white rounded border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-left"
                                >
                                    <div>
                                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                            <img
                                                src={course.thumbnail_url}
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#10B981] text-white text-[11px] font-bold rounded-sm tracking-wide shadow-sm uppercase">
                                                Enrolled
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                                                <div className="w-5 h-5 rounded-full bg-[#E6F7F0] text-[#10B981] flex items-center justify-center">
                                                    <User size={12} strokeWidth={2.5} />
                                                </div>
                                                <span className="truncate">{course.instructor_name}</span>
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-800 tracking-tight leading-snug line-clamp-2 min-h-12 group-hover:text-pink-500 transition-colors duration-200">
                                                {course.title}
                                            </h3>

                                            <p className="text-slate-400 text-xs font-normal leading-relaxed line-clamp-2">
                                                {course.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0 mt-auto space-y-4">
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                                            <div className="flex items-center gap-1">
                                                <BookOpen size={14} className="text-pink-500" />
                                                <span>{course.duration || 'Flexible Time'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Layers size={14} className="text-[#10B981]" />
                                                <span>{course.course_level || 'All Levels'}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 w-full">
                                            <RouterLink
                                                to={`/course/${course.course_id}`}
                                                className="flex-1 flex items-center justify-center gap-1.5 bg-[#3F3A60] hover:bg-pink-600 text-white font-bold py-2.5 px-3 rounded text-xs tracking-wide transition-all duration-200 shadow-sm"
                                            >
                                                Classroom
                                                <ArrowRight size={13} />
                                            </RouterLink>
                                            
                                            <button
                                                type="button"
                                                disabled={actionLoading}
                                                onClick={() => handleUnenroll(course.course_id, course.title)}
                                                className="px-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded transition-colors duration-150 flex items-center justify-center"
                                                title="Unenroll from this course"
                                            >
                                                <LogOut size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            )}
        </div>
    );
};

export default MyCourses;