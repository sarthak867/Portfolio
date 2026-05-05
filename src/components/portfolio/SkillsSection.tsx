import { motion } from 'motion/react';
import SectionBackground from '@/components/SectionBackground';

const SKILL_GROUPS = [
  {
    category: 'Languages',
    color: '#06b6d4',
    skills: [
      { name: 'C++ (Primary)', level: 92 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 80 },
    ],
  },
  {
    category: 'Frontend & Mobile',
    color: '#8b5cf6',
    skills: [
      { name: 'React Native (Expo)', level: 82 },
      { name: 'HTML & CSS', level: 88 },
      { name: 'TypeScript', level: 78 },
    ],
  },
  {
    category: 'Backend & Databases',
    color: '#10b981',
    skills: [
      { name: 'FastAPI / REST APIs', level: 83 },
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 75 },
    ],
  },
];

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-5"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: '#f1f5f9', fontFamily: 'var(--font-sans)' }}>
          {name}
        </span>
      </div>
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 10px ${color}60`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: 'easeOut' as const }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0d1526 100%)' }}
    >
      <SectionBackground variant="grid-pulse" opacity={0.8} />
      {/* Background orb */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
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
            Technical Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: 'var(--font-heading)', color: '#f1f5f9' }}>
            My Toolkit
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}>
            Technologies I use to bring ideas to life — from low-level algorithms to intelligent AI systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className="glass rounded-2xl p-7"
              style={{ borderColor: `${group.color}20` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: `linear-gradient(to bottom, ${group.color}, ${group.color}40)` }}
                />
                <h3 className="text-base font-semibold" style={{ color: group.color, fontFamily: 'var(--font-heading)' }}>
                  {group.category}
                </h3>
              </div>
              {group.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} color={group.color} index={si} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Floating skill chips */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {['Flask', 'Git & GitHub', 'VS Code', 'Microsoft Azure', 'Data Structures', 'OOP', 'Ollama', 'Gemini API'].map((chip, i) => (
            <motion.span
              key={chip}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-sans)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 + 0.5 }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(6,182,212,0.4)',
                color: '#06b6d4',
              }}
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
