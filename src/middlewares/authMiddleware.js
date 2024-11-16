import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if token is present in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the decoded token
      console.log(decoded);
      req.user = await User.findById(decoded.userId).select('-password');  // exclude password

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Not authorized as admin' });
    }
  };
  
