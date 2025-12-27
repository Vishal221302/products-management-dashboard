import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, CheckCircle, Clock, HelpCircle, 
  Users, TrendingUp, TrendingDown, X, Filter,
  ChevronRight, MessageSquare, User, ExternalLink
} from 'lucide-react';

const SupportTickets = ({ tickets = [] }) => {
  // Default tickets if none provided
  const defaultTickets = [
    { id: 1, title: 'Login issue after update', status: 'open', priority: 'high', createdAt: '2023-11-15', customer: 'Alex Johnson', agent: 'Sarah Miller', category: 'Technical', timeToResolve: '2h 30m' },
    { id: 2, title: 'Billing discrepancy question', status: 'in_progress', priority: 'medium', createdAt: '2023-11-14', customer: 'Marketing Team', agent: 'Mike Chen', category: 'Billing', timeToResolve: '1h 45m' },
    { id: 3, title: 'Feature request clarification', status: 'resolved', priority: 'low', createdAt: '2023-11-14', customer: 'Taylor Swift', agent: 'David Park', category: 'Feature', timeToResolve: '45m' },
    { id: 4, title: 'Performance issue on dashboard', status: 'open', priority: 'high', createdAt: '2023-11-13', customer: 'Tech Corp', agent: 'Not assigned', category: 'Performance', timeToResolve: '4h 15m' },
    { id: 5, title: 'Export data not working', status: 'in_progress', priority: 'medium', createdAt: '2023-11-12', customer: 'Data Analytics', agent: 'Lisa Wang', category: 'Technical', timeToResolve: '3h 20m' },
    { id: 6, title: 'Mobile app crashing on launch', status: 'pending', priority: 'critical', createdAt: '2023-11-12', customer: 'Mobile User', agent: 'James Wilson', category: 'Bug', timeToResolve: '5h 10m' },
  ];

  const [ticketData, setTicketData] = useState(tickets.length > 0 ? tickets : defaultTickets);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Calculate stats
  const stats = {
    total: ticketData.length,
    open: ticketData.filter(t => t.status === 'open').length,
    inProgress: ticketData.filter(t => t.status === 'in_progress').length,
    resolved: ticketData.filter(t => t.status === 'resolved').length,
    pending: ticketData.filter(t => t.status === 'pending').length,
    avgResolutionTime: '2h 45m',
    satisfaction: '94%'
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch(status) {
      case 'open': return { 
        icon: <AlertCircle size={16} />, 
        color: 'bg-red-100 text-red-800 border-red-200',
        label: 'Open'
      };
      case 'in_progress': return { 
        icon: <Clock size={16} />, 
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        label: 'In Progress'
      };
      case 'resolved': return { 
        icon: <CheckCircle size={16} />, 
        color: 'bg-green-100 text-green-800 border-green-200',
        label: 'Resolved'
      };
      case 'pending': return { 
        icon: <HelpCircle size={16} />, 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        label: 'Pending'
      };
      default: return { 
        icon: <AlertCircle size={16} />, 
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        label: 'Unknown'
      };
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Get priority label
  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'critical': return 'Critical';
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Unknown';
    }
  };

  // Filter tickets
  const filteredTickets = ticketData.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  // Handle ticket status change
  const handleStatusChange = (ticketId, newStatus) => {
    setTicketData(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
  };

  // Handle ticket assignment
  const handleAssignTicket = (ticketId, agentName) => {
    setTicketData(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, agent: agentName } : ticket
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare size={24} className="text-indigo-600" />
            Support Tickets Status
          </h2>
          <p className="text-gray-600 mt-1">Manage and monitor customer support tickets</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              List View
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Users size={18} />
            New Ticket
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries({
          'Total Tickets': { value: stats.total, icon: <MessageSquare size={20} />, color: 'bg-blue-100 text-blue-600' },
          'Open': { value: stats.open, icon: <AlertCircle size={20} />, color: 'bg-red-100 text-red-600' },
          'In Progress': { value: stats.inProgress, icon: <Clock size={20} />, color: 'bg-yellow-100 text-yellow-600' },
          'Resolved': { value: stats.resolved, icon: <CheckCircle size={20} />, color: 'bg-green-100 text-green-600' },
        }).map(([key, data], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-bold text-gray-900">{data.value}</p>
                <p className="text-sm text-gray-600 mt-1">{key}</p>
              </div>
              <div className={`p-2 rounded-lg ${data.color}`}>
                {data.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Resolution Time</p>
              <p className="text-xl font-bold text-gray-900">{stats.avgResolutionTime}</p>
            </div>
            <Clock size={24} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown size={16} className="text-green-600" />
            <span className="text-sm text-green-600 font-medium">12% faster than last week</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Customer Satisfaction</p>
              <p className="text-xl font-bold text-gray-900">{stats.satisfaction}</p>
            </div>
            <TrendingUp size={24} className="text-green-600" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={16} className="text-green-600" />
            <span className="text-sm text-green-600 font-medium">+3% from last month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Assigned to You</p>
              <p className="text-xl font-bold text-gray-900">
                {ticketData.filter(t => t.agent === 'You' || t.agent.includes('Sarah')).length}
              </p>
            </div>
            <User size={24} className="text-purple-600" />
          </div>
          <div className="text-sm text-gray-600 mt-2">Active tickets requiring attention</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['all', 'open', 'in_progress', 'resolved', 'pending'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${statusFilter === status ? 
                `${getStatusInfo(status).color.split(' ')[0]} ${getStatusInfo(status).color.split(' ')[1]} border` : 
                'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All Status' : getStatusInfo(status).label}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 ml-4">
          {['all', 'critical', 'high', 'medium', 'low'].map(priority => (
            <button
              key={priority}
              onClick={() => setPriorityFilter(priority)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${priorityFilter === priority ? 
                'bg-gray-800 text-white' : 
                'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {priority === 'all' ? 'All Priority' : getPriorityLabel(priority)}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
        <AnimatePresence>
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedTicket(ticket)}
              className={`bg-white border rounded-lg hover:shadow-md transition-all cursor-pointer overflow-hidden group ${viewMode === 'list' ? 'flex items-center justify-between p-4' : 'p-5'}`}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {ticket.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{ticket.category}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`} 
                         title={`${ticket.priority} priority`} />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusInfo(ticket.status).color}`}>
                      {getStatusInfo(ticket.status).icon}
                      {getStatusInfo(ticket.status).label}
                    </span>
                    <span className="text-sm text-gray-500">{ticket.timeToResolve}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span className="text-gray-700">{ticket.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Agent:</span>
                      <span className={`font-medium ${ticket.agent === 'Not assigned' ? 'text-orange-600' : 'text-gray-900'}`}>
                        {ticket.agent}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                // List View
                <>
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-10 rounded ${getPriorityColor(ticket.priority)}`} />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {ticket.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>{ticket.category}</span>
                        <span>•</span>
                        <span>{ticket.customer}</span>
                        <span>•</span>
                        <span>{ticket.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusInfo(ticket.status).color}`}>
                      {getStatusInfo(ticket.status).icon}
                      {getStatusInfo(ticket.status).label}
                    </span>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{ticket.agent}</div>
                      <div className="text-xs text-gray-500">{ticket.timeToResolve}</div>
                    </div>
                    
                    <ChevronRight size={18} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600">Try adjusting your filters or create a new ticket.</p>
        </div>
      )}

      {/* Ticket Detail Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTicket(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedTicket.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedTicket.status).color}`}>
                        {getStatusInfo(selectedTicket.status).icon}
                        {getStatusInfo(selectedTicket.status).label}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-white`}>
                        {getPriorityLabel(selectedTicket.priority)} Priority
                      </span>
                      <span className="text-gray-600">• {selectedTicket.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Customer</h4>
                    <p className="text-gray-900">{selectedTicket.customer}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned Agent</h4>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className={`font-medium ${selectedTicket.agent === 'Not assigned' ? 'text-orange-600' : 'text-gray-900'}`}>
                        {selectedTicket.agent}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Created</h4>
                    <p className="text-gray-900">{selectedTicket.createdAt}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Time to Resolve</h4>
                    <p className="text-gray-900">{selectedTicket.timeToResolve}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">
                      This is a detailed description of the support ticket. The customer reported an issue with {selectedTicket.title.toLowerCase()}.
                      Additional context and details would appear here for the support agent to review and resolve.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusChange(selectedTicket.id, 'in_progress')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Start Working
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedTicket.id, 'resolved')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Mark Resolved
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAssignTicket(selectedTicket.id, 'You')}
                      className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Assign to Me
                    </button>
                    <button className="px-4 py-2 border border-indigo-300 hover:bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                      <ExternalLink size={16} />
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportTickets;