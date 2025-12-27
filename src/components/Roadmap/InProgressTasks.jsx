import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp, AlertCircle, CheckCircle, GitPullRequest, BarChart3, MoreVertical, PauseCircle, PlayCircle } from 'lucide-react';

const InProgressTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'New User Onboarding Flow',
      status: 'development',
      progress: 65,
      team: 'Frontend Team',
      assignees: ['SA', 'MJ', 'RK'],
      dueDate: '2024-02-15',
      blockers: 2,
      commits: 24,
      description: 'Redesigning the user onboarding experience with interactive tutorials'
    },
    {
      id: 2,
      title: 'API Rate Limiting System',
      status: 'testing',
      progress: 85,
      team: 'Backend Team',
      assignees: ['TP', 'DL'],
      dueDate: '2024-01-30',
      blockers: 0,
      commits: 42,
      description: 'Implementing rate limiting and API usage analytics'
    },
    {
      id: 3,
      title: 'Dark Mode Implementation',
      status: 'design',
      progress: 40,
      team: 'Design Team',
      assignees: ['JW', 'LC'],
      dueDate: '2024-02-28',
      blockers: 1,
      commits: 8,
      description: 'Creating comprehensive dark theme across all components'
    },
    {
      id: 4,
      title: 'Payment Gateway Integration',
      status: 'development',
      progress: 55,
      team: 'DevOps',
      assignees: ['KM', 'AS'],
      dueDate: '2024-02-10',
      blockers: 3,
      commits: 31,
      description: 'Integrating new payment providers and updating billing system'
    },
    {
      id: 5,
      title: 'Performance Optimization',
      status: 'qa',
      progress: 90,
      team: 'Performance Team',
      assignees: ['RD', 'HS'],
      dueDate: '2024-01-25',
      blockers: 0,
      commits: 18,
      description: 'Optimizing page load times and reducing bundle size'
    }
  ]);

  const [pausedTasks, setPausedTasks] = useState([]);

  const getStatusInfo = (status) => {
    switch(status) {
      case 'design': return { color: 'bg-purple-100 text-purple-800', icon: '🎨', label: 'Design' };
      case 'development': return { color: 'bg-blue-100 text-blue-800', icon: '💻', label: 'Development' };
      case 'testing': return { color: 'bg-yellow-100 text-yellow-800', icon: '🧪', label: 'Testing' };
      case 'qa': return { color: 'bg-green-100 text-green-800', icon: '✅', label: 'QA' };
      default: return { color: 'bg-gray-100 text-gray-800', icon: '⚙️', label: 'Planning' };
    }
  };

  const togglePause = (taskId) => {
    if (pausedTasks.includes(taskId)) {
      setPausedTasks(pausedTasks.filter(id => id !== taskId));
    } else {
      setPausedTasks([...pausedTasks, taskId]);
    }
  };

  const updateProgress = (taskId, newProgress) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, progress: Math.min(100, Math.max(0, newProgress)) } : task
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock size={24} className="text-blue-600" />
            In-progress Tasks
          </h2>
          <p className="text-gray-600 mt-1">Active development and current sprints</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{tasks.length} active tasks</span>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View Board
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => {
          const statusInfo = getStatusInfo(task.status);
          const isPaused = pausedTasks.includes(task.id);
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all ${isPaused ? 'opacity-75' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.icon} {statusInfo.label}
                    </span>
                    {isPaused && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        ⏸️ Paused
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {task.team}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitPullRequest size={14} />
                      {task.commits} commits
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertCircle size={14} />
                      {task.blockers} blockers
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle size={14} />
                      Due {task.dueDate}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <button 
                    onClick={() => togglePause(task.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    {isPaused ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              
              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-lg font-bold text-gray-900">{task.progress}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateProgress(task.id, task.progress - 5)}
                      className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                      disabled={task.progress <= 0}
                    >
                      -5%
                    </button>
                    <button 
                      onClick={() => updateProgress(task.id, task.progress + 5)}
                      className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                      disabled={task.progress >= 100}
                    >
                      +5%
                    </button>
                  </div>
                </div>
                
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  />
                </div>
                
                {/* Assignees and Stats */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {task.assignees.map((assignee, idx) => (
                        <div 
                          key={idx}
                          className="w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full border-2 border-white flex items-center justify-center text-sm font-medium text-blue-700"
                        >
                          {assignee}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{task.assignees.length} assignees</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <BarChart3 size={14} />
                        <span className="font-medium">{task.blockers}</span>
                      </div>
                      <div className="text-xs text-gray-500">Blockers</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <TrendingUp size={14} />
                        <span className="font-medium">{task.commits}</span>
                      </div>
                      <div className="text-xs text-gray-500">Commits</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length}%
            </div>
            <div className="text-sm text-gray-600">Avg. Progress</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {tasks.filter(t => t.progress >= 90).length}
            </div>
            <div className="text-sm text-gray-600">Near Completion</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {tasks.reduce((sum, task) => sum + task.blockers, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Blockers</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {tasks.reduce((sum, task) => sum + task.commits, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Commits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InProgressTasks;