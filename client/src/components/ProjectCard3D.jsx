import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

// One project card: screenshot, badges, links. Data comes from the API untouched.
function ProjectCard3D({ project: p, index, onOpen }) {
  return (
    <motion.div
      className="project-click"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onOpen(p)}
    >
      <TiltCard className="card project-card">
        {p.images?.[0] && (
          <div className="project-thumb-wrap">
            <img
              className="project-thumb"
              src={p.images[0]}
              alt={p.title}
              loading="lazy"
            />
          </div>
        )}

        <h3>
          {p.title}
          {p.isPrivate && <span className="private-badge">🔒 Private</span>}
        </h3>
        <p className="project-desc">{p.description}</p>

        <div className="project-tech">
          {(p.techStack || []).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="project-links">
          <button type="button" className="view-details">
            View Details →
          </button>
          {p.liveLink && (
            <a
              href={p.liveLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo ↗
            </a>
          )}
          {p.githubLink && (
            <a
              href={p.githubLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default ProjectCard3D;
