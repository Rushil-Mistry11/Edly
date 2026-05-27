import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as LucideIcons from 'lucide-react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Briefcase, HelpCircle } from 'lucide-react';
import { backendUrl } from '../App';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        icon_name: ''
    });

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(backendUrl + '/api/category');
            setCategories(response.data.categories);
        } catch (error) {
            toast.error('Failed to fetch categories');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Open modal for create new category
    const handleOpenCreate = () => {
        setFormData({
            name: '',
            icon_name: ''
        });
        setSelectedCategory(null);
        setShowModal(true);
    };

    // Open modal for edit with selected content loaded
    const handleOpenEdit = (category) => {
        setSelectedCategory(category);
        setFormData({
            name: category.name,
            icon_name: category.icon_name || ''
        });
        setShowModal(true);
    };

    // Create or Update Category
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('adminToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            if (selectedCategory) {
                await axios.put(backendUrl + `/api/category/${selectedCategory.id}`, formData, config);
                toast.success('Category updated successfully');
            } else {
                await axios.post(backendUrl + '/api/category', formData, config);
                toast.success('Category added successfully');
            }
            setShowModal(false);
            setSelectedCategory(null);
            fetchCategories();
        } catch (error) {
            toast.error(selectedCategory ? 'Failed to update category' : 'Failed to add category');
            console.error('Error:', error);
        }
    };

    // Delete confirmation
    const handleOpenDelete = (category) => {
        setSelectedCategory(category);
        setDeleteModal(true);
    };

    // Delete category 
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(backendUrl + `/api/category/${selectedCategory.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Category deleted successfully');
            setDeleteModal(false);
            setSelectedCategory(null);
            fetchCategories();
        } catch (error) {
            toast.error('Failed to delete category');
            console.error(error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setDeleteModal(false);
        setSelectedCategory(null);
    };

    const DynamicIcon1 = LucideIcons[formData.icon_name] || HelpCircle;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-500 mt-1">Manage your course categories</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="flex items-center gap-2 bg-linear-to-r from-red-400 to-red-500 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            {/* Categories Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
                </div>
            ) : categories.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories yet</h3>
                    <p className="text-gray-500 mb-6">Start by adding your first category</p>
                    <button
                        onClick={handleOpenCreate}
                        className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        <Plus size={20} />
                        Add Category
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => {
                        const DynamicIcon = LucideIcons[category.icon_name] || HelpCircle;
                        return (
                            <div
                                key={category.id}
                                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-linear-to-br from-red-100 to-red-200 flex items-center justify-center overflow-hidden">
                                          <DynamicIcon />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenEdit(category)}
                                            className="p-2 hover:bg-slate-50 rounded-lg transition text-gray-600 hover:text-green-700"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleOpenDelete(category)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition text-gray-600 hover:text-red-600"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {selectedCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter category name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Icon (Emoji or Character)
                                </label>
                                <input
                                    type="text"
                                    name="icon_name"
                                    value={formData.icon_name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="User,..."
                                />
                                {formData.icon_name && (
                                    <div className="mt-3 flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                                            <DynamicIcon1 />
                                        </div>
                                        <span className="text-sm text-gray-500">Preview</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-linear-to-r from-red-400 to-red-500 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition font-semibold shadow-lg"
                                >
                                    {selectedCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <Trash2 size={24} className="text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Delete Category</h2>
                                <p className="text-gray-500 text-sm">This action cannot be undone</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>{selectedCategory?.name}</strong>?
                            This will permanently remove the Category from the system.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={closeModal}
                                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;