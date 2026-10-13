function About() {
  const skills = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'SQL', icon: '🗄️' },
    { name: 'Git', icon: '🔧' },
    { name: 'AWS', icon: '☁️' },
  ];

  return (
    <section id="about" className="section">
      <p className="section-tag">// ABOUT ME</p>
      <h2 className="section-title">
        Building things <br />
        that <span className="highlight">matter</span>
      </h2>

      <div className="about-content">
        <div className="about-text">
          <p>
            I'm a Computer Science student at GEC Autonomous, passionate about building full-stack
            applications and solving complex problems. With a strong foundation in DSA, I love
            turning ideas into production-ready software.
          </p>
          <p>
            I thrive in collaborative environments and always look to learn new technologies. My
            goal is to join a team where I can contribute meaningfully from day one.
          </p>

          <div className="skill-tags">
            {skills.map(s => (
              <span key={s.name} className="skill-tag">
                {s.icon} {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="photo-wrap">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="orbit">
            <span className="orbit-dot"></span>
          </div>
          <img src="/profile.jpeg" alt="Papun Samal" />
        </div>
      </div>
    </section>
  );
}

export default About;
