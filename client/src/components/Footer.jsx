import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { socials } from "../data/socials";

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p>
        &lt;Papun/&gt; · Designed &amp; built by Papun Samal · {CURRENT_YEAR}
      </p>

      <div className="footer-links">
        <a href={socials.github} target="_blank" rel="noreferrer">
          <FaGithub /> GitHub
        </a>

        <a href={socials.linkedin} target="_blank" rel="noreferrer">
          <FaLinkedin /> LinkedIn
        </a>

        <a href={socials.email}>
          <FaEnvelope /> Email
        </a>
      </div>
    </footer>
  );
}

export default Footer;
