import { motion } from 'motion/react';
import { ExternalLink, Github, Smartphone, Bot, Search, MapPin } from 'lucide-react';
import SectionBackground from '@/components/SectionBackground';

const PROJECTS = [
  {
    title: 'CrowdCourier',
    subtitle: 'Peer-to-Peer Parcel Delivery App',
    date: 'Feb 2026 – Mar 2026',
    description:
      'Mobile-first parcel delivery platform connecting senders with travelers acting as couriers. Features trip listings, delivery requests, and a real-time price negotiation system.',
    bullets: [
      'Built mobile-first UI with Expo & TypeScript for seamless cross-platform experience.',
      'Implemented trip listings, delivery requests, and price negotiation system.',
      'Developed scalable FastAPI backend with MongoDB and secure authentication.',
    ],
    stack: ['Expo', 'TypeScript', 'FastAPI', 'MongoDB'],
    icon: Smartphone,
    color: '#06b6d4',
    featured: true,
    github: 'https://github.com/sarthak867/Crowd_Currier',
    demo: null,
  },
  {
    title: 'Location Bound Exam Portal',
    subtitle: 'Geofenced Exam Management System',
    date: 'Mar 2026 – Apr 2026',
    description:
      'A location-bound exam management system where students can only start exams within a geofenced radius set by the teacher.',
    bullets: [
      'Teachers create exams with GPS-based geofence (lat/lng + radius) restrictions.',
      'Students can only access exams when physically inside the allowed location.',
      'Auto-submits exam on timeout; Teacher & Super Admin panels for results and management.',
    ],
    stack: ['FastAPI', 'SQLAlchemy', 'SQLite', 'HTML', 'Tailwind CSS', 'JavaScript'],
    icon: MapPin,
    color: '#f59e0b',
    featured: false,
    github: 'https://github.com/sarthak867/Location_bound_exam',
    demo: null,
  },
  {
    title: 'Hybrid AI Assistant',
    subtitle: 'Offline + Online LLM',
    date: 'May 2025 – Jun 2025',
    description:
      'Hybrid LLM-based AI assistant integrating offline models (Ollama) with cloud APIs (Gemini). Auto-switches between offline and online models for high availability.',
    bullets: [
      'Integrated Ollama (offline) with Gemini API (online) with automatic fallback.',
      'Designed RESTful APIs using Flask for seamless frontend-backend communication.',
      'Managed conversation history and context with MongoDB.',
    ],
    stack: ['Python', 'Flask', 'MongoDB', 'Ollama', 'Gemini API'],
    icon: Bot,
    color: '#8b5cf6',
    featured: false,
    github: 'https://github.com/sarthak867/Hybrid-AI',
    demo: null,
  },
  {
    title: 'Lost Sync',
    subtitle: 'Lost & Found Web Portal',
    date: 'Apr 2025 – May 2025',
    description:
      'Web platform for reporting and claiming lost or found items with OTP-based authentication, admin approval workflows, and a full admin dashboard.',
    bullets: [
      'Implemented user auth flow with OTP simulation and admin approval.',
      'Built admin dashboard for managing users, item reports, and claims.',
      'Developed with vanilla stack — HTML, CSS, JS, PHP, MySQL.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    icon: Search,
    color: '#10b981',
    featured: false,
    github: 'https://github.com/sarthak867/miniprojectsarthak',
    demo: null,
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const Icon = project.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative rounded-2xl p-7 flex flex-col h-full transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.07)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${project.color}40`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.color}15, 0 20px 60px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Icon + date row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
            }}
          >
            <Icon size={22} style={{ color: project.color }} />
          </div>
          {project.featured && (
            <div
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: `${project.color}20`,
                border: `1px solid ${project.color}40`,
                color: project.color,
                fontFamily: 'var(--font-sans)',
              }}
            >
              Latest
            </div>
          )}
        </div>
        <span
          className="text-xs font-medium mt-1"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)' }}
        >
          {project.date}
        </span>
      </div>

      <h3
        className="text-xl font-bold mb-1"
        style={{ color: '#f1f5f9', fontFamily: 'var(--font-heading)' }}
      >
        {project.title}
      </h3>
      <p
        className="text-xs font-medium mb-3"
        style={{ color: project.color, fontFamily: 'var(--font-sans)' }}
      >
        {project.subtitle}
      </p>

      {/* Bullet points */}
      <ul className="flex-1 mb-5 flex flex-col gap-2">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: project.color }}
            />
            <span
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-md text-xs font-medium"
            style={{
              background: `${project.color}10`,
              border: `1px solid ${project.color}25`,
              color: project.color,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
            (e.currentTarget as HTMLElement).style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
          }}
        >
          <Github size={14} />
          View Code
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}35`,
              color: project.color,
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${project.color}25`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${project.color}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${project.color}15`;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden" style={{ background: '#0f172a' }}>
      <SectionBackground variant="wave-lines" opacity={0.8} />
      {/* Background orbs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
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
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: 'var(--font-heading)', color: '#f1f5f9' }}>
            Featured Projects
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}>
            A selection of projects that showcase my skills in AI, full-stack development, and problem-solving.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured card spans 2 columns on lg */}
          <div className="lg:col-span-2">
            <ProjectCard project={PROJECTS[0]} index={0} />
          </div>
          <ProjectCard project={PROJECTS[1]} index={1} />
          <ProjectCard project={PROJECTS[2]} index={2} />
          <ProjectCard project={PROJECTS[3]} index={3} />
        </div>
      </div>
    </section>
  );
}
