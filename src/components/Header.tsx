// import NavItems from "@/components/NavItems";
import { useState } from "react";
import { Link } from "react-router";
import SearchCommand from "@/components/SearchCommand.tsx";
import ScrollToTop from "@/components/ScrollToTop.tsx";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="header sticky top-0">
      <div className="header-wrapper container">
        <Link to="/" className="ml-2 flex items-center gap-2">
          <img
            src="/favicon.png"
            alt="logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
          <span className="text-3xl font-bold text-white">美股儀表板</span>
        </Link>
        <nav>
          {/*<NavItems/>*/}
          <ul className="flex flex-col gap-3 p-2 font-medium sm:flex-row sm:gap-10">
            <li>
              <button
                className="cursor-pointer transition-colors hover:text-yellow-500"
                onClick={() => setOpen(true)}
              >
                搜尋
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
