import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BLOG_APIs from "../../services/api/Blog.api.services";
import Loader from "../Loader";
import classes from "./BlogForm.module.css";

function BlogForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title,
      author,
      content,
    };
    setLoading(true);
    try {
      const data = await BLOG_APIs.createBlog(body);
      toast.success(data?.message);
      clearInput();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
    } finally {
      setLoading(false);
    }
  };

  const clearInput = () => {
    setTitle("");
    setAuthor("");
    setContent("");
  };
  useEffect(() => {
    if (title.length > 0 && author.length > 0 && content.length > 0)
      setFlag(true);
    else setFlag(false);
  }, [author, content, title]);
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {loading && <Loader />}
      <label className={classes.label} htmlFor="">
        Title
      </label>
      <input
        className={classes.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your title"
      />
      <label className={classes.label} htmlFor="">
        Author
      </label>
      <input
        className={classes.input}
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter your author"
      />
      <label className={classes.label} htmlFor="">
        Content
      </label>
      <textarea
        className={classes.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="Enter your content"
      />
      <button
        style={{ cursor: !flag && "not-allowed" }}
        disabled={!flag}
        className={classes.createButton}
        type="submit"
      >
        Create
      </button>
    </form>
  );
}

export default BlogForm;
