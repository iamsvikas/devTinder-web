import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnections } from "../store/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections || connections.length === 0)
    return <h1>No Connection found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections?.map((connection, ind) => {
        const { firstName, lastName, age, about, gender, photoUrl } =
          connection.connectedUser;
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

export default Connections;
