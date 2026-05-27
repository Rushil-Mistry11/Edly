const Course = require('../models/courseModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


const addCourse = async (req, res) => {
    try {
        let thumbnail_url = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'edly_courses'
            });
            thumbnail_url = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const courseData = {
            ...req.body,
            thumbnail_url: thumbnail_url
        };

        const result = await Course.create(courseData);

        res.status(201).json({
            success: true,
            message: 'Course added successfully',
        });
    } catch (error) {

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, error: error.message });
    }
};


const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const result = await Course.delete(courseId);

        if (result.rowsAffected === 0) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, ...result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.getAll();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.getById(req.params.id);
        if (!course) return res.json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const enrollCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({ success: false, message: "Course ID is required" });
        }

        const result = await Course.enroll(userId, courseId);
        res.status(201).json({ success: true, ...result });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "You are already enrolled in this course." });
        }
        res.status(500).json({ success: false, error: err.message });
    }
};

const getMyCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const courses = await Course.getEnrolled(userId);
        res.status(200).json({ success: true, courses });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getAdminEnrollments = async (req, res) => {
    try {
        const enrollments = await Course.getAllEnrollments();
        res.status(200).json({ success: true, enrollments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = { addCourse, deleteCourse, getAllCourses, enrollCourse, getMyCourses, getCourse ,getAdminEnrollments};