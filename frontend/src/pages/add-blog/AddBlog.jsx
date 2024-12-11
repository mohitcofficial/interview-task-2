import React from "react";
import classes from "./AddBlog.module.css";
import Header from "../../components/header/Header";
import BlogForm from "../../components/forms/BlogForm";

function AddBlog() {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.contentContainer}>
        <h2 className={classes.heading}>Add New Blog</h2>
        <BlogForm />
      </div>
    </div>
  );
}

export default AddBlog;
