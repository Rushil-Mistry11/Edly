const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const courseController = require('../controllers/courseController');

router.post('/add', verifyToken, isAdmin, upload.single('image'), courseController.addCourse);
router.delete('/:id', verifyToken, isAdmin, courseController.deleteCourse);
router.post('/enroll', verifyToken, courseController.enrollCourse)
router.post('/unenroll', verifyToken, courseController.unenrollCourse);
router.get('/my-courses', verifyToken, courseController.getMyCourses)
router.get('/list', courseController.getAllCourses)
router.get('/get/:id', courseController.getCourse);
router.get('/admin/enrollments', verifyToken, isAdmin, courseController.getAdminEnrollments);


module.exports = router;
