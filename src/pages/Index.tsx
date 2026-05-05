import HeroSection from "@/components/landing/HeroSection";
import ProductSection from "@/components/landing/ProductSection";
import HRSection from "@/components/landing/HRSection";
import TradeUnionsSection from "@/components/landing/TradeUnionsSection";
import PlatformSection from "@/components/landing/PlatformSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CalendarSection from "@/components/landing/CalendarSection";
import BirthdayExampleSection from "@/components/landing/BirthdayExampleSection";
import TradeMarketingSection from "@/components/landing/TradeMarketingSection";
import InfoCalendarSection from "@/components/landing/InfoCalendarSection";
import NewYearExampleSection from "@/components/landing/NewYearExampleSection";
import SeasonSection from "@/components/landing/SeasonSection";
import SchoolExampleSection from "@/components/landing/SchoolExampleSection";
import FooterCTA from "@/components/landing/FooterCTA";
import PromoPopup from "@/components/landing/promo/PromoPopup";
import SiteHeader from "@/components/landing/SiteHeader";
import UpsellSection from "@/components/landing/UpsellSection";
import HolidayShowcaseSection from "@/components/landing/HolidayShowcaseSection";

const Index = () => {
  return (
    <>
    <SiteHeader />
    <main className="min-h-screen overflow-x-hidden bg-background pt-14">
      <HeroSection />
      <ProductSection />
      <HolidayShowcaseSection />
      <InfoCalendarSection />
      <HRSection />
      <TradeUnionsSection />
      <UpsellSection />
      <CalendarSection />
      <PlatformSection />
      <HowItWorksSection />
      <BirthdayExampleSection />
      <TradeMarketingSection />
      <NewYearExampleSection />
      <SeasonSection />
      <SchoolExampleSection />
      <FooterCTA />
      <PromoPopup />
    </main>
    </>
  );
};

export default Index;
