import "../styles/Hero.css";

import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

import { MdOutlineEmail } from "react-icons/md";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

function Hero() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [toolsUsed, setToolsUsed] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("—");

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getProjects();

        // Only published projects
        const published = data.filter(
          (project) => project.status === "Published"
        );

        setTotalProjects(published.length);

        // Count unique tools
        const uniqueTools = [
          ...new Set(published.map((project) => project.tool))
        ];

        setToolsUsed(uniqueTools.length);

        // Last Updated
        if (published.length > 0) {
          const latestProject = [...published].sort((a, b) => {
            const dateA = a.createdAt?.toDate
              ? a.createdAt.toDate()
              : new Date(a.createdAt);

            const dateB = b.createdAt?.toDate
              ? b.createdAt.toDate()
              : new Date(b.createdAt);

            return dateB - dateA;
          })[0];

          let createdDate;

          if (latestProject.createdAt?.toDate) {
            // Firestore Timestamp
            createdDate = latestProject.createdAt.toDate();
          } else if (latestProject.createdAt instanceof Date) {
            // Already JS Date
            createdDate = latestProject.createdAt;
          } else {
            // String
            createdDate = new Date(latestProject.createdAt);
          }

          if (!isNaN(createdDate.getTime())) {
            setLastUpdated(
              createdDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            );
          } else {
            setLastUpdated("—");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">

        <p className="hero-tag">— data analyst portfolio</p>

        <h1 className="hero-title">
          Neeraj Yadav
        </h1>

        <h2 className="hero-role">
          Data Analyst
        </h2>

        <p className="hero-description">
          Turning raw data into decisions — one dashboard at a time.
        </p>

        <div className="social-links">

          <a
            href="mailto:neeraj4704@gmail.com"
            className="social-icon"
          >
            <MdOutlineEmail />
          </a>

          <a
            href="https://www.linkedin.com/in/neeraj-yadav-8b5b352aa"
            className="social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://github.com/neeraj4704-wq"
            className="social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

        </div>

        <div className="stats">

          <div className="stat-card">
            <h3>{totalProjects}</h3>
            <p>TOTAL PROJECTS</p>
          </div>

          <div className="stat-card">
            <h3>{toolsUsed}</h3>
            <p>TOOLS USED</p>
          </div>

          <div className="stat-card">
            <h3>{lastUpdated}</h3>
            <p>LAST UPDATED</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;