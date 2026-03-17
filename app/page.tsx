import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import ProblemSection from "@/components/ProblemSection";
import GroundSurvey from "@/components/GroundSurvey";
import SolutionSection from "@/components/SolutionSection";
import WhyChalo from "@/components/WhyChalo";
import ForDrivers from "@/components/ForDrivers";
import FutureVision from "@/components/FutureVision";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StorySection />
      <ProblemSection />
      <GroundSurvey />
      <SolutionSection />
      <WhyChalo />
      <ForDrivers />
      <FutureVision />
      <CTASection />
      <Footer />
    </main>
  );
}
