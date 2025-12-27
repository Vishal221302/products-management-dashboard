import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp } from 'lucide-react';

const CategoryProducts = () => {
  const categories = [
    { name: 'Software', value: 456, color: 'bg-blue-500', percentage: 36.5 },
    { name: 'Mobile', value: 234, color: 'bg-emerald-500', percentage: 18.7 },
    { name: 'API', value: 189, color: 'bg-purple-500', percentage: 15.1 },
    { name: 'Cloud', value: 156, color: 'bg-amber-500', percentage: 12.5 },
    { name: 'AI', value: 89, color: 'bg-cyan-500', percentage: 7.1 },
    { name: 'Finance', value: 124, color: 'bg-rose-500', percentage: 9.9 }
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

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl border border-gray-200 p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Category Distribution</h3>
          <p className="text-gray-500 text-sm mt-0.5">Products by category</p>
        </div>
        <PieChart className="w-5 h-5 text-gray-500" />
      </div>

      {/* Categories List */}
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            variants={itemVariants}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
              </div>
              <div className="text-sm font-bold text-gray-900">{category.value}</div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${category.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />
              </div>
              <div className="text-sm font-medium text-gray-600">{category.percentage}%</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Summary */}
      <div className="mt-6 pt-5 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Total Products</div>
            <div className="text-xl font-bold text-gray-900">1,248</div>
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+12.5% growth</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryProducts;