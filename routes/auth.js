const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/authController');

const router = express.Router();

router.post('/', createUser);          // Create a user
router.get('/', getUsers);             // Get all users
router.get('/:id', getUserById);       // Get user by ID
router.put('/:id', updateUser);        // Update user by ID
router.delete('/:id', deleteUser);     // Delete user by ID

module.exports = router;
