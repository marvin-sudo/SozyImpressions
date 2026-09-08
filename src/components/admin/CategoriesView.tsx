import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  X, 
  Package
} from 'lucide-react';
import { AdminCategory } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';

export const CategoriesView: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useShopStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formSubcategoryInput, setFormSubcategoryInput] = useState('');
  const [formSubcategories, setFormSubcategories] = useState<string[]>([]);
  const [formIsActive, setFormIsActive] = useState(true);

  const filteredCategories = categories.filter(c => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return c.name.toLowerCase().includes(q) || 
           c.description?.toLowerCase().includes(q) ||
           c.subcategories?.some(s => s.toLowerCase().includes(q));
  });

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormName('');
    setFormSlug('');
    setFormDescription('');
    setFormImage('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600');
    setFormSubcategories(['Custom Merchandise', 'General Items']);
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDescription(cat.description || '');
    setFormImage(cat.image || '');
    setFormSubcategories(cat.subcategories || []);
    setFormIsActive(cat.isActive ?? true);
    setIsModalOpen(true);
  };

  const handleAddSubcategory = () => {
    if (formSubcategoryInput.trim() && !formSubcategories.includes(formSubcategoryInput.trim())) {
      setFormSubcategories([...formSubcategories, formSubcategoryInput.trim()]);
      setFormSubcategoryInput('');
    }
  };

  const handleRemoveSubcategory = (sub: string) => {
    setFormSubcategories(formSubcategories.filter(s => s !== sub));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const payload: Partial<AdminCategory> = {
      name: formName.trim(),
      slug: formSlug.trim() || formName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formDescription.trim(),
      image: formImage.trim() || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600',
      subcategories: formSubcategories,
      isActive: formIsActive
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, payload);
    } else {
      addCategory(payload as Omit<AdminCategory, 'id'>);
    }

    setIsModalOpen(false);
  };

  const handleDeleteCategory = (cat: AdminCategory) => {
    if (window.confirm(`Delete category "${cat.name}"? This will not delete products assigned to it.`)) {
      deleteCategory(cat.id);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2D3094]/10 text-[#2D3094] flex items-center justify-center">
            <Layers size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Shop Merchandise Categories</h2>
            <p className="text-xs text-slate-500">23 official SozyImpressions production departments</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search category or subcategory..."
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#2D3094]"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2D3094] hover:bg-[#232573] text-white text-xs font-bold transition-all shadow-xs"
          >
            <Plus size={14} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((cat) => {
          const productCount = products.filter(p => p.category?.toLowerCase() === cat.name.toLowerCase()).length;

          return (
            <div 
              key={cat.id} 
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#2D3094]/30 transition-all group"
            >
              {/* Image banner & overlay */}
              <div className="h-32 relative overflow-hidden bg-slate-100">
                <img 
                  src={cat.image || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600'} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    cat.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {cat.isActive ? 'Active' : 'Draft'}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-sm leading-tight text-white drop-shadow-xs">{cat.name}</h3>
                  <span className="text-[10px] text-slate-300 font-medium">/{cat.slug}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-500 line-clamp-2">
                  {cat.description || 'Custom printing, branding and assembly for client orders.'}
                </p>

                {/* Subcategories tags */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.slice(0, 4).map((sub, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {sub}
                      </span>
                    ))}
                    {cat.subcategories.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 font-semibold">
                        +{cat.subcategories.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Bottom Stats & Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Package size={12} className="text-[#2D3094]" /> {productCount} products
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(cat)}
                      title="Edit Category"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#2D3094] hover:text-white text-slate-600 transition-colors"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      title="Delete Category"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-600 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 bg-[#12142B] text-white flex items-center justify-between">
              <h2 className="text-base font-black">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                    if (!editingCategory) {
                      setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#2D3094]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#2D3094]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#2D3094]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2D3094]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subcategories</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={formSubcategoryInput}
                    onChange={(e) => setFormSubcategoryInput(e.target.value)}
                    placeholder="Add subcategory..."
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubcategory(); } }}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubcategory}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formSubcategories.map((sub) => (
                    <span key={sub} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      {sub}
                      <button type="button" onClick={() => handleRemoveSubcategory(sub)} className="text-slate-400 hover:text-rose-600">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2D3094] hover:bg-[#232573] text-white rounded-xl font-bold"
                >
                  Save Category
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
