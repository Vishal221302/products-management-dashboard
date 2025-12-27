import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12">
        <div className="flex flex-col justify-between text-white">
          <div>
            <h1 className="text-4xl font-bold mb-4">ProductVision</h1>
            <p className="text-blue-100 text-lg">
              Professional Product Management Dashboard
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold">Analytics Dashboard</h3>
                <p className="text-blue-100 text-sm">Track product metrics in real-time</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <h3 className="font-semibold">Team Collaboration</h3>
                <p className="text-blue-100 text-sm">Manage your product team efficiently</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold">Roadmap Planning</h3>
                <p className="text-blue-100 text-sm">Plan and track product features</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-blue-100 italic">
              "This dashboard transformed how we manage our product lifecycle."
            </p>
            <p className="text-white font-semibold mt-2">- Sarah Chen, Product Lead</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;