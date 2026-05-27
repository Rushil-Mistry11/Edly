import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setToken, backendUrl }) => {
    const [state, setState] = useState('Login');
    const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const endpoint = state === 'Login' ? '/api/auth/login' : '/api/auth/register';
            const response = await axios.post(`${backendUrl}${endpoint}`, formData);

            if (response.data.success || response.data.token) {

                if (state === 'Login') {
                    localStorage.setItem('token', response.data.token);
                    setToken(response.data.token);
                    toast.success("Login Successful");
                    navigate('/');
                } else {
                    toast.success(response.data.message || "Registration Successful!");
                    setFormData({ fullname: '', email: '', password: '' })
                    setState('Login');
                }

            } else {
                toast.error(response.data.message || response.data.error || "Action failed.");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.error || "An error occurred. Please try again.";
            toast.error(errorMsg);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4 mt-16">
            <form onSubmit={onSubmitHandler} className="bg-white p-10 rounded-lg shadow-xl border w-full max-w-md">
                <h2 className="text-2xl font-bold  text-gray-800 mb-6">
                    {state === 'Login' ? 'Log in to Edly' : 'Create Account'}
                </h2>

                <div className="space-y-4">
                    {state === 'Register' && (
                        <div>
                            <input onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} value={formData.fullname} placeholder='Full Name' className="w-full p-3 border rounded focus:border-3 focus:border-pink-600 outline-none" type="text" required />
                        </div>
                    )}
                    <div>
                        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} placeholder='Email' className="w-full p-3 border rounded focus:border-3 focus:border-pink-600 outline-none" type="email" required />
                    </div>
                    <div>
                        <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} placeholder='Password' className="w-full p-3 border rounded focus:border-3 focus:border-pink-600 outline-none" type="password" required />
                    </div>
                </div>

                <button type="submit" className="w-32 bg-pink-500 text-white py-4 rounded-lg font-bold uppercase tracking-widest mt-8 hover:bg-pink-600 transition-all">
                    {state === 'Login' ? 'Login' : 'Sign Up'}
                </button>

                <p className="mt-6 text-sm text-center text-gray-600">
                    {state === 'Login' ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setState(state === 'Login' ? 'Register' : 'Login')} className="text-pink-600 font-bold cursor-pointer hover:underline">
                        {state === 'Login' ? 'Register here' : 'Login here'}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;