const express = require('express');
const router = express.Router();
const {addProduct, getProducts, getProductById, updateProduct, deleteProduct} = require('../controllers/productController');
const {getProductReviews, addProductReviews} = require('../controllers/reviewController')
const upload =  require('../middleware/upload')

router.post('/', upload.single('image_url'), addProduct);          // Create a user
router.get('/', getProducts);             // Get all users
router.get('/:id', getProductById);       // Get user by ID
router.put('/:id', updateProduct);        // Update user by ID
router.delete('/:id', deleteProduct);     // Delete user by ID
router.get('/:id/reviews', getProductReviews);
router.post('/:id/reviews', addProductReviews);

module.exports = router;