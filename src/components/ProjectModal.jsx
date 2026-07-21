import { useState } from "react";
import "../styles/Dashboard/ProjectModal.css";

function ProjectModal({ project, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!project) return null;

  return (
    <>
      {/* Main Modal */}
      <div
        className="modal-overlay"
        onClick={onClose}
      >
        <div
          className="project-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="close-modal"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Cover Image */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="modal-cover"
          />

          {/* Content */}
          <div className="modal-content">

            <h2>{project.title}</h2>

            <div className="modal-tags">
              <span>{project.tool}</span>
              <span>{project.category}</span>
            </div>

            <div className="modal-section">
              <h3>Description</h3>
              <p>
                {project.description || "No description available."}
              </p>
            </div>

            <div className="modal-section">
              <h3>Technologies</h3>
              <p>
                {project.technologies || "Not provided"}
              </p>
            </div>

            {/* Screenshot Gallery */}
            {project.screenshots?.length > 0 && (
              <div className="modal-section">

                <h3>Screenshots</h3>

                <div className="modal-gallery">

                  {project.screenshots.map((shot, index) => (
                    <img
                      key={index}
                      src={shot}
                      alt={`Screenshot ${index + 1}`}
                      className="gallery-image"
                      onClick={() => setSelectedImage(shot)}
                    />
                  ))}

                </div>

              </div>
            )}

            {/* Buttons */}
            <div className="modal-buttons">

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              )}

              {project.projectFile && (
                <a
                  href={project.projectFile}
                  download={project.projectFileName}
                >
                  Download Project
                </a>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {selectedImage && (
        <div
          className="image-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="close-lightbox"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Screenshot Preview"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default ProjectModal;