const User = require('../models/User');
const bcrypt = require('bcryptjs');
const session = require('express-session');


// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'mobile_number', 'password'] // explicitly include password
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Session creation
    req.session.userId = user.id;
    req.session.name = user.name;

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile_number: user.mobile_number
        }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};


// Get current user
const getCurrentUser = (req, res) => {
    if (req.session.userId) {
        const user = User.findByPk(req.session.userId);
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
// logout user
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};

module.exports = {  loginUser, logoutUser, getCurrentUser };