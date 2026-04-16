import HeroSection from "@/components/landing/HeroSection";
import ProductSection from "@/components/landing/ProductSection";
import HRSection from "@/components/landing/HRSection";
import TradeUnionsSection from "@/components/landing/TradeUnionsSection";
import PlatformSection from "@/components/landing/PlatformSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CalendarSection from "@/components/landing/CalendarSection";
import BirthdayExampleSection from "@/components/landing/BirthdayExampleSection";
import TradeMarketingSection from "@/components/landing/TradeMarketingSection";
import NewYearExampleSection from "@/components/landing/NewYearExampleSection";
import SeasonSection from "@/components/landing/SeasonSection";
import SchoolExampleSection from "@/components/landing/SchoolExampleSection";
import FooterCTA from "@/components/landing/FooterCTA";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <HeroSection />
      <ProductSection />
      <HRSection />
      <TradeUnionsSection />
      <PlatformSection />
      <HowItWorksSection />
      <CalendarSection />
      <BirthdayExampleSection />
      <TradeMarketingSection />
      <NewYearExampleSection />
      <SeasonSection />
      <SchoolExampleSection />
      <FooterCTA />
    </main>
  );
};

export default Index;
