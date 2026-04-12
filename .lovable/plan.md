

## Make the Portfolio More Compact

The current layout has generous padding (`py-32`, `py-24`) and large gaps between text elements. Here's the plan to tighten everything up:

### Changes

**1. HeroSection.tsx** — Reduce top padding from `pt-32` to `pt-24`

**2. AboutSection.tsx** — Reduce section padding from `py-32` to `py-20`, tighten gap between heading and body text (`mt-12` → `mt-6`)

**3. PersonalitySection.tsx** — Reduce lime block padding from `py-32` to `py-20`, anime section from `py-24` to `py-16`, and internal spacing (`mt-12` → `mt-6`, `gap-16` → `gap-10`, `mb-8` → `mb-5`, `mt-8` → `mt-5`)

**4. ContactSection.tsx** — Reduce padding from `py-32` to `py-20`, tighten internal gaps (`mt-16` → `mt-10`, `mt-6` → `mt-4`)

**5. index.css** — Slightly reduce `.text-massive` size from `clamp(4rem, 12vw, 10rem)` to `clamp(3.5rem, 10vw, 8rem)` and `.text-hero-sub` from `clamp(2rem, 5vw, 4.5rem)` to `clamp(1.75rem, 4vw, 3.5rem)` to bring words closer together

**6. HeroSection.tsx** — Reduce gap between "BUILT FOR" and "CURIOSITY" lines, and shrink the portrait image slightly

This will make the entire page feel tighter and more cohesive while preserving the cinematic aesthetic.

