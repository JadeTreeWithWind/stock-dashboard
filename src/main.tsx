import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "@/pages/Home.tsx";
import WatchList from "@/pages/Watchlist.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/watchList",
    element: <WatchList />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
