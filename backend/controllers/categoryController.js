const Category = require('../models/categoryModel');

const createCategory = async (req, res) => {
    try {
        const { name, icon_name } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Category name is required" });
        }

        const result = await Category.create(name, icon_name || null);
        res.status(201).json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, icon_name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Category name is required" });
        }

        const result = await Category.update(id, name, icon_name || null);

        if (result.rowsAffected === 0) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteCategory = async (req, res) => {    
    try {
        const { id } = req.params;
        const result = await Category.delete(id);

        if (result.rowsAffected === 0) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { createCategory, getAllCategories, updateCategory, deleteCategory };