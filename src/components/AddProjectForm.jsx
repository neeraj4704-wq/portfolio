import { fileToBase64 } from "../utils/fileUtils";
import { saveProject } from "../services/projectService";
import { useState, useEffect } from "react";
import "../styles/AddProject.css";
import { getProject, updateProject } from "../services/projectService";
import { useNavigate } from "react-router-dom";

function AddProjectForm({ editId }) {

  const [formData, setFormData] = useState({
    title: "",
    category: "Dashboard",
    tool: "Excel",
    description: "",
    technologies: "",
    github: "",
    demo: "",
    coverImage: null,
    screenshots: [],
    projectFile: null,
    status: "Published",
  });

  const [coverPreview, setCoverPreview] = useState(null);

  const [screenshotPreviews, setScreenshotPreviews] = useState([]);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleCoverImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      coverImage: file,
    }));

    setCoverPreview(URL.createObjectURL(file));

  };

  const handleScreenshots = (e) => {

    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      screenshots: files,
    }));

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setScreenshotPreviews(previews);

  };

  const removeScreenshot = (index) => {

    const updatedFiles = [...formData.screenshots];

    updatedFiles.splice(index, 1);

    const updatedPreviews = [...screenshotPreviews];

    updatedPreviews.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      screenshots: updatedFiles,
    }));

    setScreenshotPreviews(updatedPreviews);

  };

  const handleProjectFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      projectFile: file,
    }));

  };
  useEffect(() => {
  if (!editId) return;

  const loadProject = async () => {
    try {
      const project = await getProject(editId);

      if (!project) {
        alert("Project not found.");
        navigate("/admin/projects");
        return;
      }

      setFormData({
        title: project.title || "",
        category: project.category || "Dashboard",
        tool: project.tool || "Excel",
        description: project.description || "",
        technologies: project.technologies || "",
        github: project.github || "",
        demo: project.demo || "",
        status: project.status || "Published",
        coverImage: project.coverImage || null,
        screenshots: project.screenshots || [],
        projectFile: project.projectFile || null,
        projectFileName: project.projectFileName || "",
      });

      if (project.coverImage) {
        setCoverPreview(project.coverImage);
      }

      if (project.screenshots) {
        setScreenshotPreviews(
          project.screenshots.map((image) => ({
            url: image,
          }))
        );
      }

    } catch (error) {
      console.error(error);
      alert("Unable to load project.");
    }
  };

  loadProject();

}, [editId, navigate]);

  const validateForm = () => {

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.technologies.trim()) {
      newErrors.technologies = "Technologies are required.";
    }

    if (!formData.coverImage) {
      newErrors.coverImage = "Please upload a cover image.";
    }

    if (formData.screenshots.length === 0) {
      newErrors.screenshots = "Upload at least one screenshot.";
    }

    if (!formData.projectFile) {
      newErrors.projectFile = "Please upload your project file.";
    }

    if (
      formData.github &&
      !/^https?:\/\/.+/i.test(formData.github)
    ) {
      newErrors.github = "Enter a valid GitHub URL.";
    }

    if (
      formData.demo &&
      !/^https?:\/\/.+/i.test(formData.demo)
    ) {
      newErrors.demo = "Enter a valid Demo URL.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {

    // Cover Image
    const coverImage =
      formData.coverImage instanceof File
        ? await fileToBase64(formData.coverImage)
        : formData.coverImage;

    // Screenshots
    const screenshots = await Promise.all(
      formData.screenshots.map(async (image) => {
        if (image instanceof File) {
          return await fileToBase64(image);
        }
        return image;
      })
    );

    // Project File
    let projectFile = "";
    let projectFileName = "";

    if (formData.projectFile instanceof File) {
      projectFile = await fileToBase64(formData.projectFile);
      projectFileName = formData.projectFile.name;
    } else {
      projectFile = formData.projectFile || "";
      projectFileName = formData.projectFileName || "";
    }

    const project = {
      title: formData.title,
      category: formData.category,
      tool: formData.tool,
      description: formData.description,
      technologies: formData.technologies,
      github: formData.github,
      demo: formData.demo,
      status: formData.status,
      coverImage,
      screenshots,
      projectFile,
      projectFileName,
    };

    // ===========================
    // EDIT MODE
    // ===========================

    if (editId) {

      await updateProject(editId, project);

      alert("Project updated successfully!");

      navigate("/admin/projects");

      return;

    }

    // ===========================
    // ADD MODE
    // ===========================

    await saveProject(project);

    alert("Project saved successfully!");

    navigate("/admin/projects");

  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

  }
};

  return (

    <div className="add-project-container">

      <form
        className="add-project-form"
        onSubmit={handleSubmit}
      >
                {/* ==========================
            Project Title
        =========================== */}

        <div className="form-group">

          <label>Project Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
          />

          {errors.title && (
            <span className="error-text">{errors.title}</span>
          )}

        </div>

        {/* ==========================
            Category & Tool
        =========================== */}

        <div className="form-row">

          <div className="form-group">

            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Dashboard</option>
              <option>Automation</option>
              <option>Data Analysis</option>
              <option>Machine Learning</option>
              <option>Web Development</option>
            </select>

          </div>

          <div className="form-group">

            <label>Tool</label>

            <select
              name="tool"
              value={formData.tool}
              onChange={handleChange}
            >
              <option>Excel</option>
              <option>SQL</option>
              <option>Power BI</option>
              <option>Python</option>
              <option>Tableau</option>
              <option>R</option>
              <option>Other</option>
            </select>

          </div>

        </div>
<div className="form-group">

  <label>Project Status</label>

  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
  >

    <option value="Published">
      🟢 Published
    </option>

    <option value="Draft">
      🟡 Draft
    </option>

  </select>

</div>
        {/* ==========================
            Description
        =========================== */}

        <div className="form-group">

          <label>Description</label>

          <textarea
            rows="6"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your project description..."
          />

          {errors.description && (
            <span className="error-text">{errors.description}</span>
          )}

        </div>

        {/* ==========================
            Technologies
        =========================== */}

        <div className="form-group">

          <label>Technologies Used</label>

          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="Power BI, SQL, DAX..."
          />

          {errors.technologies && (
            <span className="error-text">{errors.technologies}</span>
          )}

        </div>

        {/* ==========================
            GitHub
        =========================== */}

        <div className="form-group">

          <label>GitHub Repository</label>

          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/..."
          />

          {errors.github && (
            <span className="error-text">{errors.github}</span>
          )}

        </div>

        {/* ==========================
            Live Demo
        =========================== */}

        <div className="form-group">

          <label>Live Demo (Optional)</label>

          <input
            type="url"
            name="demo"
            value={formData.demo}
            onChange={handleChange}
            placeholder="https://..."
          />

          {errors.demo && (
            <span className="error-text">{errors.demo}</span>
          )}

        </div>

        {/* ==========================
            Cover Image
        =========================== */}

        <div className="form-group">

          <label>Cover Image</label>

          <input
            type="file"
            id="coverImage"
            hidden
            accept="image/*"
            onChange={handleCoverImage}
          />

          <label
            htmlFor="coverImage"
            className="cover-upload-box"
          >

            {coverPreview ? (

              <img
                src={coverPreview}
                alt="Cover"
                className="cover-preview-large"
              />

            ) : (

              <>

                <div className="upload-icon">🖼️</div>

                <h3>Upload Cover Image</h3>

                <p>Click here to choose cover image</p>

                <small>JPG • PNG • WEBP</small>

              </>

            )}

          </label>

          {errors.coverImage && (
            <span className="error-text">{errors.coverImage}</span>
          )}

        </div>

        {/* ==========================
            Screenshots
        =========================== */}

        <div className="form-group">

          <label>Project Screenshots</label>

          <input
            type="file"
            id="screenshots"
            hidden
            multiple
            accept="image/*"
            onChange={handleScreenshots}
          />

          <label
            htmlFor="screenshots"
            className="screenshots-upload-box"
          >

            <div className="upload-icon">📸</div>

            <h3>Add Screenshots</h3>

            <p>Upload multiple screenshots</p>

            <small>JPG • PNG • WEBP</small>

          </label>

          {errors.screenshots && (
            <span className="error-text">{errors.screenshots}</span>
          )}

          {screenshotPreviews.length > 0 && (

            <div className="screenshots-preview">

              {screenshotPreviews.map((image, index) => (

                <div
                  className="shot-card"
                  key={index}
                >

                  <img
                    src={image.url}
                    alt=""
                  />

                  <button
                    type="button"
                    onClick={() => removeScreenshot(index)}
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* ==========================
            Project File
        =========================== */}

        <div className="form-group">

          <label>Project File</label>

          <input
            type="file"
            id="projectFile"
            hidden
            onChange={handleProjectFile}
          />

          <label
            htmlFor="projectFile"
            className="upload-box"
          >

            <h3>📁 Choose Project File</h3>

            <p>
              Upload Excel, PBIX, SQL, ZIP, PDF or any project file.
            </p>

            {formData.projectFile && (

              <div className="selected-file">

                <strong>{formData.projectFile.name}</strong>

                <span>
                  {(formData.projectFile.size / 1024 / 1024).toFixed(2)} MB
                </span>

              </div>

            )}

          </label>

          {errors.projectFile && (
            <span className="error-text">{errors.projectFile}</span>
          )}

        </div>

        <button
          type="submit"
          className="save-btn"
        >
          {editId ? "Update Project" : "Save Project"}
        </button>
              </form>

    </div>

  );

}

export default AddProjectForm;