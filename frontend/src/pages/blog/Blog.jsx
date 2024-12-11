import React, { useEffect, useState } from "react";
import classes from "./Blog.module.css";
import Header from "../../components/header/Header";
import toast from "react-hot-toast";
import BlogApiServices from "../../services/api/Blog.api.services";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import UpdateBlogModal from "../../components/modal/UpdateBlogModal";
import { formatDate } from "../../utils/DateFormat";

function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [blog, setBlog] = useState(null);

  const user = useSelector((state) => state.user);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const data = await BlogApiServices.getBlogInfo(id);
      setBlog(data?.blog);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;
    setLoading2(true);
    try {
      const data = await BlogApiServices.deleteBlog(id);
      setBlog(data?.blog);
      toast.success(data?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [refresh]);
  return (
    <div className={classes.container}>
      {loading2 && <Loader />}
      <Header />
      {loading ? (
        <div className={classes.contentContainer}>
          <Skeleton width={"100%"} height={300} />
          <Skeleton width={"100%"} height={20} sx={{ marginTop: "12px" }} />
          <Skeleton width={"100%"} height={20} sx={{ marginBottom: "12px" }} />
          <Skeleton width={"100%"} height={200} />
        </div>
      ) : (
        <div className={classes.contentContainer}>
          {user?.user?.role === "admin" && (
            <div className={classes.buttonContainer}>
              <div>
                <UpdateBlogModal blog={blog} setRefresh={setRefresh}>
                  <button className={classes.editButton}>Edit</button>
                </UpdateBlogModal>
              </div>
              <button onClick={handleDelete} className={classes.deleteButton}>
                Delete
              </button>
            </div>
          )}
          <img
            className={classes.image}
            src="https://nicholasrossis.me/wp-content/uploads/2017/04/BLOG01.jpg"
            alt=""
          />
          <p className={classes.heading}>{blog?.title}</p>
          <p className={classes.author}>({blog?.author})</p>
          <div className={classes.timestamp}>
            <p>Created At: {formatDate(blog?.createdAt)}</p>
            <p>Updated At: {formatDate(blog?.updatedAt)}</p>
          </div>
          <p className={classes.content}>{blog?.content}</p>
        </div>
      )}
    </div>
  );
}

export default Blog;
