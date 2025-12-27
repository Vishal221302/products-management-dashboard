// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Award,
  Star,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Clock,
  Edit2,
  Camera,
  Save,
  X,
  Download,
  Upload,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Link as LinkIcon,
  Briefcase,
  GraduationCap,
  BookOpen,
  Trophy,
  Activity,
  Bell,
  Settings,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  CreditCard,
  Shield as ShieldIcon,
  Heart,
  MessageSquare,
  Share2,
  LogOut,
  Zap,
  Sparkles,
  Lock,
  Unlock,
  Smartphone,
  Cpu,
  Database
} from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyDigest: true,
    productUpdates: true,
    securityAlerts: true,
    teamMentions: true,
  });

  // User data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    title: 'Senior Product Manager',
    department: 'Product Management',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    bio: 'Product leader with 8+ years experience in SaaS product management. Passionate about user-centered design and data-driven decision making. Currently leading the product roadmap for our flagship product suite.',
    joinDate: '2022-03-15',
    employeeId: 'EMP-2022-0425',
    skills: ['Product Strategy', 'User Research', 'Data Analysis', 'Agile Methodologies', 'Roadmapping', 'Team Leadership'],
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
    social: {
      twitter: 'alexjohnson',
      linkedin: 'alex-johnson-pm',
      github: 'alexjohnson',
      website: 'alexjohnson.design'
    }
  });

  // Stats
  const userStats = [
    { label: 'Projects Managed', value: '24', icon: <Target size={20} />, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Team Members', value: '18', icon: <Users size={20} />, color: 'from-purple-500 to-pink-500', change: '+3' },
    { label: 'Features Shipped', value: '156', icon: <BarChart3 size={20} />, color: 'from-emerald-500 to-green-500', change: '+28' },
    { label: 'Satisfaction', value: '4.8', icon: <Star size={20} />, color: 'from-amber-500 to-orange-500', change: '+0.3' },
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'Completed feature review', details: 'Mobile redesign project', time: '2 hours ago', type: 'work' },
    { id: 2, action: 'Posted update', details: 'Quarterly roadmap presentation', time: '5 hours ago', type: 'update' },
    { id: 3, action: 'Completed training', details: 'Advanced analytics certification', time: '1 day ago', type: 'learning' },
    { id: 4, action: 'Team meeting', details: 'Sprint planning session', time: '2 days ago', type: 'meeting' },
    { id: 5, action: 'Published article', details: 'Product management best practices', time: '3 days ago', type: 'publication' },
  ];

  // Current projects
  const currentProjects = [
    { id: 1, name: 'Mobile App Redesign', progress: 75, deadline: '2024-03-15', team: 8, status: 'on-track' },
    { id: 2, name: 'Analytics Dashboard v2', progress: 45, deadline: '2024-04-30', team: 6, status: 'on-track' },
    { id: 3, name: 'API Integration Suite', progress: 90, deadline: '2024-02-28', team: 4, status: 'at-risk' },
    { id: 4, name: 'User Onboarding Flow', progress: 30, deadline: '2024-05-15', team: 5, status: 'on-track' },
  ];

  // Certifications
  const certifications = [
    { id: 1, name: 'Certified Product Manager', issuer: 'Product School', date: '2023-06-15', expiry: '2026-06-15' },
    { id: 2, name: 'Agile Certified Practitioner', issuer: 'PMI', date: '2022-11-20', expiry: '2025-11-20' },
    { id: 3, name: 'Data Analytics Professional', issuer: 'Google', date: '2023-08-10', expiry: 'N/A' },
    { id: 4, name: 'User Experience Design', issuer: 'Nielsen Norman Group', date: '2023-03-05', expiry: 'N/A' },
  ];

  // Security settings
  const securityStatus = [
    { feature: 'Two-Factor Authentication', status: 'enabled', lastUpdated: '2024-01-15' },
    { feature: 'Password Strength', status: 'strong', lastUpdated: 'Today' },
    { feature: 'Active Sessions', status: '3 devices', lastUpdated: '2 hours ago' },
    { feature: 'Login History', status: 'normal', lastUpdated: 'Today' },
  ];

  // Skills data
  const skillsData = [
    { category: 'Technical', skills: [
      { name: 'React.js', level: 90, years: 4 },
      { name: 'Node.js', level: 85, years: 3 },
      { name: 'TypeScript', level: 80, years: 2 },
      { name: 'AWS', level: 75, years: 2 },
      { name: 'Docker', level: 70, years: 2 }
    ]},
    { category: 'Product', skills: [
      { name: 'Product Strategy', level: 95, years: 5 },
      { name: 'User Research', level: 90, years: 4 },
      { name: 'Data Analysis', level: 85, years: 3 },
      { name: 'Roadmapping', level: 95, years: 5 },
      { name: 'Agile Methodologies', level: 90, years: 4 }
    ]},
    { category: 'Soft Skills', skills: [
      { name: 'Leadership', level: 90, years: 4 },
      { name: 'Communication', level: 95, years: 5 },
      { name: 'Problem Solving', level: 85, years: 4 },
      { name: 'Team Management', level: 90, years: 3 },
      { name: 'Stakeholder Mgmt', level: 85, years: 3 }
    ]}
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', userData);
    setIsEditing(false);
  };

  const handleExportData = () => {
    console.log('Exporting user data');
    // In a real app, this would trigger a download
    alert('Data export started. You will receive an email when it\'s ready.');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    console.log('Changing password:', passwordData);
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  const handleLogout = () => {
    console.log('Logging out');
    // In a real app, this would clear auth tokens and redirect
    window.location.href = '/login';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillLevelColor = (level) => {
    if (level >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (level >= 75) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (level >= 60) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account');
      // In a real app, this would call an API
      alert('Account deletion requested. You will receive a confirmation email.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative mb-10">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-soft overflow-hidden">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
              <button className="absolute top-4 right-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                <Camera size={16} className="inline mr-2" />
                Change Cover
              </button>
            </div>
            
            {/* Profile Header */}
            <div className="px-8 pb-8 pt-0">
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 -mt-16">
                {/* Profile Image */}
                <div className="relative">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl border-4 border-white bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shadow-lg">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full rounded-2xl object-cover" />
                      ) : (
                        <User size={48} className="text-blue-600" />
                      )}
                    </div>
                    <label htmlFor="profile-image-upload" className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                      <Camera size={18} className="text-gray-600" />
                      <input
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                        <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium">
                          {userData.title}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <span className="flex items-center gap-2">
                          <Mail size={16} />
                          {userData.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin size={16} />
                          {userData.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          Joined {new Date(userData.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
                      >
                        {isEditing ? <X size={18} /> : <Edit2 size={18} />}
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all">
                        <Share2 size={18} />
                        Share Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {userStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                        <div className={stat.color.replace('from-', 'text-').split(' ')[0]}>
                          {stat.icon}
                        </div>
                      </div>
                      <span className="text-sm text-gray-700">{stat.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{stat.value}</div>
                      <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={18} className="text-green-600" />
                Security Status
              </h3>
              <div className="space-y-3">
                {securityStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.feature}</span>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === 'enabled' || item.status === 'strong' || item.status === 'normal'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{item.lastUpdated}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowChangePassword(true)}
                className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center gap-2"
              >
                <Key size={14} />
                Change Password
              </button>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="space-y-3">
                {Object.entries(userData.social).map(([platform, handle]) => (
                  <a
                    key={platform}
                    href={`https://${platform}.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {platform === 'twitter' && <Twitter size={18} className="text-blue-400" />}
                      {platform === 'linkedin' && <Linkedin size={18} className="text-blue-600" />}
                      {platform === 'github' && <Github size={18} className="text-gray-800" />}
                      {platform === 'website' && <Globe size={18} className="text-green-600" />}
                      <span className="text-sm font-medium text-gray-700 capitalize">{platform}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* Export Data */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Data Management</h3>
              <button
                onClick={handleExportData}
                className="w-full mb-3 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
              >
                <Download size={18} />
                Export Data
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-medium transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'overview', label: 'Overview', icon: <User size={18} /> },
                { id: 'activity', label: 'Activity', icon: <Activity size={18} /> },
                { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
                { id: 'skills', label: 'Skills', icon: <Award size={18} /> },
                { id: 'certifications', label: 'Certifications', icon: <Trophy size={18} /> },
                { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
                { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Bio Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">About</h3>
                        {isEditing && (
                          <button
                            onClick={handleSaveProfile}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium"
                          >
                            <Save size={16} />
                            Save Changes
                          </button>
                        )}
                      </div>
                      
                      {isEditing ? (
                        <textarea
                          value={userData.bio}
                          onChange={(e) => setUserData({...userData, bio: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                      )}
                    </div>

                    {/* Skills & Languages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Zap size={18} className="text-amber-500" />
                          Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {userData.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                          {isEditing && (
                            <button className="px-3 py-2 border border-dashed border-gray-300 text-gray-500 rounded-lg text-sm hover:border-gray-400 hover:text-gray-600">
                              + Add Skill
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Globe size={18} className="text-emerald-500" />
                          Languages
                        </h4>
                        <div className="space-y-2">
                          {userData.languages.map((language, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-gray-700">{language}</span>
                              <span className="text-sm text-gray-500">Fluent</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData({...userData, name: e.target.value})}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            ) : (
                              <div className="text-gray-900 font-medium">{userData.name}</div>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            {isEditing ? (
                              <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            ) : (
                              <div className="text-gray-900 font-medium">{userData.email}</div>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            {isEditing ? (
                              <input
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            ) : (
                              <div className="text-gray-900 font-medium">{userData.phone}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={userData.title}
                                onChange={(e) => setUserData({...userData, title: e.target.value})}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            ) : (
                              <div className="text-gray-900 font-medium">{userData.title}</div>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={userData.department}
                                onChange={(e) => setUserData({...userData, department: e.target.value})}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            ) : (
                              <div className="text-gray-900 font-medium">{userData.department}</div>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={userData.location}
                                onChange={(e) => setUserData({...userData, location: e.target.value})}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            ) : (
                              <div className="text-gray-900 font-medium">{userData.location}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="p-2.5 bg-white rounded-lg shadow-sm">
                            {activity.type === 'work' && <Briefcase size={20} className="text-blue-600" />}
                            {activity.type === 'learning' && <BookOpen size={20} className="text-green-600" />}
                            {activity.type === 'meeting' && <Users size={20} className="text-purple-600" />}
                            {activity.type === 'update' && <MessageSquare size={20} className="text-amber-600" />}
                            {activity.type === 'publication' && <Edit2 size={20} className="text-red-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h4 className="font-medium text-gray-900">{activity.action}</h4>
                              <span className="text-sm text-gray-500">{activity.time}</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{activity.details}</p>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium">
                      View All Activity
                    </button>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Current Projects</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium">
                        <Sparkles size={16} />
                        New Project
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {currentProjects.map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg mb-1">{project.name}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Users size={14} />
                                  {project.team} team members
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ')}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Progress</span>
                              <span className="font-medium text-gray-900">{project.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-3">
                            <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium">
                              View Details
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium">
                              Update Progress
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Skills & Expertise</h3>
                    
                    <div className="space-y-8">
                      {skillsData.map((category, catIndex) => (
                        <div key={catIndex}>
                          <h4 className="font-semibold text-gray-900 mb-4 text-lg">{category.category}</h4>
                          <div className="space-y-4">
                            {category.skills.map((skill, skillIndex) => (
                              <div key={skillIndex} className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-900">{skill.name}</span>
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">{skill.years} years</span>
                                    <span className="font-medium text-gray-900">{skill.level}%</span>
                                  </div>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${getSkillLevelColor(skill.level)}`}
                                    style={{ width: `${skill.level}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp size={20} className="text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Skill Recommendations</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        Based on your profile and industry trends, we recommend developing these skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">
                          AI/ML Fundamentals
                        </span>
                        <span className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">
                          Product Analytics
                        </span>
                        <span className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">
                          DevOps Basics
                        </span>
                        <span className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm">
                          Cloud Architecture
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'certifications' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium">
                        <Upload size={16} />
                        Add Certification
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                              <Trophy size={24} className="text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                              <p className="text-gray-600 text-sm">Issued by {cert.issuer}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Issued Date</div>
                              <div className="font-medium text-gray-900">{new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Expiry Date</div>
                              <div className="font-medium text-gray-900">
                                {cert.expiry === 'N/A' ? 'No expiry' : new Date(cert.expiry).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-sm text-green-600">Verified</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Award size={20} className="text-emerald-600" />
                        <h4 className="font-semibold text-gray-900">Certification Progress</h4>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">2/4</div>
                          <div className="text-sm text-gray-600">Active Certifications</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">85%</div>
                          <div className="text-sm text-gray-600">Profile Completion</div>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <div className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Receive notifications about {key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => setNotifications({...notifications, [key]: !value})}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Bell size={20} className="text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Notification Schedule</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        Configure quiet hours when you don't want to receive notifications
                      </p>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                          type="time"
                          defaultValue="22:00"
                          className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
                        />
                        <span className="text-gray-600">to</span>
                        <input
                          type="time"
                          defaultValue="07:00"
                          className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
                        />
                        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                          Save Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
                    
                    <div className="space-y-8">
                      {/* Privacy Settings */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <ShieldIcon size={20} className="text-purple-600" />
                          Privacy Settings
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">Profile Visibility</div>
                              <div className="text-sm text-gray-600">Who can see your profile</div>
                            </div>
                            <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white">
                              <option>Team Members</option>
                              <option>Organization</option>
                              <option>Public</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">Activity Sharing</div>
                              <div className="text-sm text-gray-600">Share your activity with team</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">Email Visibility</div>
                              <div className="text-sm text-gray-600">Show email on profile</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Change Password Modal */}
                      {showChangePassword && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-6 max-w-md w-full"
                          >
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
                              <button
                                onClick={() => setShowChangePassword(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                              >
                                <X size={20} />
                              </button>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Current Password
                                </label>
                                <div className="relative">
                                  <input
                                    type={showPassword.current ? "text" : "password"}
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  New Password
                                </label>
                                <div className="relative">
                                  <input
                                    type={showPassword.new ? "text" : "password"}
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Confirm New Password
                                </label>
                                <div className="relative">
                                  <input
                                    type={showPassword.confirm ? "text" : "password"}
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex gap-3">
                              <button
                                onClick={() => setShowChangePassword(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleChangePassword}
                                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium"
                              >
                                Change Password
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      )}

                      {/* Data & Privacy */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Database size={20} className="text-blue-600" />
                          Data & Privacy
                        </h4>
                        <div className="space-y-3">
                          <button
                            onClick={handleExportData}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                          >
                            <div>
                              <div className="font-medium text-gray-900">Download Your Data</div>
                              <div className="text-sm text-gray-600">Export all your data in JSON format</div>
                            </div>
                            <Download size={18} className="text-gray-400" />
                          </button>
                          
                          <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                            <div>
                              <div className="font-medium text-gray-900">Data Retention</div>
                              <div className="text-sm text-gray-600">Manage how long we keep your data</div>
                            </div>
                            <ChevronRight size={18} className="text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {/* Danger Zone */}
                      <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <AlertCircle size={20} className="text-red-600" />
                          Danger Zone
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                          These actions are irreversible. Please proceed with caution.
                        </p>
                        <div className="space-y-3">
                          <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-red-50 border border-red-200 text-red-600 rounded-xl transition-colors">
                            <div>
                              <div className="font-medium">Deactivate Account</div>
                              <div className="text-sm">Temporarily disable your account</div>
                            </div>
                            <ChevronRight size={18} />
                          </button>
                          
                          <button
                            onClick={handleDeleteAccount}
                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-red-50 border border-red-200 text-red-600 rounded-xl transition-colors"
                          >
                            <div>
                              <div className="font-medium">Delete Account</div>
                              <div className="text-sm">Permanently delete your account and all data</div>
                            </div>
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;