const express = require('express');
const router = express.Router();
const {addProduct, getProducts, getProductById, updateProduct, deleteProduct} = require('../controllers/productController');


router.post('/', addProduct);          // Create a user
router.get('/', getProducts);             // Get all users
router.get('/:id', getProductById);       // Get user by ID
router.put('/:id', updateProduct);        // Update user by ID
router.delete('/:id', deleteProduct);     // Delete user by ID

module.exports = router;