// src/pages/Settings.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Save,
  Bell,
  Users,
  Shield,
  Palette,
  Database,
  Globe,
  Key,
  Mail,
  Zap,
  Eye,
  EyeOff,
  ChevronRight,
  Check,
  X,
  Upload,
  Download,
  Trash2,
  HelpCircle,
  Lock,
  User,
  Building,
  CreditCard,
  Clock,
  AlertCircle,
  Wifi,
  Server,
  Cpu,
  HardDrive,
  Network,
  Cloud,
  Smartphone,
  Monitor,
  UserPlus,
  FileText
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [unsavedChanges, setUnsavedChanges] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [backupStatus, setBackupStatus] = useState('idle');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    slack: false,
    sms: false,
    weeklyDigest: true,
    featureUpdates: true,
    securityAlerts: true,
    maintenanceAlerts: true
  });
  const [appearance, setAppearance] = useState({
    theme: 'light',
    density: 'comfortable',
    fontSize: 'medium',
    animations: true,
    reducedMotion: false
  });
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API', key: 'sk_prod_1234567890abcdef', created: '2024-01-15', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development API', key: 'sk_dev_abcdef1234567890', created: '2024-01-10', lastUsed: '5 days ago' },
    { id: 3, name: 'Webhook API', key: 'sk_wh_7890abcdef123456', created: '2024-01-05', lastUsed: '1 week ago' },
  ]);

  const settingsSections = [
    { id: 'general', label: 'General', icon: <SettingsIcon size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'team', label: 'Team & Permissions', icon: <Users size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={20} /> },
    { id: 'integrations', label: 'Integrations', icon: <Globe size={20} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={20} /> },
    { id: 'api', label: 'API Settings', icon: <Key size={20} /> },
    { id: 'data', label: 'Data & Storage', icon: <Database size={20} /> },
    { id: 'advanced', label: 'Advanced', icon: <Zap size={20} /> },
  ];

  const handleSettingChange = (section, key, value) => {
    setUnsavedChanges(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving changes:', unsavedChanges);
    setUnsavedChanges({});
  };

  const handleCreateApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: `New API Key ${apiKeys.length + 1}`,
      key: `sk_new_${Math.random().toString(36).substr(2, 16)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleDeleteApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const handleBackup = () => {
    setBackupStatus('backing-up');
    setTimeout(() => {
      setBackupStatus('completed');
      setTimeout(() => setBackupStatus('idle'), 3000);
    }, 2000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    defaultValue="ProductHub Inc."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    defaultValue="America/New_York"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">GMT (London)</option>
                    <option value="Europe/Paris">CET (Paris)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                  <select
                    defaultValue="en"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    defaultValue="MM/DD/YYYY"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Auto-assign new tickets</p>
                    <p className="text-sm text-gray-600">Automatically assign incoming tickets to available agents</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                      onChange={(e) => handleSettingChange('general', 'autoAssignTickets', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Require approval for high-priority features</p>
                    <p className="text-sm text-gray-600">High-priority feature requests need manager approval</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                      onChange={(e) => handleSettingChange('general', 'requireApproval', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Enable automated feedback collection</p>
                    <p className="text-sm text-gray-600">Automatically collect feedback after ticket resolution</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                      onChange={(e) => handleSettingChange('general', 'autoFeedback', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-sm text-gray-600">Receive notifications via this channel</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                          setNotifications(prev => ({ ...prev, [key]: e.target.checked }));
                          handleSettingChange('notifications', key, e.target.checked);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="time"
                      defaultValue="22:00"
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => handleSettingChange('notifications', 'quietStart', e.target.value)}
                    />
                    <span className="text-gray-600">to</span>
                    <input
                      type="time"
                      defaultValue="07:00"
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => handleSettingChange('notifications', 'quietEnd', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Digest Frequency</label>
                  <select
                    defaultValue="weekly"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => handleSettingChange('notifications', 'digestFrequency', e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">
                  Invite Member
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Alex Johnson', email: 'alex@producthub.com', role: 'Admin', status: 'active' },
                  { name: 'Sarah Miller', email: 'sarah@producthub.com', role: 'Manager', status: 'active' },
                  { name: 'Mike Chen', email: 'mike@producthub.com', role: 'Developer', status: 'active' },
                  { name: 'Taylor Swift', email: 'taylor@producthub.com', role: 'Viewer', status: 'pending' },
                  { name: 'David Park', email: 'david@producthub.com', role: 'Analyst', status: 'active' },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-blue-700">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <select
                        defaultValue={member.role.toLowerCase()}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="developer">Developer</option>
                        <option value="analyst">Analyst</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.status}
                      </span>
                      
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Groups</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Admins', description: 'Full access to all features', members: 2 },
                  { name: 'Managers', description: 'Can manage teams and features', members: 4 },
                  { name: 'Developers', description: 'Can edit and update features', members: 8 },
                  { name: 'Analysts', description: 'View and analyze data only', members: 3 },
                  { name: 'Viewers', description: 'Read-only access', members: 12 },
                ].map((group, index) => (
                  <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-2">{group.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{group.members} members</span>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        twoFactorEnabled
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {twoFactorEnabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                    <select
                      defaultValue="8"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                    >
                      <option value="1">1 hour</option>
                      <option value="4">4 hours</option>
                      <option value="8">8 hours</option>
                      <option value="24">24 hours</option>
                      <option value="168">1 week</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry</label>
                    <select
                      defaultValue="90"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Security</h3>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium">
                  Update Password
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  { device: 'MacBook Pro', browser: 'Chrome 119', location: 'New York, NY', lastActive: 'Current', current: true },
                  { device: 'iPhone 14', browser: 'Safari 16', location: 'Boston, MA', lastActive: '2 hours ago', current: false },
                  { device: 'Windows PC', browser: 'Firefox 119', location: 'San Francisco, CA', lastActive: '1 day ago', current: false },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        {session.device.includes('Mac') || session.device.includes('iPhone') ? (
                          <Monitor size={20} className="text-gray-600" />
                        ) : session.device.includes('Windows') ? (
                          <Server size={20} className="text-gray-600" />
                        ) : (
                          <Smartphone size={20} className="text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.device}</p>
                        <p className="text-sm text-gray-600">{session.browser} • {session.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{session.lastActive}</span>
                      {session.current ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Current
                        </span>
                      ) : (
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme & Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Light', value: 'light', active: true },
                  { name: 'Dark', value: 'dark', active: false },
                  { name: 'System', value: 'system', active: false },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => {
                      setAppearance(prev => ({ ...prev, theme: theme.value }));
                      handleSettingChange('appearance', 'theme', theme.value);
                    }}
                    className={`p-4 border-2 rounded-xl text-center transition-all ${
                      appearance.theme === theme.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full h-32 rounded-lg mb-3 ${
                      theme.value === 'light' ? 'bg-gray-100' :
                      theme.value === 'dark' ? 'bg-gray-900' :
                      'bg-gradient-to-r from-gray-100 to-gray-900'
                    }`} />
                    <p className="font-medium text-gray-900">{theme.name}</p>
                    {appearance.theme === theme.value && (
                      <div className="mt-2 text-indigo-600 flex items-center justify-center gap-1">
                        <Check size={16} />
                        <span className="text-sm">Active</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interface Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Density</label>
                  <div className="flex gap-2">
                    {['compact', 'comfortable', 'spacious'].map((density) => (
                      <button
                        key={density}
                        onClick={() => {
                          setAppearance(prev => ({ ...prev, density }));
                          handleSettingChange('appearance', 'density', density);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium capitalize ${
                          appearance.density === density
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {density}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <div className="flex gap-2">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setAppearance(prev => ({ ...prev, fontSize: size }));
                          handleSettingChange('appearance', 'fontSize', size);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium capitalize ${
                          appearance.fontSize === size
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Enable animations</p>
                      <p className="text-sm text-gray-600">Smooth transitions and effects</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appearance.animations}
                        onChange={(e) => {
                          setAppearance(prev => ({ ...prev, animations: e.target.checked }));
                          handleSettingChange('appearance', 'animations', e.target.checked);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Reduced motion</p>
                      <p className="text-sm text-gray-600">Minimize animations for accessibility</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appearance.reducedMotion}
                        onChange={(e) => {
                          setAppearance(prev => ({ ...prev, reducedMotion: e.target.checked }));
                          handleSettingChange('appearance', 'reducedMotion', e.target.checked);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
                <button
                  onClick={handleCreateApiKey}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                >
                  Generate New Key
                </button>
              </div>
              
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                        <p className="text-sm text-gray-600 font-mono bg-gray-800 text-gray-100 px-2 py-1 rounded mt-1">
                          {apiKey.key}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteApiKey(apiKey.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Created: {apiKey.created}</span>
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Rate Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-2">1,000</div>
                  <div className="text-sm text-gray-600">Requests per minute</div>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-2">10,000</div>
                  <div className="text-sm text-gray-600">Requests per hour</div>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-2">100,000</div>
                  <div className="text-sm text-gray-600">Requests per day</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhooks</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Feature Created</p>
                      <p className="text-sm text-gray-600">https://webhook.producthub.com/feature-created</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Ticket Updated</p>
                      <p className="text-sm text-gray-600">https://webhook.producthub.com/ticket-updated</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-gray-900">Storage Usage</p>
                      <p className="text-sm text-gray-600">Current storage consumption</p>
                    </div>
                    <Database size={24} className="text-blue-600" />
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">15.8 GB of 100 GB used</span>
                      <span className="font-medium text-gray-900">15.8%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-1/6" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-900">12.4 GB</div>
                      <div className="text-gray-600">User Data</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">3.4 GB</div>
                      <div className="text-gray-600">Attachments</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-gray-900">Backup Status</p>
                      <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
                    </div>
                    <Cloud size={24} className="text-green-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Automatic backups</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <button
                      onClick={handleBackup}
                      disabled={backupStatus === 'backing-up'}
                      className={`w-full py-2.5 rounded-lg font-medium ${
                        backupStatus === 'backing-up'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {backupStatus === 'idle' && 'Backup Now'}
                      {backupStatus === 'backing-up' && 'Backing up...'}
                      {backupStatus === 'completed' && 'Backup Complete!'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { format: 'CSV', description: 'Comma separated values', size: '12.4 MB' },
                  { format: 'JSON', description: 'JavaScript Object Notation', size: '24.8 MB' },
                  { format: 'Excel', description: 'Microsoft Excel format', size: '18.6 MB' },
                ].map((exportOption) => (
                  <div key={exportOption.format} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{exportOption.format}</h4>
                        <p className="text-sm text-gray-600">{exportOption.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">{exportOption.size}</span>
                    </div>
                    <button className="w-full py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      Export {exportOption.format}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Retention</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Auto-delete old data</p>
                    <p className="text-sm text-gray-600">Automatically delete data older than specified period</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                    <option value="forever">Forever</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <SettingsIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Section under development</h3>
            <p className="text-gray-600">This settings section is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5">
      {/* Header */}
      <div className="mb-10">
  {/* Header Section */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <SettingsIcon size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your product management workspace</p>
        </div>
      </div>
    </div>

    {/* Save Changes Button */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {Object.keys(unsavedChanges).length > 0 && (
        <div className="flex items-center gap-2 animate-pulse">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-50"></div>
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 px-4 py-2.5 rounded-xl">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-orange-700">
                {Object.keys(unsavedChanges).length} unsaved change{Object.keys(unsavedChanges).length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={handleSave}
        disabled={Object.keys(unsavedChanges).length === 0}
        className={`group relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          Object.keys(unsavedChanges).length === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        }`}
      >
        <div className="relative z-10 flex items-center gap-2">
          <Save size={18} />
          <span>Save Changes</span>
        </div>
        {Object.keys(unsavedChanges).length > 0 && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        )}
      </button>
    </div>
  </div>

  {/* Stats Cards - Enhanced Design */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
    {[
      { 
        label: 'Active Users', 
        value: '2,458', 
        change: '+12%', 
        icon: <Users size={22} />, 
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        borderColor: 'border-blue-100',
        trend: 'up'
      },
      { 
        label: 'API Calls Today', 
        value: '12.4K', 
        change: '+8.2%', 
        icon: <Globe size={22} />, 
        color: 'from-emerald-500 to-green-500',
        bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
        borderColor: 'border-emerald-100',
        trend: 'up'
      },
      { 
        label: 'Storage Used', 
        value: '15.8 GB', 
        change: '-3.1%', 
        icon: <Database size={22} />, 
        color: 'from-purple-500 to-violet-500',
        bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
        borderColor: 'border-purple-100',
        trend: 'down'
      },
      { 
        label: 'System Uptime', 
        value: '99.9%', 
        change: '+0.1%', 
        icon: <Server size={22} />, 
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
        borderColor: 'border-amber-100',
        trend: 'up'
      },
    ].map((stat, index) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`relative overflow-hidden group ${stat.bgColor} border ${stat.borderColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg`}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
          <div className={`w-full h-full bg-gradient-to-br ${stat.color} rounded-full`}></div>
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-sm`}>
              <div className="text-white">
                {stat.icon}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              stat.trend === 'up' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {stat.trend === 'up' ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {stat.change}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {stat.change}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">from last week</span>
          </div>
          
          {/* Progress Bar for Storage */}
          {stat.label === 'Storage Used' && (
            <div className="mt-4">
              <div className="flex justify-between text-xs font-medium text-gray-600 mb-1.5">
                <span>Storage</span>
                <span>15.8% used</span>
              </div>
              <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: '15.8%' }}></div>
              </div>
            </div>
          )}
          
          {/* Hover Effect Line */}
          <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transition-all duration-300 opacity-30"></div>
        </div>
      </motion.div>
    ))}
  </div>

  
    </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-24">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeSection === section.id ? 'text-indigo-600' : 'text-gray-500'}>
                      {section.icon}
                    </span>
                    <span className="font-medium">{section.label}</span>
                  </div>
                  {unsavedChanges[section.id] && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Quick Help */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <HelpCircle size={18} />
                <span className="font-medium">Need help?</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Contact support for assistance with settings configuration
              </p>
              <button className="w-full py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Main Settings Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              {settingsSections.find(s => s.id === activeSection)?.icon}
              <h2 className="text-xl font-bold text-gray-900">
                {settingsSections.find(s => s.id === activeSection)?.label}
              </h2>
            </div>

            {renderSection()}

            {/* Danger Zone - For destructive actions */}
            {(activeSection === 'security' || activeSection === 'data') && (
              <div className="mt-12 pt-8 border-t border-red-200">
                <h3 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h3>
                <div className="space-y-4">
                  {activeSection === 'security' && (
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-gray-900">Delete Account</p>
                        <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                      </div>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">
                        Delete Account
                      </button>
                    </div>
                  )}
                  
                  {activeSection === 'data' && (
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-gray-900">Delete All Data</p>
                        <p className="text-sm text-gray-600">Permanently delete all data from the system</p>
                      </div>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">
                        Delete All Data
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Configuration Changes</h3>
            <div className="space-y-3">
              {[
                { user: 'Alex Johnson', action: 'updated notification settings', time: '10 minutes ago' },
                { user: 'Sarah Miller', action: 'changed team permissions', time: '2 hours ago' },
                { user: 'System', action: 'auto-backup completed', time: '5 hours ago' },
                { user: 'Mike Chen', action: 'generated new API key', time: '1 day ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User size={14} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;