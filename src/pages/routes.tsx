import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "./homePage";
import SearchPage from "./searchPage";
import HistoryPage from "./historyPage";
import NotFoundPage from "./NotFoundPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
