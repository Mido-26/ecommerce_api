const product = require('../models/Product');

// add product
const addProduct = async (req, res) => {
    const { name, image_url, selling_price, buying_price, category_id } = req.body;
    try {
        const product = await product.create({
            name,
            image_url,
            selling_price,
            buying_price,
            category_id
        });
        res.status(200).json({data: product, message: 'Product added successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}

// get all products
const getProducts = async (req, res) => {
    try {
        const products = await product.findAll();
        res.status(200).json({data: products, message: 'Products retrieved successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get product by id
const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await product.findByPk(id);
        if (product) {
            res.status(200).json({data: product, message: 'Product retrieved successfully'});
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update product by id
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, image_url, selling_price, buying_price, category_id } = req.body;
    try {
        const product = await product.update({
            name,
            image_url,
            selling_price,
            buying_price,
            category_id
        }, {
            where: {
                id
            }
        });
        res.status(200).json({data: product, message: 'Product updated successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete product by id
const deleteProduct = async (req, res) => {
    const id = req.params.id;
   try {
    const product = await product.destroy({
        where: {
            id
        }
    });
    res.status(200).json({data: product, message: 'Product deleted successfully'});
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
}

// export controllers
module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}