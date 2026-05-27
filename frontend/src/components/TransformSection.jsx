import { Layers, MoonStar, Star } from 'lucide-react'
import React from 'react'

const TransformSection = () => {
    const cards = [
        {
            id: 1,
            icon: MoonStar,
            label: 'Earn certificates and degrees',
            description: 'Break into a new field like format technology or data science get started.'
        },
        {
            id: 2,
            icon: Layers,
            label: 'Learn anything together',
            description: 'Break into a new field like format technology or data science get started.'
        },
        {
            id: 3,
            icon: Star,
            label: 'Learn with experts',
            description: 'Break into a new field like format technology or data science get started.'
        },
    ]
    return (
        <section className='w-full bg-white py-12'>
            <div className='max-w-7xl mx-auto'>
                <div className="text-center space-y-2 mb-12 relative">
                    <span className="text-pink-500 text-sm font-bold tracking-wider uppercase block">
                        Transform Your Life
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#2D2A6E] inline-block relative px-4">
                        Improving lives through learning
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {cards.map((item) => {
                        const IconComponent = item.icon;

                        return (
                            <div key={item.id} className='bg-white flex flex-col space-y-1'>
                                <div className='w-16 h-16 flex items-center text-pink-600'>
                                    <IconComponent size={26} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-[#2D2A6E]">
                                        {item.label}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-md font-normal">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default TransformSection