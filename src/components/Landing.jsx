import { useState } from 'react';
import logo from '../assets/logo.png';
import SubscribeForm from './SubscribeForm'; // Adjust the path if needed



export default function JSLandingPage({ onSubscribeClick }) {
    const [frequency, setFrequency] = useState(1);
    const [timeValue, setTimeValue] = useState(9);


    // Format and display the selected time
    const formatTime = (hour) => {
        const formattedHour = hour % 12 || 12;
        const ampm = hour < 12 ? 'AM' : 'PM';
        return `${formattedHour}:00 ${ampm}`;
    };

    // Handle subscription button click
    const handleSubscribe = () => {
        if (onSubscribeClick) onSubscribeClick();
      };
      
      

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 -my-10">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-yellow-300 shadow-md">
                <div className="max-w-6xl flex justify-between items-center p-4">
                    <div className="flex items-center font-bold text-xl">
                        <img src={logo} alt="logo" className="w-22 h-22 object-contain -m-5" />
                        <span className="ml-2">JS Daily Tips</span>
                    </div>
                    <div>
                        {/* Navigation links if needed */}
                    </div>
                </div>
            </header>



            <main>
                {/* Welcome Section */}
                <section className="bg-gradient-to-r from-yellow-300 to-yellow-200 text-gray-800 text-center py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">Elevate Your JavaScript Skills</h1>
                        <p className="text-lg mb-6 max-w-2xl mx-auto">
                            Welcome to JS Daily Tips! Receive bite-sized, practical JavaScript tips directly to your inbox.
                            Perfect for developers of all levels who want to level up their skills without overwhelming their schedule.
                        </p>
                        <a
                            href="#subscribe"
                            className="inline-block bg-yellow-400 text-gray-800 font-bold px-6 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Get Started
                        </a>
                    </div>
                </section>

                {/* Tips Frequency Section */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Learning Pace</h2>
                        <p className="text-center mb-8">
                            We believe in flexible learning. Select how many JavaScript tips you'd like to receive daily and at what time.
                        </p>

                        {/* Frequency selection cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {[1, 2, 3].map((option) => (
                                <div key={option} className="relative">
                                    <input
                                        type="radio"
                                        id={`option${option}`}
                                        name="frequency"
                                        value={option}
                                        checked={frequency === option}
                                        onChange={() => setFrequency(option)}
                                        className="absolute opacity-0 cursor-pointer h-full w-full z-10"
                                    />
                                    <label
                                        htmlFor={`option${option}`}
                                        className={`block p-6 bg-white rounded-lg shadow-md border-2 transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center ${frequency === option ? 'border-yellow-400 bg-yellow-50' : 'border-transparent'
                                            }`}
                                    >
                                        <div className="text-3xl font-bold text-gray-800 mb-4">{option}</div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {option === 1 ? 'One Tip Daily' : option === 2 ? 'Two Tips Daily' : 'Three Tips Daily'}
                                        </h3>
                                        <p>
                                            {option === 1
                                                ? 'Perfect for busy developers who want a steady learning pace'
                                                : option === 2
                                                    ? 'Accelerate your learning with two carefully selected tips'
                                                    : 'Perfect for dedicated learners who want to rapidly improve'}
                                        </p>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Time schedule selector */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-2">Choose Your Preferred Time</h3>
                            <p className="mb-4">When would you like to receive your daily JavaScript tips?</p>
                            <input
                                type="range"
                                min="0"
                                max="23"
                                value={timeValue}
                                onChange={(e) => setTimeValue(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                            />
                            <div className="text-center font-bold text-lg mt-4">
                                {formatTime(timeValue)}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advantages Section */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center">Why Subscribe to JS Daily Tips?</h2>
                        <div className="space-y-4">
                            {[
                                'Learn something new every day with concise, practical tips',
                                'Improve your coding skills without overwhelming your schedule',
                                'Discover hidden JavaScript features and best practices',
                                'Enhance your problem-solving abilities with real-world examples',
                                'Stay updated with the latest JavaScript trends and techniques'
                            ].map((advantage, index) => (
                                <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-lg">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-800 text-yellow-300 flex items-center justify-center mr-4">✓</div>
                                    <span>{advantage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section id="subscribe" className="py-16 px-4 bg-gray-800 text-white text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-yellow-300">Subscribe to JS Daily Tips</h2>
                        <p className="mb-8">Join thousands of developers who are improving their JavaScript skills one tip at a time.</p>
                        <button
                            onClick={handleSubscribe}
                            className="px-8 py-4 bg-yellow-400 text-gray-800 rounded-full font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-pulse"
                        >
                            Subscribe Now
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center">What Makes Our Tips Special</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: '🎯',
                                    title: 'Focused & Practical',
                                    description: 'Each tip focuses on a single concept with practical examples you can use immediately'
                                },
                                {
                                    icon: '🔍',
                                    title: 'In-Depth Explanations',
                                    description: 'Understand not just how, but why JavaScript works the way it does'
                                },
                                {
                                    icon: '🚀',
                                    title: 'Performance Optimized',
                                    description: 'Learn techniques to write faster, more efficient JavaScript code'
                                }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>


            <footer className="bg-gray-800 text-white py-6 px-4 text-center">
                <div className="max-w-6xl mx-auto">
                    <p>&copy; 2025 JS Daily Tips. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}