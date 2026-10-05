import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatusStrip from "@/components/StatusStrip";
import WorkList from "@/components/WorkList";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TechStack from "@/components/TechStack";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatusStrip />
      <WorkList />
      <About />
      <ExperienceTimeline />
      <TechStack />
      <Terminal />
      <Contact />
      <Footer />
    </main>
  );
}
