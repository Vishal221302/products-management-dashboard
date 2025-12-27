import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  X, 
  CheckCircle, 
  Check, 
  Trash2, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

const NotificationDropdown = () => {
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const notificationRef = useRef(null);

  // Mock notification data
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'New feature request', 
      message: 'User "John Doe" requested a new export feature for the dashboard', 
      time: '10 min ago',
      read: false,
      type: 'feature',
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Product launch successful', 
      message: 'Product A has reached 1,000 active users in just 24 hours', 
      time: '1 hour ago',
      read: false,
      type: 'success',
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Team meeting reminder', 
      message: 'Weekly product review meeting in 30 minutes. Please prepare your updates.', 
      time: '2 hours ago',
      read: true,
      type: 'reminder',
      priority: 'low'
    },
    { 
      id: 4, 
      title: 'New comment on roadmap', 
      message: 'Sarah commented on the Q2 roadmap item about mobile optimization', 
      time: '5 hours ago',
      read: true,
      type: 'comment',
      priority: 'medium'
    },
    { 
      id: 5, 
      title: 'API usage alert', 
      message: 'API calls have increased by 40% this hour. Please review the dashboard.', 
      time: '1 day ago',
      read: true,
      type: 'alert',
      priority: 'high'
    },
    { 
      id: 6, 
      title: 'New user signup', 
      message: '15 new users signed up for the beta program today', 
      time: '2 days ago',
      read: true,
      type: 'info',
      priority: 'low'
    },
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter notifications based on search and filter
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = searchQuery === '' || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) || 
      (filter === 'read' && notification.read);
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredUnreadCount = filteredNotifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter(notification => !notification.read));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'feature': return '💡';
      case 'success': return '🎉';
      case 'reminder': return '⏰';
      case 'comment': return '💬';
      case 'alert': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'feature': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'success': return 'bg-green-100 text-green-600 border-green-200';
      case 'reminder': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'comment': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'alert': return 'bg-red-100 text-red-600 border-red-200';
      case 'info': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (time) => {
    return time;
  };

  return (
    <div className="relative" ref={notificationRef}>
      {/* Notification Bell Button */}
      <button 
        onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group active:scale-95"
        aria-label="Notifications"
      >
        <Bell className={`w-5 h-5 text-gray-600 transition-transform group-hover:scale-110 ${notificationMenuOpen ? 'animate-bellRing' : ''}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <div className={`
        fixed md:absolute right-0 mt-2 w-screen md:w-96 max-w-full md:max-w-none
        bg-white rounded-xl shadow-2xl border border-gray-200 z-50
        origin-top-right transition-all duration-200 ease-out
        ${notificationMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
        ${notificationMenuOpen ? 'top-16 md:top-auto' : ''}
        md:max-h-[80vh] h-[calc(100vh-5rem)] md:h-auto
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-xl z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
              <p className="text-sm text-gray-500">
                {filteredUnreadCount} unread {filteredUnreadCount === 1 ? 'message' : 'messages'}
              </p>
            </div>
            <button
              onClick={() => setNotificationMenuOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-150"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-150 whitespace-nowrap ${filter === 'all' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-150 whitespace-nowrap ${filter === 'unread' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-150 whitespace-nowrap ${filter === 'read' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Read
              </button>
              <div className="flex items-center text-gray-400 ml-2">
                <Filter className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 sticky top-[148px] md:top-[120px] z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-150"
                >
                  <Check className="w-4 h-4" />
                  <span className="hidden md:inline">Mark all read</span>
                  <span className="md:hidden">Read all</span>
                </button>
              )}
              <button
                onClick={deleteAllRead}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100 rounded-lg transition-all duration-150"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden md:inline">Delete read</span>
                <span className="md:hidden">Delete read</span>
              </button>
            </div>
            <button
              onClick={clearAllNotifications}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-150"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100%-220px)] md:h-[400px]">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">No notifications found</p>
              <p className="text-gray-500 text-sm mt-1">
                {searchQuery ? 'Try a different search' : 'You\'re all caught up!'}
              </p>
              {(searchQuery || filter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilter('all');
                  }}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-all duration-150 ${!notification.read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg border ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">{notification.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}></span>
                            <span className="text-xs text-gray-500">{formatTime(notification.time)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-green-100 rounded transition-all duration-150 hover:scale-110"
                              title="Mark as read"
                              aria-label="Mark as read"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-red-100 rounded transition-all duration-150 hover:scale-110"
                            title="Delete"
                            aria-label="Delete notification"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2 md:line-clamp-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getNotificationColor(notification.type)}`}>
                          {notification.type}
                        </span>
                        {!notification.read && (
                          <span className="text-xs font-medium text-blue-600 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-xl">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150">
              <ExternalLink className="w-4 h-4" />
              <span>View all notifications</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Backdrop */}
      {notificationMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
          onClick={() => setNotificationMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationDropdown;