// src/pages/HelpSupport.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Video,
  FileText,
  Users,
  ChevronRight,
  ExternalLink,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Globe,
  Twitter,
  Linkedin,
  MessageCircle,
  Lightbulb,
  Award,
  Shield,
  Download,
  Headphones,
  LifeBuoy,
  Sparkles,
  Star,
  Settings,
  Calendar,
  BarChart3,
  Target,
  Users as UsersIcon,
  Database,
  Cpu,
  Server,
  Wifi,
  Cloud
} from 'lucide-react';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const categories = [
    { id: 'all', label: 'All Topics', icon: <HelpCircle size={20} />, color: 'from-indigo-500 to-purple-600' },
    { id: 'getting-started', label: 'Getting Started', icon: <Zap size={20} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'features', label: 'Features', icon: <Sparkles size={20} />, color: 'from-purple-500 to-pink-500' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: <AlertCircle size={20} />, color: 'from-amber-500 to-orange-500' },
    { id: 'integrations', label: 'Integrations', icon: <Globe size={20} />, color: 'from-emerald-500 to-green-500' },
    { id: 'billing', label: 'Billing', icon: <Award size={20} />, color: 'from-red-500 to-pink-500' },
    { id: 'security', label: 'Security', icon: <Shield size={20} />, color: 'from-gray-600 to-gray-800' },
  ];

  const quickHelpArticles = [
    { id: 1, title: 'How to create a new feature request', category: 'features', views: '1.2K', time: '5 min' },
    { id: 2, title: 'Setting up team permissions and roles', category: 'getting-started', views: '856', time: '8 min' },
    { id: 3, title: 'Understanding CSAT scoring methodology', category: 'features', views: '1.5K', time: '7 min' },
    { id: 4, title: 'Exporting roadmap data to external tools', category: 'integrations', views: '642', time: '3 min' },
    { id: 5, title: 'Managing API keys and security tokens', category: 'security', views: '423', time: '6 min' },
    { id: 6, title: 'Troubleshooting data sync issues', category: 'troubleshooting', views: '324', time: '10 min' },
  ];

  const faqSections = [
    {
      category: 'Getting Started',
      questions: [
        { id: 1, question: 'How do I invite team members to the dashboard?', answer: 'Navigate to Settings → Team Management. Click "Invite Member" and enter their email address. You can assign roles (Admin, Manager, Developer, Viewer) during the invitation process. Team members will receive an email invitation to join.' },
        { id: 2, question: 'What are the different user roles and permissions?', answer: 'We offer four roles: Admin (full access to all features and settings), Manager (can manage features and teams but not system settings), Developer (can edit and update features), and Viewer (read-only access to view dashboards and reports).' },
        { id: 3, question: 'How do I customize my dashboard layout?', answer: 'Click the settings icon in the top right corner of any dashboard widget to customize. You can drag and drop widgets, resize them, hide them, or add new widgets from the widget library. Layout changes are saved automatically.' },
      ]
    },
    {
      category: 'Feature Management',
      questions: [
        { id: 4, question: 'How do I prioritize feature requests effectively?', answer: 'Use our Priority Management system which scores features based on impact (1-10), effort (1-10), and urgency (1-10). You can also enable voting for stakeholders, set custom priority levels, or use the Eisenhower Matrix view for visual prioritization.' },
        { id: 5, question: 'Can I import existing feature data from other tools?', answer: 'Yes, go to Settings → Data Management → Import. We support CSV, JSON, and Excel formats. Download our import template to ensure proper formatting. Large imports may take a few minutes to process.' },
        { id: 6, question: 'How does the roadmap timeline work?', answer: 'The timeline visualizes your product development schedule. Features can be dragged and dropped, dependencies can be set between items, and timeframes can be adjusted. Use quarter/month/week view options for different planning horizons. Critical path analysis is available in the advanced view.' },
      ]
    },
    {
      category: 'Troubleshooting',
      questions: [
        { id: 7, question: 'Why is my dashboard loading slowly?', answer: 'Try these steps: 1) Clear your browser cache, 2) Check your internet connection speed, 3) Reduce the number of active widgets, 4) Disable browser extensions that might interfere. For persistent issues, contact support with your dashboard URL and browser information.' },
        { id: 8, question: 'How do I recover accidentally deleted data?', answer: 'Deleted items go to the Trash where they stay for 30 days. Go to Settings → Data Management → Trash to restore items. For permanent deletions beyond 30 days, contact our support team immediately - we maintain backups for 90 days.' },
        { id: 9, question: 'Why am I not receiving email notifications?', answer: 'Check: 1) Notification settings under Settings → Notifications, 2) Ensure your email address is verified, 3) Check spam/junk folders, 4) Whitelist notifications@producthub.com. For critical alerts, enable push notifications in your browser.' },
      ]
    }
  ];

  const supportChannels = [
    { type: 'email', label: 'Email Support', value: 'support@producthub.com', icon: <Mail size={24} />, responseTime: '2-4 hours', description: 'Detailed technical support with ticket tracking' },
    { type: 'chat', label: 'Live Chat', value: 'Available 24/7', icon: <MessageCircle size={24} />, responseTime: '< 5 minutes', description: 'Instant help from our support specialists' },
    { type: 'phone', label: 'Phone Support', value: '+1 (555) 123-4567', icon: <Phone size={24} />, responseTime: 'Immediate', description: 'For urgent issues requiring immediate attention' },
    { type: 'community', label: 'Community Forum', value: 'community.producthub.com', icon: <UsersIcon size={24} />, responseTime: 'Varies', description: 'Get help from experienced community members' },
  ];

  const resources = [
    { title: 'Product Management Best Practices', type: 'PDF Guide', icon: <BookOpen size={20} />, size: '3.2 MB', downloads: '2.1K' },
    { title: 'API Documentation & Examples', type: 'Web Guide', icon: <Cpu size={20} />, size: 'Online', visits: '8.5K' },
    { title: 'Video Tutorial Series (2024)', type: 'Video Course', icon: <Video size={20} />, size: '2.5 hours', views: '5.3K' },
    { title: 'Enterprise Case Studies', type: 'PDF Collection', icon: <FileText size={20} />, size: '12.4 MB', downloads: '1.2K' },
    { title: 'Security & Compliance Guide', type: 'Whitepaper', icon: <Shield size={20} />, size: '4.8 MB', downloads: '856' },
    { title: 'Third-party Integration Guide', type: 'Web Guide', icon: <Globe size={20} />, size: 'Online', visits: '3.7K' },
  ];

  const systemStatus = [
    { service: 'Dashboard Interface', status: 'operational', uptime: '99.9%' },
    { service: 'API Services', status: 'operational', uptime: '99.8%' },
    { service: 'Database Cluster', status: 'operational', uptime: '99.95%' },
    { service: 'File Storage', status: 'operational', uptime: '99.7%' },
    { service: 'Email Notifications', status: 'degraded', uptime: '98.2%' },
    { service: 'Analytics Engine', status: 'operational', uptime: '99.6%' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({ name: '', email: '', subject: '', message: '', priority: 'normal' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative px-6 py-12 md:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-full mb-6"
              >
                <LifeBuoy size={20} className="text-white" />
                <span className="text-sm font-medium text-white">Help & Support Center</span>
              </motion.div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                How can we help you today?
              </h1>
              
              <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Get instant answers, browse documentation, or connect with our expert support team
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for answers, guides, or articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-24 py-4 bg-white/95 rounded-xl shadow-xl focus:outline-none focus:ring-3 focus:ring-white/30 text-gray-900 placeholder-gray-500 text-base"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12 px-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
              <p className="text-gray-600 mt-2">Find help for specific topics and features</p>
            </div>
            <button className="self-start sm:self-center text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
              View all categories
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center justify-center p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-br ${category.color} text-white border-transparent shadow-lg`
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                }`}
              >
                <div className={`p-2.5 md:p-3 rounded-lg mb-3 ${
                  activeCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-100'
                }`}>
                  {category.icon}
                </div>
                <span className="text-xs md:text-sm font-medium text-center leading-tight">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 px-2">
          {/* Left Column - Articles & FAQ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Help Articles */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Zap size={24} className="text-amber-500" />
                    Quick Help Articles
                  </h3>
                  <p className="text-gray-600 mt-1">Most viewed help articles from our community</p>
                </div>
                <button className="self-start sm:self-center text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                  View all articles
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                {quickHelpArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                        {article.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {article.time} read
                        </span>
                        <span className="flex items-center gap-1">
                          <UsersIcon size={14} />
                          {article.views} views
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs truncate">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="flex-shrink-0 ml-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <HelpCircle size={24} className="text-indigo-600" />
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600 mt-1">Quick answers to common questions from our users</p>
              </div>
              
              <div className="space-y-6">
                {faqSections.map((section) => (
                  <div key={section.category} className="mb-8 last:mb-0">
                    <h4 className="font-semibold text-gray-900 text-lg mb-4">{section.category}</h4>
                    <div className="space-y-3">
                      {section.questions.map((faq) => (
                        <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                          >
                            <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                            {expandedFAQ === faq.id ? (
                              <ChevronUp size={18} className="flex-shrink-0 text-gray-500" />
                            ) : (
                              <ChevronDown size={18} className="flex-shrink-0 text-gray-500" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedFAQ === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 border-t border-gray-200 bg-white">
                                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                  <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                                    Read detailed guide
                                    <ExternalLink size={14} />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 lg:space-y-8">
            {/* Support Channels */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Headphones size={24} className="text-blue-600" />
                Contact Support
              </h3>
              
              <div className="space-y-4">
                {supportChannels.map((channel) => (
                  <div key={channel.type} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm flex-shrink-0">
                        {channel.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900">{channel.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{channel.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
                          <span className="font-medium text-gray-900 truncate">{channel.value}</span>
                          <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full font-medium whitespace-nowrap">
                            {channel.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Open Support Ticket
              </button>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">System Status</h3>
                  <p className="text-gray-600 text-sm mt-1">Live service status and uptime</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">All Systems Operational</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {systemStatus.map((service) => (
                  <div key={service.service} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        service.status === 'operational' ? 'bg-green-500' :
                        service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium text-gray-900 truncate">{service.service}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-medium text-gray-900">{service.uptime}</div>
                      <div className="text-xs text-gray-500">uptime</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                  View detailed status history
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Resources & Guides</h3>
              
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.title} className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-gray-100 group-hover:bg-white rounded-lg flex-shrink-0">
                        {resource.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{resource.title}</h4>
                        <p className="text-sm text-gray-600 truncate">{resource.type} • {resource.size}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {resource.downloads || resource.visits}
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {resource.downloads ? 'downloads' : 'visits'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="mb-12 px-2">
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Connect with 10,000+ product managers, share insights, and stay updated with the latest features, 
                  best practices, and industry trends. Access exclusive webinars, templates, and expert sessions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium flex items-center gap-2 hover:shadow-md transition-all">
                    <Twitter size={18} />
                    <span>Follow on Twitter</span>
                  </button>
                  <button className="px-5 py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium flex items-center gap-2 hover:shadow-md transition-all">
                    <Linkedin size={18} />
                    <span>Join LinkedIn Group</span>
                  </button>
                  <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                    Join Community Forum
                  </button>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-4xl lg:text-5xl font-bold text-indigo-600 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">Expert Support Available</div>
                <div className="text-sm text-gray-600 mt-2">Average response time: 15 minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-8 md:py-12 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-6">
            <Lightbulb size={16} />
            <span className="text-sm font-medium">Still need help?</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Our dedicated support team is always ready to help you with any questions, 
            issues, or customization requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContactForm(true)}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Contact Support Team
            </motion.button>
            <button className="px-8 py-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-xl hover:shadow-md transition-all">
              Schedule a Demo Call
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Contact Support</h3>
                    <p className="text-gray-600 mt-1">We'll get back to you as soon as possible</p>
                  </div>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="Brief description of your issue or question"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: 'low', label: 'Low', color: 'bg-gray-600' },
                        { value: 'normal', label: 'Normal', color: 'bg-blue-600' },
                        { value: 'high', label: 'High', color: 'bg-orange-600' },
                        { value: 'urgent', label: 'Urgent', color: 'bg-red-600' },
                      ].map((priority) => (
                        <button
                          key={priority.value}
                          type="button"
                          onClick={() => setContactForm({...contactForm, priority: priority.value})}
                          className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                            contactForm.priority === priority.value
                              ? `${priority.color} text-white shadow-md`
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {priority.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={6}
                      placeholder="Please describe your issue or question in detail. Include any error messages, steps to reproduce, and what you've tried so far."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      Submit Support Ticket
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpSupport;