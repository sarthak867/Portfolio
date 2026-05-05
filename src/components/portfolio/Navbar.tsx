import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Coding', href: '#coding-profiles' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hasSeenToast = localStorage.getItem('resume-toast-seen');
    if (!hasSeenToast) {
      e.preventDefault();
      setShowToast(true);
      localStorage.setItem('resume-toast-seen', 'true');
      
      const timer = setTimeout(() => {
        setShowToast(false);
        setTimeout(() => {
          window.open(e.currentTarget.href, '_blank');
        }, 300);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowToast(false)}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-4 rounded-xl shadow-2xl max-w-md cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.95), rgba(139,92,246,0.95))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <p className="text-sm font-semibold text-white text-center" style={{ fontFamily: 'var(--font-sans)' }}>
              💡 If the resume doesn't open, try disabling ad blockers or browser extensions.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(15,23,42,0.9)' : 'rgba(15,23,42,0.5)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.04 }}
        >
          {/* Premium SR monogram */}
          <div className="relative w-9 h-9">
            {/* Outer glow ring */}
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="logoGradFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              {/* Background hex shape */}
              <path
                d="M18 2 L32 10 L32 26 L18 34 L4 26 L4 10 Z"
                fill="url(#logoGradFill)"
                stroke="url(#logoGrad)"
                strokeWidth="1.2"
              />
              {/* SR letters */}
              <text
                x="18"
                y="23"
                fontSize="13"
                fontWeight="700"
                fontFamily="'Space Grotesk', sans-serif"
                fill="url(#logoGrad)"
                letterSpacing="-0.5"
                textAnchor="middle"
              >SR</text>
            </svg>
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: '0 0 18px rgba(6,182,212,0.45)', borderRadius: '6px' }}
            />
          </div>
          {/* Name text */}
          <div className="hidden sm:flex flex-col leading-none">
            <span
              className="text-sm font-bold tracking-wide"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Sarthak
            </span>
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}
            >
              Rajvanshi
            </span>
          </div>
        </motion.a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive ? '#06b6d4' : 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                      boxShadow: '0 0 8px rgba(6,182,212,0.6)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/data/Sarthak_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeClick}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: 'transparent',
              border: '1px solid rgba(139,92,246,0.4)',
              color: '#a78bfa',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(139,92,246,0.25)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.7)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.4)';
            }}
          >
            Resume
          </a>
          <a
            href="mailto:sarthakrajvanshi124@gmail.com"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
              border: '1px solid rgba(6,182,212,0.4)',
              color: '#06b6d4',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(6,182,212,0.3)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.4)';
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-0.5 bg-cyan-400 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span className="block w-6 h-0.5 bg-cyan-400 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 bg-cyan-400 transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-4 flex flex-col gap-2"
          style={{ background: 'rgba(15,23,42,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left py-2 text-sm font-medium"
              style={{ color: active === link.href.slice(1) ? '#06b6d4' : 'rgba(255,255,255,0.7)' }}
            >
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
    </>
  );
}
