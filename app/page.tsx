import dynamic from "next/dynamic";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Footer } from "@/components/Footer";
import { ScrollFadeSection } from "@/components/ScrollFadeSection";

const ReviewsCarousel = dynamic(() =>
  import("@/components/ReviewsCarousel").then((m) => ({ default: m.ReviewsCarousel }))
);
const Gallery = dynamic(() =>
  import("@/components/Gallery").then((m) => ({ default: m.Gallery }))
);
const Team = dynamic(() =>
  import("@/components/Team").then((m) => ({ default: m.Team }))
);
const Process = dynamic(() =>
  import("@/components/Process").then((m) => ({ default: m.Process }))
);
const Contact = dynamic(() =>
  import("@/components/Contact").then((m) => ({ default: m.Contact }))
);
const MapEmbed = dynamic(() =>
  import("@/components/MapEmbed").then((m) => ({ default: m.MapEmbed }))
);

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <ScrollFadeSection>
          <Highlights />
        </ScrollFadeSection>
        <ScrollFadeSection>
          <Services />
        </ScrollFadeSection>
        <ScrollFadeSection>
          <WhyChooseUs />
        </ScrollFadeSection>
        <ScrollFadeSection>
          <ReviewsCarousel />
        </ScrollFadeSection>
        <ScrollFadeSection>
          <Gallery />
        </ScrollFadeSection>
        <ScrollFadeSection>
          <Team />
        </ScrollFadeSection>
        <ScrollFadeSection>
          <Process />
        </ScrollFadeSection>
        <ScrollFadeSection>
          <Contact />
        </ScrollFadeSection>
        <ScrollFadeSection>
          <MapEmbed />
        </ScrollFadeSection>
      </main>
      <ScrollFadeSection>
        <Footer />
      </ScrollFadeSection>
    </>
  );
}
