import { FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import { techIcons } from "../data/techIcons";
import About3D from "./About3D";

function About() {
  const skills = [
    { name: "Html,Css" },
    { name: "JavaScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Python" },
    { name: "MongoDB" },
    { name: "SQL" },
    { name: "Git" },
    { name: "cloudinary" },
  ];

  return (
    <section id="about" className="section">
      <About3D />

      <p className="section-tag">// ABOUT ME</p>
      <h2 className="section-title">
        Building things <br />
        that <span className="highlight">matter</span>
      </h2>

      <div className="about-content">
        <div className="about-text">
          <ul className="about-facts">
            <li>
              <FaMapMarkerAlt aria-hidden="true" /> Bhubaneswar
            </li>
            <li>
              <FaGraduationCap aria-hidden="true" /> B.Tech CSE, 3rd year · GEC
              Autonomous College
            </li>
          </ul>

          <p>
            I am a 3rd-year Computer Science Engineering student at GEC
            Autonomous College, Bhubaneswar, and an aspiring MERN Stack
            Developer skilled in React.js, Node.js, Express.js, and MongoDB. I
            enjoy building real-world projects, exploring AI prompting, and
            continuously improving my development skills. I am open to
            opportunities to learn, grow, and contribute to innovative projects.
          </p>
          <p>
            I thrive in collaborative environments and always look to learn new
            technologies. My goal is to join a team where I can contribute
            meaningfully from day one.
          </p>

          <div className="skill-tags">
            {skills.map((s) => {
              const Icon = techIcons[s.name];
              return (
                <span key={s.name} className="skill-tag">
                  {Icon && <Icon aria-hidden="true" />} {s.name}
                </span>
              );
            })}
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
