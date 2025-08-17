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
  if (!feed) return;
  if (feed.length <= 0)
    // return <h1 className="text-center mt-10">No new User Found!</h1>;
    return (
      <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
          Premium Digital Consultation
        </h1>

        <p style={{ fontSize: "1.1rem", marginBottom: "15px" }}>
          Get expert guidance and personalized solutions for your business and
          technology needs. This is a one-hour live digital consultation session
          conducted via Google Meet/Zoom.
        </p>

        <ul style={{ marginBottom: "20px", lineHeight: "1.6" }}>
          <li>✔ One-on-one expert consultation (1 hour)</li>
          <li>✔ Tailored advice for your specific goals</li>
          <li>✔ Delivered instantly via video call (no shipping required)</li>
        </ul>

        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          Price: ₹199
        </h2>

        <button
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Buy Now
        </button>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#555" }}>
          Note: Payments will be enabled once Razorpay verification is
          completed.
        </p>
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
