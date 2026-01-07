const express = require("express");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/role");
const courseController = require("../controllers/courseController");

const router = express.Router();

/**
 * Public: GET /api/courses
 * List all courses (basic info)
 */
router.get("/", courseController.getAllCourses);

/**
 * Student only: GET /api/courses/me/enrolled
 * List courses where current user is enrolled
 */
router.get("/me/enrolled", auth, requireRole("student"), courseController.getMyEnrolledCourses);

/**
 * Student only: POST /api/courses/:id/enroll
 * Enroll current student in a course
 */
router.post("/:id/enroll", auth, requireRole("student"), courseController.enrollInCourse);

/**
 * Instructor only: POST /api/courses/instructor
 * Create a new course
 */
router.post(
  "/instructor",
  auth,
  requireRole("instructor"),
  courseController.createCourse
);

/**
 * Instructor only: GET /api/courses/instructor/mine
 * List courses created by current instructor
 */
router.get(
  "/instructor/mine",
  auth,
  requireRole("instructor"),
  courseController.getMyCourses
);

/**
 * Instructor only: PUT /api/courses/instructor/:id
 * Update own course
 */
router.put(
  "/instructor/:id",
  auth,
  requireRole("instructor"),
  courseController.updateCourse
);

/**
 * Instructor only: DELETE /api/courses/instructor/:id
 * Delete own course
 */
router.delete(
  "/instructor/:id",
  auth,
  requireRole("instructor"),
  courseController.deleteCourse
);

module.exports = router;
