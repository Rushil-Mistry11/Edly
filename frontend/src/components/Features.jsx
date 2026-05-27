import React from 'react';
import { Award, TrendingUp, HelpCircle, Lightbulb, House } from 'lucide-react';
import features1 from '../assets/features1.png';
import features2 from '../assets/features2.png';
import features3 from '../assets/features3.png';
import features4 from '../assets/features4.png';

const Features = () => {
  const featureData = [
    {
      id: 1,
      title: 'Earn certificates and degrees',
      description: 'Break into a new field like format technology or data science get started.',
      icon: Award,
      iconBg: features1,
    },
    {
      id: 2,
      title: 'In-Demand Trendy Topics',
      description: 'Break into a new field like format technology or data science get started.',
      icon: TrendingUp,
      iconBg: features2, 
    },
    {
      id: 3,
      title: 'Segment Your Learning',
      description: 'Break into a new field like format technology or data science get started.',
      icon: Lightbulb,
      iconBg: features3, 
    },
    {
      id: 4,
      title: 'Always Interactive Learning',
      description: 'Break into a new field like format technology or data science get started.',
      icon: House,
      iconBg: features4, 
    }
  ];

  return (
    <section className="w-full bg-white py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureData.map((item) => {
            const IconComponent = item.icon || HelpCircle;

            return (
              <div 
                key={item.id} 
                className="bg-[#F8FAFC] p-8 rounded-lg border border-slate-100 flex flex-col justify-between items-start transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group min-h-95"
              >
                <div>
                  <div className="relative w-24 h-24 mb-8 mt-2 flex items-center justify-center">
                    <img src={item.iconBg} alt="" className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />
                    
                    <div className="relative z-10 text-white flex items-center justify-center pointer-events-none transform -translate-y-0.5">
                      <IconComponent size={28}  className='ml-4'/>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-snug mb-3 group-hover:text-pink-600 transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-sm font-normal leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <a href="#" className="text-pink-500 font-bold text-sm tracking-wide hover:text-pink-600 transition-colors mt-auto relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 hover:after:w-full after:transition-all after:duration-200">
                  Start Now
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;