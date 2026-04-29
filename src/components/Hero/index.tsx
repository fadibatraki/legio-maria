"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Youtube } from "lucide-react";

/* ----------------------- Deterministic helpers (no Math.random in render) ----------------------- */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function fixed(n: number, d = 3) {
  return Number(n.toFixed(d));
}

type FloatNote = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  char: string;
};

type EqBar = {
  base: number;
  amp: number;
  delay: number;
  dur: number;
};

type Bokeh = {
  left: number;
  top: number;
  size: number;
  blur: number;
  opacity: number;
  hue: "purple" | "glow" | "pink";
  dur: number;
  delay: number;
};




export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 160 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 160 });

  const imageX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const bgX = useTransform(smoothX, [-0.5, 0.5], [22, -22]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Floating notes (deterministic)
  const floatingNotes = useMemo<FloatNote[]>(() => {
    const chars = ["♪", "♫", "♬", "♩"];
    return Array.from({ length: 16 }, (_, i) => {
      const r1 = seededRandom(i * 11 + 1);
      const r2 = seededRandom(i * 11 + 2);
      const r3 = seededRandom(i * 11 + 3);
      const r4 = seededRandom(i * 11 + 4);

      return {
        left: 4 + r1 * 92,
        top: 8 + r2 * 78,
        size: 18 + r3 * 20,
        duration: 7 + r4 * 6,
        delay: i * 0.42,
        drift: (r2 - 0.5) * 70,
        rotate: 240 + r3 * 260,
        char: chars[i % chars.length],
      };
    });
  }, []);

  const eqBars = useMemo<EqBar[]>(() => {
    return Array.from({ length: 64 }, (_, i) => {
      const r1 = seededRandom(i * 7 + 1);
      const r2 = seededRandom(i * 7 + 2);
      const r3 = seededRandom(i * 7 + 3);

      return {
        base: 12 + r1 * 20,
        amp: 24 + r2 * 52,
        delay: i * 0.02,
        dur: 0.9 + r3 * 0.6,
      };
    });
  }, []);

  // Big bokeh lights (stage vibe)
  const bokeh = useMemo<Bokeh[]>(() => {
    const hues: Bokeh["hue"][] = ["purple", "glow", "pink"];
    return Array.from({ length: 14 }, (_, i) => {
      const r1 = seededRandom(i * 31 + 1);
      const r2 = seededRandom(i * 31 + 2);
      const r3 = seededRandom(i * 31 + 3);
      const r4 = seededRandom(i * 31 + 4);
      const r5 = seededRandom(i * 31 + 5);

      return {
        left: fixed(2 + r1 * 96, 3),
        top: fixed(2 + r2 * 70, 3),
        size: fixed(140 + r3 * 320, 2),
        blur: fixed(30 + r4 * 80, 2),
        opacity: fixed(0.08 + r5 * 0.18, 3),
        hue: hues[i % hues.length],
        dur: fixed(10 + r2 * 10, 2),
        delay: fixed(i * 0.35, 2),
      };
    });
  }, []);

  // LED wall tiles (fills edges)


  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative h-screen w-full overflow-hidden bg-[#07070B] text-white"

    >
      {/* ===================== STAGE BACKGROUND (BIG DIFFERENCE) ===================== */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 z-0">
        {/* Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050515] to-black" />

        {/* Stage glow center (stronger) */}
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_28%,rgba(124,58,237,0.35),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_62%_45%,rgba(168,85,247,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_520px_at_40%_58%,rgba(244,63,94,0.22),transparent_74%)]" />
        <StageLasers />
        {/* LED wall tiles (fills the whole background including edges) */}
        {/* Background live performance video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.22] pointer-events-none"
        >
          <source src="/images/hero/imadselim.mp4" type="video/mp4" />
        </video>

        {/* optional: fade so text stays clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />



        {/* Big bokeh lights like a real concert */}
        <div className="absolute inset-0">
          {bokeh.map((b, i) => {
            const c =
              b.hue === "purple"
                ? "rgba(124,58,237,1)"
                : b.hue === "glow"
                  ? "rgba(168,85,247,1)"
                  : "rgba(244,63,94,1)";
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${b.left}%`,
                  top: `${b.top}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  background: `radial-gradient(circle at 30% 30%, ${c}, transparent 60%)`,
                  opacity: b.opacity,
                  filter: `blur(${b.blur}px)`,
                  mixBlendMode: "screen",
                }}
                animate={{
                  x: [0, (i % 2 === 0 ? 1 : -1) * 22, 0],
                  y: [0, (i % 3 === 0 ? -1 : 1) * 18, 0],
                  opacity: [b.opacity * 0.8, b.opacity * 1.2, b.opacity * 0.8],
                }}
                transition={{
                  duration: b.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: b.delay,
                }}
              />
            );
          })}
        </div>



        {/* Haze / smoke (stronger) */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.35, 0.62, 0.35] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.45 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(1000px_620px_at_50%_82%,rgba(255,255,255,0.10),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(680px_520px_at_28%_72%,rgba(255,255,255,0.08),transparent_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(720px_540px_at_72%_74%,rgba(255,255,255,0.07),transparent_74%)]" />
        </motion.div>

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.12),transparent_35%,rgba(255,255,255,0.10))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_48%)]" />
        </div>
      </motion.div>

      {/* ===================== LIGHT BEAMS (in front of background) ===================== */}
      <div className="absolute inset-0 z-[1]">
        <SpotlightsStrong />
      </div>



      {/* ===================== Music elements ===================== */}
      <div className="absolute inset-0 z-[2]">
        <RhythmLinesStrong />
        <FloatingNotes notes={floatingNotes} />
      </div>

      {/* Bottom equalizer */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] h-40 opacity-55">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-[3px]">
          {eqBars.map((b, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-t-full bg-[#7C3AED]"
              animate={{
                height: [b.base, b.base + b.amp, b.base],
                opacity: [0.55, 1, 0.55],
              }}
              transition={{
                duration: b.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: b.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* ===================== Content ===================== */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 sm:px-5 md:px-6 py-12 sm:py-16">
        {/* Artist image: make it feel alive + no rectangle */}

        {/* Strong rim glow */}
        <div className="pointer-events-none absolute -inset-16 -z-10 blur-3xl">
          <div className="h-full w-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.50),transparent_70%)]" />
        </div>
        <div className="pointer-events-none absolute -inset-20 -z-10 blur-[85px]">
          <div className="h-full w-full bg-[radial-gradient(closest-side,rgba(244,63,94,0.35),transparent_76%)]" />
        </div>
        <div className="pointer-events-none absolute -inset-20 -z-10 blur-[85px]">
          <div className="h-full w-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.28),transparent_76%)]" />
        </div>

        {/* <div className="relative h-[290px] w-[230px] sm:h-[340px] sm:w-[290px] md:h-[410px] md:w-[360px] lg:h-[470px] lg:w-[420px]">
           <Image
            src="/images/hero/imadselim1.png"
            alt="Imad Selim performing"
            fill
            priority
            className="object-cover object-top"

          /> 
        </div> */}


        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-center"
        >          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="relative">
              <span className="absolute inset-0 text-white/10 blur-[2px]">
                IMAD SELIM
              </span>
              <span className="relative bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F43F5E] bg-clip-text text-transparent">
                IMAD SELIM
              </span>
            </span>
          </h1>

          <Waveform />

          <p className="mt-3 text-xs font-medium tracking-[0.20em] sm:tracking-[0.28em] md:tracking-[0.32em] text-white/70 sm:text-sm md:text-base">
            Singer • Poet • Traditional Storyteller
          </p>

          <p className="mx-auto mt-3 sm:mt-4 max-w-xl px-4 text-sm text-white/65 sm:text-base">
            A Kurdish artist bringing heritage to life through voice and story.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row"
        >
          <Link href="/music">
            <GlowButton primary>
              <Play className="mr-2 h-5 w-5" />
              Listen Now
            </GlowButton>
          </Link>

          <a
            href="https://www.youtube.com/@imad_selim"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlowButton youtube>
              <Youtube className="mr-2 h-5 w-5 fill-white" />
              Watch on YouTube
            </GlowButton>
          </a>
        </motion.div>
      </div>


    </section>
  );
}

/* ================================== Background Pieces ================================== */




function ArtEdges() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Left artistic aura */}
      <div className="absolute inset-y-0 left-0 w-[44%] opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_10%_40%,rgba(124,58,237,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_25%_70%,rgba(244,63,94,0.18),transparent_72%)]" />
        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[conic-gradient(from_220deg,transparent,rgba(168,85,247,0.20),transparent)]" />
      </div>

      {/* Right artistic aura */}
      <div className="absolute inset-y-0 right-0 w-[44%] opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_90%_40%,rgba(168,85,247,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_75%_75%,rgba(244,63,94,0.15),transparent_72%)]" />
        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[conic-gradient(from_140deg,transparent,rgba(124,58,237,0.18),transparent)]" />
      </div>

      {/* Subtle circular rings (music vibe) */}
      <div className="absolute -left-[180px] top-[12%] h-[520px] w-[520px] rounded-full border border-white/10 blur-[0.2px]" />
      <div className="absolute -left-[220px] top-[16%] h-[640px] w-[640px] rounded-full border border-white/7 blur-[0.2px]" />
      <div className="absolute -right-[180px] top-[14%] h-[520px] w-[520px] rounded-full border border-white/10 blur-[0.2px]" />
      <div className="absolute -right-[220px] top-[18%] h-[640px] w-[640px] rounded-full border border-white/7 blur-[0.2px]" />

      {/* Thin waveform strings across edges */}
      <div className="absolute left-0 right-0 top-[22%] h-px opacity-25 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute left-0 right-0 top-[62%] h-px opacity-20 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
    </div>
  );
}


function SpotlightsStrong() {
  return (
    <div className="pointer-events-none absolute inset-0">

      <ArtEdges />

      {/* center top glow */}
      <div className="absolute inset-0 bg-[radial-gradient(700px_280px_at_50%_18%,rgba(255,255,255,0.10),transparent_75%)]" />
    </div>
  );
}

function RhythmLinesStrong() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-35">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
          style={{ top: `${10 + i * 7}%` }}
          animate={{ scaleX: [0.45, 1.15, 0.45], opacity: [0.14, 0.40, 0.14] }}
          transition={{
            duration: 3.1 + i * 0.22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.16,
          }}
        />
      ))}
    </div>
  );
}

function FloatingNotes({ notes }: { notes: FloatNote[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {notes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute font-semibold text-white/12"
          style={{
            left: `${n.left}%`,
            top: `${n.top}%`,
            fontSize: `${n.size}px`,
          }}
          animate={{
            y: [-12, -115],
            x: [0, n.drift],
            opacity: [0, 0.45, 0],
            rotate: [0, n.rotate],
          }}
          transition={{
            duration: n.duration,
            repeat: Infinity,
            delay: n.delay,
            ease: "easeOut",
          }}
        >
          {n.char}
        </motion.div>
      ))}
    </div>
  );
}

function Waveform() {
  const bars = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const r1 = seededRandom(i * 9 + 1);
      const r2 = seededRandom(i * 9 + 2);
      return { base: 8 + r1 * 10, amp: 12 + r2 * 18, d: i * 0.04 };
    });
  }, []);

  return (
    <div className="mt-4 flex h-10 items-center justify-center gap-[3px]">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-[#7C3AED]"
          animate={{ height: [b.base, b.base + b.amp, b.base], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut", delay: b.d }}
        />
      ))}
    </div>
  );
}


type GlowButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  youtube?: boolean;
};

function GlowButton({ children, primary = false, youtube = false }: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.985 }}
      className={[
        "relative overflow-hidden rounded-full px-8 py-4 text-sm sm:text-base",
        "font-semibold tracking-wide",
        "transition-all duration-300",
        "flex items-center justify-center",
        youtube
          ? "bg-[#F43F5E] text-white shadow-lg shadow-[#F43F5E]/40 hover:brightness-110" : primary
            ? "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/40 hover:bg-[#F43F5E] hover:shadow-[#F43F5E]/40"
            : "bg-white/0 border border-white/30 text-white hover:border-white/55 hover:bg-white/6",
      ].join(" ")}
    >
      {/* glow خلفي فقط لزر primary (مو لليوتيوب) */}
      {primary && !youtube && (
        <motion.div
          animate={{ opacity: isHovered ? 0.98 : 0.62, scale: isHovered ? 1.10 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 -z-10 blur-xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(124,58,237,0.75), rgba(245,158,11,0.35))",
          }}
        />
      )}

      {/* glow خفيف لليوتيوب */}
      {youtube && (
        <div className="absolute inset-0 -z-10 blur-xl bg-red-600/35" />
      )}

      {/* ripple */}
      {ripple && (
        <motion.span
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 4.4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute h-8 w-8 rounded-full bg-white/30"
          style={{ left: ripple.x - 16, top: ripple.y - 16 }}
        />
      )}

      {/* shine فقط لزر primary */}
      {primary && !youtube && (
        <motion.div
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 2.1, repeat: Infinity, repeatDelay: 1.1 }}
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/18 to-transparent"
        />
      )}

      <span className="relative z-10 flex items-center">{children}</span>
    </motion.button>
  );
}

