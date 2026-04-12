import heroImage from "@/assets/hero-portrait.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-grid bg-radial-accent flex items-center overflow-hidden">
      {/* Decorative concentric circles */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.06]">
        <div className="absolute inset-0 rounded-full border border-foreground" />
        <div className="absolute inset-8 rounded-full border border-foreground" />
        <div className="absolute inset-16 rounded-full border border-foreground" />
        <div className="absolute inset-24 rounded-full border border-foreground" />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 pt-24">
        <div className="flex flex-col">
          <h1 className="font-display font-black uppercase text-massive text-foreground leading-none">
            BUILT FOR
          </h1>
          <div className="flex items-end gap-6 flex-wrap">
            <h1 className="font-display font-black uppercase text-massive text-foreground leading-none">
              CURIOSITY
            </h1>
            <div className="hidden lg:block mb-3 w-[240px] h-[310px] rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={heroImage}
                alt="Miad portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
