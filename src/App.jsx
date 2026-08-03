import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUpRight, Menu, X, Star, ArrowUp, Github, Linkedin, Bot, Mail,
  Code2, Palette, Layout as LayoutIcon, ExternalLink,
} from 'lucide-react';
import mebg from '../mebg.png';
import financeBg from '../finance.png';
import transBg from '../trans.png';
import objectBg from '../object.png';
import aboutBg from '../about.png';
import geminiGridBg from '../Gemini_Generated_Image_4pn3y44pn3y44pn3.png';
import geminiCardBg from '../Gemini_Generated_Image_vdflvvvdflvvvdfl.png';
import geminiDetailsBg from '../Gemini_Generated_Image_l5f699l5f699l5f6.png';
import mufLogo from '../Muf.svg.jpeg';
import mlBg from '../ml.png';
/* ==================================================================
   DATA — replace with your own content
================================================================== */
const NAME = 'Muhammad Umar Farooq';
const NAV = ['Home', 'About', 'Projects', 'Blog', 'Contact'];

// Real profile links
const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/mumar-farooq', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-umar-farooq-6964a430b/', label: 'LinkedIn' },
  { icon: Bot, href: 'https://huggingface.co/UMAR798', label: 'Hugging Face' },
  { icon: Mail, href: 'mailto:umarfaroqi6969@gmail.com', label: 'Email' },
];

const PROJECTS = [
  {
    tag: 'AI Finance Advisor',
    title: 'An intelligent financial assistant that provides personalized insights and smart budgeting recommendations.',
    bg: '#FBE7E6',
    img: financeBg,
    href: 'https://huggingface.co/spaces/UMAR798/AI_FINANCE_ADVISOR'
  },
  {
    tag: 'AI Translator',
    title: 'A multilingual translation system that delivers fast and accurate communication across languages.',
    bg: '#E4EFEA',
    img: transBg,
    href: 'https://huggingface.co/spaces/UMAR798/AI_translator'
  },
  {
    tag: 'AI OBJECT DETECTION AND TRACKING',
    title: 'A real-time computer vision system that detects and tracks objects with high accuracy.',
    bg: '#EAE7F7',
    img: objectBg,
    href: 'https://huggingface.co/spaces/UMAR798/oBJECT_DETECTION'
  },
  {
    tag: 'Stock Price Predictor',
    title: 'A machine learning model that forecasts future stock prices from historical market data.',
    bg: '#DCEEFB',
    img: mlBg,
    href: 'https://huggingface.co/spaces/UMAR798/Stock_Price_Predictor'
  },
];

const SKILLS = [
  { name: 'HTML', level: 95 },
  { name: 'CSS', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'Bootstrap', level: 92 },
  { name: 'Python', level: 80 },
  { name: 'Machine Learning', level: 80 },
  { name: 'Web Development', level: 80 }
];

const SERVICES = [
  { icon: Palette, title: 'Machine Learning', desc: 'Building intelligent models that learn from data and make accurate predictions.' },
  { icon: LayoutIcon, title: 'Web Development', desc: 'Creating responsive and user-friendly web applications.' },
  { icon: Code2, title: 'Artificial Intelligence', desc: 'Developing cutting-edge AI solutions for complex problems.' },
];

const TIMELINE = [
  { year: '2026', role: 'Machine Learning Engineer', place: 'Fly RANK AI' },
  { year: '2025', role: 'Artificial Intelligence Engineer', place: 'CODE GURU, FREELANCING' },
  { year: '2024', role: 'Frontend Developer', place: 'RED STAR' },
];

const BLOG = [
  { title: 'Developed machine learning models to solve real-world problems through data-driven predictions.', date: 'Jun 2026', img: geminiGridBg },
  { title: 'Explored Artificial Intelligence by creating smart applications powered by modern AI technologies.', date: 'Apr 2025', img: geminiCardBg },
  { title: 'Built responsive, modern, and user-friendly web applications using HTML, CSS, JavaScript, and React.', date: 'Aug 2024', img: geminiDetailsBg },
];

const STATS = [
  { label: 'Projects', value: 20, suffix: '+' },
  { label: 'Years Experience', value: 3, suffix: '+' },
];

/* ==================================================================
   HOOKS
================================================================== */

// Reveal-on-scroll (fade + slide up)
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 24, style = {}, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }} {...rest}>
      {children}
    </div>
  );
}

// Count-up number, starts when visible
function useCountUp(target, visible, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return value;
}

// Scroll progress (0–100)
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

/* ==================================================================
   SHARED BITS
================================================================== */
const T = {
  bg: '#DCE6E4',
  card: '#EFF5F3',
  heroBg: '#E8F1EE',
  accent: '#0F766E',
  ink: '#111827',
  slate: '#6B7280',
  line: '#E5E7EB',
};

const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, justifyContent: 'center' }}>
    <span style={{ width: 22, height: 2, background: T.accent }} />
    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', color: T.accent }}>
      {children}
    </span>
    <span style={{ width: 22, height: 2, background: T.accent }} />
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3.6vw, 36px)',
    color: T.ink, margin: '0 0 44px', textAlign: 'center',
  }}>{children}</h2>
);