function StageLasers() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Left lasers */}
      <motion.div
        className="absolute -left-[18%] top-[-10%] h-[140%] w-[55%] rotate-[-10deg] opacity-60 blur-[0.2px]"
        animate={{ x: [0, 30, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "conic-gradient(from 210deg, transparent, rgba(124,58,237,0.25), rgba(244,63,94,0.18), transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 60%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 20%, black 60%, transparent)",
        }}
      />

      {/* Right lasers */}
      <motion.div
        className="absolute -right-[18%] top-[-10%] h-[140%] w-[55%] rotate-[10deg] opacity-60 blur-[0.2px]"
        animate={{ x: [0, -30, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        style={{
          background:
            "conic-gradient(from 140deg, transparent, rgba(168,85,247,0.22), rgba(244,63,94,0.15), transparent)",
          maskImage:
            "linear-gradient(to left, transparent, black 20%, black 60%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to left, transparent, black 20%, black 60%, transparent)",
        }}
      />

      {/* Vertical light rays across stage */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute inset-y-0 left-[10%] w-[2px] bg-gradient-to-b from-transparent via-white/45 to-transparent" />
        <div className="absolute inset-y-0 left-[28%] w-[1px] bg-gradient-to-b from-transparent via-white/35 to-transparent" />
        <div className="absolute inset-y-0 left-[50%] w-[2px] bg-gradient-to-b from-transparent via-white/35 to-transparent" />
        <div className="absolute inset-y-0 left-[72%] w-[1px] bg-gradient-to-b from-transparent via-white/35 to-transparent" />
        <div className="absolute inset-y-0 left-[88%] w-[2px] bg-gradient-to-b from-transparent via-white/45 to-transparent" />
      </div>
    </div>
  );
}
