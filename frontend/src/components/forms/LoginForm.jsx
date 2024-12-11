import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import Loader from "../Loader";
import USER_APIs from "../../services/api/User.api.services";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      toast("Fill both fields!", {
        icon: "⚠",
      });
      return;
    }
    const body = {
      email,
      password,
    };
    setLoading(true);
    try {
      const data = await USER_APIs.login(body);
      toast.success(data?.message);
      dispatch(login(data?.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className={classes.form} onSubmit={handleLogin}>
      {loading && <Loader />}
      <h2 className={classes.heading}>Welcome to Blogify</h2>
      <label className={classes.label} htmlFor="">
        Email
      </label>
      <input
        className={classes.input}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <label className={classes.label} htmlFor="">
        Password
      </label>
      <input
        className={classes.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter your password"
      />
      <button className={classes.loginButton} type="submit">
        Login
      </button>

      <div className={classes.partitionContainer}>
        <hr />
        <span>or</span>
        <hr />
      </div>

      <div className={classes.bottomContainer}>
        <span>New to Blogify ?</span>
        <Link className={classes.createAccountLink} to="/sign-up">
          Create Account
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
