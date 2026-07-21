import AddProjectForm from "../components/AddProjectForm";

function AddProject() {
  return (
    <>
      <div className="welcome-section">
        <div className="dashboard-header">
          <div>
            <h1>
              Add New Project <span>🚀</span>
            </h1>

            <p>
              Upload a new project to your portfolio.
              Once saved, it will automatically appear on
              your public portfolio.
            </p>
          </div>
        </div>
      </div>

      <AddProjectForm />
    </>
  );
}

export default AddProject;