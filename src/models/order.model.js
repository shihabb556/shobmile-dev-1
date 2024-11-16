import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  guestUUID:{type:String},
  guestUserInfo:{
    name:{type:String},
    phone:{type:String},
    address:{type:String},
  },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'out for delivery', 'delivered', 'cancelled'],
    default: 'processing'
  },
  deliveryTracking: {
    courier: { type: String }, // e.g., 'DHL', 'FedEx'
    trackingNumber: { type: String },
    estimatedDeliveryDate: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
  },
  shippingAddress: {type: String},
  paymentMethod: { type: String, enum: ['card', 'paypal', 'cod'], required: true },
  couponUsed: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }, // Coupon applied
  discountApplied: { type: Number, default: 0 }, // Discount value after applying coupon
  note:{type:String},
  placedAt: { type: Date, default: Date.now },
});

  
export const Order = mongoose.model("Order", orderSchema);