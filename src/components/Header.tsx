import NavItems from "@/components/NavItems";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header sticky top-0">
      <div className="header-wrapper container">
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
      </div>
    </header>
  );
};
export default Header;
