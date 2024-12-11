import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Blog } from "../models/Blog.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createBlog = catchAsyncError(async (req, res, next) => {
  const { title, content, author } = req.body;

  if (!title) return next(new ErrorHandler("Blog title is mandatory!", 400));
  if (!content)
    return next(new ErrorHandler("Blog content is mandatory!", 400));
  if (!author) return next(new ErrorHandler("Blog Author is mandatory!", 400));

  const blog = await Blog.create({ title, content, author });

  res.status(201).json({
    success: true,
    message: "Blog Added Successfully!",
    blog,
  });
});
export const updateBlog = catchAsyncError(async (req, res, next) => {
  const { title, content, author } = req.body;
  const blogId = req.params.id;

  console.log(title, content, author);
  if (!blogId) return next(new ErrorHandler("Blog ID is mandatory!", 400));

  const blog = await Blog.findOne({ _id: blogId });
  if (!blog) return next(new ErrorHandler("No blog found with this ID!", 400));

  if (title) blog.title = title;
  if (content) blog.content = content;
  if (author) blog.author = author;

  await blog.save();

  res.status(201).json({
    success: true,
    message: "Blog Updated Successfully!",
    blog,
  });
});

export const getBlogInfo = catchAsyncError(async (req, res, next) => {
  const blogId = req.params.id;
  if (!blogId) return next(new ErrorHandler("Blog ID is mandatory!", 400));
  const blog = await Blog.findById(blogId);
  if (!blog) return next(new ErrorHandler("No blog found with this ID!", 400));

  res.status(201).json({
    success: true,
    message: "Blog Fetched Successfully!",
    blog,
  });
});
export const getAllBlogs = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const blogs = await Blog.find({}).skip(skip).limit(limit);

  const totalBlogs = await Blog.countDocuments();
  const totalPages = Math.ceil(totalBlogs / limit);

  res.status(200).json({
    success: true,
    message: "Blogs Fetched Successfully!",
    blogs,
    pagination: {
      currentPage: page,
      totalPages,
      totalBlogs,
      limit,
      next: totalBlogs > page * limit,
    },
  });
});
export const deleteBlog = catchAsyncError(async (req, res, next) => {
  const blogId = req.params.id;
  if (!blogId) return next(new ErrorHandler("Blog ID is mandatory!", 400));

  const blog = await Blog.findByIdAndDelete(blogId);
  if (!blog) return next(new ErrorHandler("No blog found with this ID!", 400));

  res.status(201).json({
    success: true,
    message: "Blog Deleted Successfully!",
    blog,
  });
});
