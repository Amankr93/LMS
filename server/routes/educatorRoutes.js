import express from "express"
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from "../controller/educatorController.js";
import upload from "../configs/multer.js";
import { protectEducator } from "../middleware/authMiddleware.js";

const educatorRouter = express.Router();
// // Add educator role
educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'), protectEducator,addCourse);
educatorRouter.get('/courses', protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get('/enrollled-students', protectEducator, getEnrolledStudentsData)

export default educatorRouter
