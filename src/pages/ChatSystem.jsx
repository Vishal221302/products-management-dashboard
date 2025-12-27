// src/components/ChatSystem.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  Mic,
  Search,
  MoreVertical,
  Video,
  Phone,
  Info,
  Users,
  Pin,
  Star,
  Archive,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Hash,
  Lock,
  Globe,
  AtSign,
  Code,
  FileText,
  Image,
  File,
  X,
  Check,
  Clock,
  UserPlus,
  Settings,
  Filter,
  Calendar,
  Link,
  ThumbsUp,
  Bookmark,
  Share,
  Copy,
  Edit,
  Trash2,
  Reply,
  Forward,
  Eye,
  EyeOff,
  Download,
  Maximize2,
  Minimize2,
  CornerUpRight,
  CornerDownRight,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  BarChart,
  PieChart,
  TrendingUp,
  GitPullRequest,
  GitMerge,
  Bug,
  Flag,
  CheckSquare,
  ListTodo,
  Milestone,
  Clock as ClockIcon
} from 'lucide-react';

const ChatSystem = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState(new Set());
  const [unreadChannels, setUnreadChannels] = useState(new Set(['announcements', 'bug-reports']));
  const [mentions, setMentions] = useState([]);
  const [showChannelInfo, setShowChannelInfo] = useState(false);
  const [showThread, setShowThread] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mock data for channels
  const channels = [
    { id: 'general', name: 'General', icon: <Hash size={16} />, unread: 0, description: 'General team discussions', members: 24, public: true },
    { id: 'announcements', name: 'Announcements', icon: <Bell size={16} />, unread: 3, description: 'Product announcements and updates', members: 24, public: true },
    { id: 'product-roadmap', name: 'Product Roadmap', icon: <Target size={16} />, unread: 0, description: 'Roadmap discussions and planning', members: 12, public: false },
    { id: 'bug-reports', name: 'Bug Reports', icon: <Bug size={16} />, unread: 5, description: 'Report and track product bugs', members: 18, public: true },
    { id: 'feature-requests', name: 'Feature Requests', icon: <Flag size={16} />, unread: 0, description: 'New feature ideas and requests', members: 32, public: true },
    { id: 'analytics', name: 'Analytics', icon: <BarChart size={16} />, unread: 0, description: 'Data and metrics discussions', members: 8, public: false },
    { id: 'design-review', name: 'Design Review', icon: <PieChart size={16} />, unread: 0, description: 'Design feedback and reviews', members: 6, public: false },
    { id: 'sprint-planning', name: 'Sprint Planning', icon: <ListTodo size={16} />, unread: 0, description: 'Sprint planning and tracking', members: 10, public: false },
    { id: 'api-discussions', name: 'API Discussions', icon: <Code size={16} />, unread: 0, description: 'API design and integration', members: 7, public: false },
    { id: 'milestone-celebrations', name: 'Milestone Celebrations', icon: <Milestone size={16} />, unread: 0, description: 'Celebrating team achievements', members: 24, public: true }
  ];

  // Mock data for team members
  const teamMembers = [
    { id: 'alex', name: 'Alex Johnson', role: 'Product Manager', avatar: 'AJ', online: true, color: 'bg-blue-500' },
    { id: 'sarah', name: 'Sarah Chen', role: 'UX Designer', avatar: 'SC', online: true, color: 'bg-purple-500' },
    { id: 'mike', name: 'Mike Rodriguez', role: 'Lead Developer', avatar: 'MR', online: true, color: 'bg-green-500' },
    { id: 'priya', name: 'Priya Patel', role: 'QA Engineer', avatar: 'PP', online: false, color: 'bg-amber-500' },
    { id: 'david', name: 'David Wilson', role: 'Data Analyst', avatar: 'DW', online: true, color: 'bg-red-500' },
    { id: 'lisa', name: 'Lisa Wong', role: 'Marketing', avatar: 'LW', online: false, color: 'bg-pink-500' }
  ];

  // Mock data for messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 'alex',
      content: "Team, I've updated the Q1 roadmap. Can everyone review the new priorities?",
      timestamp: '2024-01-15T09:30:00',
      type: 'text',
      reactions: { '👍': ['sarah', 'mike'], '🎯': ['david'] },
      thread: 3,
      pinned: true
    },
    {
      id: 2,
      userId: 'sarah',
      content: "I've uploaded the mobile app redesign prototypes. Feedback welcome!",
      timestamp: '2024-01-15T10:15:00',
      type: 'file',
      fileName: 'mobile-redesign-v3.fig',
      fileSize: '2.4 MB',
      reactions: { '👀': ['mike', 'priya'] }
    },
    {
      id: 3,
      userId: 'mike',
      content: "@alex The API integration is blocked by the authentication issue. @david can you check the logs?",
      timestamp: '2024-01-15T11:45:00',
      type: 'text',
      reactions: { '⚠️': ['alex'] },
      mentions: ['alex', 'david']
    },
    {
      id: 4,
      userId: 'david',
      content: "Monthly analytics report shows 23% growth in user engagement. Great work team! 📈",
      timestamp: '2024-01-15T13:20:00',
      type: 'text',
      reactions: { '🚀': ['alex', 'sarah', 'mike', 'priya'] }
    },
    {
      id: 5,
      userId: 'priya',
      content: "Found a critical bug in the checkout flow. Priority: High",
      timestamp: '2024-01-15T14:30:00',
      type: 'text',
      reactions: { '🐛': ['mike'] },
      pinned: true
    },
    {
      id: 6,
      userId: 'alex',
      content: "Sprint planning meeting moved to 2 PM tomorrow. Please update your calendars.",
      timestamp: '2024-01-15T15:10:00',
      type: 'text',
      reactions: { '✅': ['sarah', 'mike', 'david'] }
    },
    {
      id: 7,
      userId: 'lisa',
      content: "Marketing campaign performance metrics are live on the dashboard",
      timestamp: '2024-01-15T16:45:00',
      type: 'text',
      reactions: {}
    }
  ]);

  // Mock data for threads
  const threads = {
    3: [
      { id: 31, userId: 'david', content: "Checking logs now. Will update in 30 min.", timestamp: '2024-01-15T11:50:00' },
      { id: 32, userId: 'mike', content: "Thanks @david. Let me know if you need API access.", timestamp: '2024-01-15T11:52:00' },
      { id: 33, userId: 'alex', content: "Keep me posted. This is blocking the mobile release.", timestamp: '2024-01-15T11:55:00' }
    ]
  };

  // Product-related quick actions
  const productActions = [
    { id: 'create-task', label: 'Create Task', icon: <CheckSquare size={16} />, color: 'text-blue-600' },
    { id: 'report-bug', label: 'Report Bug', icon: <Bug size={16} />, color: 'text-red-600' },
    { id: 'request-feature', label: 'Request Feature', icon: <Flag size={16} />, color: 'text-green-600' },
    { id: 'share-metric', label: 'Share Metric', icon: <TrendingUp size={16} />, color: 'text-purple-600' },
    { id: 'schedule-meeting', label: 'Schedule Meeting', icon: <Calendar size={16} />, color: 'text-amber-600' }
  ];

  const fileTypes = [
    { type: 'image', icon: <Image size={16} />, label: 'Image', extensions: ['.png', '.jpg', '.jpeg', '.gif'] },
    { type: 'document', icon: <FileText size={16} />, label: 'Document', extensions: ['.pdf', '.doc', '.docx', '.txt'] },
    { type: 'design', icon: <File size={16} />, label: 'Design File', extensions: ['.fig', '.sketch', '.xd', '.ai'] },
    { type: 'code', icon: <Code size={16} />, label: 'Code Snippet', extensions: ['.js', '.ts', '.py', '.java'] },
    { type: 'spreadsheet', icon: <FileText size={16} />, label: 'Spreadsheet', extensions: ['.csv', '.xlsx', '.numbers'] }
  ];

  const emojis = ['👍', '👎', '🎯', '🚀', '👀', '🎉', '⚠️', '❓', '✅', '❌', '💡', '🐛', '📈', '📊', '🎨', '⚡'];

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!message.trim() && !replyTo && !editMessageId) return;

    const newMessage = {
      id: messages.length + 1,
      userId: 'alex', // Current user
      content: message,
      timestamp: new Date().toISOString(),
      type: 'text',
      reactions: {},
      replyTo: replyTo?.id,
      mentions: extractMentions(message)
    };

    if (editMessageId) {
      setMessages(messages.map(msg => 
        msg.id === editMessageId ? { ...msg, content: message, edited: true } : msg
      ));
      setEditMessageId(null);
    } else {
      setMessages([...messages, newMessage]);
    }

    setMessage('');
    setReplyTo(null);
    
    // Auto-reply simulation for demo
    if (Math.random() > 0.7 && !editMessageId) {
      setTimeout(() => {
        const botReplies = [
          "Thanks for sharing! I'll add this to the backlog.",
          "Great point! Let me create a task for this.",
          "I've noted this down for our next sprint planning.",
          "Could you provide more details about this?",
          "This aligns with our Q2 objectives. 👍"
        ];
        const botReply = botReplies[Math.floor(Math.random() * botReplies.length)];
        
        const botMessage = {
          id: messages.length + 2,
          userId: 'bot',
          content: botReply,
          timestamp: new Date().toISOString(),
          type: 'text',
          reactions: {}
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const extractMentions = (text) => {
    const mentionRegex = /@(\w+)/g;
    const matches = [...text.matchAll(mentionRegex)];
    return matches.map(match => match[1]);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = fileTypes.find(type => 
      type.extensions.some(ext => file.name.endsWith(ext))
    ) || { type: 'file', icon: <File size={16} />, label: 'File' };

    const newMessage = {
      id: messages.length + 1,
      userId: 'alex',
      content: `Uploaded ${fileType.label.toLowerCase()}`,
      timestamp: new Date().toISOString(),
      type: 'file',
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      fileType: fileType.type,
      reactions: {}
    };

    setMessages([...messages, newMessage]);
  };

  const addReaction = (messageId, emoji) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        if (reactions[emoji]) {
          if (reactions[emoji].includes('alex')) {
            reactions[emoji] = reactions[emoji].filter(id => id !== 'alex');
            if (reactions[emoji].length === 0) {
              delete reactions[emoji];
            }
          } else {
            reactions[emoji] = [...reactions[emoji], 'alex'];
          }
        } else {
          reactions[emoji] = ['alex'];
        }
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const pinMessage = (messageId) => {
    setPinnedMessages([...pinnedMessages, messageId]);
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, pinned: true } : msg
    ));
  };

  const starMessage = (messageId) => {
    const newStarred = new Set(starredMessages);
    if (newStarred.has(messageId)) {
      newStarred.delete(messageId);
    } else {
      newStarred.add(messageId);
    }
    setStarredMessages(newStarred);
  };

  const startThread = (messageId) => {
    setShowThread(messageId);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const getUser = (userId) => {
    if (userId === 'bot') {
      return { name: 'Product Bot', role: 'Assistant', avatar: '🤖', color: 'bg-gray-500' };
    }
    return teamMembers.find(member => member.id === userId) || teamMembers[0];
  };

  const isCurrentUser = (userId) => userId === 'alex';

  const getChannel = (channelId) => {
    return channels.find(ch => ch.id === channelId) || channels[0];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessageContent = (msg) => {
    if (msg.type === 'file') {
      return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            {fileTypes.find(t => t.type === msg.fileType)?.icon || <File size={20} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">{msg.fileName}</div>
            <div className="text-sm text-gray-500">{msg.fileSize}</div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download size={16} />
          </button>
        </div>
      );
    }

    let content = msg.content;
    if (msg.mentions) {
      msg.mentions.forEach(mention => {
        const user = getUser(mention);
        content = content.replace(`@${mention}`, `<span class="mention bg-blue-100 text-blue-700 px-1 py-0.5 rounded">@${user.name}</span>`);
      });
    }

    return (
      <div 
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <div className={`flex h-screen bg-gradient-to-br from-gray-50 to-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Left Sidebar - Channels */}
      <div className="w-64 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Product Chat</h2>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Channels</h3>
              <button className="p-1 hover:bg-gray-100 rounded">
                <UserPlus size={14} />
              </button>
            </div>
            
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => {
                  setActiveChannel(channel.id);
                  setUnreadChannels(prev => {
                    const next = new Set(prev);
                    next.delete(channel.id);
                    return next;
                  });
                }}
                className={`w-full flex items-center justify-between p-2 rounded-lg mb-1 transition-colors ${
                  activeChannel === channel.id 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${
                    activeChannel === channel.id ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    {channel.icon}
                  </div>
                  <span className="font-medium">{channel.name}</span>
                  {!channel.public && <Lock size={12} className="text-gray-400" />}
                </div>
                
                <div className="flex items-center gap-2">
                  {unreadChannels.has(channel.id) && (
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  )}
                  <span className="text-xs text-gray-500">{channel.members}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Pinned Messages */}
          {pinnedMessages.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <Pin size={12} />
                  Pinned
                </h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {pinnedMessages.length}
                </span>
              </div>
              {messages
                .filter(msg => pinnedMessages.includes(msg.id))
                .slice(0, 3)
                .map(msg => (
                  <div key={msg.id} className="p-2 hover:bg-gray-50 rounded-lg mb-1 cursor-pointer">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {getUser(msg.userId).name}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{msg.content}</div>
                  </div>
                ))}
            </div>
          )}

          {/* Team Members */}
          <div className="p-3 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Online Members
            </h3>
            {teamMembers
              .filter(member => member.online)
              .map(member => (
                <div key={member.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="relative">
                    <div className={`w-8 h-8 ${member.color} rounded-full flex items-center justify-center text-white font-medium text-sm`}>
                      {member.avatar}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">{member.name}</div>
                    <div className="text-xs text-gray-500 truncate">{member.role}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium">
                AJ
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">Alex Johnson</div>
              <div className="text-sm text-gray-500 truncate">Product Manager</div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                {getChannel(activeChannel).icon}
              </div>
              <div>
                <h1 className="font-bold text-gray-900 flex items-center gap-2">
                  {getChannel(activeChannel).name}
                  {!getChannel(activeChannel).public && <Lock size={14} className="text-gray-400" />}
                </h1>
                <p className="text-sm text-gray-600">{getChannel(activeChannel).description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowChannelInfo(!showChannelInfo)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Info size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Users size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Pin size={18} />
              </button>
              <div className="w-px h-6 bg-gray-200 mx-1"></div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Video size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Phone size={18} />
              </button>
            </div>
          </div>

          {/* Product Quick Actions */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto">
            {productActions.map(action => (
              <button
                key={action.id}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-lg transition-colors whitespace-nowrap"
              >
                <span className={action.color}>{action.icon}</span>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Date Separator */}
            <div className="flex items-center justify-center my-6">
              <div className="px-4 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full">
                Today
              </div>
            </div>

            {messages.map((msg, index) => {
              const user = getUser(msg.userId);
              const prevMsg = messages[index - 1];
              const showHeader = !prevMsg || 
                prevMsg.userId !== msg.userId || 
                new Date(msg.timestamp) - new Date(prevMsg.timestamp) > 10 * 60 * 1000;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`group relative ${isCurrentUser(msg.userId) ? 'pl-12' : 'pr-12'}`}
                >
                  {showHeader && !isCurrentUser(msg.userId) && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-6 h-6 ${user.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                        {user.avatar}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.role}</span>
                      <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={`flex gap-2 ${isCurrentUser(msg.userId) ? 'flex-row-reverse' : ''}`}>
                    {!isCurrentUser(msg.userId) && !showHeader && (
                      <div className="w-6"></div>
                    )}
                    
                    <div className={`flex-1 ${isCurrentUser(msg.userId) ? 'flex justify-end' : ''}`}>
                      <div className={`relative max-w-xl ${
                        isCurrentUser(msg.userId)
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-tr-none'
                          : 'bg-white text-gray-900 rounded-2xl rounded-tl-none border border-gray-200'
                      } p-4 shadow-sm`}>
                        {/* Reply Indicator */}
                        {msg.replyTo && (
                          <div className="mb-2 pl-3 border-l-2 border-indigo-400">
                            <div className="text-xs opacity-75">
                              Replying to {getUser(messages.find(m => m.id === msg.replyTo)?.userId)?.name}
                            </div>
                          </div>
                        )}

                        {/* Edited Indicator */}
                        {msg.edited && (
                          <div className="text-xs opacity-75 mt-1">(edited)</div>
                        )}

                        {/* Message Content */}
                        {renderMessageContent(msg)}

                        {/* Reactions */}
                        {Object.keys(msg.reactions).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {Object.entries(msg.reactions).map(([emoji, users]) => (
                              <button
                                key={emoji}
                                onClick={() => addReaction(msg.id, emoji)}
                                className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                                  users.includes('alex')
                                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                                }`}
                              >
                                <span>{emoji}</span>
                                <span className="text-xs">{users.length}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Message Actions (Hover) */}
                        <div className={`absolute top-2 ${
                          isCurrentUser(msg.userId) ? '-left-10' : '-right-10'
                        } opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}>
                          <button
                            onClick={() => addReaction(msg.id, '👍')}
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <ThumbsUp size={14} />
                          </button>
                          <button
                            onClick={() => starMessage(msg.id)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <Star size={14} className={starredMessages.has(msg.id) ? 'fill-yellow-400 text-yellow-400' : ''} />
                          </button>
                          <button
                            onClick={() => pinMessage(msg.id)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <Pin size={14} />
                          </button>
                          <button
                            onClick={() => startThread(msg.id)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <CornerUpRight size={14} />
                          </button>
                        </div>

                        {/* Thread Indicator */}
                        {msg.thread && (
                          <button
                            onClick={() => startThread(msg.id)}
                            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 mt-2"
                          >
                            <CornerDownRight size={12} />
                            {threads[msg.thread]?.length || 0} replies
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timestamp for current user */}
                  {isCurrentUser(msg.userId) && (
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {formatTime(msg.timestamp)}
                      {msg.edited && ' • Edited'}
                    </div>
                  )}
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Reply Preview */}
        {replyTo && (
          <div className="border-t border-gray-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Reply size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Replying to <span className="font-medium">{getUser(replyTo.userId).name}</span>
                </span>
                <div className="text-sm text-gray-500 truncate max-w-md">{replyTo.content}</div>
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            {/* Emoji Quick Access */}
            <div className="flex items-center gap-1 mb-2 overflow-x-auto">
              {emojis.slice(0, 10).map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setMessage(prev => prev + emoji)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-end gap-3">
              {/* Attachment Button */}
              <div className="relative">
                <button
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  className="p-3 hover:bg-gray-100 rounded-lg"
                >
                  <Paperclip size={20} />
                </button>
                
                {showAttachmentMenu && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl border border-gray-200 shadow-lg p-2 w-64">
                    <div className="grid grid-cols-2 gap-2">
                      {fileTypes.map(type => (
                        <button
                          key={type.type}
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="p-2 bg-gray-100 rounded-lg mb-2">
                            {type.icon}
                          </div>
                          <span className="text-xs font-medium text-gray-700">{type.label}</span>
                          <span className="text-xs text-gray-500 mt-1">{type.extensions.join(', ')}</span>
                        </button>
                      ))}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept={fileTypes.flatMap(t => t.extensions).join(',')}
                    />
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${getChannel(activeChannel).name}`}
                  className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-4"
                  rows="2"
                />
                
                <div className="flex items-center justify-between px-4 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 hover:bg-gray-200 rounded-lg"
                    >
                      <Smile size={18} />
                    </button>
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-2 rounded-lg ${isRecording ? 'bg-red-100 text-red-600' : 'hover:bg-gray-200'}`}
                    >
                      <Mic size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <AtSign size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Code size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      Press Enter to send • Shift+Enter for new line
                    </span>
                    <button
                      onClick={sendMessage}
                      disabled={!message.trim() && !replyTo && !editMessageId}
                      className={`p-2 rounded-lg ${
                        message.trim() || replyTo || editMessageId
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Channel Info / Thread */}
      <AnimatePresence>
        {(showChannelInfo || showThread) && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-80 border-l border-gray-200 bg-white"
          >
            {showThread ? (
              // Thread View
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Thread</h3>
                    <button
                      onClick={() => setShowThread(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {messages.find(m => m.id === showThread)?.content}
                  </p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  {threads[showThread]?.map(threadMsg => (
                    <div key={threadMsg.id} className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs">
                          {getUser(threadMsg.userId).avatar}
                        </div>
                        <span className="font-medium text-sm">{getUser(threadMsg.userId).name}</span>
                        <span className="text-xs text-gray-500">{formatTime(threadMsg.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {threadMsg.content}
                      </p>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <textarea
                      placeholder="Reply in thread..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows="2"
                    />
                    <button className="w-full mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Channel Info View
              <div className="h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Channel Info</h3>
                    <button
                      onClick={() => setShowChannelInfo(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  {/* Channel Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{getChannel(activeChannel).description}</p>
                  </div>

                  {/* Members */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">Members</h4>
                      <span className="text-sm text-gray-500">{teamMembers.length}</span>
                    </div>
                    <div className="space-y-2">
                      {teamMembers.map(member => (
                        <div key={member.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                          <div className="relative">
                            <div className={`w-8 h-8 ${member.color} rounded-full flex items-center justify-center text-white text-sm`}>
                              {member.avatar}
                            </div>
                            {member.online && (
                              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900 truncate">{member.name}</div>
                            <div className="text-xs text-gray-500 truncate">{member.role}</div>
                          </div>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <AtSign size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pinned Items */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Pinned Items</h4>
                    {pinnedMessages.length === 0 ? (
                      <p className="text-sm text-gray-500">No pinned messages</p>
                    ) : (
                      <div className="space-y-2">
                        {pinnedMessages.slice(0, 3).map(msgId => {
                          const msg = messages.find(m => m.id === msgId);
                          if (!msg) return null;
                          return (
                            <div key={msgId} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs">
                                  {getUser(msg.userId).avatar}
                                </div>
                                <span className="font-medium text-sm">{getUser(msg.userId).name}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{msg.content}</p>
                              <button
                                onClick={() => pinMessage(msgId)}
                                className="mt-2 text-xs text-red-600 hover:text-red-800"
                              >
                                Unpin
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Channel Settings */}
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">Notification Settings</span>
                      <Bell size={16} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">Integrations</span>
                      <Zap size={16} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">Export Chat</span>
                      <Download size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatSystem;