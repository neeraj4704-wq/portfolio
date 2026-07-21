import "../styles/project.css";

function ProjectCard({ project }) {
  return (
    <div className="project-card">

      <img
        src={project.image}
        alt={project.title}
        className="project-image"
      />

      <div className="project-content">

        <span className="project-tool">
          {project.category}
        </span>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="project-tags">
          {project.tools.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>

        <div className="project-buttons">

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            Preview
          </a>

        </div>

      </div>

    </div>
  );
}

export default ProjectCard;