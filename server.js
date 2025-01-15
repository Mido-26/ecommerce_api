const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const sequelize = require('./config/db')

// Routes
const userRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const sessionRoutes = require('./routes/sessions');
const reviewsRoutes = require('./routes/reviews')

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

//auth jwt token
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/uploads', express.static('uploads'));
app.use(cors());

// Session setup
app.use(session({
  secret: 'token',
  resave: false,
  saveUninitialized: true,
}));

// access images
app.get('/api/uploads/:filename', (req, res) => {

  const filename = req.params.filename;
  console.log(filename);

  res.sendFile(__dirname + '/uploads/' + filename);
});
 


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/', sessionRoutes);
app.use('/api/reviews', reviewsRoutes)

sequelize.sync({}).then( result => {
  // console.log(result);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }); 
}).catch(erro => { 
  console.log("Error:" + erro)
})
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });