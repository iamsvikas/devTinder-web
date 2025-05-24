import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";
const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, gender, photoUrl },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };
  return (
    <>
      {user?.firstName && (
        <div className="flex justify-center gap-10">
          <div className="flex justify-center">
            <div className="card card-border bg-base-300 w-96 pb-8">
              <div className="card-body">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
              </div>
              {error && <p className="text-red-500">{error}</p>}

              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <UserCard
            user={{ firstName, lastName, age, gender, photoUrl, about }}
          />
        </div>
      )}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Changes saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
