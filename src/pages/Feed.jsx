import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed?.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  console.log({ feed });
  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      {feed?.length > 0 && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
