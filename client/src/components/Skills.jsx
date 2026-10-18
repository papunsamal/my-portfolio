import { motion } from "framer-motion";
import { techIcons } from "../data/techIcons";
import TiltCard from "./TiltCard";

const categories = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
    ],
  },
  {
    category: "Database & Tools",
    items: [
      { name: "MongoDB", level: 75 },
      { name: "SQL", level: 70 },
      { name: "Git", level: 85 },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const card = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Skills() {
  return (
    <section id="skills" className="section">
      <p className="section-tag">// MY EXPERTISE</p>
      <h2 className="section-title">Technical Skills</h2>

      <motion.div
        className="skills-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.div key={cat.category} variants={card}>
            <TiltCard className="card skill-card" max={6}>
              <h3>{cat.category}</h3>
              {cat.items.map((item) => {
                const Icon = techIcons[item.name];
                return (
                  <div key={item.name} className="bar-wrapper">
                    <div className="bar-label">
                      <span className="bar-name">
                        {Icon && <Icon aria-hidden="true" />}
                        {item.name}
                      </span>
                      <span>{item.level}%</span>
                    </div>
                    <div className="bar-bg">
                      <motion.div
                        className="bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;
