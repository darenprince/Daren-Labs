import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FounderSection from "@/components/FounderSection";
import ExecutiveOverview from "@/components/ExecutiveOverview";
import PortfolioSection from "@/components/PortfolioSection";
import FrameworksSection from "@/components/FrameworksSection";
import StatusSection from "@/components/StatusSection";
import ValuationSection from "@/components/ValuationSection";
import EthicsSection from "@/components/EthicsSection";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <FounderSection />
        <ExecutiveOverview />
        <PortfolioSection />
        <FrameworksSection />
        <StatusSection />
        <ValuationSection />
        <EthicsSection />
      </main>
      <Footer />
    </div>
  );
}
