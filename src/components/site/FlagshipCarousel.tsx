import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flagshipProjects, type FlagshipProject } from "@/data/site";
import { Section, SectionHeading } from "./ui";

const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_DURATION = 0.6;
const EASE = [0.22, 1, 0.36, 1];

interface CardTransforms {
  scale: number;
  rotateY: number;
  opacity: number;
  zIndex: number;
  x: number;
}

function getCardTransforms(
  index: number,
  activeIndex: number,
  totalCards: number,
  cardWidth: number,
  isMobile: boolean
): CardTransforms {
  const relativeIndex = ((index - activeIndex + totalCards) % totalCards) - Math.floor(totalCards / 2);

  if (isMobile) {
    // Mobile: center card + peeking sides
    if (relativeIndex === 0) {
      return { scale: 1, rotateY: 0, opacity: 1, zIndex: 50, x: 0 };
    } else if (relativeIndex === 1) {
      return { scale: 0.85, rotateY: 0, opacity: 0.6, zIndex: 40, x: cardWidth * 0.6 };
    } else if (relativeIndex === -1) {
      return { scale: 0.85, rotateY: 0, opacity: 0.6, zIndex: 40, x: -cardWidth * 0.6 };
    } else {
      return { scale: 0.75, rotateY: 0, opacity: 0, zIndex: 0, x: 0 };
    }
  }

  // Desktop: 5 visible cards with 3D coverflow
  switch (relativeIndex) {
    case 0:
      return { scale: 1, rotateY: 0, opacity: 1, zIndex: 50, x: 0 };
    case 1:
      return { scale: 0.88, rotateY: -18, opacity: 0.85, zIndex: 40, x: cardWidth * 0.4 };
    case -1:
      return { scale: 0.88, rotateY: 18, opacity: 0.85, zIndex: 40, x: -cardWidth * 0.4 };
    case 2:
      return { scale: 0.75, rotateY: -25, opacity: 0.6, zIndex: 30, x: cardWidth * 0.75 };
    case -2:
      return { scale: 0.75, rotateY: 25, opacity: 0.6, zIndex: 30, x: -cardWidth * 0.75 };
    default:
      return { scale: 0.6, rotateY: 0, opacity: 0, zIndex: 0, x: 0 };
  }
}

