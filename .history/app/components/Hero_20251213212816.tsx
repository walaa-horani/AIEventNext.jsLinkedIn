import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
          <div className="absolute  -z-10">
    <div className="absolute left-[-20%] top-[-20%] w-[600px] h-[600px] bg-purple-600/30 blur-[180px]" />
    <div className="absolute right-[-20%] bottom-[-20%] w-[600px] h-[600px] bg-pink-600/30 blur-[180px]" />
  </div>
      {/* Background gradients */}
      <div className="absolute  -z-10">
        <div className="absolute left-[-20%] top-[-20%] h-[600px] w-[600px] rounded-full bg-purple-600/30 blur-[180px]" />
        <div className="absolute right-[-20%] bottom-[-20%] h-[600px] w-[600px] rounded-full bg-pink-600/30 blur-[180px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div>
       

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Discover & <br />
            create amazing{" "}
            <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              events
            </span>
            
          </h1>

          <p className="mt-6 text-white/60 max-w-md">
            Whether you're hosting or attending, Spott makes every event
            memorable. Join our community today.
          </p>

          <div className="mt-8">
            <Button >
              Get Started
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="relative w-[280px] md:w-[340px]">
            <Image
              src="/hero.png"
              alt="Event App Preview"
              width={400}
              height={800}
              className="relative z-10"
              priority
            />

            {/* Glow behind phone */}
            <div className="absolute inset-0 rounded-full bg-red-500/40 blur-[120px] -z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}
