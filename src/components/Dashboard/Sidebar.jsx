import React, { useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  Calendar, 
  Settings,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation(); // Get current location
  
  // Update menuItems to include paths and check active based on current route
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Products', path: '/dashboard/products' },
    { icon: Users, label: 'Sales & Revenue', path: '/dashboard/revanue' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Calendar, label: 'Roadmap', path: '/dashboard/roadmap' },
    { icon: FileText, label: 'Feedback & Support', path: '/dashboard/feedback' },
    { icon: Settings, label: 'Settings', path: '/dashboard/setting' },
    { icon: HelpCircle, label: 'Help', path: '/dashboard/helpsupport' },
  ];

  // Close sidebar on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isMobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMobile, isSidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isSidebarOpen]);

  const handleCloseMobile = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleItemClick = () => {
    handleCloseMobile();
  };

  // Don't render sidebar on mobile when closed
  if (isMobile && !isSidebarOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay with Animation */}
      {isMobile && isSidebarOpen && (
        <div 
          className={`
            fixed inset-0 bg-black z-40 lg:hidden
            transition-opacity duration-300 ease-in-out
            ${isSidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container with Slide Animation */}
      <div className={`
        sidebar-container
        ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'fixed left-0 top-0 bottom-0 z-30'}
        ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        ${isMobile ? 'w-72' : (isCollapsed ? 'w-20' : 'w-64')}
        bg-gradient-to-b from-gray-900 to-gray-800 text-white
        shadow-2xl
        transition-all duration-300 ease-out
        ${isMobile ? 'overflow-y-auto' : 'overflow-hidden'}
      `}>
        {/* Sidebar Content */}
        <div className="h-full flex flex-col">
          {/* Logo Section with Animation - Link to Dashboard */}
          <div className="p-6 border-b border-gray-700/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              {(!isCollapsed || isMobile) && (
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-3 animate-slideIn no-underline"
                  onClick={handleCloseMobile}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-float">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      ProductVision
                    </h1>
                    <p className="text-gray-400 text-xs mt-1">Professional Dashboard</p>
                  </div>
                </Link>
              )}
              {isCollapsed && !isMobile && (
                <Link 
                  to="/dashboard" 
                  className="flex items-center justify-center"
                  onClick={handleCloseMobile}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg animate-float">
                    <Package className="w-6 h-6" />
                  </div>
                </Link>
              )}
              {!isMobile && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  {isCollapsed ? 
                    <ChevronRight className="w-5 h-5 animate-bounceRight" /> : 
                    <ChevronLeft className="w-5 h-5 animate-bounceLeft" />
                  }
                </button>
              )}
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-200 hover:rotate-90 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation with Staggered Animation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuItems.map((item, index) => {
                // Check if current route matches this item's path
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={handleItemClick}
                    className={`
                      w-full flex items-center 
                      ${(isCollapsed && !isMobile) ? 'justify-center p-3' : 'px-4 py-3 space-x-3'} 
                      rounded-xl transition-all duration-200 no-underline
                      ${isActive ? 
                        'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg' : 
                        'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                      }
                      hover:shadow-md
                      active:scale-95
                      animate-slideIn
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500/20' : 'bg-gray-800/50'}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    {(!isCollapsed || isMobile) && (
                      <span className="font-medium">{item.label}</span>
                    )}
                    {isActive && (!isCollapsed || isMobile) && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;