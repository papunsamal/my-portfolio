const education = [
  {
    title: 'B.Tech in Computer Science',
    place: 'GEC Autonomous',
    year: '2024 - 2028',
    desc: 'Focused on DSA, Web Development and Software Engineering.',
  },
  {
    title: 'Higher Secondary (12th)',
    place: 'S.V.S.HS SCHOOL',
    year: '2022 - 2024',
    desc: 'Science stream.',
  },
];

function Education() {
  return (
    <section id="education" className="section">
      <p className="section-tag">// MY JOURNEY</p>
      <h2 className="section-title">Education</h2>

      <div className="timeline">
        {education.map(e => (
          <div key={e.title} className="timeline-item">
            <span className="timeline-dot"></span>
            <div className="card">
              <p className="timeline-year">{e.year}</p>
              <h3>{e.title}</h3>
              <p className="timeline-place">{e.place}</p>
              <p className="project-desc">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
