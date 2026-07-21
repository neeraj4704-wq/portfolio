import { useParams } from "react-router-dom";
import AddProjectForm from "../components/AddProjectForm";

function EditProject() {
  const { id } = useParams();

  return (
    <>
      <div className="welcome-section">
        <div className="dashboard-header">
          <div>
            <h1>Edit Project ✏️</h1>

            <p>
              Update your existing project information.
            </p>
          </div>
        </div>
      </div>

      <AddProjectForm editId={id} />
    </>
  );
}

export default EditProject;