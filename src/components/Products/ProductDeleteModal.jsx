import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { X, AlertTriangle, Trash2, Package, CheckCircle, Loader } from 'lucide-react';

const ProductDeleteModal = ({ product, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Call DELETE API
      const response = await axios.delete(`https://fakestoreapi.com/products/${product.id}`);
      
      console.log('Product deleted successfully:', response.data);
      
      setSuccess(true);
      
      // Notify parent component after a delay
      setTimeout(() => {
        if (onConfirm) {
          onConfirm();
        }
        onClose();
      }, 1500);
      
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.message || err.message || 'Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
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
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        {success ? (
          <div className="p-8">
            {/* Success State */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Deleted</h2>
              <p className="text-gray-600 mb-6">Product has been successfully deleted</p>
              
              {/* Deleted Product Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-10 h-10 object-contain opacity-50"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate line-through">{product.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">{product.sku}</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        Deleted
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                Closing modal in a moment...
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Product</h2>
              <p className="text-gray-600">This action cannot be undone</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <p className="text-sm text-rose-700">{error}</p>
                </div>
              </div>
            )}

            {/* Product Preview */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{product.title || product.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-500">{product.sku}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      product.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Price</div>
                    <div className="font-medium text-gray-900">{product.price}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Category</div>
                    <div className="font-medium text-gray-900 capitalize">{product.category}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-500">ID</div>
                    <div className="font-mono text-sm text-gray-900">{product.id}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Warning</h4>
                  <p className="text-sm text-amber-800">
                    Deleting this product will permanently remove all associated data including:
                  </p>
                  <ul className="text-sm text-amber-800 mt-2 space-y-1">
                    <li>• Product listing and images</li>
                    <li>• All product details and descriptions</li>
                    <li>• Product reviews and ratings</li>
                    <li>• This cannot be recovered</li>
                  </ul>
                </div>
              </div>
            </div>

            

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Product
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductDeleteModal;