import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool } from "react-icons/fa";

const education = [
  {
    title: "B.Tech in Computer Science",
    place: "GEC Autonomous",
    year: "2024 - 2028",
    desc: "Focused on DSA, Web Development and Software Engineering.",
    Icon: FaGraduationCap,
  },
  {
    title: "Higher Secondary (12th)",
    place: "S.V.S.HS SCHOOL",
    year: "2022 - 2024",
    desc: "Science stream.",
    Icon: FaSchool,
  },
];

function Education() {
  return (
    <section id="education" className="section">
      <p className="section-tag">// MY JOURNEY</p>
      <h2 className="section-title">Education</h2>

      <div className="timeline">
        <motion.span
          className="timeline-line"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        {education.map((e, i) => (
          <motion.div
            key={e.title}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <span className="timeline-dot">
              <e.Icon aria-hidden="true" />
            </span>
            <div className="card">
              <p className="timeline-year">{e.year}</p>
              <h3>{e.title}</h3>
              <p className="timeline-place">{e.place}</p>
              <p className="project-desc">{e.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Education;
