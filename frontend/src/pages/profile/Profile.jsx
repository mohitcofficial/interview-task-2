import React from "react";
import classes from "./Profile.module.css";
import Header from "../../components/header/Header";

function Profile() {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.contentContainer}>Profile Page</div>
    </div>
  );
}

export default Profile;
