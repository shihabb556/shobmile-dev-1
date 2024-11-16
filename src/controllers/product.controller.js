import { Product } from "../models/product.model.js";


// Get all products with optional filters (category, price range, etc.)
export const getAllProducts = async (req, res) => {
  console.log('call products')
  try {
    const { searchTerm, minPrice, maxPrice, category, sortOption, page = 1, limit = 10 } = req.query;

    // Build the query object
    let query = {};

    // Search filter (name search)
    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search
    }

    // // Price filter
    // if (minPrice || maxPrice) {
    //   query.price = {};
    //   if (minPrice) query.price.$gte = parseFloat(minPrice); // Greater than or equal to minPrice
    //   if (maxPrice) query.price.$lte = parseFloat(maxPrice); // Less than or equal to maxPrice
    // }

    // Category filter
    if (category) {
      query.subCategory = category;
    }

    // Sorting option
    let sort = {};
    if (sortOption === 'lowToHigh') {
      sort.price = 1; // Sort by price in ascending order
    } else if (sortOption === 'highToLow') {
      sort.price = -1; // Sort by price in descending order
    }else if (sortOption === 'newToFirst') {
      sort.createdAt = -1; // Sort by price in descending order
    }

    // Pagination calculations
    const currentPage = parseInt(page, 10) || 1;
    const perPage = parseInt(limit, 10) || 10;
    const skip = (currentPage - 1) * perPage;

    // Fetch total count for pagination
    const totalProducts = await Product.countDocuments(query);

    // Fetch products based on query, sort, and pagination
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(perPage);
      console.log('call products')
      console.log(products)

    res.status(200).json({
      products,
      currentPage,
      totalPages: Math.ceil(totalProducts / perPage),
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found', error });
  }
};

// Add new product (Admin only)
export const addProduct = async (req, res) => {
  const {  name,
    description,
    price,
    discount,
    stock,
    lowStockAlert,
    category,
    subCategory,
    brand, images } = req.body;
  try {
    const newProduct = new Product({  name,
      description,
      price,
      discount,
      stock,
      lowStockAlert,
      category,
      subCategory,
      brand, images });
      
      await newProduct.save();
      console.log('product added successfully', newProduct)
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error });
  }
};

// Update product (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};