import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center px-[3rem]">
      <Link to="">
        <h1 className="text-2xl p-2 font-light">Photo Gallery</h1>
      </Link>
      <nav className="p-[1rem]">
        <ul className="flex gap-[3rem]">
          <li>
            <Link to="/search">Main</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
