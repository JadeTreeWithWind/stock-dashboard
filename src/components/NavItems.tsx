import { useLocation } from "react-router"; // 1. 導入 useLocation
import { NAV_ITEMS } from "@/lib/constants";
import { Link } from "react-router";

const NavItems = () => {
  const location = useLocation(); // 2. 獲取 location 物件
  const pathname = location.pathname; // 3. 從 location 中取得路徑

  const isActive = (href: string) => {
    // 4. 實作判斷邏輯
    // 處理首頁 (/) 的情況，我們需要完全匹配
    if (href === "/") {
      return pathname === "/";
    }
    // 處理其他頁面
    return pathname.startsWith(href);
  };

  return (
    <ul className="flex flex-col gap-3 p-2 font-medium sm:flex-row sm:gap-10">
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={href}>
          <Link
            to={href}
            className={`transition-colors hover:text-yellow-500 ${
              isActive(href) ? "text-gray-100" : ""
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default NavItems;
