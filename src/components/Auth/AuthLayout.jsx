import React, { useEffect, useState } from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  const [animatedIcons, setAnimatedIcons] = useState([
    { id: 1, icon: '📊', active: false },
    { id: 2, icon: '👥', active: false },
    { id: 3, icon: '🚀', active: false }
  ]);

  useEffect(() => {
    const intervals = animatedIcons.map((icon, index) => {
      return setInterval(() => {
        setAnimatedIcons(prev => prev.map((item, i) => 
          i === index ? { ...item, active: !item.active } : item
        ));
      }, 3000 + index * 1000);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  return (
    <div className="h-screen overflow-hidden flex bg-gray-50">
      {/* Left side - Glassmorphism Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            filter: 'brightness(0.8)'
          }}
        >
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-indigo-900/70"></div>
          {/* Subtle Noise Texture for Glass Effect */}
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDgiLz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Glassmorphism Container */}
        <div className="relative z-10 w-full p-12 flex flex-col justify-between">
          {/* Main Glass Panel */}
          <div className="absolute inset-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-blue-900/20"></div>
          
          {/* Content Container */}
          <div className="relative z-20 w-full h-full p-8 flex flex-col justify-between text-white">
            {/* Logo/Brand */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                {/* Glass Logo Container */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:shadow-xl">
                  <span className="text-3xl">📈</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                    VisionPro
                  </h1>
                  <p className="text-blue-100/90 text-lg mt-2 font-light tracking-wide">
                    Enterprise Product Intelligence Platform
                  </p>
                </div>
              </div>
              
              {/* Glass Badge */}
              <div className="inline-block px-5 py-2 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                <span className="text-white font-medium text-sm">
                  Trusted by 500+ Product Teams
                </span>
              </div>
            </div>
            
            {/* Animated Features Section */}
            <div className="space-y-8 flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold tracking-wide text-white/95 mb-2">
                Transform Your Product Strategy
              </h2>
              
              <div className="space-y-6">
                {/* Feature 1 - Glass Card */}
                <div className="group">
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:scale-[1.02]">
                    <div className="relative">
                      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-500 ${animatedIcons[0].active ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-blue-900/30' : ''}`}>
                        <span className="text-2xl transition-transform duration-500 group-hover:scale-125">
                          📊
                        </span>
                        {/* Pulsing Animation */}
                        <div className={`absolute inset-0 rounded-xl bg-blue-400/30 animate-ping ${animatedIcons[0].active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg tracking-wide text-white">Advanced Analytics</h3>
                      <p className="text-blue-100/80 text-sm mt-2 leading-relaxed">
                        Real-time metrics and predictive insights with AI-powered analytics dashboard
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Feature 2 - Glass Card */}
                <div className="group">
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:scale-[1.02]">
                    <div className="relative">
                      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-500 ${animatedIcons[1].active ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-purple-900/30' : ''}`}>
                        <span className="text-2xl transition-transform duration-500 group-hover:scale-125">
                          👥
                        </span>
                        {/* Pulsing Animation */}
                        <div className={`absolute inset-0 rounded-xl bg-purple-400/30 animate-ping ${animatedIcons[1].active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg tracking-wide text-white">Team Synergy</h3>
                      <p className="text-blue-100/80 text-sm mt-2 leading-relaxed">
                        Seamless collaboration tools for cross-functional product teams
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Feature 3 - Glass Card */}
                <div className="group">
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:scale-[1.02]">
                    <div className="relative">
                      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-500 ${animatedIcons[2].active ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-cyan-900/30' : ''}`}>
                        <span className="text-2xl transition-transform duration-500 group-hover:scale-125">
                          🚀
                        </span>
                        {/* Pulsing Animation */}
                        <div className={`absolute inset-0 rounded-xl bg-cyan-400/30 animate-ping ${animatedIcons[2].active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg tracking-wide text-white">Strategic Roadmap</h3>
                      <p className="text-blue-100/80 text-sm mt-2 leading-relaxed">
                        Intelligent roadmap planning with automated milestone tracking
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                      
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md h-full max-h-screen overflow-y-auto py-8">
          {/* Mobile Glass Logo */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6 lg:hidden">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/90 to-purple-600/90 backdrop-blur-sm border border-blue-400/30 shadow-xl flex items-center justify-center">
                <span className="text-4xl">📈</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
            {subtitle && (
              <p className="text-gray-600 mt-3 text-lg font-light tracking-wide">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Form Container with Glass Effect */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50">
            {children}
            
            {/* Social Login Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              {/* Social Login Buttons */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {/* Google Login */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium text-sm hidden sm:block">Google</span>
                  </div>
                </button>
                
                {/* Facebook Login */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-gray-700 font-medium text-sm hidden sm:block">Facebook</span>
                  </div>
                </button>
                
                {/* Zoho Login */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-red-50 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#E42426" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="text-gray-700 font-medium text-sm hidden sm:block">Zoho</span>
                  </div>
                </button>
              </div>
              
              {/* Alternative: Stacked Layout for Smaller Screens */}
              <div className="mt-6 space-y-3 sm:hidden">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Continue with Facebook</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-red-50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#E42426" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Continue with Zoho</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Terms and Privacy */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</a>
            </p>
          </div>
          
          {/* Footer Note */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm rounded-full border border-blue-100/50">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-gray-600 text-sm font-medium">
                Protected by enterprise-grade security • 
                <span className="text-blue-600 font-semibold ml-1">ISO 27001 Certified</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;