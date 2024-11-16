import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import productRoute from "./routes/product.route.js";
// import { insertJobs } from "./utils/insertDatas.js";


dotenv.config();

const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// List of allowed origins
const allowedOrigins = [
  'https://shobmile-dev-1.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://192.168.0.105:3000'
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Include cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Handle preflight requests (OPTIONS)
app.options('*', cors(corsOptions)); 

// Apply CORS middleware
app.use(cors(corsOptions));
const PORT = process.env.PORT || 8000;


//for testing 
app.get('/', (req,res)=>{
  res.json('working...');
});

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);

// insertJobs();


 
// Handle OPTIONS request separately
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS not allowed' });
  }
  next(err);
});


app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
});

  // Vercel requires exporting a function
  export default (req, res) => {
    app(req, res);
  };
  