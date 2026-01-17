import {
  FaMedium,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

export const links = [
  {
    index: 0,
    title: "Find me on Github",
    href: "https://github.com/john7rho",
    icon: <FaGithub />,
  },
  {
    index: 1,
    title: "Find me on LinkedIn",
    href: "https://www.linkedin.com/in/rhojohn/",
    icon: <FaLinkedin />,
  },
  {
    index: 2,
    title: "Contact me via email",
    href: "mailto:john@arroagent.com",
    icon: <FaEnvelope />,
  },
  {
    index: 3,
    title: "Find me on Medium",
    href: "https://johnrho.medium.com/",
    icon: <FaMedium />,
  },
  {
    index: 4,
    title: "Check out my Substack",
    href: "https://substack.com/@johnrho",
    icon: <SiSubstack />,
  },
];
