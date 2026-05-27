import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, Image, Layers } from 'lucide-react';
import { backendUrl } from '../App';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    course_level: 'Intermediate',
    duration: '',
    certificate: 1, 
    language: 'English',
    access: 'Lifetime',
    instructor_name: '',
    category_id: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [courseRes, categoryRes] = await Promise.all([
        axios.get(`${backendUrl}/api/course/list`),
        axios.get(`${backendUrl}/api/category`)
      ]);
      setCourses(courseRes.data || []);
      setCategories(categoryRes.data.categories || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to pull structural dashboard records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'certificate') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleOpenModal = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      course_level: 'Intermediate',
      duration: '',
      certificate: 1,
      language: 'English',
      access: 'Lifetime',
      instructor_name: '',
      category_id: categories[0]?.id || ''
    });
    setThumbnailFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    if (!thumbnailFile) {
      return toast.warn('Please supply a course promotional thumbnail image banner.');
    }

    const data = new FormData();
    data.append('image', thumbnailFile); 
    
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`${backendUrl}/api/course/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Course created successfully!');
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed creating new course record entry.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      const response = await axios.delete(`${backendUrl}/api/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        toast.success('Course deleted successfully.');
        fetchData();
      }
    } catch (error) {
      console.error(error);
      toast.error('Unable to finalize deletion processing phase operations.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-xs border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">System Courses</h1>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-linear-to-r from-red-400 to-red-500 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md active:scale-95 text-sm"
        >
          <Plus size={18} /> Add New Course
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-xs">
          <Layers size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No courses yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-xs uppercase font-bold border-b border-gray-200">
                  <th className="p-4">Course Banner</th>
                  <th className="p-4">Title & Details</th>
                  <th className="p-4">Instructor</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-4">
                      <img
                        src={course.thumbnail_url}
                        alt="Course thumbnail representation"
                        className="w-24 h-14 object-cover rounded-md border border-gray-200 bg-gray-50 shadow-2xs"
                      />
                    </td>
                    <td className="p-4 max-w-sm">
                      <p className="font-semibold text-gray-900 truncate">{course.title}</p>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-2xs font-semibold rounded-sm">
                          {course.course_level}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-2xs font-medium rounded-sm">
                          {course.duration}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-700">{course.instructor_name}</td>
                    <td className="p-4 font-semibold text-gray-900">
                      {parseFloat(course.price) === 0 ? (
                        <span className="text-green-600 font-bold">Free</span>
                      ) : (
                        `$${course.price}`
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                        title="Delete Course Asset"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8 shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add Course</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 font-medium text-xl px-2"
              >
               x
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl p-4 transition text-center bg-gray-50/50">
                <input
                  type="file"
                  accept="image/*"
                  id="image_file_input"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="image_file_input" className="cursor-pointer block space-y-2">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview element representation" className="max-h-40 mx-auto rounded-lg shadow-xs" />
                  ) : (
                    <div className="py-4 flex flex-col items-center">
                      <Image size={32} className="text-gray-400 mb-1" />
                      <span className="text-xs text-blue-600 font-semibold underline">Click to upload thumbnail artwork</span>
                      <span className="text-3xs text-gray-400 block mt-0.5">Supports PNG, JPG assets up to 5MB dimensions</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Course Title *</label>
                  <input
                    type="text" name="title" required value={formData.title} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Instructor Name *</label>
                  <input
                    type="text" name="instructor_name" required value={formData.instructor_name} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Detailed Description *</label>
                <textarea
                  name="description" rows="3" required value={formData.description} onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Price (USD) *</label>
                  <input
                    type="number" step="0.01" name="price" required value={formData.price} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="49.99"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Duration Metrics *</label>
                  <input
                    type="text" name="duration" required value={formData.duration} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 7 weeks"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Difficulty Level</label>
                  <select
                    name="course_level" value={formData.course_level} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Begginer">Begginer</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advance">Advance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Category *</label>
                  <select
                    name="category_id" required value={formData.category_id} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {categories.length === 0 ? (
                      <option disabled>Create a category first!</option>
                    ) : (
                      categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Language Track</label>
                  <input
                    type="text" name="language" value={formData.language} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Certificate Issued</label>
                  <select
                    name="certificate" value={formData.certificate} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Access Expiry Mode</label>
                  <input
                    type="text" name="access" value={formData.access} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;