import express from "express";
import { login, register, updateProfile , adminLogin, registerAdmin} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";
 
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route('/admin/login').post(adminLogin);
router.route('/admin/register').post(registerAdmin);

export default router;