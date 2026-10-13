import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

const roles = ['MERN Stack Developer 💻', 'Full Stack Developer', 'Problem Solver'];

// Home page ki photo (file client/public/ folder mein honi chahiye)
const HOME_PHOTO = '/home-photo.jpg';

function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count}+</>;
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[roleIndex];
    const speed = deleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <motion.p
          className="hero-tag"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          &gt; AVAILABLE FOR OPPORTUNITIES
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Papun <br />
          <span className="highlight">Samal</span>
        </motion.h1>

        <p className="hero-role">
          {text}
          <span className="cursor">|</span>
        </p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="#projects" className="btn-primary">
            → View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
          <a href="/resume.pdf" download className="btn-secondary">
            ⬇ Resume
          </a>
        </motion.div>

        <SocialLinks />

        <div className="hero-stats">
          <div>
            <h2>
              <Counter target={10} />
            </h2>
            <p>PROJECTS BUILT</p>
          </div>
          <div>
            <h2>
              <Counter target={5} />
            </h2>
            <p>CERTIFICATIONS</p>
          </div>
          <div>
            <h2>
              <Counter target={500} />
            </h2>
            <p>DSA PROBLEMS</p>
          </div>
        </div>
      </div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        <div className="photo-wrap">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="orbit">
            <span className="orbit-dot"></span>
          </div>
          <img src={HOME_PHOTO} alt="Papun Samal" width="320" height="320" />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
