import React from "react";
import classes from "./AdminDashboard.module.css";
import Header from "../../components/header/Header";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.contentContainer}>
        <h2 className={classes.heading}>Admin Dashboard</h2>
        <Link to="/blog/add" className={classes.addBlogButton}>
          <AddIcon />
          Add Blog
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
