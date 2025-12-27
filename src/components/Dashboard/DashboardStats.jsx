import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Products',
      value: '1,248',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      gradient: 'from-blue-500 to-cyan-500',
      iconColor: 'text-white',
      bgGradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      title: 'Active / Inactive',
      value: '892 / 356',
      change: '+8.2%',
      trend: 'up',
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-green-500',
      iconColor: 'text-white',
      bgGradient: 'bg-gradient-to-br from-emerald-500/10 to-green-500/10',
      borderColor: 'border-emerald-200'
    },
    {
      id: 3,
      title: 'Total Users',
      value: '45.8K',
      change: '+18.3%',
      trend: 'up',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      iconColor: 'text-white',
      bgGradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-200'
    },
    {
      id: 4,
      title: 'Total Revenue',
      value: '$284.5K',
      change: '+24.7%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-amber-500 to-orange-500',
      iconColor: 'text-white',
      bgGradient: 'bg-gradient-to-br from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-200'
    },
    {
      id: 5,
      title: 'Monthly Growth',
      value: '14.2%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-teal-500 to-emerald-500',
      iconColor: 'text-white',
      bgGradient: 'bg-gradient-to-br from-teal-500/10 to-emerald-500/10',
      borderColor: 'border-teal-200'
    },
    {
      id: 6,
      title: 'Pending Approvals',
      value: '48',
      change: '-4.2%',
      trend: 'down',
      icon: Clock,
      gradient: 'from-rose-500 to-red-500',
      iconColor: 'text-white',
      bgGradient: 'bg-gradient-to-br from-rose-500/10 to-red-500/10',
      borderColor: 'border-rose-200'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={cardVariants}
          whileHover="hover"
          className={`relative overflow-hidden rounded-xl ${stat.bgGradient} border ${stat.borderColor} p-5 transition-all duration-300 group`}
        >
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          {/* Shine effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-150" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              {/* Icon with gradient background */}
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
              >
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </motion.div>
              
              {/* Trend indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
                  stat.trend === 'up' 
                    ? 'bg-emerald-500/20 text-emerald-700' 
                    : 'bg-rose-500/20 text-rose-700'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </motion.div>
            </div>

            {/* Value and Title */}
            <div className="mt-6">
              <motion.h3 
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {stat.value}
              </motion.h3>
              <motion.p 
                className="text-gray-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {stat.title}
              </motion.p>
            </div>

            {/* Animated Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Progress</span>
                <span>{stat.trend === 'up' ? 'Growing' : 'Declining'}</span>
              </div>
              <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${stat.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: stat.trend === 'up' ? '85%' : '35%' }}
                  transition={{ 
                    delay: 0.5, 
                    duration: 1.2,
                    ease: "easeOut"
                  }}
                />
              </div>
            </div>

            {/* Decorative dots */}
            <div className="flex gap-1 mt-4">
              {[1, 2, 3].map((dot) => (
                <motion.div
                  key={dot}
                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stat.gradient}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + dot * 0.1 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;