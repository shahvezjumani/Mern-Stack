import { Teacher } from "../models/teacher.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getComment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).populate("comments");
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, course.comments, "Comments fetched successfully")
    );
});

const addComment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { text } = req.body;

  if (!text) {
    throw new ApiError(400, "Comment text is required");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const comment = await Comment.create({
    text,
    user: req.user._id,
    course: courseId,
  });

  course.comments.push(comment._id);
  await course.save();

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"));
});

const removeComment = asyncHandler(async (req, res) => {
  const { courseId, commentId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  await comment.remove();

  course.comments.pull(comment._id);
  await course.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Comment removed successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { courseId, commentId } = req.params;
  const { text } = req.body;

  if (!text) {
    throw new ApiError(400, "Comment text is required");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }

  comment.text = text;
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});