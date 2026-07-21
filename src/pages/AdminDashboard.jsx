import { useNavigate } from "react-router-dom";
import StatsCards from "../components/StatsCards";
import RecentProjects from "../components/RecentProjects";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="welcome-section">
        <div className="dashboard-header">
          <div>
            <h1>
              Welcome Back <span>👋</span>
            </h1>

            <p>
              Manage all your portfolio projects from one dashboard.
            </p>
          </div>

          <button
            className="add-project-big-btn"
            onClick={() => navigate("/admin/add")}
          >
            + Add New Project
          </button>
        </div>
      </div>

      <StatsCards />

      <RecentProjects />
    </>
  );
}

export default AdminDashboard;