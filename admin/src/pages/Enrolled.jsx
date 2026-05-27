import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GraduationCap, Calendar, DollarSign, Search, Users, BookOpen } from 'lucide-react';
import { backendUrl } from '../App';

const Enrolled = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(backendUrl + '/api/course/admin/enrollments', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setEnrollments(response.data.enrollments || []);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to pull administrative enrollment records.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);


    const filteredEnrollments = enrollments.filter(item =>
        item.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.student_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course_title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // total revenue using reduce 
    const totalRevenue = enrollments.reduce((sum, item) => sum + parseFloat(item.course_price || 0), 0);

    return (
        <div className="p-6 max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white p-6 rounded-xl shadow-xs border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Student Enrollments</h1>
                    <p className="text-xs text-gray-400 mt-1">Monitor platform registrations, users, and general engagement activities.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search student, email, course..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <Users size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Enrollments</p>
                        <h3 className="text-xl font-bold text-gray-800 mt-0.5">{enrollments.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg text-green-600">
                        <DollarSign size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Revenue</p>
                        <h3 className="text-xl font-bold text-gray-800 mt-0.5">${totalRevenue.toFixed(2)}</h3>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                        <BookOpen size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Filtered Results</p>
                        <h3 className="text-xl font-bold text-gray-800 mt-0.5">{filteredEnrollments.length}</h3>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-32">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
                </div>
            ) : filteredEnrollments.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-xs">
                    <GraduationCap size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">No records found</p>
                    <p className="text-xs text-gray-400 mt-1">There are no user registration tracks available matching your filters.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-700 text-xs uppercase font-bold border-b border-gray-200">
                                    <th className="p-4">Student Details</th>
                                    <th className="p-4">Course Info</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Enrollment Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                {filteredEnrollments.map((item) => (
                                    <tr key={item.enrollment_id} className="hover:bg-gray-50/70 transition-colors">
                                        <td className="p-4">
                                            <p className="font-semibold text-gray-900">{item.student_name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{item.student_email}</p>
                                        </td>
                                        <td className="p-4 max-w-xs">
                                            <p className="font-medium text-gray-800 truncate">{item.course_title}</p>
                                            <p className="text-2xs text-gray-400 mt-0.5">By {item.instructor_name}</p>
                                        </td>
                                        <td className="p-4">
                                            {parseFloat(item.course_price) === 0 ? (
                                                <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-0.5 rounded-sm">Free</span>
                                            ) : (
                                                <span className="font-semibold text-gray-900">${parseFloat(item.course_price).toFixed(2)}</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(item.enrolled_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enrolled;