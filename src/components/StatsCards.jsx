import { useEffect, useState } from "react";
import "../styles/Dashboard/StatsCards.css";

import {
  FaFolderOpen,
  FaMicrosoft,
  FaDatabase,
  FaChartBar,
  FaPython,
  FaBoxes,
} from "react-icons/fa";

import { getDashboardStats } from "../services/dashboardService";

function StatsCards() {
  const [stats, setStats] = useState({
    total: 0,
    Excel: 0,
    SQL: 0,
    "Power BI": 0,
    Python: 0,
    Other: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  };

  const cards = [
    {
      title: "Total Projects",
      value: stats.total,
      icon: <FaFolderOpen />,
    },
    {
      title: "Excel",
      value: stats.Excel,
      icon: <FaMicrosoft />,
    },
    {
      title: "SQL",
      value: stats.SQL,
      icon: <FaDatabase />,
    },
    {
      title: "Power BI",
      value: stats["Power BI"],
      icon: <FaChartBar />,
    },
    {
      title: "Python",
      value: stats.Python,
      icon: <FaPython />,
    },
    {
      title: "Other",
      value: stats.Other,
      icon: <FaBoxes />,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div className="stats-card" key={index}>
          <div className="stats-icon">
            {card.icon}
          </div>

          <h2>{card.value}</h2>

          <p>{card.title}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;