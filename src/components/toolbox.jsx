import { useState, useEffect } from "react";
import "../styles/toolbox.css";

import { getProjects } from "../services/projectService";
import ProjectModal from "./ProjectModal";

import {
  FaMicrosoft,
  FaPython,
  FaDatabase,
  FaChartBar,
  FaFolderOpen,
  FaPlus,
} from "react-icons/fa";

function Toolbox() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();

        const published = data.filter(
          (project) => project.status === "Published"
        );

        setProjects(published);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.tool === selectedCategory
        );

  return (
    <>
      <section className="toolbox" id="projects">

        {/* Header */}

        <div className="toolbox-header">
          <div>
            <h2>My Toolbox</h2>
            <p>Click a tool to explore my projects</p>
          </div>

          
        </div>

        {/* Tool Cards */}

        <div className="tool-grid">

          <div
            className={`tool-card ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            <FaFolderOpen className="tool-icon" />
            <h3>All Projects</h3>
            <p>View everything</p>
          </div>

          <div
            className={`tool-card ${
              selectedCategory === "Excel" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Excel")}
          >
            <FaMicrosoft className="tool-icon excel" />
            <h3>Excel</h3>
            <p>Dashboards & Analysis</p>
          </div>

          <div
            className={`tool-card ${
              selectedCategory === "SQL" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("SQL")}
          >
            <FaDatabase className="tool-icon sql" />
            <h3>SQL</h3>
            <p>Queries & Databases</p>
          </div>

          <div
            className={`tool-card ${
              selectedCategory === "Power BI" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Power BI")}
          >
            <FaChartBar className="tool-icon powerbi" />
            <h3>Power BI</h3>
            <p>Reports & DAX</p>
          </div>

          <div
            className={`tool-card ${
              selectedCategory === "Python" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Python")}
          >
            <FaPython className="tool-icon python" />
            <h3>Python</h3>
            <p>Automation & Analysis</p>
          </div>

        </div>

        {/* Projects */}

        <div className="projects-container">

          {loading ? (

            <div className="project-placeholder">
              <h2>Loading...</h2>
            </div>

          ) : filteredProjects.length === 0 ? (

            <div className="project-placeholder">
              <h2>{selectedCategory}</h2>
              <p>No projects found.</p>
            </div>

          ) : (

            <div className="projects-grid">

              {filteredProjects.map((project) => (

                <div
                  className="portfolio-project-card"
                  key={project.id}
                >

                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="portfolio-cover"
                  />

                  <div className="portfolio-body">

                    <span className="portfolio-tool">
                      {project.tool}
                    </span>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <button
                      className="view-project-btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Project
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </>
  );
}

export default Toolbox;