import { motion } from 'motion/react';
import { GraduationCap, School } from 'lucide-react';
import SectionBackground from '@/components/SectionBackground';

const EDUCATION = [
{
  degree: 'B.Tech — Computer Science & Artificial Intelligence',
  institution: 'GL Bajaj Institute of Technology and Management',
  location: 'Greater Noida, Uttar Pradesh',
  period: '2023 – 2027',
  grade: 'CGPA: 8.0 / 10',
  icon: GraduationCap,
  color: '#8b5cf6',
  highlights: [
  'Specialization in Artificial Intelligence & Machine Learning',
  'Active competitive programmer — LeetCode Knight (2015), Codeforces Specialist (1440)',
  'Built multiple full-stack and mobile projects during coursework']

},
{
  degree: 'Class XII — Science (PCM)',
  institution: 'CBSE Board',
  location: 'Muzaffarnagar, Uttar Pradesh',
  period: '2022 – 2023',
  grade: 'Total: 91% | PCM: 93%',
  icon: School,
  color: '#06b6d4',
  highlights: [
  'Physics, Chemistry, Mathematics (PCM)',
  'Strong foundation in analytical thinking and problem-solving']

}];


export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#0d1526' }}>

      <SectionBackground variant="floating-rings" opacity={0.6} />
      {/* Orb */}
      <div
        className="absolute bottom-0 left-1/4 w-96 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />


      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          
           <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: '#06b6d4', fontFamily: 'var(--font-sans)' }}>Foundation


            </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-2"
            style={{ fontFamily: 'var(--font-heading)', color: '#f1f5f9' }}>

            Education
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-8">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, rgba(139,92,246,0.4) 0%, rgba(6,182,212,0.4) 100%)' }} />


          {EDUCATION.map((edu, i) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative md:pl-20">

                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-6 w-12 h-12 rounded-xl items-center justify-center hidden md:flex"
                  style={{
                    background: `${edu.color}15`,
                    border: `1px solid ${edu.color}40`,
                    boxShadow: `0 0 20px ${edu.color}20`
                  }}>

                  <Icon size={20} style={{ color: edu.color }} />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.01, y: -3 }}
                  className="rounded-2xl p-7 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: `1px solid ${edu.color}20`
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}50`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 35px ${edu.color}12`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}20`;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}>

                  {/* Mobile icon */}
                  <div className="flex items-center gap-3 mb-1 md:hidden">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}30` }}>

                      <Icon size={16} style={{ color: edu.color }} />
                    </div>
                  </div>

                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3
                        className="text-lg font-bold leading-snug"
                        style={{ color: '#f1f5f9', fontFamily: 'var(--font-heading)' }}>

                        {edu.degree}
                      </h3>
                      <p
                        className="text-sm font-semibold mt-0.5"
                        style={{ color: edu.color, fontFamily: 'var(--font-sans)' }}>

                        {edu.institution}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-sans)' }}>

                        {edu.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: `${edu.color}15`,
                          border: `1px solid ${edu.color}35`,
                          color: edu.color,
                          fontFamily: 'var(--font-sans)'
                        }}>

                        {edu.period}
                      </span>
                      <span
                        className="text-xs font-medium"
                        style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>

                        {edu.grade}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="flex flex-col gap-2 mt-4">
                    {edu.highlights.map((h, j) =>
                    <li key={j} className="flex items-start gap-2">
                        <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: edu.color }} />

                        <span
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>

                          {h}
                        </span>
                      </li>
                    )}
                  </ul>
                </motion.div>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

}