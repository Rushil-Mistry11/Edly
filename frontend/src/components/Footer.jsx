import React from 'react';
import { Apple, Play } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaVideo, FaTiktok, FaGoogle } from 'react-icons/fa';
import logo from '../assets/edly-logo.svg'

const Footer = () => {

    return (
        <footer className="w-full bg-[#F8FAFC] pt-16 pb-8 px-4 sm:px-6 lg:px-8 font-sans border-t border-slate-100">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200/60">

                    <div className="lg:col-span-4 space-y-5 text-left">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="" />
                        </div>

                        <p className="text-slate-400 text-[16px] leading-relaxed max-w-sm">
                            Break into a new field like information technology or data prior experience necessary.
                        </p>

                        <div className="space-y-2.5 pt-1 text-[16px]">
                            <p className="text-slate-500 font-normal">
                                <strong className="text-slate-800 font-bold">Location :</strong> 32D, Jenmark road, Franklin. USA
                            </p>
                            <p className="text-slate-500 font-normal">
                                <strong className="text-slate-800 font-bold">Phone :</strong> +11 0988 1234 5678
                            </p>
                            <p className="text-slate-500 font-normal">
                                <strong className="text-slate-800 font-bold">Email :</strong> <a href="mailto:contact@info.com" className="hover:text-pink-500 transition-colors">contact@info.com</a>
                            </p>
                        </div>

                        <div className="flex items-center gap-2 pt-2 flex-wrap">
                            {[{ icon: FaFacebookF, href: '#' }, { icon: FaTwitter, href: '#' }, { icon: FaInstagram, href: '#' }, { icon: FaPinterestP, href: '#' }, { icon: FaVideo, href: '#' }, { icon: FaTiktok, href: '#' }, { icon: FaGoogle, href: '#' }].map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        className="w-8 h-8 rounded bg-[#7E889B] hover:bg-pink-500 text-white flex items-center justify-center transition-all duration-200"
                                    >
                                        <Icon size={15} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-2 text-left space-y-4">
                        <h4 className="text-base font-bold text-[#2D2A6E] relative pb-2 inline-block">
                            Our Company
                            <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-pink-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-2.5 text-[16px] text-slate-400 font-medium">
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Our Company</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Community</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Student Perks</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 text-left space-y-4">
                        <h4 className="text-base font-bold text-[#2D2A6E] relative pb-2 inline-block">
                            About Us
                            <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-pink-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-2.5 text-[16px] text-slate-400 font-medium">
                            <li><a href="#" className="hover:text-pink-500 transition-colors">HTML</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Design</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">JavaScript</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Development</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Art & Design</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 text-left space-y-4">
                        <h4 className="text-base font-bold text-[#2D2A6E] relative pb-2 inline-block">
                            Tracks
                            <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-pink-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-2.5 text-[16px] text-slate-400 font-medium">
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Web Development</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Web Design</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Life Skills</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Health & Food</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition-colors">Business</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 text-left space-y-4">
                        <h4 className="text-base font-bold text-[#2D2A6E] relative pb-2 inline-block">
                            Download App
                            <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-pink-500 rounded-full"></span>
                        </h4>

                        <div className="space-y-3 pt-1">

                            <a
                                href="#"
                                className="flex items-center gap-3 bg-[#3F3A60] hover:bg-pink-600 text-white p-2.5 px-4 rounded transition-all duration-200 group shadow-sm"
                            >
                                <Apple size={22} className="fill-white" />
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] uppercase tracking-wider text-slate-300 font-normal leading-none">Download on the</span>
                                    <span className="text-[13px] font-bold leading-tight mt-0.5">Apple Store</span>
                                </div>
                            </a>

                            <a
                                href="#"
                                className="flex items-center gap-3 bg-[#3F3A60] hover:bg-pink-600 text-white p-2.5 px-4 rounded transition-all duration-200 group shadow-sm"
                            >
                                <Play size={20} className="fill-white text-transparent ml-0.5" />
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] uppercase tracking-wider text-slate-300 font-normal leading-none">Get it on</span>
                                    <span className="text-[13px] font-bold leading-tight mt-0.5">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-sm text-slate-400 font-medium">
                    <span>© <strong className="text-slate-700 font-bold">Edly</strong> All Rights Reserved by</span>
                    <a href="" className="text-pink-500 hover:underline font-semibold">
                        HiBootstrap.
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;