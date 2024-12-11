import React from "react";
import classes from "./SignUpPage.module.css";
import SignUpForm from "../../components/forms/SignUpForm";

function SignUpPage() {
  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}></div>
      <div className={classes.rightContainer}>
        <div className={classes.marginContainer}>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
