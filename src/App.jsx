import { createBrowserRouter, RouterProvider } from "react-router";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Layout from "./Layout";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CancellationAndRefundPolicy from "./pages/CancellationAndRefundPolicy";
import ContactUs from "./pages/ContactUs";
import Premium from "./pages/Premium";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Feed /> },
      { path: "profile", element: <Profile /> },
      { path: "connections", element: <Connections /> },
      { path: "requests", element: <Requests /> },
      { path: "login", element: <Login /> },
      { path: "premium", element: <Premium /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "shipping-delivery-policy", element: <ShippingPolicy /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
      {
        path: "cancellation-refund-policy",
        element: <CancellationAndRefundPolicy />,
      },
      { path: "contact-us", element: <ContactUs /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
