import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import EducationSection from '@/components/portfolio/EducationSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import CodingProfilesSection from '@/components/portfolio/CodingProfilesSection';
import CertificationsSection from '@/components/portfolio/CertificationsSection';
import ContactSection from '@/components/portfolio/ContactSection';

export default function Portfolio() {
  return (
    <>
      <title>Sarthak Rajvanshi — Software Engineer & AI Builder</title>
      <meta
        name="description"
        content="Portfolio of Sarthak Rajvanshi — B.Tech CS & AI student, LeetCode Knight (2015), Codeforces Specialist (1440), and full-stack developer."
      />

      <CustomCursor />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <CodingProfilesSection />
        <CertificationsSection />
        <ContactSection />
      </main>
    </>
  );
}
