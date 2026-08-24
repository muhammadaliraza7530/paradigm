import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/architecture.jpg", alt: "Luxury modern villa built by Paradigm" },
  { src: "/showcase/house-12.jpg", alt: "Contemporary residence delivered by Paradigm" },
  { src: "/images/industrial.jpg", alt: "Industrial steel structure project" },
  { src: "/showcase/house-2.jpg", alt: "Modern home exterior at dusk" },
];


export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          className={`absolute inset-0 size-full object-cover animate-slow-drift transition-opacity duration-[1600ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

    </div>
  );
}
