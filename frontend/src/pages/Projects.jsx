import { useEffect, useState } from "react";
import api from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "In Progress",
  });

  async function fetchProjects() {
    const res = await api.get("/projects");
    setProjects(res.data);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function createProject(e) {
    e.preventDefault();
    await api.post("/projects", form);
    setForm({
      title: "",
      description: "",
      status: "In Progress",
    });
    fetchProjects();
  }

  async function deleteProject(id) {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  }

  return (
    <div>
      <h1>Projects</h1>

      <form className="form" onSubmit={createProject}>
        <input
          name="title"
          placeholder="Project title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Project description"
          value={form.description}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Archived</option>
        </select>

        <button type="submit">Create Project</button>
      </form>

      <div className="list">
        {projects.map((project) => (
          <div className="card row" key={project.id}>
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <strong>{project.status}</strong>
            </div>

            <button onClick={() => deleteProject(project.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;