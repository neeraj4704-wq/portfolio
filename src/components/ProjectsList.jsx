import { useNavigate } from "react-router-dom";
import ProjectModal from "./ProjectModal";
import { useEffect, useState } from "react";
import "../styles/Dashboard/Projects.css";

import {
  getProjects,
  deleteProject,
} from "../services/projectService";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
const [search, setSearch] = useState("");
const [toolFilter, setToolFilter] = useState("All");
const navigate = useNavigate();

const [selectedProject, setSelectedProject] = useState(null);
const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };
  const filteredProjects = projects.filter((project) => {

  const matchesSearch =
    project.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesTool =
    toolFilter === "All"
      ? true
      : project.tool === toolFilter;

  return matchesSearch && matchesTool;

});

  const handleDelete = async (id, title) => {

    const confirmDelete = window.confirm(
      `Delete "${title}"?`
    );

    if (!confirmDelete) return;

    try {

      await deleteProject(id);

      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      );

      alert("Project deleted successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to delete project.");

    }

  };

  if (projects.length === 0) {
    return (
      <div className="empty-projects">
        <h3>No Projects Found</h3>
        <p>Add your first project to get started.</p>
      </div>
    );
  }
<div className="projects-toolbar">

  <input
    type="text"
    placeholder="🔍 Search Projects..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={toolFilter}
    onChange={(e) => setToolFilter(e.target.value)}
  >
    <option>All</option>
    <option>Excel</option>
    <option>SQL</option>
    <option>Power BI</option>
    <option>Python</option>
    <option>Other</option>
  </select>

</div>
  return (
  <>
    <div className="projects-toolbar">

      <input
        type="text"
        placeholder="🔍 Search Projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={toolFilter}
        onChange={(e) => setToolFilter(e.target.value)}
      >
        <option>All</option>
        <option>Excel</option>
        <option>SQL</option>
        <option>Power BI</option>
        <option>Python</option>
        <option>Other</option>
      </select>

    </div>

    <div className="projects-grid">

      {filteredProjects.map((project) => (

        <div
          className="project-card"
          key={project.id}
        >

          <img
            src={project.coverImage}
            alt={project.title}
            className="project-cover"
          />

          <div className="project-body">

  <h3>{project.title}</h3>

  <span className="tool-badge">
    {project.tool}
  </span>

  {/* Project Status */}
  <span
    className={
      project.status === "Published"
        ? "status published"
        : "status draft"
    }
  >
    {project.status}
  </span>

  <p>{project.category}</p>

  <div className="project-actions">

              <button
  onClick={() => {
    setSelectedProject(project);
    setShowModal(true);
  }}
>
  👁 View
</button> 

              <button
  onClick={() => navigate(`/admin/edit/${project.id}`)}
>
  ✏ Edit
</button>

              <button
                onClick={() =>
                  handleDelete(project.id, project.title)
                }
              >
                🗑 Delete
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
    {showModal && (
  <ProjectModal
    project={selectedProject}
    onClose={() => {
      setShowModal(false);
      setSelectedProject(null);
    }}
  />
)}  
  </>
);
}

export default ProjectsList;