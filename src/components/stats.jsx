import {
  FaFolderOpen,
  FaMicrosoft,
  FaDatabase,
  FaChartBar,
  FaPython,
  FaBoxes,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaFolderOpen />,
    number: 0,
    title: "Total Projects",
  },
  {
    icon: <FaMicrosoft />,
    number: 0,
    title: "Excel",
  },
  {
    icon: <FaDatabase />,
    number: 0,
    title: "SQL",
  },
  {
    icon: <FaChartBar />,
    number: 0,
    title: "Power BI",
  },
  {
    icon: <FaPython />,
    number: 0,
    title: "Python",
  },
  {
    icon: <FaBoxes />,
    number: 0,
    title: "Other",
  },
];

function Stats() {
  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <div className="stats-card" key={index}>
          <div className="stats-icon">{item.icon}</div>

          <h2>{item.number}</h2>

          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Stats;