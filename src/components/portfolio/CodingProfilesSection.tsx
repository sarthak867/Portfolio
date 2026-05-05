import { motion } from 'motion/react';
import SectionBackground from '@/components/SectionBackground';

const PROFILES = [
  {
    name: 'LeetCode',
    handle: 'sarthak867',
    url: 'https://leetcode.com/u/Sarthakrajvanshi/',
    badge: 'Knight',
    badgeColor: '#f59e0b',
    rating: '2015',
    ratingLabel: 'Max Rating',
    stat1: { label: 'Rank', value: 'Knight 🏅' },
    stat2: { label: 'Problems', value: '350+' },
    color: '#f59e0b',
    bgGlow: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: 'Codeforces',
    handle: 'sarthak867',
    url: 'https://codeforces.com/profile/sarthakrajvanshi124',
    badge: 'Specialist',
    badgeColor: '#06b6d4',
    rating: '1440',
    ratingLabel: 'Max Rating',
    stat1: { label: 'Rank', value: 'Specialist' },
    stat2: { label: 'Contests', value: '5+' },
    color: '#06b6d4',
    bgGlow: 'rgba(6,182,212,0.08)',
    borderColor: 'rgba(6,182,212,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V15c0-.828.672-1.5 1.5-1.5h3z" />
      </svg>
    ),
  },
  {
    name: 'CodeChef',
    handle: 'sarthak867',
    url: 'https://www.codechef.com/users/sarthakraj_124',
    badge: '1★',
    badgeColor: '#8b5cf6',
    rating: '1150+',
    ratingLabel: 'Max Rating',
    stat1: { label: 'Stars', value: '1 ★' },
    stat2: { label: 'Problems', value: '500+' },
    color: '#8b5cf6',
    bgGlow: 'rgba(139,92,246,0.08)',
    borderColor: 'rgba(139,92,246,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M11.257.004C5.23-.109.104 4.784.003 10.811c-.055 3.226 1.317 6.127 3.503 8.146.467.43.96.832 1.49 1.186.386 2.008 1.16 3.857 2.253 3.857.603 0 1.167-.468 1.67-1.229a12.374 12.374 0 0 0 2.334.22c.803 0 1.58-.077 2.332-.22.503.761 1.067 1.229 1.67 1.229 1.093 0 1.867-1.849 2.253-3.857a12.74 12.74 0 0 0 1.49-1.186c2.186-2.019 3.558-4.92 3.503-8.146C21.9 4.784 16.774-.109 10.747.004h.51zm.003 1.5c5.247-.1 9.57 4.07 9.663 9.317.05 2.83-1.155 5.376-3.09 7.163-.1.092-.202.181-.306.268-.47-1.302-1.12-2.31-1.87-2.31-.47 0-.92.296-1.34.784a10.87 10.87 0 0 1-2.064.194 10.87 10.87 0 0 1-2.063-.194c-.42-.488-.87-.784-1.34-.784-.75 0-1.4 1.008-1.87 2.31a10.24 10.24 0 0 1-.306-.268C4.73 16.197 3.525 13.65 3.575 10.82 3.668 5.574 7.99 1.404 13.237 1.504h-1.977z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    handle: 'sarthak867',
    url: 'https://github.com/sarthak867',
    badge: 'Open Source',
    badgeColor: '#10b981',
    rating: '25+',
    ratingLabel: 'Total Stars',
    stat1: { label: 'Public Repos', value: '10+' },
    stat2: { label: 'Commits', value: '900+' },
    color: '#10b981',
    bgGlow: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function CodingProfilesSection() {
  return (
    <section
      id="coding-profiles"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1526 0%, #0f172a 100%)' }}
    >
      <SectionBackground variant="grid-pulse" opacity={0.6} />

      {/* Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: '#06b6d4',
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Competitive Programming
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Coding Profiles
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}
          >
            Active on competitive programming platforms — solving problems, climbing ranks.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROFILES.map((profile, i) => (
            <motion.a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative flex flex-col gap-5 p-6 rounded-2xl cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${profile.bgGlow}, rgba(255,255,255,0.02))`,
                border: `1px solid ${profile.borderColor}`,
                backdropFilter: 'blur(12px)',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${profile.bgGlow.replace('0.08', '0.25')}`;
                (e.currentTarget as HTMLElement).style.borderColor = profile.color + '66';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = profile.borderColor;
              }}
            >
              {/* Top row: icon + badge */}
              <div className="flex items-start justify-between">
                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: `rgba(${profile.color === '#f59e0b' ? '245,158,11' : profile.color === '#06b6d4' ? '6,182,212' : profile.color === '#8b5cf6' ? '139,92,246' : '16,185,129'},0.12)`,
                    color: profile.color,
                  }}
                >
                  {profile.icon}
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${profile.color}18`,
                    color: profile.color,
                    border: `1px solid ${profile.color}33`,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {profile.badge}
                </span>
              </div>

              {/* Platform name + handle */}
              <div>
                <h3
                  className="text-lg font-bold mb-0.5"
                  style={{ fontFamily: 'var(--font-heading)', color: '#fff' }}
                >
                  {profile.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)' }}
                >
                  @{profile.handle}
                </p>
              </div>

              {/* Rating highlight */}
              <div
                className="rounded-xl px-4 py-3 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-heading)', color: profile.color }}
                >
                  {profile.rating}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)' }}
                >
                  {profile.ratingLabel}
                </div>
              </div>

              {/* Stats row */}
              <div className="flex justify-between text-sm">
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)', fontSize: '11px' }}>
                    {profile.stat1.label}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    {profile.stat1.value}
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)', fontSize: '11px' }}>
                    {profile.stat2.label}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    {profile.stat2.value}
                  </div>
                </div>
              </div>

              {/* Visit arrow */}
              <div
                className="flex items-center gap-1.5 text-xs font-medium mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: profile.color, fontFamily: 'var(--font-sans)' }}
              >
                <span>View Profile</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
