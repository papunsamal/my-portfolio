import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { socials } from '../data/socials';

function SocialLinks() {
  return (
    <div className="social-links">
      <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <FaGithub />
      </a>
      <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <FaLinkedin />
      </a>
      <a href={socials.email} aria-label="Email">
        <FaEnvelope />
      </a>
    </div>
  );
}

export default SocialLinks;
