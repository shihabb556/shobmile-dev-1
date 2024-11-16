import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subCategories: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Category= mongoose.model('Category', categorySchema);