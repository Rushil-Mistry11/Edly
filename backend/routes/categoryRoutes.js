const express = require('express');
const router = express.Router();
const {  createCategory,   getAllCategories,   updateCategory,  deleteCategory } = require('../controllers/categoryController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllCategories);

router.post('/', verifyToken, isAdmin, createCategory);
router.put('/:id', verifyToken, isAdmin, updateCategory);
router.delete('/:id', verifyToken, isAdmin, deleteCategory);

module.exports = router;