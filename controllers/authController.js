const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, mobile_number, password } = req.body;

    // Basic validation
    if (!name || !email || !mobile_number || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      mobile_number,
      password: hashedPassword,
    });

    // Hide password from response
    const userData = user.get({ plain: true });
    delete userData.password;

    return res.status(201).json({
      data: userData,
      message: 'User created successfully',
    });

  } catch (error) {
    console.error('Create user error:', error);
    return res.status(500).json({
      error: error.message || 'Internal Server Error',
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { name, email, mobile_number, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update({
        name,
        email,
        mobile_number,
        password,
      });
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
