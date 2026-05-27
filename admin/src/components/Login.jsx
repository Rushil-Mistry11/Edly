import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/auth/login`, formData);
            const data = response.data;
            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                setToken(data.token);
                toast.success('Welcome back,Admin!');
                navigate('/');
            } else {
                toast.error(data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error("Login error details:", error);
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                    <div className="flex flex-col text-left gap-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div className="flex flex-col text-left gap-2">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 mt-2 text-white font-bold rounded-md transition-all ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
              
            </div>
        </div>
    );
};

export default Login;


