import { Hero } from "@/components/home/Hero";
import { FeaturedTours } from "@/components/sections/FeaturedTours";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Credentials } from "@/components/sections/Credentials";
import { Faqs } from "@/components/sections/Faqs";
import { QuoteCta } from "@/components/sections/QuoteCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedTours />
      <ServicesSection waveInto="canvas" />
      <WhyUs waveInto="ocean" />
      <HowItWorks waveInto="sand-mist" />
      <Credentials waveInto="canvas" />
      <Faqs waveInto="ink" />
      <QuoteCta />
    </>
  );
}
