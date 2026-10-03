import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-red-600 text-white shadow-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          🐾 Pokédex
        </Link>
        <Link to="/favoritos" className="font-semibold hover:underline">
          ⭐ Favoritos
        </Link>
      </nav>
    </header>
  );
}
export default Navbar;
