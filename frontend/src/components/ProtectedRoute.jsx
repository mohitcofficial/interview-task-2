import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import USER_APIs from "../services/api/User.api.services";
import { login, logout } from "../store/userSlice";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const data = await USER_APIs.getMyProfile();
      if (data?.user) {
        dispatch(login(data.user));

        if (!allowedRoles.includes(data.user.role)) {
          navigate("/not-found");
        }
      } else {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      dispatch(logout());
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) fetchUserProfile();
    if (user) setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
