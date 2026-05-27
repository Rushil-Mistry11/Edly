const db = require('../config/db');

const Course = {
    // Admin: Add a new course 
    create: async (courseData) => {
        const {
            title, description, price, course_level, duration,
            certificate, language, access, instructor_name,
            category_id, thumbnail_url
        } = courseData;

        const [result] = await db.query(
            'CALL sp_AdminAddCourse(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                title, description, price, course_level, duration,
                certificate, language, access, instructor_name,
                category_id, thumbnail_url
            ]
        );

        return result[0][0];
    },

    // Admin: Delete a course
    delete: async (courseId) => {
        const [result] = await db.query('CALL sp_AdminDeleteCourse(?)', [courseId]);
        return result[0][0];
    },

    // Get all courses
    getAll: async () => {
        const [rows] = await db.execute('CALL sp_GetAllCourses()');
        return rows[0];
    },

    // Get single course by id
    getById: async (id) => {
        const [rows] = await db.execute('CALL sp_GetCourseById(?)', [id]);
        return rows[0][0];
    },

    // Student: Enroll in a course 
    enroll: async (userId, courseId) => {
        const [result] = await db.query('CALL sp_StudentEnrollCourse(?, ?)', [userId, courseId]);
        return result[0][0];
    },

    // Student: Get all enrolled courses
    getEnrolled: async (userId) => {
        const [result] = await db.query('CALL sp_GetStudentEnrolledCourses(?)', [userId]);
        return result[0];
    },

    // get all enrolled courses for admin
    getAllEnrollments: async () => {
        const [rows] = await db.query('CALL sp_AdminGetAllEnrollments()');
        return rows[0];
    }
};

module.exports = Course;