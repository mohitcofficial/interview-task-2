import React from "react";
import classes from "./LoginPage.module.css";
import LoginForm from "../../components/forms/LoginForm";

function LoginPage() {
  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}></div>
      <div className={classes.rightContainer}>
        <div className={classes.marginContainer}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
