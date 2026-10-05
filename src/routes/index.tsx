import { createFileRoute } from "@tanstack/react-router";
import { Hero, Stats, Ticker } from "@/components/site/Hero";
import {
  Clients,
  Contact,
  Faq,
  Gallery,
  Process,
  Properties,
  Services,
  Testimonials,
  WhyUs,
} from "@/components/site/Sections";

const title = "PanditRealEstate — Trusted Property Consultants in Delhi-NCR";
const description =
  "Buy, sell, rent or invest in verified properties across Delhi, Noida and Gurugram with PanditRealEstate's 18 expert services.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Stats />
      <Ticker />
      <Services />
      <WhyUs />
      <Properties />
      <Process />
      <Gallery />
      <Testimonials />
      <Clients />
      <Faq />
      <Contact />
    </>
  );
}
