import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import SocialLinks from "./SocialLinks";
import Hero3D from "./Hero3D";

const roles = [
  "MERN Stack Developer 💻",
  "Full Stack Developer",
  "Problem Solver",
];

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

// Typing effect. Works on whole characters (so the emoji is never cut in half).
function useTypedRole(reduced) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return undefined;
    const chars = Array.from(roles[roleIndex]);
    const speed = deleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!deleting) {
        setCount(count + 1);
        if (count + 1 === chars.length)
          setTimeout(() => setDeleting(true), 1500);
      } else {
        setCount(count - 1);
        if (count - 1 === 0) {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [count, deleting, roleIndex, reduced]);

  return reduced
    ? roles[0]
    : Array.from(roles[roleIndex]).slice(0, count).join("");
}

function Hero() {
  const reduced = usePrefersReducedMotion();
  const text = useTypedRole(reduced);
  const rootRef = useRef(null);
  // 0 -> 1 while the hero scrolls out of view. Read every frame by the 3D camera.
  const progressRef = useRef({ value: 0 });

  // GSAP: entrance timeline + scroll-linked fade. (All other sections use Framer Motion.)
  useLayoutEffect(() => {
    if (reduced) return undefined;
    const progress = progressRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.8,
        defaults: { ease: "power3.out" },
      });
      tl.from(".hero-tag", { y: 24, opacity: 0, duration: 0.6 })
        .from(
          ".hero-name .line > span",
          { yPercent: 115, duration: 1, stagger: 0.12 },
          "-=0.3",
        )
        .from(
          ".hero-role, .hero-buttons, .hero-left .social-links",
          { y: 28, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.6",
        )
        .from(
          ".hero-stats > div",
          { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        );

      gsap.to(".hero-stage", {
        opacity: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            progress.value = self.progress;
          },
        },
      });

      gsap.to(".hero-left", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => {
      ctx.revert();
      progress.value = 0;
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section id="home" className="hero" ref={rootRef}>
      <Hero3D progressRef={progressRef} />

      <div className="hero-left">
        <p className="hero-tag">
          <span className="status-dot" aria-hidden="true"></span>
          Available for opportunities
        </p>

        <h1 className="hero-name">
          <span className="line">
            <span>Papun</span>
          </span>
          <span className="line">
            <span className="highlight">Samal</span>
          </span>
        </h1>

        <p className="hero-role">
          <span className="sr-only">
            MERN Stack Developer, Full Stack Developer, Problem Solver
          </span>
          <span aria-hidden="true">
            {text}
            {!reduced && <span className="cursor">|</span>}
          </span>
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">
            → View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
          <a href="/resume.pdf" download className="btn-secondary">
            ⬇ Resume
          </a>
        </div>

        <SocialLinks />

        <div className="hero-stats">
          <div>
            <h2>
              <Counter target={1} />
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
              <Counter target={50} />
            </h2>
            <p>DSA PROBLEMS</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
