import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios
      .get(`${API}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filters = ['All', ...new Set(projects.flatMap(p => p.techStack))];
  const visible = filter === 'All' ? projects : projects.filter(p => p.techStack.includes(filter));

  return (
    <section id="projects" className="section">
      <p className="section-tag">// MY WORK</p>
      <h2 className="section-title">
        Featured <span className="highlight">Projects</span>
      </h2>

      <div className="filter-bar">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="muted">Loading projects...</p>}
      {error && <p className="muted">Projects load nahi hue. Server chal raha hai?</p>}

      <div className="projects-grid">
        {visible.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <TiltCard className="card project-card">
              <h3>{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-tech">
                {p.techStack.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="project-links">
                {p.githubLink && (
                  <a href={p.githubLink} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                )}
                {p.liveLink && (
                  <a href={p.liveLink} target="_blank" rel="noreferrer">
                    Live Demo ↗
                  </a>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
