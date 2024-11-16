import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import dotenv from 'dotenv';
dotenv.config();


export const register = async (req, res) => {
    try {
        const { fullname, email, phone, password} = req.body;
        console.log("body",req.body);
         
        if (!fullname || !email  || !password || !phone ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
    

        // const file = req.file;
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        // console.log(cloudResponse)

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name:fullname,
            email,
          phoneNumber:phone,
            password: hashedPassword,
        
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

 console.log('login:',req.body)
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        console.log("secret",process.env.JWT_SECRET)
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        console.log(user);
     
        // Respond with token
        res.status(200).json({
            success:true,
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.name,
                email: user.email,
                phoneNumber:user.phoneNumber,
                role: user.role,
                profile:user.profile,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};





export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
       let cloudResponse, fileUri,file;
       if(req?.file){
         file = req.file;
        // cloudinary ayega idhar
         fileUri = getDataUri(file);
         cloudResponse = await cloudinary.uploader.upload(fileUri.content);

       };


        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req?.id; // middleware authentication
        console.log(userId)
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            console.log("cloudresponse: ",cloudResponse)
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        console.log("user: ",user)

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


// Admin login controller
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if user is an admin
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied, admin only' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ADMIN_JWT_SECRET , 
            { expiresIn: '22' }
        );

        // Respond with token and user info
        res.status(200).json({ token, user: { fullname: user.fullname, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Admin registration controller
export const registerAdmin = async (req, res) => {
    const { fullname, email, phoneNumber, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new admin
        const newAdmin = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role: 'admin', // Set role as 'admin'
        });

        // Save the admin user
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};