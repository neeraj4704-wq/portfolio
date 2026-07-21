import "../styles/About.css";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-container">

        <h2 className="section-title">
          About Me
        </h2>

        <div className="about-grid">

          {/* Left Side */}
          <div className="about-text">

            <span className="about-tag">
              Data Analyst • BCA Graduate
            </span>

            <h3>
              Passionate about transforming data into meaningful insights.
            </h3>

            <p>
              I'm <strong>Neeraj Yadav</strong>, a Data Analyst skilled in
              Excel, SQL, Power BI and Python. I enjoy cleaning messy data,
              creating interactive dashboards and uncovering insights that help
              businesses make better decisions.
            </p>

            <p>
              My focus is on data visualization, business intelligence,
              dashboard development and solving real-world business problems
              using data.
            </p>

            <div className="education-card">

              <h4>Education</h4>

              <h5>Bachelor of Computer Applications (BCA)</h5>

              <p>
                Punjab College of Technical Education
              </p>

              <span>2023 – 2026</span>

            </div>

          </div>

          {/* Right Side */}
          <div className="about-right">

            <div className="profile-box">

              <div className="profile-circle">
                NY
              </div>

              <h3>Core Skills</h3>

              <div className="skill-tags">

                <span>Excel</span>
                <span>Power BI</span>
                <span>SQL</span>
                <span>Python</span>
                <span>Pandas</span>
                <span>NumPy</span>
                <span>Data Cleaning</span>
                <span>Dashboard Design</span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;