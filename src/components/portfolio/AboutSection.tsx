import { motion } from 'motion/react';
import SectionBackground from '@/components/SectionBackground';

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const STATS = [
  { value: '2+', label: 'Years Coding' },
  { value: '4+', label: 'Projects Built' },
  { value: '500+', label: 'Problems Solved' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden" style={{ background: '#0f172a' }}>
      <SectionBackground variant="orbiting-dots" opacity={0.75} />
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium tracking-widest uppercase" style={{ color: '#06b6d4', fontFamily: 'var(--font-sans)' }}>
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: 'var(--font-heading)', color: '#f1f5f9' }}>
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-sans)' }}>
              I'm <span style={{ color: '#06b6d4', fontWeight: 600 }}>Sarthak Rajvanshi</span>, a B.Tech student in
              Computer Science & AI at GL Bajaj Institute of Technology, Greater Noida (CGPA: 8.0). I'm passionate about
              building intelligent systems and solving complex problems at the intersection of AI and software engineering.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-sans)' }}>
              As a competitive programmer, I've sharpened my algorithmic thinking across LeetCode, Codeforces, and CodeChef —
              achieving <span style={{ color: '#f59e0b', fontWeight: 600 }}>LeetCode Knight (2015)</span> and{' '}
              <span style={{ color: '#8b5cf6', fontWeight: 600 }}>Codeforces Specialist (1440)</span> with 500+ problems solved.
            </p>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-sans)' }}>
              I build full-stack and mobile applications using React Native, FastAPI, Flask, and MongoDB. I'm also
              certified in <span style={{ color: '#06b6d4', fontWeight: 600 }}>Microsoft Azure Fundamentals</span> and
              love exploring the latest in AI research and open-source development.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    className="text-3xl font-bold gradient-text"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            {/* Rotating ring */}
            <div
              className="absolute w-72 h-72 rounded-full animate-spin-slow"
              style={{
                border: '1px solid rgba(6,182,212,0.15)',
                borderTopColor: 'rgba(6,182,212,0.5)',
              }}
            />
            <div
              className="absolute w-56 h-56 rounded-full"
              style={{
                border: '1px solid rgba(139,92,246,0.15)',
                borderBottomColor: 'rgba(139,92,246,0.5)',
                animation: 'spin-slow 15s linear infinite reverse',
              }}
            />

            {/* Code card */}
            <div
              className="relative w-64 rounded-2xl p-6 glass"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}
            >
              <div className="flex gap-1.5 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)' }}>
                <span style={{ color: '#8b5cf6' }}>const</span>{' '}
                <span style={{ color: '#06b6d4' }}>sarthak</span> = {'{'}
              </div>
              <div className="pl-4 mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <div><span style={{ color: '#f1f5f9' }}>role</span>: <span style={{ color: '#a3e635' }}>"Engineer"</span>,</div>
                <div><span style={{ color: '#f1f5f9' }}>passion</span>: <span style={{ color: '#a3e635' }}>"AI & DSA"</span>,</div>
                <div><span style={{ color: '#f1f5f9' }}>stack</span>: <span style={{ color: '#a3e635' }}>"Full-Stack"</span>,</div>
                <div><span style={{ color: '#f1f5f9' }}>coffee</span>: <span style={{ color: '#fb923c' }}>Infinity</span>,</div>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)' }}>{'}'}</div>
              <div className="mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <span style={{ color: '#8b5cf6' }}>// always</span> learning
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(6,182,212,0.15)',
                border: '1px solid rgba(6,182,212,0.3)',
                color: '#06b6d4',
                fontFamily: 'var(--font-sans)',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              AI Builder
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.3)',
                color: '#8b5cf6',
                fontFamily: 'var(--font-sans)',
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.5 }}
            >
              Competitive Coder
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