const GradientButton = ({ children, ...props }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: 'none', cursor: 'pointer', color: '#fff', borderRadius: 999,
        padding: '14px 26px', fontFamily: "'Inter', sans-serif", fontSize: 14.5, fontWeight: 600,
        backgroundImage: `linear-gradient(90deg, ${T.ink}, ${T.accent}, ${T.ink})`,
        backgroundSize: '200% 100%',
        backgroundPosition: hover ? '100% 0' : '0 0',
        transition: 'background-position 0.5s ease',
        ...props.style,
      }}
    >
      {children}
    </button>
  );
};

/* ==================================================================
   HEADER
================================================================== */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
      background: scrolled ? 'rgba(239,245,243,0.7)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${T.line}` : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <nav style={{
        maxWidth: 1180, margin: '0 auto', padding: '18px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 28px rgba(15,23,42,0.12)', overflow: 'hidden',
          }}>
            <img src={mufLogo} alt="MUF logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: T.ink }}>
            {NAME}
          </span>
        </a>

        <ul className="hh-navlinks" style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} style={{
                color: T.ink, textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                fontSize: 14.5, fontWeight: 500,
              }}>{item}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hh-navlinks" style={{
          display: 'flex', alignItems: 'center', gap: 8, background: T.ink, color: '#fff',
          borderRadius: 999, padding: '10px 20px', fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 600, textDecoration: 'none',
        }}>Let's Talk</a>

        <button onClick={() => setMenuOpen((m) => !m)} className="hh-menubtn" style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
        }} aria-label="menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="hh-mobile-menu" style={{ background: T.card, padding: '0 24px 20px' }}>
          {NAV.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '10px 0', color: T.ink, textDecoration: 'none',
              fontFamily: "'Inter', sans-serif", fontSize: 15,
            }}>{item}</a>
          ))}
        </div>
      )}
    </header>
  );
};

const SlidingText = ({ items, interval = 2500 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
     <div style={{ position: 'relative', height: 22, overflow: 'hidden' }}>
      <span
        key={index}
        className="hh-slide-text"
        style={{
          position: 'absolute', left: 0, top: 0,
          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13.5,
          color: '#fff', whiteSpace: 'nowrap',
        }}
      >
        {items[index]}
      </span>
    </div>
  );
};

/* ==================================================================
   HERO
================================================================== */
const Hero = () => (
  <section id="home" style={{
    position: 'relative', background: T.heroBg, padding: '140px clamp(20px,5vw,64px) 90px', overflow: 'hidden',
  }}>
    <style>{`
      @keyframes slideTextIn {
        0%   { transform: translateY(120%); opacity: 0; }
        15%  { transform: translateY(0);    opacity: 1; }
        85%  { transform: translateY(0);    opacity: 1; }
        100% { transform: translateY(-120%); opacity: 0; }
      }
      .hh-slide-text {
        animation: slideTextIn 2.5s ease-in-out;
      }
    `}</style>

    {/* drifting blurred circles */}
    <div style={{
      position: 'absolute', width: 320, height: 320, borderRadius: '50%',
      background: T.accent, opacity: 0.18, filter: 'blur(60px)', top: -80, left: -80,
      animation: 'drift1 14s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute', width: 260, height: 260, borderRadius: '50%',
      background: '#F59E0B', opacity: 0.12, filter: 'blur(60px)', bottom: -60, right: 40,
      animation: 'drift2 18s ease-in-out infinite',
    }} />

    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <div style={{
        background: '#fff', borderRadius: 30, border: `1px solid ${T.line}`, boxShadow: '0 30px 80px rgba(15,23,42,0.08)', overflow: 'hidden',
        padding: '46px',
      }}>
        <div className="hh-hero-grid" style={{
          position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
          gap: 32, alignItems: 'center',
        }}>
      {/* Left: copy, slides in from left + fades */}
      <div className="hh-slide-in-left">
        <h1 className="hh-hero-title" style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 6.5vw, 52px)',
          lineHeight: 1.15, margin: 0, color: T.ink,
        }}>
          Hey There,<br />I'm <span style={{ color: T.accent, marginLeft: 6 }}>M Umar Farooq</span>
        </h1>
        <p style={{
          marginTop: 14, fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 600, color: T.ink, opacity: 0.8,
        }}>Artificial Intelligence &amp; Front-End Developer</p>
        <p style={{
          marginTop: 16, maxWidth: 420, color: T.slate, fontFamily: "'Inter', sans-serif",
          fontSize: 15.5, lineHeight: 1.75,
        }}>
          I develop and build clean, considered digital products — from the first
          wireframe to the last pixel of production code.
        </p>
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 30,
          background: T.ink, color: '#fff', borderRadius: 999, padding: '14px 22px',
          fontFamily: "'Inter', sans-serif", fontSize: 14.5, fontWeight: 600, textDecoration: 'none',
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: '50%', background: T.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><ArrowUpRight size={15} color="#fff" /></span>
          Hire Me Now
        </a>
      </div>

      {/* Right: floating profile image with rotating geometric shape */}
      <div className="hh-photo-wrap" style={{
        position: 'relative', width: '100%', maxWidth: 380, minHeight: 320, aspectRatio: '3.5 / 4', margin: '0 0 0 auto',
      }}>
        <div style={{
          position: 'absolute', inset: '6% 12% 6% -8%', background: T.accent, zIndex: 1,
          clipPath: 'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
          animation: 'rotateShape 16s linear infinite', transformOrigin: 'center',
        }} />
        <div className="hh-float" style={{
          position: 'relative', width: '100%', height: '100%', borderRadius: 30, zIndex: 2,
          backgroundImage: `url(${mebg})`, backgroundSize: 'cover', backgroundPosition: 'center',
          boxShadow: '0 24px 48px rgba(15,23,42,0.12)',
        }} />

        <div style={{
          position: 'absolute', bottom: 18, left: 8, zIndex: 10,
          background: T.ink, padding: '8px 18px', borderRadius: 999,
          boxShadow: '0 10px 24px rgba(0,0,0,0.3)',
        }}>
          <SlidingText items={[
            'Front-End Developer',
            'AI Engineer',
            'Machine Learning Enthusiast',
            'Problem Solver',
          ]} />
        </div>
      </div>
        </div>
      </div>
    </div>

    {/* scroll indicator */}
    <div style={{
      position: 'relative', textAlign: 'center', marginTop: 60, fontFamily: "'Inter', sans-serif",
      fontSize: 12, color: T.slate, animation: 'bounce 2s ease-in-out infinite',
    }}>↓ Scroll</div>
  </section>
);

