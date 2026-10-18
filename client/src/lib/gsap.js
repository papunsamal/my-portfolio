import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once. GSAP is used for the hero timeline and scroll-linked effects only;
// every other UI animation stays on Framer Motion so the two never fight.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
