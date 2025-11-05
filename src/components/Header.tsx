import NavItems from "@/components/NavItems";

const Header = () => {
  return (
    <header className="header sticky top-0">
      <div className="header-wrapper container">
        <a href="/">
          <img
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </a>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
      </div>
    </header>
  );
};
export default Header;
