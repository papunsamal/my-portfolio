const categories = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 90 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 80 },
      { name: 'Python', level: 75 },
    ],
  },
  {
    category: 'Database & Tools',
    items: [
      { name: 'MongoDB', level: 75 },
      { name: 'SQL', level: 70 },
      { name: 'Git', level: 85 },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <p className="section-tag">// MY EXPERTISE</p>
      <h2 className="section-title">Technical Skills</h2>

      <div className="skills-grid">
        {categories.map(cat => (
          <div key={cat.category} className="card">
            <h3>{cat.category}</h3>
            {cat.items.map(item => (
              <div key={item.name} className="bar-wrapper">
                <div className="bar-label">
                  <span>{item.name}</span>
                  <span>{item.level}%</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${item.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
