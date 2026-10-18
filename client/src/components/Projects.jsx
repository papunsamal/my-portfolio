import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard3D from "./ProjectCard3D";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const closeBtnRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    axios
      .get(`${API}/api/projects`)
      .then((res) => setProjects(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const images = selected?.images || [];
  const imageCount = images.length;

  const openModal = (p) => {
    lastFocus.current = document.activeElement;
    setSelected(p);
    setImgIndex(0);
  };

  const closeModal = useCallback(() => {
    setSelected(null);
    lastFocus.current?.focus?.();
  }, []);

  const next = useCallback(
    () => setImgIndex((i) => (i + 1) % imageCount),
    [imageCount],
  );
  const prev = useCallback(
    () => setImgIndex((i) => (i - 1 + imageCount) % imageCount),
    [imageCount],
  );

  // Popup khule toh background scroll band; Escape band kare, arrows se screenshots badlein
  useEffect(() => {
    if (!selected) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      else if (imageCount > 1 && e.key === "ArrowRight") next();
      else if (imageCount > 1 && e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, imageCount, closeModal, next, prev]);

  // Move keyboard focus into the dialog when it opens
  useEffect(() => {
    if (selected) closeBtnRef.current?.focus();
  }, [selected]);

  const filters = [
    "All",
    ...new Set(projects.flatMap((p) => p.techStack || [])),
  ];
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => (p.techStack || []).includes(filter));

  return (
    <section id="projects" className="section">
      <p className="section-tag">// MY WORK</p>
      <h2 className="section-title">
        Featured <span className="highlight">Projects</span>
      </h2>

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="muted">Loading projects...</p>}
      {error && (
        <p className="muted">
          The projects didn't load. The server is running.?
        </p>
      )}

      <div className="projects-grid">
        {visible.map((p, i) => (
          <ProjectCard3D key={p._id} project={p} index={i} onOpen={openModal} />
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
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                className="modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>

              {images.length > 0 && (
                <div className="slider">
                  <img
                    src={images[imgIndex]}
                    alt={`${selected.title} screenshot`}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        className="slider-btn left"
                        onClick={prev}
                        aria-label="Previous screenshot"
                      >
                        ‹
                      </button>
                      <button
                        className="slider-btn right"
                        onClick={next}
                        aria-label="Next screenshot"
                      >
                        ›
                      </button>
                      <div className="slider-dots">
                        {images.map((_, i) => (
                          <span
                            key={i}
                            className={i === imgIndex ? "dot active" : "dot"}
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
                  {selected.isPrivate && (
                    <span className="private-badge">🔒 Private</span>
                  )}
                </h3>

                <p className="project-desc">{selected.description}</p>

                {selected.features?.length > 0 && (
                  <>
                    <h4 className="modal-sub">Key Features</h4>
                    <ul className="feature-list">
                      {selected.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}

                <h4 className="modal-sub">Tech Stack</h4>
                <div className="project-tech">
                  {(selected.techStack || []).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                {selected.isPrivate && (
                  <p className="private-note">
                    🔒 The source code for this project is private. You can view
                    the entire project using the screenshots and live demo
                    above.
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
