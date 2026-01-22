import { useState } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import SearchCommand from "@/components/SearchCommand";
import ScrollToTop from "@/components/ScrollToTop";

/**
 * 頁面頭部組件
 * 包含 Logo、導航與搜尋功能
 */
const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-wrapper container">
        <Link
          to="/"
          className="ml-2 flex items-center gap-3 transition-transform hover:scale-105"
        >
          <img
            src="/favicon.png"
            alt="logo"
            width={32}
            height={32}
            className="h-8 w-8 drop-shadow-lg"
          />
          <span className="text-2xl font-bold tracking-tight text-white">
            股市儀表板
          </span>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <button
                className="group flex w-40 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10"
                onClick={() => setOpen(true)}
              >
                <Search className="h-4 w-4 text-gray-400 transition-colors group-hover:text-yellow-400" />
                <span className="hidden sm:inline">搜尋股票...</span>
              </button>
            </li>
          </ul>
        </nav>
        <SearchCommand open={open} onOpenChange={setOpen} />
      </div>
      <ScrollToTop />
    </header>
  );
};
export default Header;
