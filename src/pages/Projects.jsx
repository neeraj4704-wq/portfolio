import ProjectsList from "../components/ProjectsList";

function Projects() {
  return (
    <>
      <div className="welcome-section">
        <div className="dashboard-header">
          <div>
            <h1>Projects 📁</h1>

            <p>
              Manage all your portfolio projects from here.
            </p>
          </div>
        </div>
      </div>

      <ProjectsList />
    </>
  );
}

export default Projects;