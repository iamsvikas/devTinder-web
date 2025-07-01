import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const reviewRequest = async (status, requestId) => {
    console.log(444, requests, requestId);
    try {
      const res = axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {}
  };
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
  if (requests?.length === 0)
    return <h1 className="flex justify-center mt-10">No Request found!</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections Requests</h1>
      {requests?.map((connection, ind) => {
        const { firstName, lastName, age, about, gender, photoUrl } =
          connection.fromUserId;
        return (
          <div
            key={ind}
            className="flex justify-between items-center gap-5 my-5 bg-base-300 w-2/3 m-auto p-5 rounded-lg"
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
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", connection._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", connection._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
