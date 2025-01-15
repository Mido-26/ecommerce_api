const express = require('express');
const router = express.Router();
const { editProductReviews, deleteProductReviews} = require('../controllers/reviewController');


router.put('/:id', editProductReviews)
router.delete('/:id', deleteProductReviews)

module.exports = router;
