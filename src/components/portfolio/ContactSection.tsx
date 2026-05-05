import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Send, MapPin, Code2, ChefHat, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import SectionBackground from '@/components/SectionBackground';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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
          const target = e.currentTarget.hasAttribute('download') ? '_self' : '_blank';
          window.open(e.currentTarget.href, target);
        }, 300);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS environment variables are missing.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    setStatus('loading');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          time:         new Date().toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Asia/Kolkata',
          }),
          message:      form.message,
          reply_to:     form.email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f1f5f9',
    borderRadius: '12px',
    padding: '14px 16px',
    width: '100%',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  };

  const SOCIALS = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/sarthak867/', color: '#f1f5f9' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sarthakrajvanshi/', color: '#0ea5e9' },
    { icon: Mail, label: 'Email', href: 'mailto:sarthakrajvanshi124@gmail.com', color: '#06b6d4' },
    { icon: Code2, label: 'LeetCode', href: 'https://leetcode.com/u/Sarthakrajvanshi/', color: '#f59e0b' },
    { icon: ChefHat, label: 'CodeChef', href: 'https://www.codechef.com/users/sarthakraj_124', color: '#a78bfa' },
  ];

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
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl max-w-md cursor-pointer"
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
      
    <section
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: '#0f172a' }}
    >
      <SectionBackground variant="dna-helix" opacity={0.8} />
      {/* Orbs */}
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-0 right-1/4 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium tracking-widest uppercase" style={{ color: '#06b6d4', fontFamily: 'var(--font-sans)' }}>
            Get In Touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-2 gradient-text"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Let's Build Something
            <br />
            Together
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#f1f5f9', fontFamily: 'var(--font-heading)' }}>
              Open to Opportunities
            </h3>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
              I'm currently open to full-time roles, freelance projects, and exciting collaborations.
              Whether it's a startup idea or an enterprise solution — let's talk.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <MapPin size={16} style={{ color: '#06b6d4' }} />
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
                India · Available Remotely
              </span>
            </div>

            {/* Direct email */}
            <a
              href="mailto:sarthakrajvanshi124@gmail.com"
              className="flex items-center gap-3 mb-8 group"
            >
              <Mail size={16} style={{ color: '#06b6d4' }} />
              <span
                className="text-sm transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#06b6d4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                sarthakrajvanshi124@gmail.com
              </span>
            </a>

            {/* Resume buttons */}
            <div className="flex gap-3 mb-8">
              <a
                href="/data/Sarthak_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(6,182,212,0.35)',
                  color: '#06b6d4',
                  fontFamily: 'var(--font-sans)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(6,182,212,0.3)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.7)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.35)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                View Resume
              </a>
              <a
                href="/data/Sarthak_Resume.pdf"
                download="Sarthak_Rajvanshi_Resume.pdf"
                onClick={handleResumeClick}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'var(--font-sans)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.5)';
                  (e.currentTarget as HTMLElement).style.color = '#a78bfa';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(139,92,246,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download CV
              </a>
            </div>
            <p className="text-xs font-medium mb-3 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)' }}>Find me on</p>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${s.color}50`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${s.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                    aria-label={s.label}
                  >
                    <Icon size={18} style={{ color: s.color }} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl p-8 glass"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(6,182,212,0.5)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 15px rgba(6,182,212,0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(6,182,212,0.5)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 15px rgba(6,182,212,0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(6,182,212,0.5)';
                    (e.target as HTMLElement).style.boxShadow = '0 0 15px rgba(6,182,212,0.1)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{
                  background:
                    status === 'success'
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : status === 'error'
                      ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                      : 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  boxShadow:
                    status === 'success'
                      ? '0 0 30px rgba(16,185,129,0.3)'
                      : status === 'error'
                      ? '0 0 30px rgba(239,68,68,0.3)'
                      : '0 0 30px rgba(6,182,212,0.25)',
                  opacity: status === 'loading' ? 0.8 : 1,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                }}
                whileHover={status === 'loading' ? {} : { scale: 1.02 }}
                whileTap={status === 'loading' ? {} : { scale: 0.98 }}
              >
                {status === 'loading' && (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Loader size={16} />
                  </motion.div>
                )}
                {status === 'success' && <CheckCircle size={16} />}
                {status === 'error' && <AlertCircle size={16} />}
                {status === 'idle' && <Send size={16} />}
                {status === 'loading' && 'Sending...'}
                {status === 'success' && 'Message Sent!'}
                {status === 'error' && 'Failed — Try Again'}
                {status === 'idle' && 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.div
          className="text-center mt-20 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-sans)' }}>
            © 2026 Sarthak Rajvanshi · Designed & Built with passion
          </p>
        </motion.div>
      </div>
    </section>
    </>
  );
}
