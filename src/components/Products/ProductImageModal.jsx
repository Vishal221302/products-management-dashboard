// ProductImageModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, Package, ShoppingBag, Tag, Globe, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImageModal = ({ product, onClose, onNext, onPrev, currentIndex, totalProducts }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        variants={modalVariants}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4  z-100 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-100 p-3 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={onNext}
          disabled={currentIndex === totalProducts - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg transition-all"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-[85vh]">
          {/* Left side - Image */}
          <div className="relative bg-gray-50 flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-50" />
            </div>
            
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[70vh] max-w-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
              {currentIndex + 1} / {totalProducts}
            </div>
          </div>

          {/* Right side - Details */}
          <div className="p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    product.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    product.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {product.status}
                  </div>
                  <span className="text-sm text-gray-500">{product.sku}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-500 fill-current" />
                    <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                    <span className="text-gray-500">/ 5.0</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{product.price}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="font-medium text-gray-900">{product.category}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Active Users</div>
                    <div className="font-medium text-gray-900">{product.users}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Revenue</div>
                    <div className="font-medium text-gray-900">{product.revenue}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Last Updated</div>
                    <div className="font-medium text-gray-900">{product.lastUpdate}</div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductImageModal;