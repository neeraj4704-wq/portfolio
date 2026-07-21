import "../styles/Dashboard/Topbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";

function Topbar() {

  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    navigate("/admin");
  }

  return (
    <header className="topbar">

      <div className="topbar-left">

        <h1>Dashboard</h1>

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search projects..."
          />

        </div>

      </div>

      <div className="topbar-right">

        <div className="notification">

          <FaBell />

        </div>

        <div className="admin-profile">

          <FaUserCircle className="profile-icon" />

          <div>

            <h4>Neeraj</h4>

            <span>Administrator</span>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Topbar;