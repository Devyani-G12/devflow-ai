import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_projects: 0,
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
  });

  useEffect(() => {
    async function fetchDashboard() {
      const res = await api.get("/dashboard");
      setStats(res.data);
    }

    fetchDashboard();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Overview of your developer workspace.</p>

      <div className="grid">
        <div className="card">
          <h3>Total Projects</h3>
          <h2>{stats.total_projects}</h2>
        </div>

        <div className="card">
          <h3>Total Tasks</h3>
          <h2>{stats.total_tasks}</h2>
        </div>

        <div className="card">
          <h3>Completed Tasks</h3>
          <h2>{stats.completed_tasks}</h2>
        </div>

        <div className="card">
          <h3>Pending Tasks</h3>
          <h2>{stats.pending_tasks}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;