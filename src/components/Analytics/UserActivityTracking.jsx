// components/analytics/UserActivityTracking.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity,
  Eye,
  MousePointer,
  Clock,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  Filter,
  RefreshCw,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react';

const UserActivityTracking = () => {
  const [timeRange, setTimeRange] = useState('today');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'devices', label: 'Devices', icon: Smartphone },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'sessions', label: 'Sessions', icon: Clock }
  ];

  const timeRanges = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ];

  // Sample activity data
  const activities = [
    { user: 'Alex Johnson', action: 'Viewed product', target: 'Premium Dashboard', time: '2 min ago', device: 'Desktop', location: 'New York, US' },
    { user: 'Sarah Wilson', action: 'Added to cart', target: 'Mobile Analytics', time: '5 min ago', device: 'Mobile', location: 'London, UK' },
    { user: 'Michael Chen', action: 'Completed purchase', target: 'API Gateway', time: '12 min ago', device: 'Tablet', location: 'Tokyo, JP' },
    { user: 'Emma Davis', action: 'Signed up', target: 'New account', time: '25 min ago', device: 'Mobile', location: 'Sydney, AU' },
    { user: 'David Brown', action: 'Viewed pricing', target: 'All plans', time: '38 min ago', device: 'Desktop', location: 'Berlin, DE' },
    { user: 'Lisa Taylor', action: 'Downloaded resource', target: 'Whitepaper.pdf', time: '52 min ago', device: 'Mobile', location: 'Toronto, CA' }
  ];

  const deviceStats = [
    { type: 'Mobile', count: 1560, percentage: 52, icon: Smartphone, color: 'from-blue-500 to-cyan-500' },
    { type: 'Desktop', count: 980, percentage: 32.7, icon: Monitor, color: 'from-emerald-500 to-teal-500' },
    { type: 'Tablet', count: 460, percentage: 15.3, icon: Tablet, color: 'from-purple-500 to-pink-500' }
  ];

  const locationStats = [
    { country: 'United States', users: 1240, percentage: 41.3, growth: '+12.5%' },
    { country: 'United Kingdom', users: 680, percentage: 22.7, growth: '+8.2%' },
    { country: 'Germany', users: 420, percentage: 14, growth: '+5.7%' },
    { country: 'Japan', users: 310, percentage: 10.3, growth: '+15.2%' },
    { country: 'Australia', users: 180, percentage: 6, growth: '+9.8%' },
    { country: 'Other', users: 170, percentage: 5.7, growth: '+3.4%' }
  ];

  const sessionMetrics = [
    { metric: 'Total Sessions', value: '3,248', change: '+12.5%', icon: Activity },
    { metric: 'Avg. Duration', value: '4m 32s', change: '+3.2%', icon: Clock },
    { metric: 'Pages/Session', value: '5.8', change: '+1.8%', icon: Eye },
    { metric: 'Bounce Rate', value: '32.5%', change: '-2.4%', icon: MousePointer }
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">User Activity Tracking</h2>
              <p className="text-gray-500 text-sm mt-1">Real-time user engagement and behavior</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="px-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Session Metrics */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {sessionMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-white rounded-lg border border-gray-300">
                      <metric.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className={`text-sm font-semibold ${
                      metric.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.metric}</div>
                </motion.div>
              ))}
            </div>

            {/* Live Activity Feed */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Live updates</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{activity.user}</div>
                          <div className="text-sm text-gray-600">
                            {activity.action} • {activity.target}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{activity.time}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            {activity.device === 'Mobile' && <Smartphone className="w-3 h-3" />}
                            {activity.device === 'Desktop' && <Monitor className="w-3 h-3" />}
                            {activity.device === 'Tablet' && <Tablet className="w-3 h-3" />}
                            <span>{activity.device}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            <span>{activity.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Device Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Distribution</h3>
                <div className="space-y-4">
                  {deviceStats.map((device, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${device.color}`}>
                            <device.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{device.type}</div>
                            <div className="text-2xl font-bold text-gray-900">{device.count}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{device.percentage}%</div>
                          <div className="text-sm text-gray-500">of total</div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${device.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${device.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Device Usage Trend */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Usage Trend</h3>
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-t border-gray-200" />
                    ))}
                  </div>
                  
                  <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                    {[65, 72, 68, 75, 80, 78, 82, 85, 88, 90, 92, 95].map((height, index) => (
                      <motion.div
                        key={index}
                        className="w-6 flex flex-col items-center"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <div className="w-6 rounded-t-lg bg-gradient-to-t from-blue-500 to-cyan-500" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Locations Tab */}
        {activeTab === 'locations' && (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Location List */}
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  {locationStats.map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{location.country}</div>
                            <div className="text-sm text-gray-600">{location.users.toLocaleString()} users</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{location.percentage}%</div>
                          <div className={`text-sm font-semibold ${location.growth.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {location.growth}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${location.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map Visualization */}
              <div className="relative">
                <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm text-gray-500">Geographic Map</div>
                    <div className="text-xs text-gray-400 mt-2">(Interactive map visualization)</div>
                  </div>
                  
                  {/* Location markers */}
                  <div className="absolute top-1/4 left-1/4">
                    <motion.div
                      className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <div className="absolute top-1/3 right-1/3">
                    <motion.div
                      className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    />
                  </div>
                  <div className="absolute bottom-1/4 left-1/3">
                    <motion.div
                      className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Session Duration Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Session Duration</h3>
                <div className="space-y-4">
                  {[
                    { label: '0-1 min', value: 15, color: 'from-rose-500 to-pink-500' },
                    { label: '1-3 min', value: 25, color: 'from-amber-500 to-orange-500' },
                    { label: '3-5 min', value: 35, color: 'from-blue-500 to-cyan-500' },
                    { label: '5-10 min', value: 15, color: 'from-emerald-500 to-teal-500' },
                    { label: '10+ min', value: 10, color: 'from-purple-500 to-indigo-500' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-medium text-gray-900">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peak Hours */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Peak Activity Hours</h3>
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                    {[30, 45, 60, 75, 85, 95, 90, 80, 70, 55, 40, 35].map((height, index) => (
                      <motion.div
                        key={index}
                        className="w-6 flex flex-col items-center"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <div className={`w-6 rounded-t-lg ${
                          [85, 95, 90].includes(height)
                            ? 'bg-gradient-to-t from-emerald-500 to-teal-500'
                            : 'bg-gradient-to-t from-blue-500 to-cyan-500'
                        }`} />
                        <div className="mt-2 text-xs text-gray-500">
                          {index + 6}:00 {index + 6 < 12 ? 'AM' : 'PM'}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Common Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Last updated: Just now</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300">
                <Filter className="w-4 h-4" />
                Filter Data
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserActivityTracking;