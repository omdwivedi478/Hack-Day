import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const FarmerProductsPage = () => {
  const { products, updateProduct, deleteProduct } = useMarketplace();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingStockProduct, setEditingStockProduct] = useState(null);
  const [newStockVal, setNewStockVal] = useState(100);

  // Filter products for this farmer
  const farmerProducts = products.filter(p =>
    p.farmerId === user.id || p.farmerName.toLowerCase() === user.name.toLowerCase() || p.farmerId === 'farmer-1'
  );

  const displayedProducts = farmerProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStockSubmit = (e) => {
    e.preventDefault();
    if (editingStockProduct) {
      updateProduct(editingStockProduct.id, { availableQty: Number(newStockVal) });
      setEditingStockProduct(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Produce Listings ({farmerProducts.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your active harvest catalog, update live stock quantities, and adjust direct prices.
          </p>
        </div>

        <Link to="/farmer/products/add">
          <Button variant="primary" size="md" icon={Plus} className="shadow-xs">
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Search & Stats bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my products..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
          />
        </div>

        <div className="text-xs text-slate-500">
          Total Listed Stock: <strong className="text-slate-800 dark:text-slate-200">{farmerProducts.reduce((acc, p) => acc + (p.availableQty || 0), 0)} kg</strong>
        </div>
      </div>

      {/* Products Table matching specification */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Produce</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Direct Price</th>
                <th className="py-3.5 px-4">Available Stock</th>
                <th className="py-3.5 px-4">Orders</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  {/* Thumbnail & Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {product.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {product.variety}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {product.category}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4">
                    <span className="font-extrabold text-slate-900 dark:text-white block">
                      ₹{product.price}/{product.unit}
                    </span>
                    <span className="text-[10px] text-emerald-600">
                      ₹{product.farmerPrice || Math.round(product.price * 0.8)} Net Take-Home
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => {
                        setEditingStockProduct(product);
                        setNewStockVal(product.availableQty);
                      }}
                      className="inline-flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200 hover:text-primary underline decoration-dotted"
                      title="Click to update stock"
                    >
                      <span>{product.availableQty} {product.unit}</span>
                      <Edit2 className="w-3 h-3 text-slate-400" />
                    </button>
                  </td>

                  {/* Orders */}
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                    {product.reviewsCount || 42} fulfilled
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <Badge variant={product.availableQty > 50 ? 'success' : 'warning'}>
                      {product.availableQty > 50 ? 'In Stock' : 'Low Stock'}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingStockProduct(product);
                          setNewStockVal(product.availableQty);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Quick edit stock"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Edit Stock Modal */}
      {editingStockProduct && (
        <Modal
          isOpen={!!editingStockProduct}
          onClose={() => setEditingStockProduct(null)}
          title={`Update Available Stock: ${editingStockProduct.name}`}
        >
          <form onSubmit={handleUpdateStockSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Available Quantity ({editingStockProduct.unit})
              </label>
              <input
                type="number"
                min="0"
                value={newStockVal}
                onChange={(e) => setNewStockVal(e.target.value)}
                className="w-full text-sm font-bold px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setEditingStockProduct(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Stock
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
