import React, { useCallback, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./components/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./store/userSlice";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) navigate("/login");

      console.error("Error fetching user data:", error);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!loggedUser) fetchUser();
  }, [fetchUser]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
