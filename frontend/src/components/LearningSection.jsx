import React from 'react';
import { Check, Settings, Home } from 'lucide-react';

const LearningSection = () => {
    return (
        <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-5 space-y-6 text-left relative">

                        <span className="text-pink-500 text-sm font-bold tracking-wide uppercase block">
                            Over 5500+ courses available
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D2A6E] leading-tight relative">
                            Affordable online courses & learning opportunities
                        </h2>

                        <p className="text-slate-400 text-sm font-normal leading-relaxed">
                            Break into a new field like information technology or data science. No prior experience necessary to get started. Break a new field like information technology.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-md bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
                                    <Check size={13} strokeWidth={3} />
                                </div>
                                <span className="text-slate-600 font-semibold text-[15px]">
                                    Lifetime access with expert trainers
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-md bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
                                    <Check size={13} strokeWidth={3} />
                                </div>
                                <span className="text-slate-600 font-semibold text-[15px]">
                                    Remote learning & self development
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 relative mt-10 lg:mt-0">

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-pink-200/20 rounded-full blur-3xl -z-10"></div>

                        <div className="bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl  group min-h-70 justify-center">
                            <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 mb-5 group-hover:bg-[#39c6a3] group-hover:text-white transition-colors duration-200">
                                <Settings size={26} strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2D2A6E] mb-3">
                                Learn the essential skills
                            </h3>
                            <p className="text-slate-400 text-md font-normal leading-relaxed max-w-60">
                                Break into a new field like format technology or data science.
                            </p>
                        </div>

                        <div className="bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl  group min-h-70 justify-center translate-y-16">
                            <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 mb-5 group-hover:bg-[#39c6a3] group-hover:text-white transition-colors duration-200">
                                <Home size={26} strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2D2A6E] mb-3">
                                Learn in your own place
                            </h3>
                            <p className="text-slate-400 text-md font-normal leading-relaxed max-w-60">
                                Break into a new field like format technology or data science.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default LearningSection;