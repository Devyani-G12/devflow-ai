import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    status: "Todo",
    priority: "Medium",
    deadline: "",
    project_id: "",
  });

  async function fetchData() {
    const projectRes = await api.get("/projects");
    setProjects(projectRes.data);

    const taskRes = await api.get("/tasks");
    setTasks(taskRes.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function createTask(e) {
    e.preventDefault();

    await api.post("/tasks", {
      ...form,
      project_id: Number(form.project_id),
    });

    setForm({
      title: "",
      status: "Todo",
      priority: "Medium",
      deadline: "",
      project_id: "",
    });

    fetchData();
  }

  async function updateStatus(task, status) {
    await api.put(`/tasks/${task.id}`, {
      title: task.title,
      status,
      priority: task.priority,
      deadline: task.deadline,
      project_id: task.project_id,
    });

    fetchData();
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    fetchData();
  }

  return (
    <div>
      <h1>Tasks</h1>

      <form className="form" onSubmit={createTask}>
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />

        <select
          name="project_id"
          value={form.project_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option value={project.id} key={project.id}>
              {project.title}
            </option>
          ))}
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          name="deadline"
          placeholder="Deadline e.g. 15 July"
          value={form.deadline}
          onChange={handleChange}
        />

        <button type="submit">Create Task</button>
      </form>

      <div className="list">
        {tasks.map((task) => (
          <div className="card row" key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Deadline: {task.deadline}</p>
            </div>

            <div>
              <select
                value={task.status}
                onChange={(e) => updateStatus(task, e.target.value)}
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;