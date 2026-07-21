import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/dashboard/Dashboard.css";

function DashboardLayout({ children }) {

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Topbar />

        <div className="dashboard-content">

          {children}

        </div>

      </div>

    </div>

  );

}

export default DashboardLayout;