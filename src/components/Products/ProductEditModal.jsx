import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  X, 
  Save, 
  Upload, 
  Globe, 
  Tag, 
  DollarSign, 
  BarChart, 
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Star
} from 'lucide-react';

const ProductEditModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: product.name || '',
    price: product.originalPrice || product.price?.replace('$', '') || '',
    category: product.category || '',
    description: product.description || '',
    image: product.image || ''
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(product.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(product.rating || 0);
  const [ratingCount, setRatingCount] = useState(product.ratingCount || 0);

  // Fetch categories when modal opens
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback categories
      setCategories(['electronics', 'jewelery', "men's clothing", "women's clothing"]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setImagePreview(base64Image);
        setFormData(prev => ({
          ...prev,
          image: base64Image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: url
    }));
    setImagePreview(url);
  };

  const handleRatingChange = (value) => {
    setRating(value);
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

      // Prepare data for API (matching Fake Store API format)
      const apiData = {
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        category: formData.category,
        image: formData.image || product.image
      };

      console.log('Updating product:', product.id, 'with data:', apiData);

      // Call Fake Store API update endpoint
      const response = await axios.put(
        `https://fakestoreapi.com/products/${product.id}`,
        apiData
      );

      console.log('Product updated successfully:', response.data);

      // Update local state with response
      const updatedProduct = {
        ...product,
        ...response.data,
        name: response.data.title, // For backward compatibility
        originalPrice: response.data.price,
        price: `$${response.data.price}`,
        rating: rating,
        ratingCount: ratingCount
      };

      setSuccess(true);
      
      // Notify parent component
      if (onSave) {
        onSave(updatedProduct);
      }

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.response?.data?.message || err.message || 'Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
              <p className="text-gray-600">Update product details and settings</p>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-8">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Product Updated Successfully!</h3>
                <p className="text-gray-600">Product ID: {product.id}</p>
                <div className="mt-4 text-sm text-gray-500">Closing modal in a moment...</div>
              </div>
            ) : (
              <>
                {/* Error Message */}
                {error && (
                  <div className="mb-6 bg-rose-50 border border-rose-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      <p className="text-sm text-rose-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Image & Basic Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <ImageIcon className="w-4 h-4" />
                          Product Image
                        </div>
                      </label>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-xl border-2 border-gray-300 overflow-hidden bg-gray-50">
                            {imagePreview ? (
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="text-sm text-gray-600 mb-2">Image URL:</div>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="url"
                                name="imageUrl"
                                value={formData.image}
                                onChange={handleImageUrlChange}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-600 mb-2">Or upload image:</div>
                            <label className="block">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={loading}
                                className="hidden"
                              />
                              <div className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50">
                                <Upload className="w-4 h-4" />
                                <span className="text-sm font-medium">Upload New Image</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Recommended: 500×500px, JPG or PNG format</p>
                    </div>

                    {/* Name & Description */}
                    <div className="space-y-4">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                          disabled={loading}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                          required
                        />
                      </div>
                    </div>

                    {/* Category & Rating */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            Category *
                          </div>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
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

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Rating
                          </div>
                        </label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingChange(star)}
                              disabled={loading}
                              className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= rating
                                    ? 'text-amber-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                          <div className="ml-2">
                            <input
                              type="number"
                              value={rating}
                              onChange={(e) => setRating(parseFloat(e.target.value))}
                              min="0"
                              max="5"
                              step="0.1"
                              disabled={loading}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="block text-xs text-gray-600 mb-1">Rating Count</label>
                          <input
                            type="number"
                            value={ratingCount}
                            onChange={(e) => setRatingCount(parseInt(e.target.value))}
                            min="0"
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Pricing & Metrics */}
                  <div className="space-y-6">
                    {/* Pricing */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Pricing & Revenue
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price ($) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              step="0.01"
                              min="0"
                              disabled={loading}
                              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            SKU Code
                          </label>
                          <input
                            type="text"
                            value={product.sku || `PROD-${String(product.id).padStart(3, '0')}`}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart className="w-5 h-5" />
                        Product Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product ID
                          </label>
                          <input
                            type="text"
                            value={product.id}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            name="status"
                            value={product.status || 'active'}
                            onChange={(e) => console.log('Status changed to:', e.target.value)}
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                          >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                            <option value="warning">Warning</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Version
                            </div>
                          </label>
                          <input
                            type="text"
                            value={product.version || 'v1.0'}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              {!success && (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductEditModal;