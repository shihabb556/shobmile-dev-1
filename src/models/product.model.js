import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true }, // Track inventory level
  lowStockAlert: { type: Number, default: 10 }, // When stock goes below this level, admin is alerted
  isDiscontinued: { type: Boolean, default: false }, // Product no longer sold
  category: { type: String, required: true },
  subCategory: { type: String },
  brand: { type: String },
  images: [{ type: String, required: true }],
  ratings: {
    average: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        rating: { type: Number, required: true },
      }
    ]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


  
export const Product = mongoose.model("Product", productSchema);