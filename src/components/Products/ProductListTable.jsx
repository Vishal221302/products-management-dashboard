import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Edit2, 
  Trash2, 
  Eye, 
  MoreVertical,
  CheckCircle,
  Clock,
  Archive,
  AlertCircle,
  Star,
  Download,
  Share2,
  Package,
  Filter,
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';
import ProductImageModal from './ProductImageModal';
import ProductEditModal from './ProductEditModal';
import ProductDeleteModal from './ProductDeleteModal';

const ProductListTable = ({ viewMode, searchQuery, selectedCategory, selectedStatus }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewModalIndex, setViewModalIndex] = useState(0);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        const productsWithFormattedData = response.data.map(product => ({
          id: product.id,
          name: product.title,
          sku: `PROD-${String(product.id).padStart(3, '0')}`,
          category: product.category,
          price: `$${product.price}`,
          originalPrice: product.price,
          status: getRandomStatus(),
          users: `${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 9)}K`,
          revenue: `$${Math.floor(product.price * 100)}`,
          version: `v${(Math.random() + 1).toFixed(1)}`,
          lastUpdate: `${Math.floor(Math.random() * 30) + 1} days ago`,
          rating: parseFloat(product.rating?.rate || (Math.random() * 2 + 3).toFixed(1)),
          image: product.image,
          description: product.description
        }));
        
        setProducts(productsWithFormattedData);
        setFilteredProducts(productsWithFormattedData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const truncateText = (text, limit = 30) => {
  if (!text) return '';
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

  // Apply filters
  useEffect(() => {
    if (!products.length) return;

    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedStatus && selectedStatus !== 'all') {
      result = result.filter(product => product.status === selectedStatus);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  const getRandomStatus = () => {
    const statuses = ['active', 'draft', 'archived', 'warning'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'draft': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'archived': return <Archive className="w-4 h-4 text-gray-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'draft': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'archived': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'warning': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };

  // Modal handlers
  const handleView = (product, index) => {
    setSelectedProduct(product);
    setViewModalIndex(index);
    setViewModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedProduct) => {
    setProducts(prev => prev.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setFilteredProducts(prev => prev.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      setFilteredProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      setSelectedProducts(prev => prev.filter(id => id !== selectedProduct.id));
      setDeleteModalOpen(false);
    }
  };

  const handleNextProduct = () => {
    if (viewModalIndex < filteredProducts.length - 1) {
      setSelectedProduct(filteredProducts[viewModalIndex + 1]);
      setViewModalIndex(prev => prev + 1);
    }
  };

  const handlePrevProduct = () => {
    if (viewModalIndex > 0) {
      setSelectedProduct(filteredProducts[viewModalIndex - 1]);
      setViewModalIndex(prev => prev - 1);
    }
  };

  // Export functionality
  const handleExport = () => {
    const exportData = selectedProducts.length > 0 
      ? filteredProducts.filter(p => selectedProducts.includes(p.id))
      : filteredProducts;

    const csvContent = [
      ['ID', 'Name', 'SKU', 'Category', 'Price', 'Status', 'Rating', 'Users', 'Revenue', 'Version'],
      ...exportData.map(product => [
        product.id,
        product.name,
        product.sku,
        product.category,
        product.price,
        product.status,
        product.rating,
        product.users,
        product.revenue,
        product.version
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const rowVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <p className="text-rose-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <>
        <div className="p-5">

          {/* Grid View with 50-50 Image Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
                whileHover="hover"
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* 50-50 Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-40 w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(product.status)}`}>
                      {product.status}
                    </div>
                  </div>
                  
                </div>

                {/* Content Section */}
                <div className="p-5">
                  {/* Title */}
                  <h3 
                    className="font-bold text-gray-900 text-lg mb-2 truncate cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => handleView(product, index)}
                  >
                   {truncateText(product.name, 30)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Price</div>
                      <div className="font-bold text-gray-900">{product.price}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Category</div>
                      <div className="font-medium text-gray-900 truncate">{product.category}</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="font-medium text-gray-900">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{product.sku}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Updated {product.lastUpdate}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView(product, index)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product)}
                        className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-rose-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {viewModalOpen && selectedProduct && (
            <ProductImageModal
              product={selectedProduct}
              onClose={() => setViewModalOpen(false)}
              onNext={handleNextProduct}
              onPrev={handlePrevProduct}
              currentIndex={viewModalIndex}
              totalProducts={filteredProducts.length}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {editModalOpen && selectedProduct && (
            <ProductEditModal
              product={selectedProduct}
              onClose={() => setEditModalOpen(false)}
              onSave={handleSaveEdit}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deleteModalOpen && selectedProduct && (
            <ProductDeleteModal
              product={selectedProduct}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        {/* Header */}
        

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product, index) => (
              <motion.tr
                key={product.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
                whileHover="hover"
                className="hover:bg-gray-50 transition-colors"
              >
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div 
                        className="font-medium text-gray-900 truncate cursor-pointer hover:text-blue-600"
                        onClick={() => handleView(product, index)}
                      >
                        {truncateText(product.name, 20)}
                      </div>
                      <div className="text-sm text-gray-500 truncate">{product.description.substring(0, 20)}...</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(product.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-gray-900">{product.price}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="font-medium text-gray-900">{product.rating}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleView(product, index)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product)}
                      className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-rose-600" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 
                  ? i + 1 
                  : currentPage >= totalPages - 2 
                  ? totalPages - 4 + i 
                  : currentPage - 2 + i;
                
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {viewModalOpen && selectedProduct && (
          <ProductImageModal
            product={selectedProduct}
            onClose={() => setViewModalOpen(false)}
            onNext={handleNextProduct}
            onPrev={handlePrevProduct}
            currentIndex={viewModalIndex}
            totalProducts={filteredProducts.length}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editModalOpen && selectedProduct && (
          <ProductEditModal
            product={selectedProduct}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSaveEdit}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModalOpen && selectedProduct && (
          <ProductDeleteModal
            product={selectedProduct}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductListTable;