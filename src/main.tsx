import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "@/pages/Home.tsx";
// import WatchList from "@/pages/Watchlist.tsx";
import StockDetail from "@/pages/StockDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "/watchlist",
  //   element: <WatchList />,
  // },
  {
    path: "/:symbol",
    element: <StockDetail />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
