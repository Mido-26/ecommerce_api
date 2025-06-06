const cartegory = require('../models/Category');

// Create a new category
const createCategory = async (req, res) => {
    try {
        const name = req.body.name;
        console.log(name);
        const image_url = req.file ? req.file.filename : null;
        console.log(image_url); 
        const newCategory = await cartegory.create({ name, image_url });
        res.status(201).json({ data: newCategory, message: 'Category created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get All categories
const getCategories = async (req, res) => {
    try {
        const categories = await cartegory.findAll();
        res.status(200).json({ data: categories, message: 'Categories retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await cartegory.findByPk(req.params.id);
        if (category) {
            res.status(200).json({ data: category, message: 'Category retrieved successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a category by ID
const updateCategory = async (req, res) => {
    try {
        // Extract data from the request body
        const { name } = req.body;
        const image_url = req.file ? req.file.filename : null;

        // Find the category by primary key
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Build the fields to update
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (image_url) updatedFields.image_url = image_url;

        // If no fields to update, respond with an error
        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        // Update the category
        await category.update(updatedFields);

        // Respond with success
        return res.status(200).json({
            data: category,
            message: 'Category updated successfully',
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ error: error.message });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const category = await cartegory.findByPk(req.params.id);
        if (category) {
            await category.destroy();
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
