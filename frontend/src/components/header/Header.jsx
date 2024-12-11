import React, { useState } from "react";
import classes from "./Header.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import toast from "react-hot-toast";
import UserApiServices from "../../services/api/User.api.services";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listVisible, setListVisible] = useState(false);
  const fontSize = { lg: 32, md: 32, sm: 30, xs: 28 };
  const fontSize2 = { lg: 16, md: 16, sm: 15, xs: 15 };
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await UserApiServices.logout();
      toast.success(data?.message);
      navigate("/login");
      dispatch(logout());
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className={classes.navbar}>
      {loading && <Loader />}
      <div className={classes.navContent}>
        <div className={classes.logo}>
          <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
            Blogify
          </Link>
        </div>
        <div
          onClick={() => setListVisible(true)}
          onMouseOver={() => setListVisible(true)}
          onMouseLeave={() => setListVisible(false)}
          className={classes.profileIcon}
        >
          <AccountCircleIcon sx={{ fontSize: fontSize }} />
          <KeyboardArrowDownIcon />
          {listVisible && (
            <ul className={classes.list}>
              {user?.role === "admin" && (
                <li className={classes.listItem}>
                  <Link to="/admin/dashboard">Dashbaord</Link>
                </li>
              )}
              <li className={classes.listItem}>
                <Link to="/profile">Your Profile</Link>
              </li>
              <li
                onClick={handleLogout}
                className={`${classes.listItem} ${classes.padding}`}
              >
                <span>Logout</span>
                <LogoutIcon sx={{ fontSize: fontSize2 }} />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
