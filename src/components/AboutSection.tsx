import CinematicSection, { WordReveal, PhaseAnimate, GradientShimmer } from "@/components/CinematicSection";

const AboutSection = () => {
  return (
    <CinematicSection id="about" scrollMultiplier={2.2} className="bg-grid">
      {(progress) => (
        <div className="h-full flex items-center relative">
          {/* Cinematic divider at top */}
          <div className="absolute top-0 left-0 right-0 cinematic-divider" />

          {/* Film grain */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none film-grain" />

          <div className="px-6 md:px-16 max-w-5xl mx-auto w-full">
            <PhaseAnimate progress={progress}>
              <span
                className="font-body text-xs uppercase tracking-[0.3em] text-primary/60 block mb-6"
                style={{
                  opacity: progress > 0.2 ? 1 : progress / 0.2,
                  transition: "none",
                }}
              >
                About Me
              </span>

              <GradientShimmer progress={progress} startAt={0.45} endAt={0.7}>
                <p className="font-display uppercase font-bold text-foreground leading-tight" style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                  letterSpacing: "-0.01em",
                }}>
                  <WordReveal
                    text="I'm Miad — from Mymensingh, Bangladesh. Currently studying Computer Science & Engineering at Daffodil International University."
                    progress={progress}
                    startAt={0.2}
                    endAt={0.5}
                    highlightClass="text-primary"
                  />
                </p>
              </GradientShimmer>

              <p className="mt-6 font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                <WordReveal
                  text="I build things with AI just for fun — like I'm experimenting with ideas in my own little world, trying to turn curiosity into creations."
                  progress={progress}
                  startAt={0.35}
                  endAt={0.58}
                />
              </p>
            </PhaseAnimate>
          </div>
        </div>
      )}
    </CinematicSection>
  );
};

export default AboutSection;
