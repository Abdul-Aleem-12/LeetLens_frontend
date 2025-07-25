import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Github } from "lucide-react"; // Icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-black py-4 px-6">
      <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-xl l:text-3xl font-extrabold l:font-bold font-sans raleway-st">
            LeetLens
        </Link>

        {/* Hamburger button (visible on mobile) */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu - hidden on mobile, visible on desktop */}
        <ul className="hidden sm:flex space-x-8 text-white text-base mr-2">
          <li><a href="https://github.com/abdul-aleem-12" className="hover:underline">About Dev</a></li>
          <li><a href="https://github.com/Abdul-Aleem-12/LeetLens_frontend" className="flex items-center gap-1 hover:underline"><Github size={16} /> GitHub</a></li>
        </ul>
      </div>

      {/* Mobile menu - visible only when menuOpen */}
      {menuOpen && (
        <ul className="sm:hidden mt-4 flex flex-col gap-3 text-white text-base">
          <li><a href="https://github.com/abdul-aleem-12" className="hover:underline">About Dev</a></li>
          <li><a href="https://github.com/Abdul-Aleem-12/LeetLens_frontend" className="flex items-center gap-1 hover:underline ml-32"><Github size={16} /> GitHub</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
