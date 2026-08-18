import { Hero } from "@/components/home/Hero";
import { FeaturedTours } from "@/components/sections/FeaturedTours";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
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
      <Testimonials waveInto="canvas" />
      <Faqs waveInto="ink" />
      <QuoteCta />
    </>
  );
}
