import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Trophy, Target, Code2 } from 'lucide-react';
import SectionBackground from '@/components/SectionBackground';

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    color: '#f59e0b',
    value: 2015,
    suffix: '',
    label: 'LeetCode Knight',
    sublabel: 'Rating: 2015',
    description: 'Solved 500+ DSA problems. Achieved Knight badge through consistent algorithmic mastery.',
    link: 'https://leetcode.com/u/Sarthakrajvanshi/',
  },
  {
    icon: Code2,
    color: '#8b5cf6',
    value: 1440,
    suffix: '',
    label: 'Codeforces Specialist',
    sublabel: 'Rating: 1440',
    description: 'Earned Specialist rank through consistent participation and high performance in rated contests.',
    link: 'https://codeforces.com/profile/sarthakrajvanshi124',
  },
  {
    icon: Target,
    color: '#06b6d4',
    value: 500,
    suffix: '+',
    label: 'Problems Solved',
    sublabel: 'Across all platforms',
    description: 'Solved 500+ DSA problems in C++ across LeetCode, Codeforces, and CodeChef.',
    link: 'https://github.com/sarthak867/',
  },
];

function AchievementCard({ achievement, index, started }: {
  achievement: typeof ACHIEVEMENTS[0];
  index: number;
  started: boolean;
}) {
  const Icon = achievement.icon;
  const count = useCountUp(achievement.value, 2000, started);
  const displayValue = `${count}${achievement.suffix}`;

  return (
    <motion.a
      href={achievement.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="relative rounded-2xl p-8 text-center overflow-hidden transition-all duration-300 block"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${achievement.color}20`,
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${achievement.color}50`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${achievement.color}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${achievement.color}20`;
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${achievement.color}08 0%, transparent 60%)`,
        }}
      />

      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{
          background: `${achievement.color}15`,
          border: `1px solid ${achievement.color}30`,
          boxShadow: `0 0 20px ${achievement.color}20`,
        }}
      >
        <Icon size={24} style={{ color: achievement.color }} />
      </div>

      <div
        className="text-5xl font-bold mb-2"
        style={{
          color: achievement.color,
          fontFamily: 'var(--font-heading)',
          textShadow: `0 0 30px ${achievement.color}50`,
        }}
      >
        {displayValue}
      </div>

      <div className="text-lg font-semibold mb-1" style={{ color: '#f1f5f9', fontFamily: 'var(--font-heading)' }}>
        {achievement.label}
      </div>
      <div className="text-sm font-medium mb-3" style={{ color: achievement.color, fontFamily: 'var(--font-sans)' }}>
        {achievement.sublabel}
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)' }}>
        {achievement.description}
      </p>
    </motion.a>
  );
}

export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="achievements"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1526 0%, #0f172a 100%)' }}
    >
      <SectionBackground variant="hex-dots" opacity={0.8} />
      {/* Orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
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
            Competitive Programming
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: 'var(--font-heading)', color: '#f1f5f9' }}>
            Achievements
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}>
            Numbers that reflect dedication, consistency, and a relentless drive to improve.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={a.label} achievement={a} index={i} started={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
