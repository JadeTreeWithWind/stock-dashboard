import { lazy, Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// 路由懶加載：首屏只載入必要代碼
const Home = lazy(() => import("@/pages/Home"));
const StockDetail = lazy(() => import("@/pages/StockDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={null}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/:symbol",
    element: (
      <Suspense fallback={null}>
        <StockDetail />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
