// components/analytics/UserRoles.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield,
  Users,
  UserCheck,
  Building,
  Crown,
  UserCog,
  BarChart3,
  MoreVertical
} from 'lucide-react';

const UserRoles = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('admin');

  useEffect(() => {
    // Simulated role data
    const roleData = [
      {
        id: 'admin',
        name: 'Administrators',
        count: 12,
        color: 'from-rose-500 to-pink-500',
        bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
        border: 'border-rose-200',
        icon: Crown,
        description: 'Full system access',
        growth: '+2.5%',
        users: [
          { name: 'Alex Johnson', email: 'alex@example.com', lastActive: '2 hours ago' },
          { name: 'Sarah Wilson', email: 'sarah@example.com', lastActive: '5 minutes ago' },
          { name: 'Michael Chen', email: 'michael@example.com', lastActive: '1 day ago' }
        ]
      },
      {
        id: 'manager',
        name: 'Managers',
        count: 45,
        color: 'from-blue-500 to-cyan-500',
        bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        icon: Building,
        description: 'Team management access',
        growth: '+8.2%',
        users: [
          { name: 'Emma Davis', email: 'emma@example.com', lastActive: '30 minutes ago' },
          { name: 'David Brown', email: 'david@example.com', lastActive: '3 hours ago' },
          { name: 'Lisa Taylor', email: 'lisa@example.com', lastActive: 'Yesterday' }
        ]
      },
      {
        id: 'editor',
        name: 'Editors',
        count: 78,
        color: 'from-emerald-500 to-teal-500',
        bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        border: 'border-emerald-200',
        icon: UserCog,
        description: 'Content management access',
        growth: '+5.7%',
        users: [
          { name: 'Robert Miller', email: 'robert@example.com', lastActive: '1 hour ago' },
          { name: 'Jennifer Lee', email: 'jennifer@example.com', lastActive: '2 days ago' },
          { name: 'Thomas Wilson', email: 'thomas@example.com', lastActive: 'Just now' }
        ]
      },
      {
        id: 'customer',
        name: 'Customers',
        count: 1248,
        color: 'from-purple-500 to-indigo-500',
        bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
        border: 'border-purple-200',
        icon: Users,
        description: 'Regular users',
        growth: '+12.5%',
        users: [
          { name: 'Customer Support', email: 'support@example.com', lastActive: 'Active' },
          { name: 'General Users', email: 'users@example.com', lastActive: 'Various' }
        ]
      }
    ];
    
    setRoles(roleData);
  }, []);

  const selectedRoleData = roles.find(role => role.id === selectedRole) || roles[0];

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">User Roles & Permissions</h2>
              <p className="text-gray-500 text-sm mt-1">Role distribution and access levels</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Role Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {roles.map((role) => (
            <motion.button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedRole === role.id 
                  ? `${role.bg} ${role.border} ring-2 ring-opacity-50 ${role.color.replace('from-', 'ring-').split(' ')[0]}`
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${role.color}`}>
                  <role.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-emerald-600">{role.growth}</span>
              </div>
              
              <div className="text-2xl font-bold text-gray-900">{role.count}</div>
              <div className="text-sm font-medium text-gray-700">{role.name}</div>
              <div className="text-xs text-gray-500 mt-1 truncate">{role.description}</div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${role.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((role.count / 1248) * 100, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Selected Role Details */}
        {selectedRoleData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{selectedRoleData.name} Details</h3>
              <div className="text-sm text-gray-500">{selectedRoleData.count} users</div>
            </div>

            {/* Permissions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Dashboard Access', enabled: selectedRoleData.id === 'admin' || selectedRoleData.id === 'manager' },
                { name: 'User Management', enabled: selectedRoleData.id === 'admin' },
                { name: 'Content Edit', enabled: selectedRoleData.id === 'admin' || selectedRoleData.id === 'editor' },
                { name: 'Analytics View', enabled: selectedRoleData.id === 'admin' || selectedRoleData.id === 'manager' },
                { name: 'Settings Access', enabled: selectedRoleData.id === 'admin' },
                { name: 'Billing Access', enabled: selectedRoleData.id === 'admin' || selectedRoleData.id === 'manager' },
                { name: 'API Access', enabled: selectedRoleData.id === 'admin' },
                { name: 'Export Data', enabled: selectedRoleData.id === 'admin' || selectedRoleData.id === 'manager' }
              ].map((permission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border flex items-center justify-between ${
                    permission.enabled 
                      ? 'bg-emerald-50 border-emerald-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-700">{permission.name}</span>
                  <div className={`w-2 h-2 rounded-full ${permission.enabled ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                </motion.div>
              ))}
            </div>

            {/* Active Users List */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {selectedRoleData.users.map((user, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{user.lastActive}</div>
                      <div className="text-xs text-gray-500">Last active</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Role Distribution Chart */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-900">Role Distribution</h4>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Total: 1,383 users</span>
                </div>
              </div>
              
              <div className="h-8 flex rounded-lg overflow-hidden">
                {roles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    className="h-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(role.count / 1383) * 100}%`
                    }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut" 
                    }}
                  >
                    <div 
                      className={`h-full bg-gradient-to-r ${role.color}`}
                      title={`${role.name}: ${role.count} users`}
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color}`} />
                    <span>{role.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserRoles;