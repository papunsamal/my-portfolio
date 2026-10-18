import {
  SiCloudinary,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

// Maps the skill names already used in About.jsx / Skills.jsx to an icon.
export const techIcons = {
  "Html,Css": SiHtml5,
  "HTML/CSS": SiHtml5,
  JavaScript: SiJavascript,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  MongoDB: SiMongodb,
  SQL: FaDatabase,
  Git: SiGit,
  cloudinary: SiCloudinary,
};
