import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Filter, Search, ThumbsUp, MessageSquare, 
  CheckCircle, Clock, AlertCircle, TrendingUp, 
  Users, Tag, BarChart, X, Edit2, Trash2,
  ChevronUp, ChevronDown, Star, ExternalLink
} from 'lucide-react';

const FeatureRequests = () => {
  // State for feature requests
  const [featureRequests, setFeatureRequests] = useState([
    {
      id: 1,
      title: 'Dark mode implementation',
      description: 'Add a dark mode theme option to reduce eye strain during nighttime usage.',
      status: 'under_review',
      priority: 'high',
      votes: 42,
      comments: 12,
      createdAt: '2023-10-15',
      createdBy: 'Alex Johnson',
      tags: ['UI/UX', 'Accessibility'],
      assignedTo: 'Design Team'
    },
    {
      id: 2,
      title: 'Export reports to PDF',
      description: 'Allow users to export analytics reports as PDF files for sharing.',
      status: 'planned',
      priority: 'medium',
      votes: 28,
      comments: 8,
      createdAt: '2023-10-10',
      createdBy: 'Sam Rivera',
      tags: ['Analytics', 'Export'],
      assignedTo: 'Dev Team'
    },
    {
      id: 3,
      title: 'Real-time collaboration',
      description: 'Enable multiple users to edit dashboards simultaneously with live updates.',
      status: 'in_progress',
      priority: 'high',
      votes: 56,
      comments: 21,
      createdAt: '2023-10-05',
      createdBy: 'Taylor Chen',
      tags: ['Collaboration', 'Real-time'],
      assignedTo: 'Backend Team'
    },
    {
      id: 4,
      title: 'Mobile app notifications',
      description: 'Push notifications for important updates when users are away from desktop.',
      status: 'completed',
      priority: 'medium',
      votes: 34,
      comments: 15,
      createdAt: '2023-09-28',
      createdBy: 'Jordan Lee',
      tags: ['Mobile', 'Notifications'],
      assignedTo: 'Mobile Team'
    },
    {
      id: 5,
      title: 'Custom dashboard widgets',
      description: 'Allow users to create and add custom widgets to their dashboards.',
      status: 'under_review',
      priority: 'low',
      votes: 19,
      comments: 5,
      createdAt: '2023-10-12',
      createdBy: 'Morgan Wells',
      tags: ['Customization', 'Widgets'],
      assignedTo: 'Frontend Team'
    },
    {
      id: 6,
      title: 'Advanced data filtering',
      description: 'Add multi-level filtering options for complex data analysis.',
      status: 'backlog',
      priority: 'medium',
      votes: 23,
      comments: 7,
      createdAt: '2023-10-08',
      createdBy: 'Casey Kim',
      tags: ['Data', 'Filters'],
      assignedTo: 'Not assigned'
    }
  ]);

  // State for new feature form
  const [newFeature, setNewFeature] = useState({
    title: '',
    description: '',
    priority: 'medium',
    tags: []
  });

  // State for filters and UI
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [sortBy, setSortBy] = useState('votes');

  // Stats for the dashboard
  const stats = {
    total: featureRequests.length,
    underReview: featureRequests.filter(fr => fr.status === 'under_review').length,
    inProgress: featureRequests.filter(fr => fr.status === 'in_progress').length,
    completed: featureRequests.filter(fr => fr.status === 'completed').length
  };

  // Handle voting for a feature request
  const handleVote = (id) => {
    setFeatureRequests(prev => prev.map(fr => 
      fr.id === id ? { ...fr, votes: fr.votes + 1 } : fr
    ));
  };

  // Handle adding a new feature request
  const handleAddFeature = () => {
    if (!newFeature.title.trim()) return;
    
    const newFeatureRequest = {
      id: featureRequests.length + 1,
      title: newFeature.title,
      description: newFeature.description,
      status: 'under_review',
      priority: newFeature.priority,
      votes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: 'Current User',
      tags: newFeature.tags,
      assignedTo: 'Not assigned'
    };
    
    setFeatureRequests([newFeatureRequest, ...featureRequests]);
    setNewFeature({ title: '', description: '', priority: 'medium', tags: [] });
    setShowNewForm(false);
  };

  // Handle adding a tag
  const handleAddTag = () => {
    if (tagInput.trim() && !newFeature.tags.includes(tagInput.trim())) {
      setNewFeature({
        ...newFeature,
        tags: [...newFeature.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setNewFeature({
      ...newFeature,
      tags: newFeature.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Filter and sort feature requests
  const filteredFeatures = featureRequests
    .filter(fr => {
      const matchesStatus = statusFilter === 'all' || fr.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || fr.priority === priorityFilter;
      const matchesSearch = fr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fr.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fr.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed': return { icon: <CheckCircle size={16} />, color: 'bg-green-100 text-green-800', label: 'Completed' };
      case 'in_progress': return { icon: <Clock size={16} />, color: 'bg-blue-100 text-blue-800', label: 'In Progress' };
      case 'planned': return { icon: <TrendingUp size={16} />, color: 'bg-purple-100 text-purple-800', label: 'Planned' };
      case 'under_review': return { icon: <AlertCircle size={16} />, color: 'bg-yellow-100 text-yellow-800', label: 'Under Review' };
      default: return { icon: <Clock size={16} />, color: 'bg-gray-100 text-gray-800', label: 'Backlog' };
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Feature Requests</h1>
              <p className="text-gray-600 mt-2">Manage and prioritize product feature requests from your team and users</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewForm(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <Plus size={20} />
              New Feature Request
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(stats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${index === 0 ? 'bg-indigo-100 text-indigo-600' : 
                  index === 1 ? 'bg-yellow-100 text-yellow-600' : 
                  index === 2 ? 'bg-blue-100 text-blue-600' : 
                  'bg-green-100 text-green-600'}`}>
                  {index === 0 ? <BarChart size={24} /> : 
                   index === 1 ? <AlertCircle size={24} /> : 
                   index === 2 ? <Clock size={24} /> : 
                   <CheckCircle size={24} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Filters */}
          <div className="lg:w-1/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-fit"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filters & Sort
              </h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="space-y-2">
                  {['all', 'under_review', 'in_progress', 'planned', 'completed', 'backlog'].map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors ${statusFilter === status ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <div className={`w-3 h-3 rounded-full ${getStatusInfo(status).color.split(' ')[0]}`} />
                      <span className="capitalize">{status === 'all' ? 'All Statuses' : status.replace('_', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Priority Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <div className="space-y-2">
                  {['all', 'high', 'medium', 'low'].map(priority => (
                    <button
                      key={priority}
                      onClick={() => setPriorityFilter(priority)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors ${priorityFilter === priority ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`} />
                      <span className="capitalize">{priority === 'all' ? 'All Priorities' : priority}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortBy('votes')}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors ${sortBy === 'votes' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span>Most Voted</span>
                    {sortBy === 'votes' && <ChevronUp size={18} />}
                  </button>
                  <button
                    onClick={() => setSortBy('recent')}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors ${sortBy === 'recent' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span>Most Recent</span>
                    {sortBy === 'recent' && <ChevronUp size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Feature Requests List */}
          <div className="lg:w-3/4">
            {/* New Feature Request Form */}
            <AnimatePresence>
              {showNewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">New Feature Request</h3>
                    <button onClick={() => setShowNewForm(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Feature Title</label>
                      <input
                        type="text"
                        value={newFeature.title}
                        onChange={(e) => setNewFeature({...newFeature, title: e.target.value})}
                        placeholder="What feature would you like to request?"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={newFeature.description}
                        onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                        placeholder="Describe the feature in detail..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <select
                          value={newFeature.priority}
                          onChange={(e) => setNewFeature({...newFeature, priority: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <div className="flex">
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                            placeholder="Add a tag and press Enter"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <button
                            onClick={handleAddTag}
                            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {newFeature.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                              {tag}
                              <button onClick={() => handleRemoveTag(tag)} className="text-indigo-600 hover:text-indigo-900">
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowNewForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddFeature}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Submit Feature Request
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feature Requests List */}
            <div className="space-y-4">
              {filteredFeatures.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200"
                >
                  <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No feature requests found</h3>
                  <p className="text-gray-600">Try adjusting your filters or create a new feature request.</p>
                </motion.div>
              ) : (
                filteredFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => handleVote(feature.id)}
                              className="flex flex-col items-center justify-center w-12 h-14 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                            >
                              <ChevronUp size={20} className="text-gray-600" />
                              <span className="font-bold text-gray-900">{feature.votes}</span>
                            </button>
                            
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusInfo(feature.status).color}`}>
                                  <span className="flex items-center gap-1">
                                    {getStatusInfo(feature.status).icon}
                                    {getStatusInfo(feature.status).label}
                                  </span>
                                </span>
                                <div className={`w-3 h-3 rounded-full ${getPriorityColor(feature.priority)}`} title={`${feature.priority} priority`} />
                              </div>
                              
                              <p className="text-gray-600 mb-4">{feature.description}</p>
                              
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Users size={14} />
                                  {feature.createdBy}
                                </span>
                                <span>{feature.createdAt}</span>
                                <span className="flex items-center gap-1">
                                  <Tag size={14} />
                                  Assigned to: {feature.assignedTo}
                                </span>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-4">
                                {feature.tags.map(tag => (
                                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                            <MessageSquare size={18} />
                            <span>{feature.comments}</span>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500" />
                Most requested feature: {featureRequests.reduce((max, fr) => fr.votes > max.votes ? fr : max, featureRequests[0]).title}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp size={16} className="text-green-500" />
                Total votes: {featureRequests.reduce((sum, fr) => sum + fr.votes, 0)}
              </span>
            </div>
            <div>
              Showing {filteredFeatures.length} of {featureRequests.length} feature requests
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureRequests;