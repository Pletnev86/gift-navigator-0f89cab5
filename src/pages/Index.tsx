import HeroSection from "@/components/landing/HeroSection";
import ProductSection from "@/components/landing/ProductSection";
import HRSection from "@/components/landing/HRSection";
import TradeMarketingSection from "@/components/landing/TradeMarketingSection";
import TradeUnionsSection from "@/components/landing/TradeUnionsSection";
import CalendarSection from "@/components/landing/CalendarSection";
import CJMSection from "@/components/landing/CJMSection";
import FooterCTA from "@/components/landing/FooterCTA";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <ProductSection />
      <HRSection />
      <TradeMarketingSection />
      <TradeUnionsSection />
      <CalendarSection />
      <CJMSection />
      <FooterCTA />
    </main>
  );
};

export default Index;
