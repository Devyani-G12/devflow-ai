import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";

function Layout({ children }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>DevFlow AI</h2>
        <p>Developer Workspace</p>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/ai">AI Assistant</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        <button onClick={logout}>Logout</button>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}

function Protected({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />

      <Route
        path="/projects"
        element={
          <Protected>
            <Projects />
          </Protected>
        }
      />

      <Route
        path="/tasks"
        element={
          <Protected>
            <Tasks />
          </Protected>
        }
      />

      <Route
        path="/ai"
        element={
          <Protected>
            <AIAssistant />
          </Protected>
        }
      />

      <Route
        path="/profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />
    </Routes>
  );
}

export default App;