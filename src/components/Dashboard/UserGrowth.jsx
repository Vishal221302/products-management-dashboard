import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';

const UserGrowth = () => {
  const growthData = [
    { month: 'Jan', active: 32000, new: 2400, retention: 92 },
    { month: 'Feb', active: 35000, new: 2800, retention: 94 },
    { month: 'Mar', active: 38000, new: 3100, retention: 93 },
    { month: 'Apr', active: 42000, new: 3500, retention: 95 },
    { month: 'May', active: 45800, new: 3800, retention: 96 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      backgroundColor: "rgba(249, 250, 251, 1)",
      transition: { duration: 0.2 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: {
        delay: 0.5,
        duration: 1,
        type: "spring",
        stiffness: 50
      }
    })
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
          <p className="text-gray-500 text-sm mt-1">Monthly user acquisition and retention</p>
        </div>
        <div className="flex items-center space-x-2 text-emerald-600">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">+18.3% growth</span>
        </div>
      </div>

      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {growthData.map((data, index) => (
          <motion.div
            key={index}
            variants={rowVariants}
            whileHover="hover"
            className="p-4 rounded-xl border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{data.month}</h4>
                  <p className="text-sm text-gray-500">{data.active.toLocaleString()} active users</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">+{data.new.toLocaleString()}</p>
                <p className="text-sm text-gray-500">New users</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Retention Rate</span>
                <span className="font-medium text-gray-900">{data.retention}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  custom={data.retention}
                  variants={progressVariants}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default UserGrowth;