import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremuim, setIsUserPremium] = useState(false);
  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premuim/verify", {
      withCredentials: true,
    });
    if (res.status.isPremuim) setIsUserPremium(true);
  };

  const handleBuy = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;
    const options = {
      key: keyId,
      amount,
      currency,
      name: "Better Than The Rest",
      description: "connect to the other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: 98499498445,
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  useEffect(() => {
    verifyPremiumUser();
  }, []);
  return isUserPremuim ? (
    <h1>You are already a Premium User!</h1>
  ) : (
    <div className="flex w-400 m-10 mx-auto">
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold text-3xl">Silver Membership</h1>
        <ul>
          <li>Access to curated blog/articles (e.g., premium tips, guides)</li>
          <li>Monthly newsletter with insights</li>
          <li>Community access (basic level)</li>
          <li>Email support (within 48 hrs)</li>
          <li>1 free digital download per month</li>
        </ul>
        <button
          className="btn btn-secondary"
          onClick={() => handleBuy("silver")}
        >
          Buy Silver
        </button>
      </div>
      <div className="divider divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold text-3xl">Gold Membership</h1>
        <ul>
          <li>All Silver benefits</li>
          <li>Exclusive webinars/workshops access</li>
          <li>Priority customer support (within 12 hrs)</li>
          <li>Unlimited digital downloads/resources</li>
          <li>Early access to new features/services</li>
          <li>1:1 consultation (once a month)</li>
        </ul>
        <button className="btn btn-primary" onClick={() => handleBuy("gold")}>
          Buy Gold
        </button>
      </div>
    </div>
  );
};

export default Premium;
