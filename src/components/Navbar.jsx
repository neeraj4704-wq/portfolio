import { useState } from "react";
import "../styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="logo">
        Neeraj Yadav
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li>
          <button onClick={() => scrollToSection("projects")}>
            Projects
          </button>
        </li>

        <li>
          <button onClick={() => scrollToSection("about")}>
            About
          </button>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;