// components/feedback/BugReports.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bug,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  BarChart3,
  Filter,
  Download,
  Calendar,
  Users,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const BugReports = () => {
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const priorities = [
    { id: 'critical', label: 'Critical', color: 'from-rose-500 to-pink-500', count: 12 },
    { id: 'high', label: 'High', color: 'from-amber-500 to-orange-500', count: 28 },
    { id: 'medium', label: 'Medium', color: 'from-blue-500 to-cyan-500', count: 45 },
    { id: 'low', label: 'Low', color: 'from-gray-500 to-gray-600', count: 65 }
  ];

  const statuses = [
    { id: 'open', label: 'Open', color: 'bg-rose-100 text-rose-700', count: 58 },
    { id: 'in-progress', label: 'In Progress', color: 'bg-amber-100 text-amber-700', count: 32 },
    { id: 'resolved', label: 'Resolved', color: 'bg-emerald-100 text-emerald-700', count: 42 },
    { id: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-700', count: 18 }
  ];

  const bugReports = [
    {
      id: '#BUG-1245',
      title: 'Mobile app crashes on iOS 17',
      description: 'Application crashes immediately after login on iPhone devices running iOS 17.2.1',
      priority: 'critical',
      status: 'open',
      reporter: 'Sarah Wilson',
      assignee: 'John Developer',
      created: '2 hours ago',
      updated: '30 minutes ago',
      severity: 'P0',
      platform: 'iOS',
      votes: 24
    },
    {
      id: '#BUG-1244',
      title: 'Payment gateway timeout error',
      description: 'Users experiencing timeout errors during checkout process with credit card payments',
      priority: 'high',
      status: 'in-progress',
      reporter: 'Michael Chen',
      assignee: 'Emma Engineer',
      created: '5 hours ago',
      updated: '1 hour ago',
      severity: 'P1',
      platform: 'Web',
      votes: 18
    },
    {
      id: '#BUG-1243',
      title: 'Image upload fails for large files',
      description: 'Upload fails silently for files larger than 10MB, no error message displayed',
      priority: 'medium',
      status: 'open',
      reporter: 'Alex Johnson',
      assignee: 'Unassigned',
      created: '1 day ago',
      updated: '5 hours ago',
      severity: 'P2',
      platform: 'All',
      votes: 12
    },
    {
      id: '#BUG-1242',
      title: 'Dark mode color contrast issues',
      description: 'Text in dark mode has poor contrast ratio making it difficult to read',
      priority: 'low',
      status: 'resolved',
      reporter: 'David Brown',
      assignee: 'Lisa Designer',
      created: '2 days ago',
      updated: '1 day ago',
      severity: 'P3',
      platform: 'Web',
      votes: 8
    },
    {
      id: '#BUG-1241',
      title: 'API rate limiting not working',
      description: 'Rate limiting middleware not properly restricting requests per minute',
      priority: 'critical',
      status: 'in-progress',
      reporter: 'Emma Davis',
      assignee: 'Tom Backend',
      created: '3 days ago',
      updated: '2 days ago',
      severity: 'P0',
      platform: 'API',
      votes: 32
    }
  ];

  const filteredBugs = bugReports.filter(bug => 
    (priorityFilter === 'all' || bug.priority === priorityFilter) &&
    (statusFilter === 'all' || bug.status === statusFilter)
  );

  const stats = {
    total: 150,
    resolved: 42,
    avgResolutionTime: '2.5 days',
    recurrenceRate: '8.2%'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-lg">
              <Bug className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bug Reports</h2>
              <p className="text-gray-500 text-sm mt-1">Track, prioritize, and resolve software issues</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bugs', value: stats.total, icon: Bug, color: 'from-rose-500 to-pink-500' },
            { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
            { label: 'Avg. Resolution', value: stats.avgResolutionTime, icon: Clock, color: 'from-blue-500 to-cyan-500' },
            { label: 'Recurrence Rate', value: stats.recurrenceRate, icon: AlertTriangle, color: 'from-amber-500 to-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Priority & Status Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Priority Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Priority</h3>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  onClick={() => setPriorityFilter(priority.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    priorityFilter === priority.id
                      ? `bg-gradient-to-r ${priority.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {priority.label}
                  <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                    {priority.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Status</h3>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setStatusFilter(status.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    statusFilter === status.id
                      ? `${status.color} shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                  <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                    {status.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bug Reports List */}
        <div className="space-y-4">
          {filteredBugs.map((bug, index) => (
            <motion.div
              key={bug.id}
              variants={itemVariants}
              className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{bug.title}</h4>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          bug.priority === 'critical' ? 'bg-rose-100 text-rose-700' :
                          bug.priority === 'high' ? 'bg-amber-100 text-amber-700' :
                          bug.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {bug.priority}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          bug.status === 'open' ? 'bg-rose-100 text-rose-700' :
                          bug.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                          bug.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {bug.status}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4">{bug.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{bug.id}</div>
                      <div className="text-xs text-gray-500">Bug ID</div>
                    </div>
                  </div>

                  {/* Bug Details */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <div>
                          <div className="font-medium text-gray-900">{bug.reporter}</div>
                          <div className="text-xs text-gray-500">Reporter</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <div>
                          <div className={`font-medium ${
                            bug.assignee === 'Unassigned' ? 'text-rose-600' : 'text-gray-900'
                          }`}>
                            {bug.assignee}
                          </div>
                          <div className="text-xs text-gray-500">Assignee</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Zap className="w-4 h-4" />
                        <div>
                          <div className="font-medium text-gray-900">{bug.severity}</div>
                          <div className="text-xs text-gray-500">Severity</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <div className="font-medium text-gray-900">{bug.created}</div>
                          <div className="text-xs text-gray-500">Created</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Votes */}
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="text-sm font-medium">{bug.votes}</span>
                      </button>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-emerald-100 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button className="p-2 hover:bg-rose-100 rounded-lg">
                          <XCircle className="w-4 h-4 text-rose-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bug Trends & Insights */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Bug Trends & Insights</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trend Chart */}
            <div>
              <div className="text-sm text-gray-600 mb-4">Bug Reports Trend</div>
              <div className="h-32 flex items-end gap-1">
                {[85, 72, 68, 65, 62, 58, 55, 52, 48, 45, 42, 40].map((height, index) => (
                  <motion.div
                    key={index}
                    className="flex-1"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="h-full bg-gradient-to-t from-rose-500 to-pink-400 rounded-t-lg" />
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, i) => (
                  <span key={i}>{month}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-emerald-600 mt-4">
                <ArrowDownRight className="w-4 h-4" />
                <span className="text-sm font-medium">-15.3% reduction this month</span>
              </div>
            </div>

            {/* Platform Distribution */}
            <div>
              <div className="text-sm text-gray-600 mb-4">Platform Distribution</div>
              <div className="space-y-3">
                {[
                  { platform: 'Web', count: 45, percent: 30 },
                  { platform: 'iOS', count: 32, percent: 21.3 },
                  { platform: 'Android', count: 28, percent: 18.7 },
                  { platform: 'API', count: 25, percent: 16.7 },
                  { platform: 'Other', count: 20, percent: 13.3 }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{item.platform}</span>
                      <span className="font-medium text-gray-900">{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percent}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution Insights */}
            <div>
              <div className="text-sm text-gray-600 mb-4">Resolution Insights</div>
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Avg. Time to First Response</div>
                  <div className="text-lg font-bold text-gray-900">4.2 hours</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Resolution Success Rate</div>
                  <div className="text-lg font-bold text-gray-900">92.5%</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Reopened Bugs</div>
                  <div className="text-lg font-bold text-gray-900">8.2%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BugReports;