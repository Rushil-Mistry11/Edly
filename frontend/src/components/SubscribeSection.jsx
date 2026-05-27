import React from 'react'
import rightImg from '../assets/subscribe.png'

const SubscribeSection = () => {
    return (
        <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                <div className="w-full bg-linear-to-r from-red-400 to-red-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-100 relative px-6 sm:px-12 lg:px-16 py-12 lg:py-0">
                    <div className="lg:col-span-7 ml-0 space-y-5 lg:pl-6 z-10">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight max-w-2xl relative">
                            Subscribe to our Newsletter
                        </h2>
                        <p className='text-lg text-white'>
                            Break into a new field like information technology or data science.
                        </p>
                        <div className='flex gap-4'>
                            <input type="email" placeholder='Enter your email address' className='bg-white w-90 p-3' />
                            <button className='bg-[#45348b] text-white py-3 px-8 cursor-pointer'>Subscribe</button>
                        </div>
                    </div>
                    <div className="lg:col-span-5 flex justify-center lg:justify-start items-center relative h-full lg:pt-8">
                        <img src={rightImg} className="w-full  max-h-100 sm:max-w-sm lg:max-w-md object-contain"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubscribeSection