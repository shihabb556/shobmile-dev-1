
import { Product } from "../models/product.model.js";

import connectDB from "./db.js";
import mongoose from "mongoose";

connectDB();
  


export const insertJobs = async ()=>{
  Product.insertMany(prod)
  .then((docs) => {
    console.log('product data inserted successfully:', docs);
  })
  .catch((err) => {
    console.error('Error inserting product data:', err);
  })
}






const prod = [
  {
    "name": "iPhone 14 Pro",
    "description": "The latest Apple smartphone with cutting-edge technology.",
    "price": 1099,
    "discount": 5,
    "stock": 50,
    "lowStockAlert": 10,
    "isDiscontinued": false,
    "category": "Electronics",
    "subCategory": "Smartphones",
    "brand": "Apple",
    "images": [
      "https://images.pexels.com/photos/6078121/pexels-photo-6078121.jpeg", 
      "https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg"
    ],
    "ratings": {
      "average": 4.7,
      "reviews": []
    }
  },
  {
    "name": "MacBook Pro M1",
    "description": "The MacBook Pro with Apple's M1 chip, powerful performance.",
    "price": 1499,
    "discount": 10,
    "stock": 30,
    "lowStockAlert": 5,
    "isDiscontinued": false,
    "category": "Electronics",
    "subCategory": "Laptops",
    "brand": "Apple",
    "images": [
      "https://images.pexels.com/photos/5082563/pexels-photo-5082563.jpeg",
      "https://images.pexels.com/photos/6335762/pexels-photo-6335762.jpeg"
    ],
    "ratings": {
      "average": 4.8,
      "reviews": []
    }
  },
  {
    "name": "Leather Jacket",
    "description": "Stylish and durable leather jacket for men.",
    "price": 200,
    "discount": 15,
    "stock": 20,
    "lowStockAlert": 5,
    "isDiscontinued": false,
    "category": "Clothing & Fashion",
    "subCategory": "Men's Clothing",
    "brand": "Famous Brand",
    "images": [
      "https://images.pexels.com/photos/7047436/pexels-photo-7047436.jpeg"
    ],
    "ratings": {
      "average": 4.5,
      "reviews": []
    }
  },
  {
    "name": "Moisturizing Cream",
    "description": "Keep your skin hydrated with this lightweight moisturizing cream.",
    "price": 25,
    "discount": 10,
    "stock": 100,
    "lowStockAlert": 15,
    "isDiscontinued": false,
    "category": "Health & Beauty",
    "subCategory": "Skincare",
    "brand": "Skincare Co",
    "images": [
      "https://images.pexels.com/photos/5668800/pexels-photo-5668800.jpeg"
    ],
    "ratings": {
      "average": 4.6,
      "reviews": []
    }
  },
  {
    "name": "Wooden Dining Table",
    "description": "Elegant dining table made from solid oak.",
    "price": 500,
    "discount": 20,
    "stock": 10,
    "lowStockAlert": 2,
    "isDiscontinued": false,
    "category": "Home & Furniture",
    "subCategory": "Kitchen & Dining",
    "brand": "Furniture Inc.",
    "images": [
      "https://images.pexels.com/photos/6585773/pexels-photo-6585773.jpeg"
    ],
    "ratings": {
      "average": 4.4,
      "reviews": []
    }
  },
  {
    "name": "Treadmill",
    "description": "High-quality treadmill for home workouts.",
    "price": 800,
    "discount": 25,
    "stock": 15,
    "lowStockAlert": 5,
    "isDiscontinued": false,
    "category": "Sports & Outdoors",
    "subCategory": "Exercise Equipment",
    "brand": "Fitness Gear",
    "images": [
      "https://images.pexels.com/photos/6740909/pexels-photo-6740909.jpeg"
    ],
    "ratings": {
      "average": 4.7,
      "reviews": []
    }
  },
  {
    "name": "Educational Puzzle",
    "description": "Colorful puzzle for kids to improve cognitive skills.",
    "price": 15,
    "discount": 5,
    "stock": 200,
    "lowStockAlert": 20,
    "isDiscontinued": false,
    "category": "Toys & Games",
    "subCategory": "Educational Toys",
    "brand": "ToyLand",
    "images": [
      "https://images.pexels.com/photos/11813156/pexels-photo-11813156.jpeg"
    ],
    "ratings": {
      "average": 4.9,
      "reviews": []
    }
  },
  {
    "name": "Organic Apple",
    "description": "Fresh and organic apples directly from the farm.",
    "price": 3,
    "discount": 2,
    "stock": 300,
    "lowStockAlert": 50,
    "isDiscontinued": false,
    "category": "Groceries",
    "subCategory": "Fruits & Vegetables",
    "brand": "Farm Fresh",
    "images": [
      "https://images.pexels.com/photos/161235/apple-fruit-leaves-green-161235.jpeg"
    ],
    "ratings": {
      "average": 4.8,
      "reviews": []
    }
  },
  {
    "name": "Paracetamol",
    "description": "Effective pain reliever and fever reducer.",
    "price": 5,
    "discount": 0,
    "stock": 500,
    "lowStockAlert": 100,
    "isDiscontinued": false,
    "category": "Health & Medical Supplies",
    "subCategory": "Medicines",
    "brand": "MedLife",
    "images": [
      "https://images.pexels.com/photos/3646234/pexels-photo-3646234.jpeg"
    ],
    "ratings": {
      "average": 4.9,
      "reviews": []
    }
  },
  {
    "name": "Car Vacuum Cleaner",
    "description": "Compact vacuum cleaner for car interiors.",
    "price": 45,
    "discount": 15,
    "stock": 40,
    "lowStockAlert": 5,
    "isDiscontinued": false,
    "category": "Automotive",
    "subCategory": "Car Accessories",
    "brand": "AutoTech",
    "images": [
      "https://images.pexels.com/photos/4480485/pexels-photo-4480485.jpeg"
    ],
    "ratings": {
      "average": 4.5,
      "reviews": []
    }
  },
  {
    "name": "Organic Dog Food",
    "description": "Healthy and organic dog food for all breeds.",
    "price": 30,
    "discount": 10,
    "stock": 60,
    "lowStockAlert": 10,
    "isDiscontinued": false,
    "category": "Pet Supplies",
    "subCategory": "Pet Food",
    "brand": "PetCare",
    "images": [
      "https://images.pexels.com/photos/4587981/pexels-photo-4587981.jpeg"
    ],
    "ratings": {
      "average": 4.7,
      "reviews": []
    }
  }
];
