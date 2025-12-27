import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

const ProductStatus = () => {
  const products = [
    { id: 1, name: 'Product A', status: 'active', users: '3.2K', revenue: '$45K', growth: '+12%' },
    { id: 2, name: 'Product B', status: 'active', users: '1.8K', revenue: '$28K', growth: '+8%' },
    { id: 3, name: 'Product C', status: 'inactive', users: '450', revenue: '$12K', growth: '-5%' },
    { id: 4, name: 'Product D', status: 'pending', users: '0', revenue: '$0', growth: '0%' },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <div className="w-2 h-2 rounded-full bg-emerald-500"></div>;
      case 'inactive': return <div className="w-2 h-2 rounded-full bg-rose-500"></div>;
      case 'pending': return <div className="w-2 h-2 rounded-full bg-amber-500"></div>;
      case 'warning': return <div className="w-2 h-2 rounded-full bg-orange-500"></div>;
      default: return <div className="w-2 h-2 rounded-full bg-gray-500"></div>;
    }
  };

  const getGrowthColor = (growth) => {
    if (growth.startsWith('+')) return 'text-emerald-600';
    if (growth.startsWith('-')) return 'text-rose-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-gray-900">Products Status</h3>
          <p className="text-gray-500 text-xs mt-0.5">Current product performance</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-emerald-600">
          <TrendingUp className="w-4 h-4" />
          <span>+5.5% avg</span>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 mb-3 px-3">
        <div className="col-span-4 text-xs font-medium text-gray-500">PRODUCT</div>
        <div className="col-span-2 text-xs font-medium text-gray-500">STATUS</div>
        <div className="col-span-2 text-xs font-medium text-gray-500 text-right">USERS</div>
        <div className="col-span-2 text-xs font-medium text-gray-500 text-right">REVENUE</div>
        <div className="col-span-2 text-xs font-medium text-gray-500 text-right">GROWTH</div>
      </div>

      {/* Products List */}
      <div className="space-y-2">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-12 gap-4 items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {/* Product Name */}
            <div className="col-span-4">
              <div className="font-medium text-gray-900 text-sm">{product.name}</div>
            </div>
            
            {/* Status */}
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(product.status)}
                <span className="text-xs text-gray-600 capitalize">{product.status}</span>
              </div>
            </div>
            
            {/* Users */}
            <div className="col-span-2 text-right">
              <div className="text-sm font-medium text-gray-900">{product.users}</div>
            </div>
            
            {/* Revenue */}
            <div className="col-span-2 text-right">
              <div className="text-sm font-medium text-gray-900">{product.revenue}</div>
            </div>
            
            {/* Growth */}
            <div className="col-span-2 text-right">
              <div className={`text-sm font-medium ${getGrowthColor(product.growth)}`}>
                {product.growth}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            <span className="font-medium text-gray-900">4</span> products total
          </div>
          <div className="text-gray-600">
            <span className="font-medium text-gray-900">$85K</span> total monthly revenue
          </div>
          <div className="text-gray-600">
            <span className="font-medium text-gray-900">7.5K</span> total users
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStatus;