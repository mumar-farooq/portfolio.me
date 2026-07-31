import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUpRight, Menu, X, Star, ArrowUp, Github, Linkedin, Twitter,
  Instagram, Code2, Palette, Layout as LayoutIcon, ExternalLink,
} from 'lucide-react';

/* ==================================================================
   DATA — replace with your own content
================================================================== */
const NAME = 'Muhammad Umar Farooq';
const NAV = ['Home', 'About', 'Projects', 'Blog', 'Contact'];

const PROJECTS = [
  { tag: 'AI Finance Advisor', title: 'A fintech dashboard redesign focused on clarity.', bg: '#FBE7E6' },
  { tag: 'AI  Translator', title: 'Visual identity for a boutique coffee roaster.', bg: '#E4EFEA' },
  { tag:'AI OBJECT DETECTION AND TRACKING', title: 'Marketing site for an early-stage SaaS product.', bg: '#EAE7F7' },
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
  { icon: Palette, title: 'Machine Learning', desc: 'Interfaces that feel obvious the first time you see them.' },
  { icon: LayoutIcon, title: 'Web Development', desc: 'Marketing sites and landing pages built to convert.' },
  { icon: Code2, title: 'Artificial Intelligence', desc: 'Clean, maintainable front-end and full-stack builds.' },
];

const TIMELINE = [
  { year: '2026', role: 'Machine Learning Engineer', place: 'Planetaria' },
  { year: '2025', role: 'Artificial Intelligence Engineer', place: 'Studio Nine' },
  { year: '2024', role: 'Frontend Developer', place: 'Freelance' },
];

const BLOG = [
  { title: 'Developed machine learning models to solve real-world problems through data-driven predictions.', date: 'Jun 2026' },
  { title: 'Explored Artificial Intelligence by creating smart applications powered by modern AI technologies.', date: 'Apr 2025' },
  { title: 'Built responsive, modern, and user-friendly web applications using HTML, CSS, JavaScript, and React.', date: 'Aug 2024' },
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
        <div style={{
          width: 34, height: 34, borderRadius: 8, background: T.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16,
        }}>{NAME[0]}.</div>

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
        <div className="hh-menubtn" style={{ background: T.card, padding: '0 24px 20px' }}>
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

/* ==================================================================
   HERO
================================================================== */
const Hero = () => (
  <section id="home" style={{
    position: 'relative', backgroundImage: 'url("mebg")', padding: '140px clamp(20px,5vw,64px) 90px', overflow: 'hidden',
  }}>
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

    <div className="hh-hero-grid" style={{
      position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
      gap: 32, alignItems: 'center', maxWidth: 1180, margin: '0 auto',
    }}>
      {/* Left: copy, slides in from left + fades */}
      <div className="hh-slide-in-left">
        <h1 style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(34px, 5vw, 52px)',
          lineHeight: 1.12, margin: 0, color: T.ink,
        }}>
          Hey There,<br />I'm <span style={{ color: T.accent }}>  M UMAR FAROOQ</span>
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
        position: 'relative', width: '100%', maxWidth: 380, aspectRatio: '3.5 / 4', margin: '0 0 0 auto',
      }}>
        <div style={{
          position: 'absolute', inset: '6% 12% 6% -8%', background: T.accent,
          clipPath: 'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
          animation: 'rotateShape 16s linear infinite', transformOrigin: 'center',
        }} />
        <div className="hh-float" style={{
          position: 'absolute', inset: '0% -6% 10% 14%', border: `2px solid ${T.ink}`,
          background: 'linear-gradient(160deg, #14958A, #0B5C53)',
          boxShadow: '0 0 60px rgba(15,118,110,0.35)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden',
        }}>
          <svg viewBox="0 0 200 220" width="78%" style={{ display: 'block' }}>
            <circle cx="100" cy="70" r="42" fill="#E9D8C6" />
            <path d="M40 220 C40 150 70 120 100 120 C130 120 160 150 160 220 Z" fill="#E9D8C6" />
          </svg>
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
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: 'pointer',
          transform: hover ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hover ? '0 20px 40px rgba(0,0,0,0.12)' : '0 0 0 rgba(0,0,0,0)',
          borderRadius: 14,
        }}
      >
        <div style={{
          position: 'relative', backgroundImage: 'url("finance")', borderRadius: 12, padding: 20,
          marginBottom: 16, aspectRatio: '4 / 3', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '90%', backgroundImage: 'url("trans.png")', borderRadius: 8, padding: '10px 14px',
            boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
            transform: hover ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.3s ease',
          }}>
            <div style={{ height: 6, width: '40%', background: '#E5E7EB', borderRadius: 3, marginBottom: 8 }} />
            <div style={{ height: 6, width: '70%', background: '#E5E7EB', borderRadius: 3 }} />
          </div>

          {/* action buttons revealed on hover */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, background: 'rgba(17,24,39,0.35)',
            opacity: hover ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: hover ? 'auto' : 'none',
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
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 600, color: T.accent,
          textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>{project.tag}</span>
        <h3 style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 17, color: T.ink,
          margin: '6px 0 0', lineHeight: 1.4,
        }}>{project.title}</h3>
      </div>
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
  <section id="about" style={{ backgroundImage: 'url("about.png")', padding: '90px clamp(20px,5vw,64px)' }}>
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Reveal><Eyebrow>ABOUT ME</Eyebrow></Reveal>
      <div className="hh-hero-grid" style={{
        display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 48, alignItems: 'center',
      }}>
        <Reveal delay={0.05}>
          <div style={{
            borderRadius: 16, aspectRatio: '3/4', background: `linear-gradient(160deg, #14958A, #0B5C53)`,
            border: `2px solid ${T.ink}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden',
          }}>
            <svg viewBox="0 0 200 220" width="70%"><circle cx="100" cy="70" r="42" fill="#E9D8C6" />
              <path d="M40 220 C40 150 70 120 100 120 C130 120 160 150 160 220 Z" fill="#E9D8C6" /></svg>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.8, color: T.slate, marginBottom: 28,
          }}>
            I'm Muhammad Umar Farooq, a passionate Frontend Developer with a strong interest in Artificial Intelligence and Machine Learning. I enjoy building modern, responsive, and user-friendly web applications while exploring intelligent technologies that solve real-world problems. I'm always learning new skills, creating innovative projects, and staying up to date with the latest trends in web development, AI, and machine learning.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {STATS.map((s) => <StatBlock key={s.label} stat={s} />)}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ==================================================================
   SKILLS
================================================================== */
const SkillBar = ({ skill, index }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: T.ink, fontWeight: 500 }}>{skill.name}</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: T.accent, fontWeight: 600 }}>{skill.level}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: T.line, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${T.accent}, #14958A)`,
          width: visible ? `${skill.level}%` : '0%', transition: `width 1.1s ease ${index * 0.12}s`,
        }} />
      </div>
    </div>
  );
};

const Skills = () => (
  <section style={{ background: '#fff', padding: '90px clamp(20px,5vw,64px)' }}>
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Reveal><Eyebrow>MY SKILLS</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle>What I bring to the table</SectionTitle></Reveal>
      {SKILLS.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
    </div>
  </section>
);

/* ==================================================================
   SERVICES
================================================================== */
const Services = () => (
  <section style={{ background: T.card, padding: '90px clamp(20px,5vw,64px)' }}>
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Reveal><Eyebrow>SERVICES</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle>How I can help</SectionTitle></Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 24 }}>
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 0.08}>
              <div style={{
                background: '#fff', borderRadius: 14, padding: 30, height: '100%',
                border: `1px solid ${T.line}`,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 10, background: T.heroBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
                }}>
                  <Icon size={22} color={T.accent} />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 18, color: T.ink, margin: '0 0 8px' }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: T.slate, lineHeight: 1.7, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ==================================================================
   TIMELINE
================================================================== */
const Timeline = () => (
  <section style={{ background: '#fff', padding: '90px clamp(20px,5vw,64px)' }}>
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Reveal><Eyebrow>EXPERIENCE</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle>Experience timeline</SectionTitle></Reveal>
      <div style={{ position: 'relative', paddingLeft: 28 }}>
        <div style={{ position: 'absolute', left: 6, top: 6, bottom: 6, width: 2, background: T.line }} />
        {TIMELINE.map((t, i) => (
          <Reveal key={t.year} delay={i * 0.15} style={{ position: 'relative', marginBottom: 36 }}>
            <span style={{
              position: 'absolute', left: -28, top: 4, width: 14, height: 14, borderRadius: '50%',
              background: T.accent, border: '3px solid #fff', boxShadow: `0 0 0 2px ${T.accent}`,
            }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: T.accent }}>{t.year}</span>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 18, color: T.ink, margin: '4px 0 2px' }}>{t.role}</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: T.slate, margin: 0 }}>{t.place}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ==================================================================
   TESTIMONIALS
================================================================== */
const Testimonials = () => (
  <section style={{ background: T.heroBg, padding: '90px clamp(20px,5vw,64px)' }}>
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <Reveal><Eyebrow>TESTIMONIALS</Eyebrow></Reveal>
      <Reveal delay={0.08}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '40px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
            ))}
          </div>
          <p style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 19, color: T.ink,
            lineHeight: 1.6, margin: '0 0 20px',
          }}>
            "Great work, delivered on time, and communicated clearly at every step."
          </p>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: T.slate }}> A happy client</span>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ==================================================================
   BLOG
================================================================== */
const Blog = () => (
  <section id="blog" style={{ background: '#fff', padding: '90px clamp(20px,5vw,64px)' }}>
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Reveal><Eyebrow>LATEST BLOG</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle>From the journal</SectionTitle></Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 24, backgroundImage: 'url("Gemini_Generated_Image_4pn3y44pn3y44pn3.png")' }}>
        {BLOG.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08}>
            <div style={{ border: `1px solid ${T.line}`, borderRadius: 14, overflow: 'hidden', height: '100%', backgroundImage: 'url("Gemini_Generated_Image_vdflvvvdflvvvdfl.png")' }}>
              <div style={{ aspectRatio: '16/10', background: T.card }} />
              <div style={{ padding: 20, backgroundImage: 'url("Gemini_Generated_Image_l5f699l5f699l5f6.png")' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: T.accent, fontWeight: 600 }}>{b.date}</span>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16.5, color: T.ink, margin: '6px 0 0', lineHeight: 1.4 }}>
                  {b.title}
                </h3>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ==================================================================
   CONTACT
