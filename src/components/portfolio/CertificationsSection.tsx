import { motion, AnimatePresence } from 'motion/react';
import { BadgeCheck, Cloud, Database, Shield, ExternalLink } from 'lucide-react';
import SectionBackground from '@/components/SectionBackground';
import { useState } from 'react';

const CERTS = [
  {
    title: 'Microsoft Azure Cloud Fundamentals',
    issuer: 'Microsoft Learn',
    icon: Cloud,
    color: '#0ea5e9',
    description: 'Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.',
    verifyUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/SarthakRajvanshi-1178/9YPVY5XU?sharingId=3B9D2BB8A2A095B0',
  },
  {
    title: 'Azure Architecture and Services',
    issuer: 'Microsoft Learn',
    icon: BadgeCheck,
    color: '#06b6d4',
    description: 'Deep dive into Azure architecture, core services, security, privacy, compliance, and trust.',
    verifyUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/SarthakRajvanshi-1178/3AJFS5YH?sharingId=3B9D2BB8A2A095B0',
  },
  {
    title: 'Introduction to MongoDB (For Students)',
    issuer: 'MongoDB University',
    icon: Database,
    color: '#10b981',
    description: 'Completed official MongoDB student course covering data modeling, CRUD operations, and aggregation pipelines.',
    verifyUrl: 'https://learn.mongodb.com/c/PBeP35cHSey5a1HmFoAe1Q',
  },
  {
    title: 'C++ Essentials 2',
    issuer: 'Cisco Networking Academy',
    icon: BadgeCheck,
    color: '#34d399',
    description: 'Verified completion of C++ Essentials 2 course — advanced C++ syntax, object-oriented programming, data types, and standard library implementation.',
    verifyUrl: 'https://www.credly.com/badges/a52566a0-2c5f-450d-a5e3-3c1f9bec29be',
  },
  {
    title: 'Network Security Fundamentals',
    issuer: 'Palo Alto Networks Cybersecurity Academy',
    icon: Shield,
    color: '#f97316',
    description: 'Completed Palo Alto Networks Cybersecurity Academy course on network security principles, threat prevention, and firewall fundamentals.',
    verifyUrl: '/certificates/paloalto_rotated.pdf',
  },
];

export default function CertificationsSection() {
  const [showToast, setShowToast] = useState(false);

  const handleCertClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hasSeenToast = localStorage.getItem('cert-toast-seen');
    if (!hasSeenToast) {
      e.preventDefault();
      setShowToast(true);
      localStorage.setItem('cert-toast-seen', 'true');
      
      const timer = setTimeout(() => {
        setShowToast(false);
        setTimeout(() => {
          window.open(e.currentTarget.href, '_blank');
        }, 300);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  };

  return (
    <section
      id="certifications"
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0d1526 100%)' }}
    >
      <SectionBackground variant="meteor-shower" opacity={0.75} />
      
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
              💡 If the certificate doesn't open, try disabling ad blockers or browser extensions.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Orb */}
      <div
        className="absolute top-1/2 right-0 w-80 h-80 -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium tracking-widest uppercase" style={{ color: '#06b6d4', fontFamily: 'var(--font-sans)' }}>
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2" style={{ fontFamily: 'var(--font-heading)', color: '#f1f5f9' }}>
            Certifications
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CERTS.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="rounded-2xl p-6 flex gap-5 items-start transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: `1px solid ${cert.color}20`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${cert.color}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}20`;
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                    boxShadow: `0 0 15px ${cert.color}20`,
                  }}
                >
                  <Icon size={22} style={{ color: cert.color }} />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1" style={{ color: '#f1f5f9', fontFamily: 'var(--font-heading)' }}>
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold mb-2" style={{ color: cert.color, fontFamily: 'var(--font-sans)' }}>
                    {cert.issuer}
                  </p>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)' }}>
                    {cert.description}
                  </p>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCertClick}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group/link"
                    style={{ color: cert.color, fontFamily: 'var(--font-sans)' }}
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
