import "../styles/Dashboard/RecentProjects.css";
import { FaFolderOpen } from "react-icons/fa";

function RecentProjects() {
  return (
    <div className="recent-projects">

      <div className="recent-header">

        <h2>Recent Projects</h2>

        <button>View All</button>

      </div>

      <div className="empty-project-box">

        <FaFolderOpen className="empty-folder"/>

        <h3>No Projects Yet</h3>

        <p>
          Upload your first project from the
          Add Project page.
        </p>

      </div>

    </div>
  );
}

export default RecentProjects;