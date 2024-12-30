import { createBrowserRouter } from "react-router-dom";

import Layout from "src/components/Layout";

import UserPage from "./user";
import PostPage from "./post";
import CompanyPage from "./company";
import BannerPage from "./banner";
import NotiPage from "./noti";
import ErrorPage from "./error-page";
import LoginPage from "./login";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "post",
        element: <PostPage />,
      },
      {
        path: "company",
        element: <CompanyPage />,
      },
      {
        path: "banner",
        element: <BannerPage />,
      },
      {
        path: "notification",
        element: <NotiPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