================================================================== */
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleChange = useCallback((field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value })), []);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  const inputStyle = {
    width: '100%', background: '#fff', border: `1px solid ${T.line}`, color: T.ink,
    padding: '14px 16px', fontFamily: "'Inter', sans-serif", fontSize: 15,
    outline: 'none', boxSizing: 'border-box', borderRadius: 10,
  };

  return (
    <section id="contact" style={{ background: T.card, padding: '90px clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <Reveal><Eyebrow>CONTACT ME</Eyebrow></Reveal>
        <Reveal delay={0.05}><SectionTitle>Let's work together</SectionTitle></Reveal>
        {sent ? (
          <p style={{ fontFamily: "'Inter', sans-serif", color: T.accent, fontWeight: 600 }}>
            Message received — I'll get back to you shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
            <input placeholder="Name" style={inputStyle} value={form.name} onChange={handleChange('name')} required />
            <input type="email" placeholder="Email" style={inputStyle} value={form.email} onChange={handleChange('email')} required />
            <textarea placeholder="Message" rows={5} style={inputStyle} value={form.message} onChange={handleChange('message')} required />
            <GradientButton type="submit" style={{ width: 'fit-content' }}>Send Message</GradientButton>
          </form>
        )}
      </div>
    </section>
  );
};

/* ==================================================================
   FOOTER
================================================================== */
const Footer = () => (
  <footer style={{ background: T.ink, padding: '48px clamp(20px,5vw,64px) 28px' }}>
    <div style={{
      maxWidth: 1180, margin: '0 auto', display: 'flex', flexWrap: 'wrap',
      justifyContent: 'space-between', gap: 24, alignItems: 'center', marginBottom: 28,
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 8, background: T.accent, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontWeight: 700,
      }}>{NAME[0]}.</div>

      <ul style={{ display: 'flex', gap: 26, listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' }}>
        {NAV.map((item) => (
          <li key={item}><a href={`#${item.toLowerCase()}`} style={{ color: '#D1D5DB', textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontSize: 14 }}>{item}</a></li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: 16 }}>
        {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
          <a key={i} href="#" style={{ color: '#D1D5DB' }}><Icon size={18} /></a>
        ))}
      </div>
    </div>
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, textAlign: 'center' }}>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9CA3AF' }}>
        © {new Date().getFullYear()} UMAR. All rights reserved.
      </span>
    </div>
  </footer>
);

/* ==================================================================
   SCROLL PROGRESS BAR + BACK TO TOP
================================================================== */
const ScrollProgressBar = () => {
  const progress = useScrollProgress();
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 3, zIndex: 200, background: 'transparent' }}>
      <div style={{ height: '100%', width: `${progress}%`, background: T.accent, transition: 'width 0.1s linear' }} />
    </div>
  );
};

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 200,
        width: 46, height: 46, borderRadius: '50%', border: 'none', cursor: 'pointer',
        background: T.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: show ? 'auto' : 'none', transition: 'all 0.3s ease',
        boxShadow: '0 10px 24px rgba(0,0,0,0.2)',
      }}
    >
      <ArrowUp size={19} />
    </button>
  );
};

/* ==================================================================
   APP
================================================================== */
const App = () => (
  <div style={{ background: T.bg, minHeight: '100vh' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
      * { box-sizing: border-box; }
      body { margin: 0; }

      @keyframes floatY {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-14px); }
      }
      .hh-float { animation: floatY 5s ease-in-out infinite; }

      @keyframes rotateShape {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes drift1 {
        0%, 100% { transform: translate(0,0); }
        50% { transform: translate(30px, 20px); }
      }
      @keyframes drift2 {
        0%, 100% { transform: translate(0,0); }
        50% { transform: translate(-20px, -25px); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); opacity: 0.6; }
        50% { transform: translateY(6px); opacity: 1; }
      }

      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-40px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .hh-slide-in-left { animation: slideInLeft 0.9s ease both; }

      .hh-menubtn { display: none; }
      @media (max-width: 860px) {
        .hh-navlinks { display: none !important; }
        .hh-menubtn { display: flex !important; }
        .hh-hero-grid { grid-template-columns: 1fr !important; }
        .hh-photo-wrap { margin: 40px auto 0 !important; }
      }
    `}</style>

    <ScrollProgressBar />
    <Header />
    <main>
      <Hero />
      <Portfolio />
      <About />
      <Skills />
      <Services />
      <Timeline />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
    <Footer />
    <BackToTop />
  </div>
);

export default App;
