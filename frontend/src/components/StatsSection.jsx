import React from 'react';
import { UserCheck, CheckSquare, BarChart2, Users } from 'lucide-react';
import rightSideImage from '../assets/success.png';

const StatsSection = () => {
    const statsData = [
        {
            id: 1,
            count: '56,892',
            label: 'Student enrolled',
            icon: UserCheck,
            iconBg: 'bg-gradient-to-b from-orange-400 to-rose-500',
        },
        {
            id: 2,
            count: '24,053',
            label: 'Classes completed',
            icon: CheckSquare,
            iconBg: 'bg-[#7B9BB0]',
        },
        {
            id: 3,
            count: '92%',
            label: 'Learners report',
            icon: BarChart2,
            iconBg: 'bg-gradient-to-b from-sky-400 to-blue-500',
        },
        {
            id: 4,
            count: '3,098',
            label: 'Top instructors',
            icon: Users,
            iconBg: 'bg-gradient-to-b from-purple-400 to-indigo-500',
        }
    ];

    return (
        <section className="w-full bg-[#F6F6F6] py-20 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                <div className="text-center space-y-2 mb-16 relative">
                    <span className="text-pink-500 text-sm font-bold tracking-wider uppercase block">
                        Start To Success
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D2A6E] inline-block relative px-4">
                        Start your journey & Achieve your goal
                        <span className="absolute -bottom-2.5 right-4 w-28 h- bg-linear-to-r from-red-400 to-pink-500 rounded-full opacity-80 hidden sm:block"></span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {statsData.map((item) => {
                            const IconComponent = item.icon;

                            return (
                                <div key={item.id} className="bg-white p-6 rounded-md  border border-slate-100 flex items-center gap-5  group">
                                    <div className={`w-16 h-16 rounded-xl text-white flex items-center justify-center shrink-0  ${item.iconBg}`}>
                                        <IconComponent size={26} strokeWidth={2} />
                                    </div>

                                    <div className="space-y-0.5">
                                        <h3 className="text-2xl font-bold text-[#2D2A6E] tracking-tight transition-colors duration-200">
                                            {item.count}
                                        </h3>
                                        <p className="text-slate-400 text-md font-normal">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-6 flex justify-center lg:justify-end relative w-full mt-8 lg:mt-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-pink-200/30 rounded-full blur-3xl -z-10"></div>

                        <img
                            src={rightSideImage}
                            className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-contain drop-shadow-sm transform hover:scale-[1.01] transition-transform duration-500"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}

export default StatsSection;