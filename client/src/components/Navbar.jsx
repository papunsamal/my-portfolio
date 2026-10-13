import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'contact', label: 'CONTACT' },
];

function Navbar() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    links.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        &lt;Papun<span>/</span>&gt;
      </a>

      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? '✕' : '☰'}
      </button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className={active === l.id ? 'active-link' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
              {active === l.id && (
                <motion.span layoutId="nav-underline" className="nav-underline" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
