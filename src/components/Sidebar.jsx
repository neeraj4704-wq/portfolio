import "../styles/Dashboard/Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFolderOpen,
  FaPlusCircle,
  FaCog,
  FaDatabase,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-top">

        <div className="logo-box">
          <div className="logo-circle">NY</div>

          <div>
            <h2>Portfolio CMS</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav>

          <NavLink to="/admin">
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink to="/admin/projects">
            <FaFolderOpen />
            Projects
          </NavLink>

          <NavLink to="/admin/add">
            <FaPlusCircle />
            Add Project
          </NavLink>

          <NavLink to="/admin/settings">
            <FaCog />
            Settings
          </NavLink>

        </nav>

      </div>

      <div className="sidebar-footer">

        <div className="firebase-status">

          <FaDatabase />

          <div>
            <strong>Firebase</strong>
            <p>Connected</p>
          </div>

        </div>

        <small>Version 1.0</small>

      </div>

    </aside>
  );
}

export default Sidebar;