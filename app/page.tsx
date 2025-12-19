import HeroSection from "@/components/landing/HeroSection";
import FeatureCarousel from "@/components/landing/FeatureCarousel";
import FeaturedEventsSection from "@/components/landing/FeaturedEventsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeatureCarousel />
      <FeaturedEventsSection />

      {/* Call to Action Footer */}
      <section className=" text-primary-foreground text-white py-16">
        <div className="container px-4 md:px-6 text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to create your next event?</h2>
          <p className="max-w-[600px] text-white mx-auto text-primary-foreground/80 text-lg">
            Join thousands of event organizers who use AI to save time and create unforgettable experiences.
          </p>
        </div>
      </section>
    </main>
  );
}
