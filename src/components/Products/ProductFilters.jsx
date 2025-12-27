import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Tag, 
  Calendar, 
  Star, 
  DollarSign,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

const ProductFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedRating, 
  setSelectedRating,
  selectedPriceRange, 
  setSelectedPriceRange,
  searchQuery,
  setSearchQuery
}) => {
  // Filter sections state
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    date: false
  });

  // Categories based on your data
  const categories = [
    { id: 'all', name: 'All Categories', count: 20 },
    { id: "men's clothing", name: "Men's Clothing", count: 5 },
    { id: "women's clothing", name: "Women's Clothing", count: 6 },
    { id: 'jewelery', name: 'Jewelry', count: 4 },
    { id: 'electronics', name: 'Electronics', count: 5 }
  ];

  // Price ranges based on your data
  const priceRanges = [
    { id: 'all', name: 'All Prices', min: 0, max: 1000 },
    { id: 'low', name: 'Under $25', min: 0, max: 25, count: 6 },
    { id: 'medium', name: '$25 - $100', min: 25, max: 100, count: 8 },
    { id: 'high', name: '$100 - $500', min: 100, max: 500, count: 5 },
    { id: 'premium', name: 'Over $500', min: 500, max: 1000, count: 1 }
  ];

  // Rating filters
  const ratings = [
    { id: 'all', name: 'All Ratings', value: 0 },
    { id: '5', name: '★★★★★', value: 5, count: 3 },
    { id: '4', name: '★★★★☆ & above', value: 4, count: 8 },
    { id: '3', name: '★★★☆☆ & above', value: 3, count: 12 },
    { id: '2', name: '★★☆☆☆ & above', value: 2, count: 15 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedRating('all');
    setSelectedPriceRange('all');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedRating !== 'all' || selectedPriceRange !== 'all';

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
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
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <p className="text-gray-500 text-sm mt-0.5">Refine your product search</p>
            </div>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700"
            >
              <X className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Category Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">Category</span>
            </div>
            {expandedSections.category ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.category && (
            <motion.div 
              className="space-y-2 pl-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  variants={itemVariants}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-all ${
                    selectedCategory === category.id 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 ' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">Price Range</span>
            </div>
            {expandedSections.price ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.price && (
            <motion.div 
              className="space-y-2 pl-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  variants={itemVariants}
                  onClick={() => setSelectedPriceRange(range.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-all ${
                    selectedPriceRange === range.id 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{range.name}</span>
                  {range.count && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedPriceRange === range.id 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {range.count}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('rating')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">Customer Rating</span>
            </div>
            {expandedSections.rating ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.rating && (
            <motion.div 
              className="space-y-2 pl-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {ratings.map((rating) => (
                <button
                  key={rating.id}
                  variants={itemVariants}
                  onClick={() => setSelectedRating(rating.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-all ${
                    selectedRating === rating.id 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500">{rating.name}</span>
                    {rating.value > 0 && (
                      <span className="text-xs text-gray-500">({rating.value}+)</span>
                    )}
                  </div>
                  {rating.count && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedRating === rating.id 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {rating.count}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default ProductFilters;