/* ==================================================================
   PORTFOLIO
================================================================== */
const ProjectCard = ({ project }) => {
  const [hover, setHover] = useState(false);
  return (
    <Reveal>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.tag} on Hugging Face`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'block',
          textDecoration: 'none',
          cursor: 'pointer',
          transform: hover ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hover ? '0 20px 40px rgba(0,0,0,0.12)' : '0 0 0 rgba(0,0,0,0)',
          borderRadius: 14,
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <div style={{
          position: 'relative',
          height: 220,
          backgroundImage: `url(${project.img || financeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#ffffff',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)',
          }} />

          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, opacity: hover ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: hover ? 'auto' : 'none',
          }}>
            <span style={{
              width: 40, height: 40, borderRadius: '50%', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><ExternalLink size={17} color={T.ink} /></span>
            <span style={{
              width: 40, height: 40, borderRadius: '50%', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Github size={17} color={T.ink} /></span>
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 600, color: T.accent,
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>
            <img src={mlBg} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
            {project.tag}
          </span>
          <h3 style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 17, color: T.ink,
            margin: '12px 0 0', lineHeight: 1.4,
          }}>{project.title}</h3>
        </div>
      </a>
    </Reveal>
  );
};

const Portfolio = () => (
  <section id="projects" style={{ background: '#fff', padding: '90px clamp(20px,5vw,64px)' }}>
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Reveal><Eyebrow>PORTFOLIO</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle>My Creative Works, Selected projects.</SectionTitle></Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {PROJECTS.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>
    </div>
  </section>
);

/* ==================================================================
   ABOUT
================================================================== */
const StatBlock = ({ stat }) => {
  const [ref, visible] = useReveal();
  const value = useCountUp(stat.value, visible);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 34, color: T.accent }}>
        {value}{stat.suffix}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: T.slate, marginTop: 4 }}>{stat.label}</div>
    </div>
  );
};

const About = () => (
  <section id="about" style={{ background: T.bg, padding: '90px clamp(20px,5vw,64px)' }}>
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <div style={{
        background: '#fff', borderRadius: 30, border: `1px solid ${T.line}`, boxShadow: '0 30px 80px rgba(15,23,42,0.08)', overflow: 'hidden',
        padding: '60px 45px',
      }}>
        <Reveal><Eyebrow>ABOUT ME</Eyebrow></Reveal>
        <div className="hh-hero-grid" style={{
          display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 48, alignItems: 'center',
        }}>
        <Reveal delay={0.05}>
          <div style={{
            position: 'relative',
            borderRadius: 16, aspectRatio: '3/4', backgroundImage: `url(${aboutBg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            border: `2px solid ${T.ink}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.16), rgba(0,0,0,0.04))',
            }} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.8, color: T.slate, marginBottom: 28,
          }}>
            I'm Muhammad Umar Farooq, a passionate Frontend Developer with a strong interest in Artificial Intelligence and Machine Learning. I enjoy building modern, responsive, and user-friendly applications.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {STATS.map((s) => <StatBlock key={s.label} stat={s} />)}
          </div>
        </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* Rest of file unchanged (Skills, Services, Timeline, Testimonials, Blog, Contact, Footer, ScrollProgressBar, BackToTop, App, export default App) */
export default App;
