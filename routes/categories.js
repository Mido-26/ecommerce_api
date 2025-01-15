const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} = require('../controllers/categoryController');


router.post('/', upload.single('profile'), createCategory);          // Create a user
router.get('/',  getCategories);             // Get all users
router.get('/:id', getCategoryById);       // Get user by ID
router.put('/:id', upload.single('profile'), updateCategory);        // Update user by ID
router.delete('/:id', deleteCategory);     // Delete user by ID

module.exports = router;    