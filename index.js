const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

app.use(express.json());

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Create a new product
app.post('/products', async (req, res) => {
  const { title, description, price } = req.body;
  const product = new Product({ title, description, price });
  await product.save();
  res.status(201).json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
