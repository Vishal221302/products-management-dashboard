import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Mail,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';

const Header = ({ toggleSidebar, isMobile, isSidebarOpen, isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileBounce, setProfileBounce] = useState(false);
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Profile bounce animation when menu opens
  useEffect(() => {
    if (profileMenuOpen) {
      setProfileBounce(true);
      const timer = setTimeout(() => setProfileBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [profileMenuOpen]);

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu Button Only */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="menu-button p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobile ? (
              <div className="relative w-5 h-5">
                <Menu className={`w-5 h-5 text-gray-600 transition-all duration-300 ${isSidebarOpen ? 'opacity-0 rotate-90' : 'opacity-100'}`} />
                <X className={`absolute top-0 left-0 w-5 h-5 text-gray-600 transition-all duration-300 ${isSidebarOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            ) : (
              <div className="relative w-5 h-5">
                <div className={`w-5 h-5 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-0' : 'rotate-180'}`}>
                  <div className="w-full h-full relative">
                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${isSidebarCollapsed ? 'rotate-0 translate-y-1' : 'rotate-45 translate-y-2'}`}></div>
                    <div className={`absolute top-1/2 left-0 w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${isSidebarCollapsed ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${isSidebarCollapsed ? 'rotate-0 -translate-y-1' : '-rotate-45 -translate-y-2'}`}></div>
                  </div>
                </div>
              </div>
            )}
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Welcome back, {user?.name}</p>
          </div>
        </div>

        {/* Center Section - Search Bar (Always visible on all screens) */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products, analytics, reports..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-500 text-sm md:text-base"
            />
          </div>
        </div>
        

        {/* Right Section - Notification and Profile */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Mobile Search Button REMOVED - Search bar is always visible */}

          {/* Notification Component */}
          <NotificationDropdown />

          {/* Profile Section */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`flex items-center space-x-3 p-1 hover:bg-gray-50 rounded-xl transition-all duration-200 ${profileBounce ? 'animate-bounce' : ''}`}
            >
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                {/* Online Status Indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* User Info - Desktop Only */}
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Product Manager</p>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown className={`
                hidden lg:block w-4 h-4 text-gray-400
                transition-transform duration-200 
                ${profileMenuOpen ? 'rotate-180' : ''}
              `} />
            </button>

            {/* Profile Dropdown Menu */}
            <div className={`
              absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50
              origin-top-right transition-all duration-200 ease-out
              ${profileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
            `}>
              {/* Profile Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg animate-gradient">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium animate-fadeIn">
                      Product Manager
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <a href="/dashboard/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-150 group hover:translate-x-1">
                  <User className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span>My Profile</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-150 group hover:translate-x-1">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span>Messages</span>
                  <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full animate-pulse">
                    3
                  </span>
                </a>
                <a href="/dashboard/setting" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-150 group hover:translate-x-1">
                  <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span>Account Settings</span>
                </a>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-2"></div>

              {/* Help & Logout */}
              <div className="p-2">
                <a href="/dashboard/helpsupport" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-150 group hover:translate-x-1">
                  <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span>Help & Support</span>
                </a>
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150 group hover:translate-x-1"
                >
                  <LogOut className="w-5 h-5 group-hover:text-red-700 transition-colors" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;