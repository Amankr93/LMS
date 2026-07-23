import { clerkClient, getAuth } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/Purchase.js";
import { User } from "../models/User.js";

export const updateRoleToEducator = async (req, res) => {
    try {
        console.log("accces", req.auth.userId);
        const { userId } = getAuth(req);
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator'
            }
        })
        res.json({ success: true, message: 'you can now publish courses' })

    }
    catch (error) {
        res.json({ success: false, message: error.message })


    }
}
// Add copurse
export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body;
        const imageFile = req.file;
        const { userId } = getAuth(req);
        if (!imageFile) {
            res.json({ success: false, message: "Thumbnail is not attached" });
        }
        const parsedCourseData = await JSON.parse(courseData);
        parsedCourseData.educator = userId;
        const newCourse = await Course.create(parsedCourseData);
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url;
        await newCourse.save();
        res.json({ success: true, message: "Course Added" })

    }
    catch (error) {
        res.json({ success: false, message: error.message })


    }
}
export const getEducatorCourses = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const courses = await Course.find({ educator: userId });
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}
export const educatorDashboardData = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const courses = await Course.find({ educator: userId });
        const totalCourses = courses.length;
        const courseIds = courses.map(course => course._id);
        const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' });
        const totalEarnings = purchases.reduce((sum, purchase) => {
            return sum + purchase.amount
        }, 0)

        // collect unique enrolled students id with their cosurse titles
        const enrolledStudentsData = [];
        for (const course of courses) {
            const students = await User.find({ _id: { $in: course.enrolledStudents } }, 'name imageUrl')
            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })

            });
        }

        res.json({
            success: true, dashboardData: {
                totalEarnings, enrolledStudentsData, totalCourses
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}
export const getEnrolledStudentsData = async (req,res) => {
    try {
        const {userId} = getAuth(req);
        const courses = await Course.find({ educator: userId });
      
        const courseIds = courses.map(course => course._id);
        const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle');
        const enrolledStudents = purchases.map((purchase)=>({
            student:purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))
        res.json({success:true, enrolledStudents})

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}