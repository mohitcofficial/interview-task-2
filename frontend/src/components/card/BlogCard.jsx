import ReadMoreButton from "../buttons/ReadMoreButton";
import classes from "./BlogCard.module.css";

function BlogCard({ blog }) {
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src={
            "https://nicholasrossis.me/wp-content/uploads/2017/04/BLOG01.jpg"
          }
          alt="Image"
        />
      </div>
      <p className={classes.heading}>{blog?.title}</p>
      <p className={classes.content}>{blog?.content}</p>
      <div className={classes.buttonContainer}>
        <ReadMoreButton slug={blog?._id} />
      </div>
    </div>
  );
}

export default BlogCard;
