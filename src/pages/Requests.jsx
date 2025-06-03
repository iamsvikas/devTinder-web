import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests?.length === 0) return <h1>No Request found!</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections Requests</h1>
      {requests?.map((connection, ind) => {
        const { firstName, lastName, age, about, gender, photoUrl } =
          connection.connectedUser.fromUserId;
        return (
          <div
            key={ind}
            className="flex gap-5 my-5 bg-base-300 w-1/2 m-auto p-5 rounded-lg"
          >
            <div>
              <img src={photoUrl} className="w-20 h-20 rounded-full" />
            </div>
            <div>
              <h1 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h1>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
