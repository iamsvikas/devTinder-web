import { createBrowserRouter, RouterProvider } from "react-router";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Layout from "./Layout";
import appStore from "./store/appStore";
import { Provider } from "react-redux";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
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
