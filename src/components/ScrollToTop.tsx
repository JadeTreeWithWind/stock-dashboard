import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 平滑滾動到頂部
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // 每當路徑改變時觸發

  return null;
};

export default ScrollToTop;
