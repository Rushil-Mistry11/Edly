import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import * as Icons from 'lucide-react';
import axios from 'axios';

const DynamicIcon = ({ name, className }) => {
    const IconComponent = Icons[name];
    if (!IconComponent) return <Icons.HelpCircle className={className} />;
    return <IconComponent className={className} />;
};

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/category');
                if (Array.isArray(response.data.categories)) {
                    setCategories(response.data.categories)
                }
            } catch (error) {
                console.log("Error fetching categories:", error);
                toast.error("Failed to load courses categories.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [])

    if (loading) {
        return <div className="py-16 text-center text-[#1A2E26] font-medium">Loading Categories...</div>;
    }
    return (
        <section className="w-full bg-white py-16 px-4 font-sans relative overflow-hidden">
            <div className='max-w-7xl mx-auto'>
                <div className="text-center space-y-2 mb-12 relative">
                    <span className="text-pink-500 text-sm font-bold tracking-wider uppercase block">
                        Top Categories
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D2A6E] inline-block relative px-4">
                        Top Categories you want to learn
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {categories.map((c) => {
                        return (
                            <div key={c.id} className='bg-gray-100 h-20 rounded-md shadow-sm overflow-hidden flex flex-col justify-between group'>
                                <div className='flex flex-row gap-4 items-center justify-center mt-5'>
                                    <div className='text-[#39c6a3]'>
                                        <DynamicIcon name={c.icon_name} className="w-10 h-10" />
                                    </div>

                                    <div className='text-black text-xl'>
                                        {c.name}
                                    </div>
                                </div>
                                <div>
                                    <p className="h-0.75 bg-emerald-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out"></p>
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
            </div>
        </section>
    )
}

export default CategorySection