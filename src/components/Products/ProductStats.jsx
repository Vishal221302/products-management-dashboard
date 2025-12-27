import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  Archive,
  TrendingUp,
  DollarSign,
  Users,
  Star,
  TrendingDown,
  AlertCircle,
  Loader
} from 'lucide-react';

const ProductStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchProductStats();
  }, []);

  const fetchProductStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;
      
      calculateStats(products);
      setError(null);
    } catch (err) {
      console.error('Error fetching product stats:', err);
      setError('Failed to load statistics. Please try again.');
      // Set fallback stats
      setStats(getFallbackStats());
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (products) => {
    const totalProducts = products.length;
    setTotalProducts(totalProducts);

    // Calculate average price
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    const avgPrice = totalPrice / totalProducts;

    // Count by category
    const categories = {};
    products.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });

    // Count active products (rating > 3)
    const activeProducts = products.filter(product => product.rating?.rate > 3).length;
    const activePercentage = Math.round((activeProducts / totalProducts) * 100);

    // Count low rating products (rating < 2)
    const draftProducts = products.filter(product => product.rating?.rate < 2).length;
    const draftPercentage = Math.round((draftProducts / totalProducts) * 100);

    // Count archived (lowest 20% by rating count)
    const sortedByRatingCount = [...products].sort((a, b) => 
      (a.rating?.count || 0) - (b.rating?.count || 0)
    );
    const archivedProducts = Math.floor(totalProducts * 0.2); // Bottom 20%
    const archivedPercentage = Math.round((archivedProducts / totalProducts) * 100);

    // Calculate total reviews
    const totalReviews = products.reduce((sum, product) => sum + (product.rating?.count || 0), 0);

    // Get top category
    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const topCategoryCount = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[1] || 0;
    const topCategoryPercentage = Math.round((topCategoryCount / totalProducts) * 100);

    // Calculate average rating
    const avgRating = products.reduce((sum, product) => sum + (product.rating?.rate || 0), 0) / totalProducts;

    const calculatedStats = [
      {
        id: 1,
        title: 'Total Products',
        value: totalProducts.toString(),
        change: `+${Math.round(Math.random() * 20)}%`,
        description: `Across ${Object.keys(categories).length} categories`,
        icon: Package,
        color: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200'
      },
      {
        id: 2,
        title: 'Active Products',
        value: activeProducts.toString(),
        change: `+${activePercentage}%`,
        description: 'Rating > 3 stars',
        icon: CheckCircle,
        color: 'from-emerald-500 to-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
      },
      {
        id: 3,
        title: 'Low Rating',
        value: draftProducts.toString(),
        change: `${draftPercentage}%`,
        description: 'Rating < 2 stars',
        icon: Clock,
        color: 'from-amber-500 to-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200'
      },
      {
        id: 4,
        title: 'Top Category',
        value: topCategory,
        change: `${topCategoryPercentage}%`,
        description: `${topCategoryCount} products`,
        icon: Archive,
        color: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200'
      },
      {
        id: 5,
        title: 'Avg. Price',
        value: `$${avgPrice.toFixed(2)}`,
        change: `${avgPrice > 100 ? '+' : ''}${Math.round((avgPrice / 100) * 100)}%`,
        description: `Range: $${Math.min(...products.map(p => p.price)).toFixed(2)} - $${Math.max(...products.map(p => p.price)).toFixed(2)}`,
        icon: DollarSign,
        color: 'from-indigo-500 to-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200'
      },
      {
        id: 6,
        title: 'Total Reviews',
        value: totalReviews.toLocaleString(),
        change: `+${Math.round((totalReviews / 1000) * 100)}%`,
        description: `Avg: ${avgRating.toFixed(1)}★`,
        icon: Users,
        color: 'from-cyan-500 to-cyan-600',
        bg: 'bg-cyan-50',
        border: 'border-cyan-200'
      }
    ];

    setStats(calculatedStats);
  };

  const getFallbackStats = () => {
    return [
      {
        id: 1,
        title: 'Total Products',
        value: '20',
        change: '+12.5%',
        description: 'From API',
        icon: Package,
        color: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200'
      },
      {
        id: 2,
        title: 'Active Products',
        value: '15',
        change: '+8.2%',
        description: 'Rating > 3 stars',
        icon: CheckCircle,
        color: 'from-emerald-500 to-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
      },
      {
        id: 3,
        title: 'Low Rating',
        value: '3',
        change: '+3.1%',
        description: 'Rating < 2 stars',
        icon: Clock,
        color: 'from-amber-500 to-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200'
      },
      {
        id: 4,
        title: 'Top Category',
        value: 'electronics',
        change: '35%',
        description: '7 products',
        icon: Archive,
        color: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200'
      },
      {
        id: 5,
        title: 'Avg. Price',
        value: '$188.33',
        change: '+5.7%',
        description: 'Range: $7.95 - $999.99',
        icon: DollarSign,
        color: 'from-indigo-500 to-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200'
      },
      {
        id: 6,
        title: 'Total Reviews',
        value: '1,248',
        change: '+18.3%',
        description: 'Avg: 4.2★',
        icon: Users,
        color: 'from-cyan-500 to-cyan-600',
        bg: 'bg-cyan-50',
        border: 'border-cyan-200'
      }
    ];
  };

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
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (percentage) => ({
      width: `${percentage}%`,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-4 border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
              <div className="w-12 h-5 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-3/4 h-7 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="mt-4">
              <div className="h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <div>
            <h3 className="font-medium text-rose-900">Failed to load statistics</h3>
            <p className="text-sm text-rose-700 mt-1">{error}</p>
            <button
              onClick={fetchProductStats}
              className="mt-3 px-4 py-2 bg-rose-600 text-white text-sm rounded-lg hover:bg-rose-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => {
          const changeValue = parseFloat(stat.change);
          const isPositive = !stat.change.includes('-');
          const progressPercentage = Math.min(Math.abs(changeValue) * 3, 100); // Scale for progress bar

          return (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              whileHover="hover"
              className={`${stat.bg} rounded-xl p-4 border ${stat.border} hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-sm`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-rose-500" />
                  )}
                  <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 truncate">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-700 mt-1">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{stat.description}</p>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="h-1 bg-gray-200/80 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                    custom={progressPercentage}
                    variants={progressBarVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Stats Summary */}
      {stats.length > 0 && (
        <motion.div 
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Categories Distribution</h4>
                <p className="text-xs text-gray-600">
                  {stats.find(s => s.title === 'Top Category')?.value} has most products
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Quality Overview</h4>
                <p className="text-xs text-gray-600">
                  {Math.round((stats.find(s => s.title === 'Active Products')?.value / totalProducts) * 100)}% high quality products
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Price Analysis</h4>
                <p className="text-xs text-gray-600">
                  Average: {stats.find(s => s.title === 'Avg. Price')?.value}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ProductStats;