import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Popup khule toh background scroll band, Escape se band ho
  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = 'hidden';
    const onKey = e => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  const openModal = p => {
    setSelected(p);
    setImgIndex(0);
  };
  const closeModal = () => setSelected(null);

  const images = selected?.images || [];
  const next = () => setImgIndex(i => (i + 1) % images.length);
  const prev = () => setImgIndex(i => (i - 1 + images.length) % images.length);

  const filters = ['All', ...new Set(projects.flatMap(p => p.techStack || []))];
  const visible =
    filter === 'All' ? projects : projects.filter(p => (p.techStack || []).includes(filter));

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
      {error && <p className="muted">The projects didn't load. The server is running.?</p>}

      <div className="projects-grid">
        {visible.map((p, i) => (
          <motion.div
            key={p._id}
            className="project-click"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => openModal(p)}
          >
            <TiltCard className="card project-card">
              {p.images?.[0] && (
                <img className="project-thumb" src={p.images[0]} alt={p.title} loading="lazy" />
              )}

              <h3>
                {p.title}
                {p.isPrivate && <span className="private-badge">🔒 Private</span>}
              </h3>
              <p className="project-desc">{p.description}</p>

              <div className="project-tech">
                {(p.techStack || []).map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <div className="project-links">
                <span className="view-details">View Details →</span>
                {p.liveLink && (
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                  >
                    Live Demo ↗
                  </a>
                )}
                {p.githubLink && (
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* ---------- DETAIL POPUP ---------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal} aria-label="Close">
                ✕
              </button>

              {images.length > 0 && (
                <div className="slider">
                  <img src={images[imgIndex]} alt={`${selected.title} screenshot`} />
                  {images.length > 1 && (
                    <>
                      <button className="slider-btn left" onClick={prev}>
                        ‹
                      </button>
                      <button className="slider-btn right" onClick={next}>
                        ›
                      </button>
                      <div className="slider-dots">
                        {images.map((_, i) => (
                          <span
                            key={i}
                            className={i === imgIndex ? 'dot active' : 'dot'}
                            onClick={() => setImgIndex(i)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="modal-body">
                <h3 className="modal-title">
                  {selected.title}
                  {selected.isPrivate && <span className="private-badge">🔒 Private</span>}
                </h3>

                <p className="project-desc">{selected.description}</p>

                {selected.features?.length > 0 && (
                  <>
                    <h4 className="modal-sub">Key Features</h4>
                    <ul className="feature-list">
                      {selected.features.map(f => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}

                <h4 className="modal-sub">Tech Stack</h4>
                <div className="project-tech">
                  {(selected.techStack || []).map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                {selected.isPrivate && (
                  <p className="private-note">
                    🔒 The source code for this project is private. You can view the entire project
                    using the screenshots and live demo above.
                  </p>
                )}

                <div className="modal-actions">
                  {selected.liveLink && (
                    <a
                      href={selected.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {selected.githubLink && (
                    <a
                      href={selected.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
