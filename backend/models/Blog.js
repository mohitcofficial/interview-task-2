import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is a mandatory field!"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters long."],
    },
    slug: {
      type: String,
    },
    author: {
      type: String,
      required: [true, "Author is a mandatory field!"],
      trim: true,
      minlength: [2, "Author must be at least 2 characters long."],
    },
    content: {
      type: String,
      required: [true, "Content is a mandatory field!"],
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();

  // const date = new Date().toISOString().slice(0, 10);
  this.slug = `${slugify(this.title, {
    lower: true,
    strict: true,
  })}-${Date.now()}`;

  next();
});

export const Blog = mongoose.model("Blog", blogSchema);
