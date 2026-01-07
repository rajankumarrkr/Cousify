const mongoose = require("mongoose");
const Course = require("../models/Course");

/**
 * Public: GET /api/courses
 * List all courses (basic info)
 */
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email role")
      .select("title description instructor createdAt");
    res.json({ courses });
  } catch (err) {
    console.error("Get courses error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Student only: GET /api/courses/me/enrolled
 * List courses where current user is enrolled
 */
exports.getMyEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const objectId = new mongoose.Types.ObjectId(userId);

    const courses = await Course.find({ students: objectId })
      .populate("instructor", "name email")
      .select("title description instructor createdAt students");

    res.json({ courses });
  } catch (err) {
    console.error("Student enrolled courses error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Student only: POST /api/courses/:id/enroll
 * Enroll current student in a course
 */
exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const userId = req.user.id;

    const course = await Course.findById(courseId).populate("instructor", "name");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const already = course.students.some(
      (studentId) => studentId.toString() === userId
    );
    if (already) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    course.students.push(userId);
    await course.save();

    res.json({
      message: "Enrolled successfully",
      course: {
        id: course._id,
        title: course.title,
        instructor: course.instructor,
      },
    });
  } catch (err) {
    console.error("Enroll error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Instructor only: POST /api/courses/instructor
 * Create a new course
 */
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,
    });

    await course.populate("instructor", "name email");

    res.status(201).json({
      message: "Course created",
      course,
    });
  } catch (err) {
    console.error("Create course error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Instructor only: GET /api/courses/instructor/mine
 * List courses created by current instructor
 */
exports.getMyCourses = async (req, res) => {
  try {
    const instructorId = new mongoose.Types.ObjectId(req.user.id);

    const courses = await Course.find({ instructor: instructorId })
      .populate("students", "name email")
      .select("title description students createdAt");
    res.json({ courses });
  } catch (err) {
    console.error("Instructor courses error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Instructor only: PUT /api/courses/instructor/:id
 * Update own course
 */
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const { title, description } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own courses" });
    }

    if (title) course.title = title;
    if (description) course.description = description;

    await course.save();
    await course.populate("instructor", "name email");

    res.json({ message: "Course updated", course });
  } catch (err) {
    console.error("Update course error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Instructor only: DELETE /api/courses/instructor/:id
 * Delete own course
 */
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own courses" });
    }

    await course.deleteOne();

    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error("Delete course error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
