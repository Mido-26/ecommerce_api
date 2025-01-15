const Review = require('../models/Review')
const User = require('../models/User')

// get reviews of a single product
const getProductReviews = async(res, req) =>{
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
const addProductReviews = async(res, req) =>{
    
    const {ratings, comment} = req.body;
    const productId = req.params.id;
    const userId = req.user.id;

    try {
        const addReview = await Review.create({
            ratings,
            comment,
            productId,
            userId
        })
    
        res.status(201).json({ data : addReview, message: "Review Added Successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: err.message });
    }
    
}

// editing a review of a product
const editProductReviews = async(res, req) =>{
    
}

// deleting a review 
const deleteProductReviews = async(res, req) =>{
    
}


module.exports = {
    getProductReviews,
    addProductReviews,
    editProductReviews,
    deleteProductReviews
};