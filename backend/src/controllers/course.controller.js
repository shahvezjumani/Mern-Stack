import { Teacher } from "../models/teacher.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCourse = asyncHandler(async (req, res) => {

  const user = req.user;
  const { title, description, price, category } = req.body;
  if (!title || !description || !price || !category) {
    throw new ApiError(400, "All Fields are Required");
  }

  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Please upload an image for the thumbnail");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(500, "something went wrong while uploading the image");
  }
  const course = await Course.create({
    title,
    description,
    instructor: user._id,
    thumbnail: thumbnail.url,
    price,
    category,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, course, "Course Created Successfully"));
});

const getAllCourses = asyncHandler(async (req, res) => {

  const courses = await Course.find({}).populate("teacher");
  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses Fetched sccessfully"));
});

const getSingleCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params?.id).populate([
    "teacher",
    "enrolledStudents",
  ]);
  return res.status(200).json(new ApiResponse(200, course, "Course Fetched"));
});

// TODO
const updateCourse = asyncHandler(async (req, res) => {

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(new ApiResponse(200, course, "Course Updated"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const course = await Course.findOneAndDelete({id,})
  return res.status(200).json(new ApiResponse(200, course, "Course Deleted"));
});

const createLesson = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "All Fields are Required");
  }
  const lesson = await Lesson.create({
    title,
    description,
    course: course._id,
  });
  return res.status(200).json(new ApiResponse(200, lesson, "Lesson Created"));
});

const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({}).populate(["course", "-password"]);
  return res.status(200).json(new ApiResponse(200, lessons, "Lessons Fetched"));
});

const getSingleLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).populate(["course"]);
  return res.status(200).json(new ApiResponse(200, lesson, "Lesson Fetched"));
});

const updateLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(new ApiResponse(200, lesson, "Lesson Updated"));
});

const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);
  return res.status(200).json(new ApiResponse(200, lesson, "Lesson Deleted"));
});

const createAssignment = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "All Fields are Required");
  }
  const assignment = await Assignment.create({
    title,
    description,
    lesson: lesson._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, assignment, "Assignment Created"));
});

const getAllAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({}).populate("lesson", "-password");
  return res
    .status(200)
    .json(new ApiResponse(200, assignments, "Assignments Fetched"));
});