function StatusBadge({ status }: { status: FlagshipProject["status"] }) {
  if (status === "JUST LAUNCHED") {
    return (
      <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
      {status}
    </span>
  );
}

function CategoryBadge({ category }: { category: FlagshipProject["category"] }) {
  return (
    <span className="inline-block rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
      {category}
    </span>
  );
}

interface CarouselCardProps {
  project: FlagshipProject;
  isActive: boolean;
  transforms: CardTransforms;
  onClick: () => void;
  isMobile: boolean;
  reducedMotion: boolean;
}

function CarouselCard({
  project,
  isActive,
  transforms,
  onClick,
  isMobile,
  reducedMotion,
}: CarouselCardProps) {
  const cardWidth = isMobile ? 270 : 265;
  const cardHeight = isMobile ? 380 : 370;

  return (
    <motion.div
      className="relative shrink-0 cursor-pointer"
      style={{ width: cardWidth, height: cardHeight }}
      initial={false}
      animate={{
        scale: transforms.scale,
        rotateY: reducedMotion ? 0 : transforms.rotateY,
        opacity: transforms.opacity,
        zIndex: transforms.zIndex,
        x: transforms.x,
      }}
      transition={{
        duration: TRANSITION_DURATION,
        ease: EASE,
        rotateY: { type: "spring", stiffness: 300, damping: 30 },
      }}
      onClick={onClick}
      whileHover={
        !isMobile && isActive
          ? { scale: transforms.scale * 1.05, transition: { duration: 0.3 } }
          : undefined
      }
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(5,11,46,0.85) 100%)",
          }}
        />

        {/* Border */}
        <div
          className={`absolute inset-0 rounded-3xl pointer-events-none ${
            isActive
              ? "border-2 border-amber-600/80 shadow-lg shadow-amber-500/20"
              : "border border-white/20"
          }`}
          style={{
            boxShadow: isActive
              ? "0 0 40px rgba(217, 119, 6, 0.3), inset 0 0 40px rgba(217, 119, 6, 0.1)"
              : undefined,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
          {/* Top badges */}
          <div className="flex justify-between items-start">
            <StatusBadge status={project.status} />
            <CategoryBadge category={project.category} />
          </div>

          {/* Bottom content */}
          <div className="space-y-3">
            {/* Location */}
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="h-3 w-3" style={{ color: "#F0A81E" }} />
              <span className="text-xs">{project.location}</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl font-bold line-clamp-4">{project.title}</h3>

            {/* Price */}
            <p className="text-sm font-bold" style={{ color: "#F0A81E" }}>
              {project.price}
            </p>

            {/* Buttons - only for active card */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 pt-2"
              >
                <button
                  className="flex-1 h-11 rounded-full text-sm font-semibold transition-all hover:brightness-110"
                  style={{ backgroundColor: "#F0A81E", color: "#050B2E" }}
                >
                  View Details ↗
                </button>
                <button
                  className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center transition-all hover:bg-white/10"
                  aria-label="Add to comparison"
                >
                  <Plus className="h-5 w-5 text-white" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface FlagshipCarouselProps {
  projects?: FlagshipProject[];
}

export function FlagshipCarousel({ projects = flagshipProjects }: FlagshipCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef(false);
  const reducedMotion = useReducedMotion();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (reducedMotion || isInteractingRef.current) return;

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }, AUTOPLAY_INTERVAL);
    };

    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [projects.length, reducedMotion]);

  // Reset autoplay on interaction
  const resetAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    isInteractingRef.current = false;
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, AUTOPLAY_INTERVAL);
  };

  const handleInteractionStart = () => {
    isInteractingRef.current = true;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handleInteractionEnd = () => {
    if (!reducedMotion) {
      resetAutoplay();
    }
  };

  const goToSlide = (index: number) => {
    setActiveIndex(((index % projects.length) + projects.length) % projects.length);
    handleInteractionStart();
    setTimeout(handleInteractionEnd, 500);
  };

  const goNext = () => {
    goToSlide(activeIndex + 1);
  };

  const goPrev = () => {
    goToSlide(activeIndex - 1);
  };

  const cardWidth = isMobile ? 270 : 265;

  return (
    <Section
      tone="dark"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050B2E 0%, #0A1245 100%)",
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -right-32 top-1/2 transform -translate-y-1/2 w-96 h-96 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,168,30,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <div className="relative mb-16">
        <SectionHeading
          tone="dark"
          eyebrow="FLAGSHIP PROJECTS"
          title="Signature launches,"
          accent="hand-picked"
          sub="Our most sought-after, RERA-verified developments — swipe through the collection."
        />
      </div>

      {/* Carousel container */}
      <div
        className="relative mx-auto mb-12 flex justify-center"
        style={{ perspective: "1200px" }}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
      >
        {/* Cards track */}
        <div className="relative h-[420px] w-full flex items-center justify-center">
          <AnimatePresence mode="sync">
            {projects.map((project, index) => {
              const transforms = getCardTransforms(
                index,
                activeIndex,
                projects.length,
                cardWidth,
                isMobile
              );

              return (
                <CarouselCard
                  key={project.id}
                  project={project}
                  isActive={index === activeIndex}
                  transforms={transforms}
                  onClick={() => goToSlide(index)}
                  isMobile={isMobile}
                  reducedMotion={reducedMotion}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="relative flex justify-center items-center gap-4 mt-8">
        {/* Left arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center transition-all hover:border-amber-600"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to project ${index + 1}`}
              className="rounded-full transition-all"
              animate={{
                width: index === activeIndex ? 28 : 8,
                height: 8,
                backgroundColor: index === activeIndex ? "#F0A81E" : "#4A5580",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={goNext}
          aria-label="Next project"
          className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center transition-all hover:border-amber-600"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </Section>
  );
}

export { flagshipProjects };
