import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getDashboardStats = async () => {
  const snapshot = await getDocs(collection(db, "projects"));

  const stats = {
    total: 0,
    Excel: 0,
    SQL: 0,
    "Power BI": 0,
    Python: 0,
    Other: 0,
  };

  snapshot.forEach((doc) => {
    const project = doc.data();

    stats.total++;

    if (stats.hasOwnProperty(project.tool)) {
      stats[project.tool]++;
    } else {
      stats.Other++;
    }
  });

  return stats;
};