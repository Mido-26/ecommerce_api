const Review = require('../models/Review')
const User = require('../models/User')

// get reviews of a single product
const getProductReviews = async(req, res) =>{
    console.log(req.body)
    const productId = req.params.id;
    const reviews = await Review.findAll({
        where: { productId: productId},
        include: {
            model: User
        }
    });

    if (reviews.length === 0) {
       return res.status(404).json({ message: "No reviews found for this product." });
    } 

    return res.status(200).json(reviews);
}

// add a review to a product
const addProductReviews = async(req, res) =>{
    console.log(req.body);
    const {rating, comment} = req.body;
    const ProductId = req.params.id;
    // const userId = req.user.id;
    const userId = null;

    try {
        const addReview = await Review.create({
            rating,
            comment,
            ProductId,
            userId
        })
    
        res.status(201).json({ data : addReview, message: "Review Added Successfully", success: true, status: 201})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: err.message , success: false, status: 400});
    }
    
} 

// editing a review of a product
const editProductReviews = async(req, res) =>{
    
}

// deleting a review 
const deleteProductReviews = async(req, res) =>{
    
}


module.exports = {
    getProductReviews,
    addProductReviews,
    editProductReviews,
    deleteProductReviews
};