

import FeaturedProjects from '@/components/Home/FeaturedProjects';
import HeroSection from '@/components/Home/HeroSection';
import AboutSection from '@/components/Home/AboutSection';
import ServicesSection from '@/components/Home/ServicesSection';
import ContactSection from '@/components/Home/ContactSection';


export default function HomePage() {
  return (
    <>
      <section><HeroSection /></section>
      <section><AboutSection /></section>
      <section><FeaturedProjects /></section>
      <section><ServicesSection /></section>
      <section><ContactSection /></section>
    </>
  );
}
