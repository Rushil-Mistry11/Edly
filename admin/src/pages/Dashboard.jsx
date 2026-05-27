import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BookOpen, Users, DollarSign, Layers, ArrowRight, LayoutDashboard } from 'lucide-react';
import { backendUrl } from '../App';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalCategories: 0,
        totalEnrollments: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const headers = { Authorization: `Bearer ${token}` };

            const [coursesRes, categoriesRes, enrollmentsRes] = await Promise.all([
                axios.get(`${backendUrl}/api/course/list`, { headers }),
                axios.get(`${backendUrl}/api/category`, { headers }),
                axios.get(`${backendUrl}/api/course/admin/enrollments`, { headers })
            ]);

            const courses = coursesRes.data ? coursesRes.data : [];
            const categories = categoriesRes.data.success ? categoriesRes.data.categories : [];
            const enrollments = enrollmentsRes.data.success ? enrollmentsRes.data.enrollments : [];

            // Calculate total revenue from enrollments
            const revenue = enrollments.reduce((sum, item) => sum + parseFloat(item.course_price || 0), 0);

            setStats({
                totalCourses: courses.length,
                totalCategories: categories.length,
                totalEnrollments: enrollments.length,
                totalRevenue: revenue,
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error(error.response?.data?.message || 'Failed to load dashboard statistics.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const quickActions = [
        { title: 'Manage Courses', path: '/course', icon: <BookOpen size={20} />, color: 'bg-blue-50 text-blue-600' },
        { title: 'Manage Categories', path: '/category', icon: <Layers size={20} />, color: 'bg-purple-50 text-purple-600' },
        { title: 'Student Enrollments', path: '/enrollments', icon: <Users size={20} />, color: 'bg-green-50 text-green-600' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
   
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white p-6 rounded-xl shadow-xs border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Admin Overview</h1>
                        <p className="text-xs text-gray-400 mt-1">Real-time statistics and platform performance metrics.</p>
                    </div>
                </div>
                <button
                    onClick={fetchDashboardData}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5"
                >
                    Refresh Data
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-32">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                <BookOpen size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Courses</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-0.5">{stats.totalCourses}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                                <Layers size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Categories</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-0.5">{stats.totalCategories}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-lg text-green-600">
                                <Users size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Enrollments</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-0.5">{stats.totalEnrollments}</h3>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs flex items-center gap-4">
                            <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
                                <DollarSign size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Revenue</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-0.5">${stats.totalRevenue.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>

    
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {quickActions.map((action, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(action.path)}
                                    className="bg-white p-6 rounded-xl border border-gray-100 shadow-2xs hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${action.color}`}>
                                                {action.icon}
                                            </div>
                                            <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                                               {action.title}
                                            </span>
                                        </div>
                                        <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
