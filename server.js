const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//auth jwt token
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'token',
  resave: false,
  saveUninitialized: true,
}));


// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shoping_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Register new category
app.post('/api/categories/add', (req, res) => {

  const newItem = req.body;
  const sql = 'INSERT INTO categories SET ?'; //query

  db.query(sql, newItem, (err, result) => {
    if (err) throw err;
    res.send('Category added');
  });

});

// Read all categories
app.get('/api/categories', (req, res) => {

  const sql = 'SELECT name,image_url FROM categories';

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });

});

// Read a single record by ID
app.get('/api/categories/:id', (req, res) => {

  const sql = 'SELECT * FROM categories WHERE id = ?';

  db.query(sql, [req.params.id], (err, result) => {

    if (err) throw err;
    res.json(result);

  });
});

// Update a record
// app.put('/api/items/:id', (req, res) => {

//   const updatedItem = req.body;
//   const sql = 'UPDATE items SET ? WHERE id = ?';

//   db.query(sql, [updatedItem, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send('Item updated');

//   });
// });

// Delete a record
// app.delete('/api/items/:id', (req, res) => {

//   const sql = 'DELETE FROM items WHERE id = ?';
//   db.query(sql, [req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send('Item deleted');
//   });

// });



//register products
app.post('/api/products/add', (req, res) => {

    const newItem = req.body;
    const sql = 'INSERT INTO products SET ?'; //query
  
    db.query(sql, newItem, (err, result) => {
      if (err) throw err;
      res.send('Product added');
    });
  
  });


  app.get('/api/products', (req, res) => {

    const sql = 'SELECT name,image_url,selling_price,category_id FROM products';
  
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  
  });


  app.get('/api/products/:id', (req, res) => {

    const sql = 'SELECT * FROM products WHERE id = ?';
  
    db.query(sql, [req.params.id], (err, result) => {
  
      if (err) throw err;
      res.json(result);
  
    });
  });


  // Registration Route (POST /register)
app.post('/register', (req, res) => {
    const { name, mobile_number, password } = req.body;
  
    // Check if the mobile number is already registered
    const checkUserQuery = 'SELECT * FROM users WHERE mobile_number = ?';
    db.query(checkUserQuery, [mobile_number], (err, result) => {
      if (err) {
        return res.status(500).send('Error checking user');
      }
      if (result.length > 0) {
        return res.status(400).send('Mobile number already registered');
      }
  
      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).send('Error hashing password');
        }
  
        // Insert the user into the database
        const insertUserQuery = 'INSERT INTO users (name, mobile_number, password) VALUES (?, ?, ?)';
        db.query(insertUserQuery, [name, mobile_number, hashedPassword], (err, result) => {
          if (err) {
            return res.status(500).send('Error registering user');
          }
          res.status(201).send('User registered successfully');
        });
      });
    });
  });
  
  // Login Route (POST /login)
  app.post('/login', (req, res) => {
    const { mobile_number, password } = req.body;
  
    // Check if the mobile number exists
    const checkUserQuery = 'SELECT * FROM users WHERE mobile_number = ?';
    db.query(checkUserQuery, [mobile_number], (err, result) => {
      if (err) {
        return res.status(500).send('Error checking user');
      }
      if (result.length === 0) {
        return res.status(400).send('Invalid mobile number or password');
      }
  
      // Compare the password with the hashed password
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) {
          return res.status(500).send('Error comparing passwords');
        }
        if (!isMatch) {
          return res.status(400).send('Invalid mobile number or password');
        }
  
        // Create a session
        req.session.userId = result[0].id;
        req.session.name = result[0].name;
  
        res.status(200).send('Login successful');
      });
    });
  });
  
  // Protected Route (GET /profile)
  app.get('/profile', (req, res) => {
    if (!req.session.userId) {
      return res.status(401).send('You must log in first');
    }
  
    const userId = req.session.userId;
    const getUserQuery = 'SELECT name, mobile_number FROM users WHERE id = ?';
    db.query(getUserQuery, [userId], (err, result) => {
      if (err) {
        return res.status(500).send('Error fetching user profile');
      }
      res.json(result[0]);
    });
  });
  
  // Logout Route (GET /logout)
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.send('Logged out successfully');
    });
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
