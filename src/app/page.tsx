
import HeroSection from '@/components/Home/HeroSection';
import AboutSection from '@/components/Home/AboutSection';
import ProjectsShowcase from '@/components/Home/ProjectsShowcase';
import ServicesSection from '@/components/Home/ServicesSection';
import ContactSection from '@/components/Home/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsShowcase />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
