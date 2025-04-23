import { useState } from 'react';
import { X, Calendar, Mail, User, Clock, Check } from 'lucide-react';
import { ListOrdered, ChevronDown } from 'lucide-react';

export default function SubscribeForm({ onClose }) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tips: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  // Generate times from 8am to 8pm in 2 hour intervals
  const times = [];
  for (let hour = 12; hour <= 23; hour += 1) {
    const formattedHour = hour.toString().padStart(2, '0') + ':00';
    times.push(formattedHour);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const payload = {
      name: formData.name,
      email: formData.email,
      tipsPerDay: Number(formData.tips),
      preferredTime: formData.time
    };
  
    try {
      const response = await fetch('https://js-daily-tip-backend.onrender.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const result = await response.json();
      alert(result.message);
  
      setTimeout(() => {
        console.log('Form submitted:', payload);
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            email: '',
            tips: '',
            time: ''
          });
        }, 3000);
      }, 1500);
  
    } catch (error) {
      console.log('Error submitting form', error);
    }
  };
  

  const handleClose = () => {
    setFormVisible(false);
    setTimeout(() => {
      if (onClose) onClose(); // Tell the parent to hide the form
      setFormVisible(true);
    }, 300);
  };


  // Check if form is filled completely
  const isFormComplete = formData.name && formData.email && formData.time;

  return (
    <div className={`w-full max-w-md transition-all duration-300 ${formVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

      <div className="bg-white rounded-lg shadow-xl">
        {/* Form Header with gradient */}
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-200 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Subscribe for daily tip</h2>
            <button
              onClick={handleClose}
              className="absolute text-white top-1 right-1 bg-transparent bg-opacity-20 rounded-full p-1 hover:bg-opacity-30 transition-all"
              aria-label="Close form"
            >
              <X size={20} strokeWidth={3.5} />
            </button>
          </div>
          <p className="mt-2 text-blue-100"></p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User size={18} className="mr-2 text-blue-500" />
              <span>Your Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail size={18} className="mr-2 text-blue-500" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="tips" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <ListOrdered size={18} className="mr-2 text-blue-500" />
              <span>Preferred number of tips</span>
            </label>
            <div className="relative">
              <select
                id="tips"
                name="tips"
                value={formData.tips}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                required
              >
                <option value="">Select tip per day</option>
                <option key='1' value='1'>1</option>
                <option key='2' value='2'>2</option>
                <option key='3' value='3'>3</option>

              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={18} className="text-blue-500" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="time" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Clock size={18} className="mr-2 text-blue-500" />
              <span>Preferred Time</span>
            </label>
            <div className="relative">
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                required
              >
                <option value="">Select a time (IST)</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2             text-gray-700">
                <Calendar size={18} className="text-blue-500" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`relative w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${isFormComplete
                ? 'bg-gradient-to-r from-yellow-300 to-yellow-200 hover:from-yellow-600 hover:to-yellow-700'
                : 'bg-gradient-to-r from-yellow-300 to-yellow-200 opacity-50 cursor-not-allowed'
              } ${isSubmitting ? 'opacity-80' : ''} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center justify-center">
                <Check size={18} className="mr-2" />
                Subscribed for daily tips!
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </form>

        {/* Form Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
          <p className="text-xs text-gray-500 text-center">
            "Enter above detail to get your daily tip on your preffered time "
          </p>
        </div>
      </div>
    </div>
  );
}