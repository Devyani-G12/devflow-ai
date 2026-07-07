import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
    github_link: "",
    portfolio_link: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const res = await api.get("/profile");

      setForm({
        name: res.data.name || "",
        bio: res.data.bio || "",
        skills: res.data.skills || "",
        github_link: res.data.github_link || "",
        portfolio_link: res.data.portfolio_link || "",
      });
    }

    fetchProfile();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function updateProfile(e) {
    e.preventDefault();

    await api.put("/profile", form);
    setMessage("Profile updated successfully");
  }

  return (
    <div>
      <h1>Profile</h1>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <form className="form" onSubmit={updateProfile}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="Skills e.g. React, FastAPI, SQL"
          value={form.skills}
          onChange={handleChange}
        />

        <input
          name="github_link"
          placeholder="GitHub Link"
          value={form.github_link}
          onChange={handleChange}
        />

        <input
          name="portfolio_link"
          placeholder="Portfolio Link"
          value={form.portfolio_link}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;