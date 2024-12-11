import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import Loader from "../Loader";
import USER_APIs from "../../services/api/User.api.services";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      toast("Fill all the fields!", {
        icon: "⚠",
      });
      return;
    }
    const body = {
      name,
      email,
      password,
    };
    setLoading(true);
    try {
      const data = await USER_APIs.signUp(body);
      toast.success("Verification Email has been send to you Email");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      setName("");
    }
  };
  return (
    <form className={classes.form} onSubmit={handleSignUp}>
      {loading && <Loader />}
      <h2 className={classes.heading}>Welcome to Blogify</h2>
      <label className={classes.label} htmlFor="">
        Name
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={classes.input}
        type="text"
        placeholder="Enter your name"
      />
      <label className={classes.label} htmlFor="">
        Email
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.input}
        type="email"
        placeholder="Enter your email"
      />
      <label className={classes.label} htmlFor="">
        Password
      </label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={classes.input}
        type="password"
        placeholder="Enter your password"
      />
      <button className={classes.loginButton} type="submit">
        Sign Up
      </button>

      <div className={classes.partitionContainer}>
        <hr />
        <span>or</span>
        <hr />
      </div>

      <div className={classes.bottomContainer}>
        <span>Already a member ?</span>
        <Link className={classes.createAccountLink} to="/login">
          Login
        </Link>
      </div>
    </form>
  );
}

export default SignUpForm;
