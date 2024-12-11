import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import classes from "./UpdateBlogModal.module.css";
import toast from "react-hot-toast";
import BlogApiServices from "../../services/api/Blog.api.services";
import Loader from "../Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateBlogModal({ children, blog, setRefresh }) {
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [title, setTitle] = React.useState(blog?.title || "");
  const [author, setAuthor] = React.useState(blog?.author || "");
  const [content, setContent] = React.useState(blog?.content || "");

  React.useEffect(() => {
    if (
      title === blog?.title &&
      author === blog?.author &&
      content === blog?.content
    )
      setFlag(true);
    else setFlag(false);
  }, [title, author, content]);

  const handleClose = () => {
    if (flag) {
      setOpen(false);
      reset();
      return;
    }
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel? All unsaved changes will be lost."
    );

    if (confirmCancel) {
      setOpen(false);
      reset();
    }
  };

  const reset = () => {
    setTitle(blog?.title);
    setAuthor(blog?.author);
    setContent(blog?.content);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (flag) return;

    const body = {};
    if (title != blog.title) body["title"] = title;
    if (author != blog.author) body["author"] = author;
    if (content != blog.content) body["content"] = content;
    setLoading(true);
    try {
      const data = await BlogApiServices.updateBlog(body, blog?._id);
      toast.success(data?.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {loading && <Loader />}
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalInnerContainer} sx={style}>
          <form className={classes.form} onSubmit={formSubmitHandler}>
            <label htmlFor="" className={classes.label}>
              Title
            </label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className={classes.input}
              type="text"
              placeholder="Enter the new Title"
            />
            <label htmlFor="" className={classes.label}>
              Author
            </label>
            <input
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              className={classes.input}
              type="text"
              placeholder="Enter the new Author name"
            />
            <label htmlFor="" className={classes.label}>
              Title
            </label>
            <input
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className={classes.input}
              type="text"
              placeholder="Enter the new Content"
            />
            <div className={classes.buttonContainer}>
              <button onClick={handleClose} className={classes.cancelButton}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={flag}
                style={{
                  cursor: flag && "not-allowed",
                  backgroundColor: flag && "#1f6f8ccc",
                }}
                className={classes.updateButton}
              >
                Update
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
