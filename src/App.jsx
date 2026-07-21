import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import Projects from "./pages/Projects";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Routes>

        {/* Public Portfolio */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Admin Login */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Add Project */}
        <Route
          path="/admin/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddProject />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Edit Project */}
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditProject />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Projects */}
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Projects />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;