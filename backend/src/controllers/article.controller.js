import { asyncHandler } from "../utils/asyncHandler.js";
import { Article } from "../models/article.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFileFromCloudinary,
} from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, status, slug } = req.body;

  if ([title, content, status, slug].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All Fields are required");
  }

  const articeExist = await Article.findOne({ slug });
  if (articeExist) {
    throw new ApiError(400, "Post already exists");
  }

  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Unathorized Request");
  }

  const featuredImageLocalPath = req.file?.path;
  if (!featuredImageLocalPath) {
    throw new ApiError(400, "FeaturedImage is Required");
  }

  const featuredImage = await uploadOnCloudinary(featuredImageLocalPath);
  if (!featuredImage) {
    throw new ApiError(
      500,
      "Something went wrong while uploading featured image on Cloudinary"
    );
  }

  const article = await Article.create({
    title,
    content,
    status,
    owner: user?._id,
    featuredImage: featuredImage?.url || "",
  });

  if (!article) {
    throw new ApiError(500, "Somewent went wrong while creating the post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, article, "Post Created Sucessfully"));
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content, status, slug } = req.body;

  if ([title, content, status, slug].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All Fields are required");
  }

  const articleExist = await Article.findOne({ slug });
  if (!articleExist) {
    throw new ApiError(400, "Post does not exists");
  }

  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Unathorized Request");
  }

  if (articleExist.owner.toString() !== user._id?.toString()) {
    throw new ApiError(400, "User is not the owner of the post");
  }

  const featuredImageLocalPath = req.file?.path;
  if (!featuredImageLocalPath) {
    throw new ApiError(400, "FeaturedImage is Required");
  }

  const featuredImage = await uploadOnCloudinary(featuredImageLocalPath);
  if (!featuredImage) {
    throw new ApiError(
      500,
      "Something went wrong while uploading featured image on Cloudinary"
    );
  }

  const article = await Article.findOneAndUpdate(
    { slug },
    {
      $set: {
        title,
        content,
        status,
        owner: user?._id,
        featuredImage: featuredImage?.url || "",
      },
    },
    { new: true }
  );

  if (!article) {
    throw new ApiError(500, "Somewent went wrong while updating the post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, article, "Post Updated Sucessfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { slug } = req.body;
  if (!slug) {
    throw new ApiError(400, "Slug is needed");
  }

  const article = await Article.findOne({ slug });
  if (!article) {
    throw new ApiError(400, "Post does not exists");
  }

  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Unathorized Request");
  }

  if (article.owner.toString() !== user._id?.toString()) {
    throw new ApiError(400, "User is not the owner of the post");
  }

  await Article.findOneAndDelete({ slug });

  const articleExist = await Article.findOne({ slug });
  if (articleExist) {
    throw new ApiError(400, "something went wrong while deleting the post");
  }

  return res.status(200).json(200, {}, "Post deleted successfully");
});

const getPost = asyncHandler(async (req, res) => {
  const { slug } = req.body;

  if (!slug) {
    throw new ApiError(400, "Slug is needed");
  }

  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Unathorized Request");
  }

  const article = await Article.findOne({ slug });
  if (!article) {
    throw new ApiError(400, "Post does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, article, "Post fetched Successfully"));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const query = req.query;
});

export { createPost, updatePost, deletePost, getPost };
