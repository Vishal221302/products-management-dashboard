import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Package, 
  DollarSign, 
  Tag, 
  FileText,
  Upload,
  Globe,
  Calendar,
  Star,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react';
import axios from 'axios';

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch categories from API when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback categories if API fails
      setCategories(['electronics', 'jewelery', "men's clothing", "women's clothing"]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate form data
      if (!formData.title || !formData.price || !formData.description || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare product data in exact Fake Store API format
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: {
          rate: formData.rating.rate || 0,
          count: formData.rating.count || 0
        }
      };

      console.log('Submitting product in Fake Store API format:', productData);

      // Make API call to add product
      const response = await axios.post('https://fakestoreapi.com/products', productData);
      
      console.log('Product added successfully:', response.data);
      
      setSuccess(true);
      
      // Reset form to match API structure
      setFormData({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: {
          rate: 0,
          count: 0
        }
      });
      setImagePreview('');
      
      // Notify parent component about new product with API format
      if (onProductAdded) {
        onProductAdded(response.data);
      }
      
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.response?.data?.message || err.message || 'Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      rating: {
        ...prev.rating,
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    if (url) {
      setImagePreview(url);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData(prev => ({ ...prev, image: base64String }));
        setImagePreview(base64String);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData(prev => ({ ...prev, category }));
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          className="fixed inset-0 bg-black/50 bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                    <p className="text-gray-500 text-sm mt-0.5">Fill in the product details (Fake Store API format)</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Product Added Successfully!</h3>
                  <p className="text-gray-600">The product has been added in Fake Store API format.</p>
                  <div className="mt-4 text-sm text-gray-500">Closing modal in a moment...</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        <p className="text-sm text-rose-700">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Enter product title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          disabled={loading}
                          step="0.01"
                          min="0"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        disabled={loading || categories.length === 0}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      Product Rating (Optional)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Rating (0-5)
                        </label>
                        <div className="relative">
                          <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-4 h-4" />
                          <input
                            type="number"
                            value={formData.rating.rate}
                            onChange={(e) => handleRatingChange('rate', e.target.value)}
                            disabled={loading}
                            step="0.1"
                            min="0"
                            max="5"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="0.0"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Review Count
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="number"
                            value={formData.rating.count}
                            onChange={(e) => handleRatingChange('count', e.target.value)}
                            disabled={loading}
                            min="0"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={loading}
                        rows="4"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Describe your product features and benefits..."
                        required
                      />
                    </div>
                  </div>

                  {/* Image Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image
                    </label>
                    
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">Preview:</div>
                        <div className="w-32 h-32 rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Image URL Input */}
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Image URL (Required by API):</div>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="url"
                            name="imageUrl"
                            value={formData.image}
                            onChange={handleImageUrlChange}
                            disabled={loading}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Use a valid image URL from Fake Store API or similar
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Upload Local Image:</div>
                        <label className="block">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={loading}
                            className="hidden"
                          />
                          <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-blue-500'} border-gray-300`}>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 mb-1">
                              <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            <p className="text-xs text-amber-600 mt-2">
                              Note: Uploaded images will be converted to base64
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Example Data Preview */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Data Structure Preview (Will be sent to API)
                    </h4>
                    <div className="text-xs font-mono bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                      {JSON.stringify({
                        title: formData.title || "Product title",
                        price: formData.price ? parseFloat(formData.price) : 0,
                        description: formData.description || "Product description",
                        category: formData.category || "Category",
                        image: formData.image || "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                        rating: {
                          rate: formData.rating.rate || 0,
                          count: formData.rating.count || 0
                        }
                      }, null, 2)}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={loading}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding to Fake Store API...
                        </>
                      ) : (
                        'Create Product'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AddProductModal;