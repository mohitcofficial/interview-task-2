import React from "react";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import classes from "./ReadMoreButton.module.css";
import { Link } from "react-router-dom";

function ReadMoreButton({ slug }) {
  return (
    <Link className={classes.button} to={`http://localhost:3000/blog/${slug}`}>
      Read More
      {/* <ArrowForwardIcon sx={{ fontSize: fontSize }} /> */}
    </Link>
  );
}

export default ReadMoreButton;
