import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  MapPin,
  Clock,
  Star,
  Phone,
  ExternalLink,
  Leaf,
  Wine,
  Users,
  Sparkles,
  Utensils,
  Award,
  Quote,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  CalendarDays,
  Heart,
  Send,
  GlassWater,
  Flame,
  Mouse,
  ChevronDown,
  ZoomIn,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Navigation } from "../components/navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════ */
const C = {
  gold: "#B68A3A",
  cream: "#F3EFEA",
  dark: "#0E1714",
  card: "#182522",
  serif: "Cormorant Garamond, serif",
  sans: "Inter, sans-serif",
};

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const MENU_CATEGORIES = [
  {
    name: "Przystawki",
    description: "Delikatne, wyrafinowane smaki na start",
    menuCategory: "Przystawki",
    highlight: {
      name: "Foie gras z konfiturą figową",
      description: "Delikatny foie gras z domową konfiturą z fig i chrupiącą brioche",
      price: "72 zł",
      img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    },
  },
  {
    name: "Zupy",
    description: "Aksamitne buliony i kremy z tradycją",
    menuCategory: "Zupy",
    highlight: {
      name: "Bisque z homara",
      description: "Aksamitna zupa z homara z kroplą koniaku i kremem śmietanowym",
      price: "48 zł",
      img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    },
  },
  {
    name: "Dania Główne",
    description: "Mistrzowskie kompozycje smaków",
    menuCategory: "Dania główne",
    highlight: {
      name: "Polędwica Wagyu",
      description: "Japońskie wagyu A5, purée z truflami, redukcja porto",
      price: "289 zł",
      img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    },
  },
  {
    name: "Desery",
    description: "Słodki finał kulinarnej podróży",
    menuCategory: "Desery",
    highlight: {
      name: "Suflet Czekoladowy",
      description: "Valrhona 70%, crème anglaise, złoty listek",
      price: "78 zł",
      img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    },
  },
];

const DEFAULT_MENU_IMG = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";

const MENU_HIGHLIGHTS = [
  { id: 1, name: "Risotto truflowe", description: "Ryż carnaroli, wiórki czarnej trufli, dojrzały parmezan, redukcja białego wina", price: "158 zł", tag: "Wybór szefa kuchni" },
  { id: 2, name: "Sola meunière", description: "Sola smażona na brązowym maśle, kapary, warzywa sezonowe", price: "218 zł", tag: null },
  { id: 3, name: "Polędwica wołowa wagyu", description: "Japonskie wagyu A5, purée ziemniaczane, leśne grzyby, jus z czerwonego wina", price: "328 zł", tag: "Sezonowe" },
  { id: 4, name: "Homar Thermidor", description: "Homar z Maine, krem konjakowy, gruyère gratinée, masło ziołowe", price: "268 zł", tag: null },
  { id: 5, name: "Kaczka confit", description: "Wolno pieczona kacza noga, gastrique wiśniowe, pieczone warzywa korzeniowe", price: "178 zł", tag: null },
  { id: 6, name: "Suflet czekoladowy", description: "Ciemna czekolada Valrhona, crème anglaise, złoty listek", price: "78 zł", tag: "Wybór szefa kuchni" },
];

const TASTING_MENU = {
  title: "Wiosenne menu degustacyjne 2026",
  subtitle: "Siedmiodaniowa podróż przez Prowansję",
  price: "498 zł na osobę",
  pairing: "Dobór win +268 zł",
  courses: [
    "Amuse-bouche · Chłodne velouté z groszku, crème fraîche, mikrozioła",
    "Przystawka · Smażone foie gras, konfitura figowa, grzanka brioche",
    "Ryba · Dzikowiec złowiony na wędkę, beurre blanc szafranowe, koper włoski",
    "Sorbet · Intermezzo szampanowo-bzowe",
    "Danie główne · Comber jagnięcy, skórka pistacjowa, ratatouille, jus",
    "Sery · Wybór trzech dojrzałych serów francuskich, plaster miodu",
    "Deser · Fondant czekoladowy Valrhona, solony karmel, złoty listek",
  ],
};

const EXPERIENCE_PILLARS = [
  {
    id: "sezonowosc",
    number: "01",
    tag: "Sezonowość",
    title: "Składniki bez kompromisów",
    description: "Menu zmienia się z rytmem natury. Produkty trafiają na talerz wtedy, kiedy są w szczytowej dojrzałości, nigdy nie transportowane drogą lotniczą.",
    detail: "Współpracujemy z ponad 20 gospodarstwami ekologicznymi w promieniu 150 km od Warszawy. Szef kuchni każdego ranka odwiedza lokalnych dostawców. Sezonowość to nie trend — to fundament smaku.",
    icon: Leaf,
    accent: "M 0 50 Q 25 10, 50 50 Q 75 90, 100 50",
  },
  {
    id: "sommelier",
    number: "02",
    tag: "Sommelier",
    title: "Pairing prowadzony z wyczuciem",
    description: "Dobór win nie jest dodatkiem, tylko częścią wieczoru. Każdy kieliszek wzmacnia smaki, czasem kontrastuje — zawsze z wyjaśnieniem.",
    detail: "Nasza karta liczy ponad 400 pozycji z 12 krajów. Sommelier prowadzi przez pairing jak przez opowieść — każde wino ma swoją historię, która splata się z daniem na talerzu.",
    icon: Wine,
    accent: "M 0 80 C 30 80, 30 20, 50 20 C 70 20, 70 80, 100 80",
  },
  {
    id: "serwis",
    number: "03",
    tag: "Serwis",
    title: "Obsługa, która wyczuwa rytm",
    description: "Nasz zespół obserwuje obecny wieczór, a nie sztywny czas. Gdy rozmowa płynie naturalnie — żadna intruzja.",
    detail: "Każdy kelner przechodzi 6-miesięczne szkolenie w sztuce uważnej obecności. Nie przerywamy rozmów. Nie pędzimy. Czujemy, kiedy dolać wino, a kiedy zniknąć.",
    icon: Clock,
    accent: "M 0 50 L 30 50 L 50 20 L 70 80 L 100 50",
  },
  {
    id: "atmosfera",
    number: "04",
    tag: "Atmosfera",
    title: "Kameralność zaprojektowana świadomie",
    description: "Miękkie światła, odległość między stolikami, akustyka sprzyjająca konwersacji. Wszystko bez przesadnego spektaklu.",
    detail: "Wnętrze projektowało studio z Paryża specjalizujące się w akustyce restauracji. Każdy stolik ma własną strefę dźwięku. Oświetlenie zmienia się z porą wieczoru.",
    icon: Sparkles,
    accent: "M 10 50 A 40 40 0 1 1 90 50 A 40 40 0 1 1 10 50",
  },
];

const REVIEWS = [
  { id: 1, name: "Anna Kowalska", role: "Food Blogger", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", text: "Nie znajdziesz restauracji w Warszawie, która serwuje tak niesamowite jedzenie. Ich nowe menu mnie zaskoczyło. Wszystko nowe, nigdy nie widziałem i nie smakowałem takiego jedzenia jak tu.", size: "large" },
  { id: 2, name: "Piotr Nowak", role: "Restaurateur", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", text: "Jedzenie w tej restauracji jest zawsze przyjemnością. Jedzenie jest konsekwentnie smaczne, pełne smaku i wyrafinowane.", size: "medium" },
  { id: 3, name: "Maria Wiśniewska", role: "Architect", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", text: "Ta restauracja zawsze serwuje świeże, smaczne jedzenie przygotowane z wielką starannością i dbałością o jakość.", size: "medium" },
  { id: 4, name: "Tomasz Lewandowski", role: "Chef", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", text: "Obsługa jest przyjazna, uważna i sprawna, co zapewnia płynną obsługę. Zawsze czuję się w pełni usatysfakcjonowany.", size: "small" },
];

const PRESS = [
  { name: "Michelin Guide", quote: "Wschodzące słońce warszawskiej sceny gastronomicznej." },
  { name: "Le Figaro", quote: "Elegancja, kameralność, niezapomniany wieczór." },
  { name: "Gault & Millau", quote: "Jeden z najbardziej ekscytujących stołów w 6. dzielnicy." },
  { name: "Condé Nast Traveler", quote: "Obowiązkowy punkt dla każdego miłośnika dobrego jedzenia w Warszawie." },
];

const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80", alt: "Risotto truflowe" },
  { id: 2, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", alt: "Elegancka sala jadalna" },
  { id: 3, src: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=800&q=80", alt: "Wykwintna kuchnia francuska" },
  { id: 4, src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80", alt: "Wybór z piwnicy winnej" },
  { id: 5, src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", alt: "Nakrycie stołu" },
  { id: 6, src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80", alt: "Sztuka deserów" },
  { id: 7, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", alt: "Bar i lounge" },
  { id: 8, src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80", alt: "Przygotowanie polędwicy wagyu" },
];

const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1414235077428-338fc7c4d16f?w=1600&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1600&q=80",
];

const RESERVATION_STEPS = [
  { step: "01", title: "Wybierz datę", text: "Wybierz wieczór, który Ci odpowiada. Przyjmujemy rezerwacje z wyprzedzeniem do 60 dni." },
  { step: "02", title: "Wybierz stolik", text: "Przeglądaj nasz interaktywny plan sali i wybierz dokładny stolik — przy oknie, w rogu lub pośrodku." },
  { step: "03", title: "Przyjedź i ciesz się", text: "Twój stolik będzie gotowy. Nasz zespół wita Cię po imieniu, przedstawia menu wieczoru i podróż się rozpoczyna." },
];

/* ═══════════════════════════════════════════════════════
   HELPER COMPONENTS
   ═══════════════════════════════════════════════════════ */

function SectionHeader({ title, subtitle, label }: { title: string; subtitle?: string; label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16 md:mb-20"
    >
      <div className="inline-flex items-center gap-4 mb-8">
        <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
        {label && <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>{label}</span>}
        <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-base max-w-2xl mx-auto leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function GoldButton({
  children,
  onClick,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const isSolid = variant === "solid";
  return (
    <button
      onClick={onClick}
      className={`px-10 py-4 rounded-lg transition-all duration-300 ${className}`}
      style={{
        fontFamily: C.sans,
        fontWeight: 500,
        letterSpacing: "0.05em",
        fontSize: "14px",
        backgroundColor: isSolid ? C.gold : "rgba(182,138,58,0.1)",
        color: isSolid ? "#1E1A16" : C.gold,
        border: isSolid ? "none" : "1px solid rgba(182,138,58,0.3)",
        boxShadow: isSolid ? "0 8px 32px rgba(182,138,58,0.3)" : "none",
      }}
      onMouseEnter={(e) => {
        if (isSolid) {
          e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(182,138,58,0.4)";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(182,138,58,0.15)";
          e.currentTarget.style.borderColor = "rgba(182,138,58,0.4)";
        }
      }}
      onMouseLeave={(e) => {
        if (isSolid) {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(182,138,58,0.3)";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(182,138,58,0.1)";
          e.currentTarget.style.borderColor = "rgba(182,138,58,0.3)";
        }
      }}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   GALLERY SECTION COMPONENT
   ═══════════════════════════════════════════════════════ */

function GalleryTile({
  image,
  idx,
  className = "",
  onImageClick,
}: {
  image: { src: string; alt: string };
  idx: number;
  className?: string;
  onImageClick: (idx: number) => void;
}) {
  return (
    <motion.button
      className={`relative group overflow-hidden rounded-2xl focus:outline-none ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.07, duration: 0.5 }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      onClick={() => onImageClick(idx)}
    >
      <img src={image.src} alt={image.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)" }}
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ border: `2px solid ${C.gold}` }} />
    </motion.button>
  );
}

function GallerySection({ onImageClick }: { onImageClick: (idx: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const grid = GALLERY_IMAGES;

  return (
    <section ref={containerRef} id="gallery" className="relative py-32 overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Fotografia</span>
            <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
            Galeria Smaków
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>
            Odkryj wizualną podróż przez nasze kulinarne arcydzieła
          </p>
        </motion.div>

        {/* Figma-layout grid — responsive */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          style={{ gridAutoRows: "clamp(160px, 25vw, 300px)" }}
        >
          {/* 0 — duże lewe, 2×2 */}
          <GalleryTile image={grid[0]} idx={0} className="col-span-2 row-span-2" onImageClick={onImageClick} />
          {/* 1 — małe prawe górne */}
          <GalleryTile image={grid[1]} idx={1} onImageClick={onImageClick} />
          {/* 2 — małe prawe górne (obok 1) */}
          <GalleryTile image={grid[2]} idx={2} onImageClick={onImageClick} />
          {/* 3 — duże prawe, 2×2 */}
          <GalleryTile image={grid[3]} idx={3} className="col-span-2 row-span-2" onImageClick={onImageClick} />
          {/* 4, 5 — małe lewe dolne */}
          <GalleryTile image={grid[4]} idx={4} onImageClick={onImageClick} />
          <GalleryTile image={grid[5]} idx={5} onImageClick={onImageClick} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE SECTION COMPONENT
   ═══════════════════════════════════════════════════════ */

function ExperienceSection() {
  const [activeId, setActiveId] = useState<string>("sezonowosc");
  const active = EXPERIENCE_PILLARS.find((p) => p.id === activeId)!;
  const ActiveIcon = active.icon;

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
      {/* Decorative corner lines */}
      <div className="absolute top-12 left-12 w-24 h-24 border-t border-l hidden lg:block" style={{ borderColor: `${C.gold}1A` }} />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r hidden lg:block" style={{ borderColor: `${C.gold}1A` }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>
              Cztery filary wieczoru
            </span>
            <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
            Doświadczenie, które
            <br />
            <span className="italic">buduje się z detali</span>
          </h2>
        </motion.div>

        {/* Tabs — desktop: inline row, mobile: 2x2 grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Desktop tabs */}
          <div className="hidden sm:flex justify-center">
            <div className="inline-flex" style={{ border: `1px solid ${C.gold}26` }}>
              {EXPERIENCE_PILLARS.map((p) => {
                const Icon = p.icon;
                const isActive = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveId(p.id)}
                    className="relative flex items-center gap-3 px-6 py-4 text-xs tracking-[0.15em] uppercase transition-all duration-500"
                    style={{
                      fontFamily: C.sans,
                      backgroundColor: isActive ? `${C.gold}1A` : "transparent",
                      color: isActive ? C.gold : "rgba(243,239,234,0.35)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{p.tag}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ backgroundColor: C.gold }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile tabs — 2x2 grid */}
          <div className="grid grid-cols-2 gap-2 sm:hidden">
            {EXPERIENCE_PILLARS.map((p) => {
              const Icon = p.icon;
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className="flex items-center gap-2 px-3 py-3 text-[11px] tracking-[0.1em] uppercase transition-all duration-300 rounded-lg"
                  style={{
                    fontFamily: C.sans,
                    backgroundColor: isActive ? `${C.gold}1A` : "transparent",
                    color: isActive ? C.gold : "rgba(243,239,234,0.4)",
                    border: isActive ? `1px solid ${C.gold}40` : "1px solid rgba(182,138,58,0.12)",
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{p.tag}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content area */}
        <div className="relative" style={{ minHeight: '280px' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Mobile layout: icon + text stacked */}
              <div className="flex flex-col items-center text-center lg:hidden">
                <div className="relative mb-6">
                  <span className="text-[80px] font-light leading-none select-none block" style={{ fontFamily: C.serif, color: `${C.gold}12` }}>
                    {active.number}
                  </span>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.gold}40` }}>
                      <ActiveIcon className="w-5 h-5" style={{ color: C.gold }} />
                    </div>
                  </div>
                </div>

                <span className="text-xs tracking-[0.3em] uppercase mb-3 block" style={{ color: C.gold, fontFamily: C.sans }}>
                  {active.tag}
                </span>

                <h3 className="text-2xl font-light mb-4 leading-tight" style={{ fontFamily: C.serif, color: C.cream }}>
                  {active.title}
                </h3>

                <div className="w-12 h-px mb-5 mx-auto" style={{ backgroundColor: `${C.gold}4D` }} />

                <p className="leading-relaxed mb-4 text-sm" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.65)" }}>
                  {active.description}
                </p>

                <p className="leading-relaxed text-xs" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.4)" }}>
                  {active.detail}
                </p>
              </div>

              {/* Desktop layout: number left + text right */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-center">
                {/* Left — large number + decorative SVG */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
                  <div className="relative">
                    <span className="text-[240px] font-light leading-none select-none block" style={{ fontFamily: C.serif, color: `${C.gold}12` }}>
                      {active.number}
                    </span>

                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="xMidYMid meet">
                      <motion.path
                        d={active.accent}
                        stroke={C.gold}
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                        strokeOpacity="0.3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.gold}40` }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.gold}26` }}>
                          <ActiveIcon className="w-6 h-6" style={{ color: C.gold }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right — text content */}
                <div className="lg:col-span-7">
                  <div className="max-w-lg">
                    <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: C.gold, fontFamily: C.sans }}>
                      {active.tag}
                    </span>

                    <h3 className="text-4xl font-light mb-6 leading-tight" style={{ fontFamily: C.serif, color: C.cream }}>
                      {active.title}
                    </h3>

                    <div className="w-12 h-px mb-6" style={{ backgroundColor: `${C.gold}4D` }} />

                    <p className="leading-relaxed mb-6" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.65)", fontSize: "0.95rem" }}>
                      {active.description}
                    </p>

                    <p className="leading-relaxed text-sm" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.4)" }}>
                      {active.detail}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom — progress dots */}
        <div className="mt-12 sm:mt-16 lg:mt-24">
          <div className="flex justify-center gap-3">
            {EXPERIENCE_PILLARS.map((p) => (
              <button key={p.id} onClick={() => setActiveId(p.id)} className="group flex flex-col items-center gap-2">
                <div
                  className="h-px transition-all duration-500"
                  style={{
                    width: p.id === activeId ? "3rem" : "1.5rem",
                    backgroundColor: p.id === activeId ? C.gold : `${C.gold}26`,
                  }}
                />
                <span
                  className="text-[10px] tracking-[0.2em] transition-colors duration-500"
                  style={{ fontFamily: C.sans, color: p.id === activeId ? C.gold : "rgba(243,239,234,0.2)" }}
                >
                  {p.number}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export function LandingPage() {
  const navigate = useNavigate();

  /* ── lightbox ── */
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImage = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null)),
    [],
  );
  const nextImage = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : null)),
    [],
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, closeLightbox, prevImage, nextImage]);

  /* ── menu highlight ── */
  const [selectedCat, setSelectedCat] = useState<number | null>(null);

  /* ── sticky bar ── */
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100;
      setShowSticky(window.scrollY > 600 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── newsletter ── */
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  /* ── menu section parallax ── */
  const menuSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: menuScrollYProgress } = useScroll({
    target: menuSectionRef,
    offset: ["start end", "end start"],
  });
  const menuParallaxY = useTransform(menuScrollYProgress, [0, 1], [100, -100]);

  /* ── hero parallax ── */
  const { scrollY } = useScroll();
  const heroY1 = useTransform(scrollY, [0, 300], [0, 150]);
  const heroY2 = useTransform(scrollY, [0, 300], [0, -100]);
  const heroRotate = useTransform(scrollY, [0, 300], [0, 15]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(ellipse at center, #1a2820 0%, #0E1714 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <Navigation />

      {/* ═══════════════════════ 1. HERO ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1612 0%, #0f1915 50%, #1a2820 100%)" }}>
        {/* Massive floating background text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]"
          style={{ y: heroY1 }}
        >
          <h1
            className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[20rem] font-light text-[#d4a574] whitespace-nowrap"
            style={{ fontFamily: C.serif }}
          >
            DORÉE
          </h1>
        </motion.div>

        {/* Floating decorative circle — hidden on mobile */}
        <motion.div
          className="absolute top-24 right-[20.75rem] w-28 h-28 border-4 border-[#b68a3a] rounded-full opacity-20 hidden md:block"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity },
          }}
        />

        {/* Floating decorative diamond — hidden on mobile */}
        <motion.div className="absolute bottom-40 left-[20.75rem] w-40 h-40 hidden md:block" style={{ rotate: heroRotate }}>
          <div className="w-full h-full border-2 border-[#d4a574] opacity-10" style={{ transform: "rotate(45deg)" }} />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-8 pt-24 pb-20 md:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full"
                style={{ backgroundColor: "rgba(182,138,58,0.15)", border: "1px solid #b68a3a" }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: C.gold }} />
                <span
                  className="text-xs sm:text-sm font-medium tracking-wider uppercase"
                  style={{ fontFamily: C.sans, color: C.gold }}
                >
                  Smak Który Zapada w Pamięć
                </span>
              </div>

              {/* Title */}
              <div className="space-y-3 sm:space-y-4">
                <motion.h1
                  className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95]"
                  style={{ fontFamily: C.serif, color: C.cream }}
                >
                  <motion.span
                    className="block"
                    animate={{ x: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Wejdź
                  </motion.span>
                  <motion.span
                    className="block"
                    style={{ color: C.gold }}
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Do Świata
                  </motion.span>
                  <motion.span
                    className="block"
                  >
                    La Maison Dorée
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-sm sm:text-base md:text-lg max-w-lg leading-relaxed pl-4"
                  style={{
                    fontFamily: C.sans,
                    fontWeight: 300,
                    color: "rgba(243,239,234,0.8)",
                    borderLeft: `4px solid ${C.gold}`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Gdzie każde danie to podróż przez smaki, a każdy wieczór to niezapomniane przeżycie kulinarne.
                </motion.p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <motion.button
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-full flex items-center gap-3 overflow-hidden text-sm sm:text-base"
                  style={{
                    backgroundColor: C.gold,
                    color: "#0a1612",
                    fontFamily: C.sans,
                    boxShadow: "0 8px 32px rgba(182,138,58,0.4)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/reserve")}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#d4a574] to-[#b68a3a]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Zamów Teraz</span>
                  <motion.div
                    className="relative z-10 w-6 h-6 bg-[#0a1612] rounded-full flex items-center justify-center"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-4 h-4" style={{ color: C.gold }} />
                  </motion.div>
                </motion.button>

                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-full transition-all text-sm sm:text-base"
                  style={{
                    border: `2px solid ${C.gold}`,
                    color: C.gold,
                    fontFamily: C.sans,
                    backgroundColor: "transparent",
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(182,138,58,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Poznaj Menu
                </motion.button>
              </div>

              {/* Stats */}
              <motion.div
                className="flex gap-6 sm:gap-10 pt-4 sm:pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { value: "15+", label: "Lat Tradycji" },
                  { value: "50K+", label: "Szczęśliwych Gości" },
                  { value: "100%", label: "Pasji" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div
                      className="text-2xl sm:text-4xl font-light"
                      style={{ fontFamily: C.serif, color: C.gold }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[10px] sm:text-xs tracking-wider uppercase"
                      style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.6)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — floating image (desktop only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
              style={{ y: heroY2 }}
            >
              <motion.div
                whileHover={{ rotate: 3, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Glow */}
                <div
                  className="absolute -inset-6 blur-3xl opacity-20"
                  style={{ background: "linear-gradient(135deg, #b68a3a, #d4a574)" }}
                />
                {/* Blob image */}
                <div
                  className="relative w-full aspect-square overflow-hidden shadow-2xl"
                  style={{ borderRadius: "40% 60% 70% 30% / 60% 30% 70% 40%" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1628838463043-b81a343794d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Signature dish"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-8 -right-4 rounded-full p-5 shadow-2xl"
                style={{
                  backgroundColor: "#0a1612",
                  border: `4px solid ${C.gold}`,
                  transform: "rotate(45deg)",
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  y: { duration: 3, repeat: Infinity },
                }}
              >
                <div className="text-center">
                  <Flame className="w-7 h-7 mx-auto mb-1" style={{ color: C.gold }} />
                  <div
                    className="text-sm font-medium"
                    style={{ fontFamily: C.sans, color: C.cream }}
                  >
                    Chef's
                  </div>
                  <div
                    className="text-xs"
                    style={{ fontFamily: C.sans, color: C.gold }}
                  >
                    Special
                  </div>
                </div>
              </motion.div>

              {/* Price tag */}
              <motion.div
                className="absolute -bottom-4 -left-4 px-8 py-4 shadow-xl"
                style={{
                  backgroundColor: C.gold,
                  transform: "rotate(-5deg)",
                }}
                whileHover={{ rotate: -8, scale: 1.1 }}
              >
                <div
                  className="text-xs opacity-70 mb-1"
                  style={{ fontFamily: C.sans, color: "#0a1612" }}
                >
                  Od
                </div>
                <div
                  className="text-3xl font-light"
                  style={{ fontFamily: C.serif, color: "#0a1612" }}
                >
                  89 PLN
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator — hidden on mobile to avoid overlap */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span
            className="text-xs tracking-wider uppercase"
            style={{ fontFamily: C.sans, color: C.gold }}
          >
            Przewiń
          </span>
          <div
            className="w-px h-16"
            style={{ background: `linear-gradient(to bottom, ${C.gold}, transparent)` }}
          />
        </motion.div>
      </section>

      <style>{`
        @keyframes rotateDash {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ═══════════════════════ 2. BRAND STORY ═══════════════════════ */}
      <section id="story" className="px-6 md:px-12 py-24 md:py-32" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
            <img
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80"
              alt="Inside La Maison Dorée"
              className="w-full h-[220px] sm:h-[240px] lg:h-[480px] object-cover"
              loading="lazy"
              style={{ filter: "brightness(0.85)" }}
            />
          </div>

          {/* Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 mb-2">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Nasza historia</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95]"
              style={{ fontFamily: C.serif, color: C.cream }}
            >
              Gdzie tradycja spotyka śmiąłość
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}
            >
              La Maison Dorée powstała z prostego przekonania: że wielka
              restauracja to nie tylko to, co jest na talerzu, ale także historia,
              którą opowiada. Założona w 2018 roku przez Szefa Kuchni Juliena Moreau
              przy ulicy Nowy Świat w Warszawie, łączy dyscyplinę klasycznej francuskiej
              techniki z wolnością nowoczesnej inwencji.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}
            >
              Każdego wieczoru przyjmujemy nie więcej niż czterdzieścioro gości
              w przestrzeni inspirowanej paryskimi salonami lat 20. XX wieku —
              kameralnej, spokojnej i zaprojektowanej tak, abyś zapomniał o mieście
              na zewnątrz. Nasza filozofia opiera się na sezonowości, szacunku dla
              składników i przekonaniu, że gościnność jest formą sztuki.
            </p>
            <blockquote
              className="border-l-2 pl-6 py-2 mt-4"
              style={{ borderColor: C.gold }}
            >
              <p
                className="text-lg italic"
                style={{ fontFamily: C.serif, fontWeight: 400, color: "rgba(243,239,234,0.85)" }}
              >
                "Gotowanie to pamięć. Każde danie, które podaję, nosi w sobie
                miejsce, osobę, chwilę, której nigdy nie chcę zapomnieć."
              </p>
              <cite
                className="text-sm not-italic block mt-3"
                style={{ fontFamily: C.sans, fontWeight: 500, color: C.gold }}
              >
                — Chef Julien Moreau
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. CHEF INTRODUCTION ═══════════════════════ */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy (left on desktop) */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-4 mb-2">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Szef kuchni</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95]"
              style={{ fontFamily: C.serif, color: C.cream }}
            >
              Julien Moreau
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}
            >
              Urodzony w Lyonie, szkolony pod okiem Alaina Ducasse'a i Anne-Sophie Pic,
              Julien Moreau spędził dekadę w restauracjach z gwiazdkami Michelin w Paryżu,
              Tokio i Kopenhadze, zanim w wieku 34 lat otworzył La Maison Dorée.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}
            >
              Jego kuchnia zakorzeniona jest w kanonie francuskim, ale kształtowana
              przez niespokojną ciekawość — japońska precyzja, nordycki minimalizm
              i filozofia farm-to-table odnajdują drogę na talerzu. Julien
              osobiście wybiera produkty od małych hodowców z Prowansji, Bretanii
              i Doliny Loary każdego tygodnia.
            </p>

            {/* Accolades */}
            <div className="flex flex-wrap gap-4 pt-4">
              {[
                "Michelin ★ 2021",
                "Gault & Millau 16/20",
                "Najlepszy nowy szef — Le Figaro 2019",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider"
                  style={{
                    fontFamily: C.sans,
                    fontWeight: 500,
                    color: C.gold,
                    backgroundColor: "rgba(182,138,58,0.1)",
                    border: "1px solid rgba(182,138,58,0.25)",
                  }}
                >
                  <Award size={14} />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="order-1 lg:order-2 rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
              alt="Chef Julien Moreau in the kitchen"
              className="w-full h-[220px] sm:h-[240px] lg:h-[520px] object-cover"
              loading="lazy"
              style={{ filter: "brightness(0.85)" }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 4. DINING EXPERIENCE ═══════════════════════ */}
      <ExperienceSection />

      {/* ═══════════════════════ 5. SEASONAL TASTING MENU ═══════════════════════ */}
      <section id="tasting" className="relative py-32 overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        {/* Corner accents */}
        <div className="absolute top-12 left-12 w-20 h-20 hidden lg:block" style={{ borderTop: "1px solid rgba(182,138,58,0.1)", borderLeft: "1px solid rgba(182,138,58,0.1)" }} />
        <div className="absolute bottom-12 right-12 w-20 h-20 hidden lg:block" style={{ borderBottom: "1px solid rgba(182,138,58,0.1)", borderRight: "1px solid rgba(182,138,58,0.1)" }} />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: "rgba(182,138,58,0.5)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ fontFamily: C.sans, color: C.gold }}>
                Sezon wiosenny 2026
              </span>
              <div className="h-px w-8" style={{ backgroundColor: "rgba(182,138,58,0.5)" }} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[0.95] mb-6" style={{ fontFamily: C.serif, color: C.cream }}>
              Menu<br />
              <span className="italic">Degustacyjne</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>
              Siedem dań, które opowiadają historię. Sezonowe składniki i tradycyjne techniki francuskiej kuchni.
            </p>
          </motion.div>

          {/* Dishes — alternating layout */}
          <div className="space-y-0">
            {[
              { number: "I",   name: "Amuse-bouche",          description: "Tatarak z łososia ze szczypiorkiem i kawiorem, galaretka cytrynowa",           img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" },
              { number: "II",  name: "Foie gras poêlé",       description: "Pieczona foie gras z chutney z fig, brioche i redukcją balsamiczną",            img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80" },
              { number: "III", name: "Velouté de champignons",description: "Kremowy krem z leśnych grzybów z oliwą truflową",                               img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
              { number: "IV",  name: "Saint-Jacques rôties",  description: "Przegrzebki z purée z topinamburu, pancetta i masłem szałwiowym",               img: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400&q=80" },
              { number: "V",   name: "Carré d'agneau",        description: "Sezonowane mięso jagnięce z rozmarynem, gratin dauphinois",                     img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80" },
              { number: "VI",  name: "Plateau de fromages",   description: "Wybór francuskich serów z miodem truflowym i orzechami",                        img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80" },
              { number: "VII", name: "Tarte Tatin revisitée", description: "Autorska wersja klasyki z jabłkami karmelizowanymi, lody waniliowe",            img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
            ].map((dish, index) => (
              <motion.div
                key={dish.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative first:border-t"
                style={{ borderBottom: "1px solid rgba(182,138,58,0.1)" }}
              >
                <div className={`flex items-center gap-6 md:gap-10 py-7 md:py-8 px-4 md:px-8 transition-all duration-500 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Number */}
                  <div className="hidden md:flex items-center justify-center w-16 flex-shrink-0">
                    <span className="text-4xl transition-colors duration-500 group-hover:opacity-50" style={{ fontFamily: C.serif, color: "rgba(182,138,58,0.2)" }}>
                      {dish.number}
                    </span>
                  </div>
                  {/* Image */}
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(182,138,58,0.1)]" style={{ border: "1px solid rgba(182,138,58,0.1)" }}>
                    <img src={dish.img} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  {/* Text */}
                  <div className={`flex-1 min-w-0 ${index % 2 === 1 ? "md:text-right" : ""}`}>
                    <div className={`flex items-baseline gap-3 mb-2 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      <span className="text-xs tracking-widest md:hidden" style={{ fontFamily: C.sans, color: "rgba(182,138,58,0.3)" }}>{dish.number}</span>
                      <h3 className="text-xl md:text-2xl transition-colors duration-500 group-hover:text-[#B68A3A]" style={{ fontFamily: C.serif, color: C.cream }}>
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.55)" }}>
                      {dish.description}
                    </p>
                  </div>
                  {/* Hover arrow */}
                  <div className="hidden md:flex items-center flex-shrink-0">
                    <motion.div animate={{ opacity: 0, x: -10 }} whileHover={{ opacity: 1, x: 0 }} className="group-hover:opacity-100">
                      <ArrowRight size={20} style={{ color: "rgba(182,138,58,0.5)" }} />
                    </motion.div>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" style={{ backgroundColor: "rgba(182,138,58,0.02)" }} />
              </motion.div>
            ))}
          </div>

          {/* FIN */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mt-16 mb-16"
          >
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(182,138,58,0.3))" }} />
            <span className="text-xs tracking-[0.4em]" style={{ fontFamily: C.sans, color: "rgba(182,138,58,0.3)" }}>FIN</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(182,138,58,0.3))" }} />
          </motion.div>

          {/* Price & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-4xl md:text-5xl mb-2" style={{ fontFamily: C.serif, color: C.cream }}>
              498 zł <span className="text-lg" style={{ color: "rgba(243,239,234,0.4)" }}>/ osoba</span>
            </p>
            <p className="text-sm mb-10" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.4)" }}>
              Dopasowanie win +268 zł
            </p>
            <div className="group inline-block">
              <button
                onClick={() => navigate("/reserve")}
                className="relative px-10 py-4 overflow-hidden rounded-full text-xs tracking-[0.2em] text-[#B68A3A] group-hover:text-[#0E1714] transition-colors duration-500"
                style={{ border: `1px solid ${C.gold}`, fontFamily: C.sans }}
              >
                <span className="absolute inset-0 z-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ backgroundColor: C.gold }} />
                <span className="relative z-10 flex items-center gap-3 text-[10px] sm:text-xs">
                  ZAREZERWUJ DEGUSTACJĘ
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ 6. MENU HIGHLIGHTS ═══════════════════════ */}
      <section ref={menuSectionRef} id="menu" className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader title="Odkryj Nasze Menu" subtitle="Kliknij kategorię, aby zobaczyć nasze najlepsze danie. Strzałka prowadzi do pełnego menu." label="Nasza kuchnia" />

          {/* Mobile menu categories */}
          <div className="grid grid-cols-2 gap-4 mb-10 lg:hidden">
            {MENU_CATEGORIES.map((cat, i) => {
              const isActive = selectedCat === i;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <div
                    className="rounded-2xl p-4 sm:p-5 cursor-pointer"
                    onClick={() => setSelectedCat(selectedCat === i ? null : i)}
                    style={{
                      backgroundColor: C.card,
                      border: isActive ? `1px solid ${C.gold}` : "1px solid rgba(182,138,58,0.2)",
                      boxShadow: isActive ? "0 8px 32px rgba(182,138,58,0.2)" : "0 8px 32px rgba(0,0,0,0.4)",
                      transition: "border 0.25s, box-shadow 0.25s",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 style={{ fontFamily: C.serif, fontSize: 18, fontWeight: 400, color: isActive ? C.gold : C.cream, transition: "color 0.25s" }}>
                        {cat.name}
                      </h3>
                      <motion.button
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: C.gold }}
                        onClick={(e) => { e.stopPropagation(); navigate("/menu", { state: { category: cat.menuCategory } }); }}
                        aria-label={`Przejdź do ${cat.name}`}
                      >
                        <ArrowRight size={12} color="#0a1612" />
                      </motion.button>
                    </div>
                    <p style={{ fontFamily: C.sans, fontSize: 12, color: "rgba(243,239,234,0.55)", lineHeight: 1.5 }}>
                      {cat.description}
                    </p>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-2 border-t" style={{ borderColor: "rgba(182,138,58,0.2)" }}>
                            <p style={{ fontFamily: C.serif, fontSize: 15, color: C.cream, marginBottom: 4 }}>
                              {cat.highlight.name}
                            </p>
                            <p style={{ fontFamily: C.sans, fontSize: 11, color: "rgba(243,239,234,0.55)", lineHeight: 1.5, marginBottom: 5 }}>
                              {cat.highlight.description}
                            </p>
                            <p style={{ fontFamily: C.serif, fontSize: 15, color: C.gold }}>
                              {cat.highlight.price}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: 3-left / blob / 3-right */}
          <div className="hidden lg:flex items-start justify-center gap-24 mb-12">

            {/* Left column */}
            <div className="flex flex-col gap-28 w-72 flex-shrink-0" style={{ height: "460px", overflow: "visible" }}>
              {MENU_CATEGORIES.slice(0, 2).map((cat, i) => {
                const isActive = selectedCat === i;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div
                      className="rounded-2xl p-6 cursor-pointer"
                      onClick={() => setSelectedCat(selectedCat === i ? null : i)}
                      style={{
                        backgroundColor: C.card,
                        border: isActive ? `1px solid ${C.gold}` : "1px solid rgba(182,138,58,0.2)",
                        boxShadow: isActive ? "0 8px 32px rgba(182,138,58,0.2)" : "0 8px 32px rgba(0,0,0,0.4)",
                        transition: "border 0.25s, box-shadow 0.25s",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 style={{ fontFamily: C.serif, fontSize: 23, fontWeight: 400, color: isActive ? C.gold : C.cream, transition: "color 0.25s" }}>
                          {cat.name}
                        </h3>
                        <motion.button
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: C.gold }}
                          whileHover={{ rotate: 45 }}
                          onClick={(e) => { e.stopPropagation(); navigate("/menu", { state: { category: cat.menuCategory } }); }}
                          aria-label={`Przejdź do ${cat.name}`}
                        >
                          <ArrowRight size={14} color="#0a1612" />
                        </motion.button>
                      </div>
                      <p style={{ fontFamily: C.sans, fontSize: 13, color: "rgba(243,239,234,0.55)", lineHeight: 1.5 }}>
                        {cat.description}
                      </p>
                      <div className="mt-3 h-px w-8" style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 mt-2 border-t" style={{ borderColor: "rgba(182,138,58,0.2)" }}>
                              <p style={{ fontFamily: C.serif, fontSize: 16, color: C.cream, marginBottom: 4 }}>
                                {cat.highlight.name}
                              </p>
                              <p style={{ fontFamily: C.sans, fontSize: 12, color: "rgba(243,239,234,0.55)", lineHeight: 1.5, marginBottom: 5 }}>
                                {cat.highlight.description}
                              </p>
                              <p style={{ fontFamily: C.serif, fontSize: 16, color: C.gold }}>
                                {cat.highlight.price}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Central blob image */}
            <motion.div
              className="relative w-[460px] h-[460px] flex-shrink-0 self-center"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
            >
              <div
                className="absolute inset-0 overflow-hidden shadow-2xl"
                style={{ borderRadius: "40% 60% 70% 30% / 60% 30% 70% 40%", border: `6px solid ${C.gold}` }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedCat ?? -1}
                    src={selectedCat !== null ? MENU_CATEGORIES[selectedCat].highlight.img : DEFAULT_MENU_IMG}
                    alt={selectedCat !== null ? MENU_CATEGORIES[selectedCat].highlight.name : "La Maison Dorée"}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.85)" }}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45 }}
                  />
                </AnimatePresence>
              </div>
              <motion.div
                className="absolute rounded-full"
                style={{ inset: -18, border: `2px dashed ${C.gold}`, opacity: 0.35 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Right column */}
            <div className="flex flex-col gap-28 w-72 flex-shrink-0" style={{ height: "460px", overflow: "visible" }}>
              {MENU_CATEGORIES.slice(2).map((cat, i) => {
                const realIdx = i + 2;
                const isActive = selectedCat === realIdx;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div
                      className="rounded-2xl p-6 cursor-pointer"
                      onClick={() => setSelectedCat(selectedCat === realIdx ? null : realIdx)}
                      style={{
                        backgroundColor: C.card,
                        border: isActive ? `1px solid ${C.gold}` : "1px solid rgba(182,138,58,0.2)",
                        boxShadow: isActive ? "0 8px 32px rgba(182,138,58,0.2)" : "0 8px 32px rgba(0,0,0,0.4)",
                        transition: "border 0.25s, box-shadow 0.25s",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 style={{ fontFamily: C.serif, fontSize: 23, fontWeight: 400, color: isActive ? C.gold : C.cream, transition: "color 0.25s" }}>
                          {cat.name}
                        </h3>
                        <motion.button
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: C.gold }}
                          whileHover={{ rotate: 45 }}
                          onClick={(e) => { e.stopPropagation(); navigate("/menu", { state: { category: cat.menuCategory } }); }}
                          aria-label={`Przejdź do ${cat.name}`}
                        >
                          <ArrowRight size={14} color="#0a1612" />
                        </motion.button>
                      </div>
                      <p style={{ fontFamily: C.sans, fontSize: 13, color: "rgba(243,239,234,0.55)", lineHeight: 1.5 }}>
                        {cat.description}
                      </p>
                      <div className="mt-3 h-px w-8" style={{ background: `linear-gradient(to right, ${C.gold}, transparent)` }} />
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 mt-2 border-t" style={{ borderColor: "rgba(182,138,58,0.2)" }}>
                              <p style={{ fontFamily: C.serif, fontSize: 16, color: C.cream, marginBottom: 4 }}>
                                {cat.highlight.name}
                              </p>
                              <p style={{ fontFamily: C.sans, fontSize: 12, color: "rgba(243,239,234,0.55)", lineHeight: 1.5, marginBottom: 5 }}>
                                {cat.highlight.description}
                              </p>
                              <p style={{ fontFamily: C.serif, fontSize: 16, color: C.gold }}>
                                {cat.highlight.price}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <GoldButton variant="outline" onClick={() => navigate("/menu")}>PEŁNE MENU</GoldButton>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 7. GALLERY ═══════════════════════ */}
      <GallerySection onImageClick={(idx) => setLightboxIdx(idx)} />

      {/* ═══════════════════════ 9. TESTIMONIALS ═══════════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Opinie naszych gości</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
              Co Mówią o Nas
            </h2>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* Large card — spans 2 columns */}
            <motion.div
              className="sm:col-span-2 rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden group"
              style={{ background: `linear-gradient(135deg, ${C.card}, #1a2820)`, borderColor: "rgba(182,138,58,0.2)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="absolute -top-8 -right-8 opacity-10"
                style={{ color: C.gold }}
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Quote className="w-40 h-40" />
              </motion.div>
              <div className="relative z-10 space-y-6">
                <div className="flex gap-1">
                  {[...Array(REVIEWS[0].rating)].map((_, i) => <Star key={i} className="w-5 h-5" style={{ fill: C.gold, color: C.gold }} />)}
                </div>
                <p className="text-lg leading-relaxed" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.9)" }}>
                  "{REVIEWS[0].text}"
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <motion.div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${C.gold}` }} whileHover={{ scale: 1.1, rotate: 5 }}>
                    <img src={REVIEWS[0].image} alt={REVIEWS[0].name} className="w-full h-full object-cover" />
                  </motion.div>
                  <div>
                    <div className="font-medium" style={{ fontFamily: C.sans, color: C.cream }}>{REVIEWS[0].name}</div>
                    <div className="text-sm" style={{ fontFamily: C.sans, color: C.gold }}>{REVIEWS[0].role}</div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, transparent, rgba(182,138,58,0.08))` }} />
            </motion.div>

            {/* Medium cards */}
            {REVIEWS.slice(1, 3).map((review, index) => (
              <motion.div
                key={review.id}
                className="rounded-3xl p-6 border shadow-xl group"
                style={{ backgroundColor: C.card, borderColor: "rgba(182,138,58,0.2)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4" style={{ fill: C.gold, color: C.gold }} />)}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.8)" }}>
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${C.gold}` }}>
                      <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ fontFamily: C.sans, color: C.cream }}>{review.name}</div>
                      <div className="text-xs" style={{ fontFamily: C.sans, color: C.gold }}>{review.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Small cards */}
            {REVIEWS.slice(3).map((review, index) => (
              <motion.div
                key={review.id}
                className="rounded-3xl p-6 border shadow-xl group"
                style={{ backgroundColor: C.card, borderColor: "rgba(182,138,58,0.2)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3" style={{ fill: C.gold, color: C.gold }} />)}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.8)" }}>
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${C.gold}` }}>
                      <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-medium" style={{ fontFamily: C.sans, color: C.cream }}>{review.name}</div>
                      <div style={{ fontSize: 10, fontFamily: C.sans, color: C.gold }}>{review.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 10. HOW IT WORKS ═══════════════════════ */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ borderTop: "1px solid rgba(182,138,58,0.1)", backgroundColor: C.dark }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Rezerwacja</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
              Twój wieczór — uproszczony
            </h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>
              Rezerwacja w La Maison Dorée nie wymaga wysiłku — wystarczy kilka prostych kroków.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-10">
            {[
              { number: "1", title: "Zarezerwuj swój wieczór", description: "Wybierz termin przez system online lub zadzwoń do nas. Kilka kliknięć wystarczy, by zabezpieczyć stolik.", img: "https://images.unsplash.com/photo-1557047081-3f707e5b674f?w=800&q=80", align: "left" },
              { number: "2", title: "Przygotujemy wszystko",   description: "Nasz zespół dopasuje stolik do charakteru wieczoru. Poinformuj nas o preferencjach — stworzymy idealne menu.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", align: "right" },
              { number: "3", title: "Ciesz się wieczorem",     description: "Przyjdź i pozwól nam poprowadzić cały wieczór. Od powitania po imieniu aż po moment pożegnania.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", align: "left" },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${step.align === "right" ? "md:grid-flow-dense" : ""}`}
              >
                {/* Text */}
                <div className={`${step.align === "right" ? "md:col-start-2" : ""} flex items-start gap-5`}>
                  <span className="text-7xl md:text-8xl leading-none flex-shrink-0" style={{ fontFamily: C.serif, color: C.gold }}>
                    {step.number}
                  </span>
                  <div className="pt-3">
                    <h3 className="text-2xl md:text-3xl mb-3 leading-tight" style={{ fontFamily: C.serif, color: C.cream }}>
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.6)" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
                {/* Image */}
                <div className={`${step.align === "right" ? "md:col-start-1 md:row-start-1" : ""} relative overflow-hidden rounded-2xl shadow-2xl h-[200px] sm:h-[220px] md:h-[200px] lg:h-auto lg:aspect-[4/3]`}>
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.3))" }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => navigate("/reserve")}
              className="px-8 py-3 rounded-xl border border-[#B68A3A] bg-[#B68A3A] text-[#0a1612] hover:bg-transparent hover:text-[#B68A3A] transition-colors tracking-widest text-sm"
              style={{ fontFamily: C.sans, fontWeight: 500 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              ZAREZERWUJ STOLIK
            </motion.button>
            <motion.button
              onClick={() => window.location.href = "tel:+48223456789"}
              className="px-8 py-3 rounded-xl border border-[#B68A3A] bg-transparent text-[#B68A3A] hover:bg-[#B68A3A] hover:text-[#0a1612] transition-colors tracking-widest text-sm"
              style={{ fontFamily: C.sans, fontWeight: 500 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              ZADZWOŃ +48 22 345 67 89
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ 11. PRIVATE EVENTS TEASER ═══════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "70vh", borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,23,20,0.5) 0%, rgba(14,23,20,0.75) 50%, rgba(14,23,20,0.95) 100%)" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[70vh] px-6 md:px-12 py-20 max-w-6xl mx-auto">
          {/* Top text */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm uppercase tracking-[0.3em] mb-6" style={{ fontFamily: C.sans, color: C.gold }}>
              Prywatne wydarzenia
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-tight mb-6" style={{ fontFamily: C.serif, color: C.cream }}>
              Wyłącznie<br />dla Ciebie
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.75)", lineHeight: 1.8 }}>
              Od kameralnych kolacji biznesowych po wynajem całego lokalu — oferujemy bespoke private dining z dedykowanym Menadżerem Wydarzeń dla nawet 80 gości.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate("/private-events")}
                className="px-8 py-3 rounded-xl border border-[#B68A3A] bg-[#B68A3A] text-[#0a1612] hover:bg-transparent hover:text-[#B68A3A] transition-colors tracking-widest text-sm"
                style={{ fontFamily: C.sans, fontWeight: 500 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                ODKRYJ WYDARZENIA
              </motion.button>
              <motion.button
                onClick={() => window.location.href = "tel:+48223456789"}
                className="px-8 py-3 rounded-xl border border-[#B68A3A] bg-transparent text-[#B68A3A] hover:bg-[#B68A3A] hover:text-[#0a1612] transition-colors tracking-widest text-sm"
                style={{ fontFamily: C.sans, fontWeight: 500 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                ZADZWOŃ DO NAS
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom stats strip */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { cap: "Do 20", label: "Salon prywatny" },
              { cap: "Do 80", label: "Wynajem całości" },
              { cap: "W cenie", label: "AV i technologia" },
              { cap: "Dedykowany", label: "Menadżer Wydarzeń" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5 text-center"
                style={{ backgroundColor: "rgba(14,23,20,0.7)", border: "1px solid rgba(182,138,58,0.2)", backdropFilter: "blur(12px)" }}
              >
                <p className="text-xl font-light mb-1" style={{ fontFamily: C.serif, color: C.gold }}>{item.cap}</p>
                <p className="text-xs uppercase tracking-wider" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.5)" }}>{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ 12. VISIT US ═══════════════════════ */}
      <section
        id="contact"
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.15)" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Odwiedź nas" label="Lokalizacja" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left — Contact Info */}
            <div className="space-y-8">
              {/* Address */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={20} style={{ color: C.gold }} />
                  <h3
                    className="text-sm uppercase tracking-wider"
                    style={{ fontFamily: C.sans, fontWeight: 500, letterSpacing: "0.1em", color: C.gold }}
                  >
                    Lokalizacja
                  </h3>
                </div>
                <p className="text-sm sm:text-lg leading-relaxed pl-8" style={{ fontFamily: C.sans, fontWeight: 300, color: C.cream }}>
                  ul. Nowy Świat 42<br />
                  00-363 Warszawa
                </p>
              </div>

              {/* Hours */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} style={{ color: C.gold }} />
                  <h3
                    className="text-sm uppercase tracking-wider"
                    style={{ fontFamily: C.sans, fontWeight: 500, letterSpacing: "0.1em", color: C.gold }}
                  >
                    Godziny otwarcia
                  </h3>
                </div>
                <p className="text-sm sm:text-lg leading-relaxed pl-8" style={{ fontFamily: C.sans, fontWeight: 300, color: C.cream }}>
                  Wtorek – Sobota: 18:00 – 22:30<br />
                  Niedziela i poniedziałek: Nieczynne
                </p>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={20} style={{ color: C.gold }} />
                  <h3
                    className="text-sm uppercase tracking-wider"
                    style={{ fontFamily: C.sans, fontWeight: 500, letterSpacing: "0.1em", color: C.gold }}
                  >
                    Kontakt
                  </h3>
                </div>
                <div className="text-sm sm:text-lg leading-relaxed pl-8 space-y-1">
                  <p>
                    <a href="tel:+48223456789" className="hover:underline transition-all duration-200" style={{ fontFamily: C.sans, fontWeight: 300, color: C.gold }}>
                      +48 22 345 67 89
                    </a>
                  </p>
                  <p>
                    <a href="mailto:info@lamaisondoree.pl" className="hover:underline transition-all duration-200" style={{ fontFamily: C.sans, fontWeight: 300, color: C.gold }}>
                      info@lamaisondoree.pl
                    </a>
                  </p>
                </div>
              </div>

              {/* Directions */}
              <div className="pt-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=ul.+Nowy+%C5%9Awiat+42+00-363+Warszawa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-200"
                  style={{
                    fontFamily: C.sans,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    fontSize: "14px",
                    backgroundColor: "rgba(182,138,58,0.1)",
                    color: C.gold,
                    border: "1px solid rgba(182,138,58,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(182,138,58,0.15)";
                    e.currentTarget.style.borderColor = "rgba(182,138,58,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(182,138,58,0.1)";
                    e.currentTarget.style.borderColor = "rgba(182,138,58,0.3)";
                  }}
                >
                  <ExternalLink size={16} />
                  WYZNACZ TRASĘ
                </a>
              </div>
            </div>

            {/* Right — Map */}
            <div
              className="rounded-2xl overflow-hidden relative h-[300px] md:h-[320px] lg:h-[420px]"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Eleganckie wnętrze restauracji"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                style={{ filter: "brightness(0.6)" }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 lg:p-12">
                <MapPin size={64} style={{ color: C.gold, opacity: 0.9 }} className="mb-6" />
                <h3
                  className="text-3xl mb-3"
                  style={{ fontFamily: C.serif, fontWeight: 300, color: C.cream, letterSpacing: "0.02em" }}
                >
                  W sercu Warszawy
                </h3>
                <p
                  className="text-base max-w-md leading-relaxed"
                  style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.9)", lineHeight: 1.7 }}
                >
                  Położone przy eleganckim Nowym Świecie, kilka kroków od Krakowskiego
                  Przedmieścia i Łazienek Królewskich. Doświadcz fine dining w jednej
                  z najbardziej prestiżowych dzielnic Warszawy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 13. NEWSLETTER ═══════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Newsletter</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
              Pozostań w kontakcie
            </h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>
              Ogłoszenia o sezonowych menu, zaproszenia na ekskluzywne wydarzenia i specjalne oferty —
              wysyłane dyskretnie, nie częściej niż dwa razy w miesiącu.
            </p>

            {emailSent ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 text-base"
                style={{ fontFamily: C.sans, fontWeight: 500, color: C.gold }}
              >
                Dziękujemy — jesteś na liście.
              </motion.p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setEmailSent(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mt-8"
              >
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.gold, opacity: 0.6 }} />
                  <input
                    type="email"
                    required
                    placeholder="twój@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-5 py-4 rounded-2xl text-sm outline-none transition-all duration-200"
                    style={{
                      fontFamily: C.sans,
                      backgroundColor: "rgba(243,239,234,0.06)",
                      color: C.cream,
                      border: "1px solid rgba(182,138,58,0.25)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.gold)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(182,138,58,0.25)")}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-7 py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium"
                  style={{ fontFamily: C.sans, backgroundColor: C.gold, color: "#0a1612", letterSpacing: "0.08em" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send size={14} />
                  SUBSKRYBUJ
                </motion.button>
              </form>
            )}

            <p className="text-xs" style={{ fontFamily: C.sans, color: "rgba(243,239,234,0.3)" }}>
              Szanujemy Twoją prywatność. Możesz zrezygnować w każdej chwili.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ 15. FOOTER ═══════════════════════ */}
      <footer className="relative py-16" style={{ backgroundColor: C.dark, borderTop: `1px solid rgba(182,138,58,0.2)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            {/* Logo */}
            <motion.div
              className="text-2xl sm:text-4xl font-light tracking-wide"
              style={{ fontFamily: C.serif, color: C.cream }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              La Maison Dorée
            </motion.div>

            {/* Copyright */}
            <p className="text-xs sm:text-sm tracking-widest text-center" style={{ fontFamily: C.sans, color: "rgba(197,191,181,1)" }}>
              © {new Date().getFullYear()} La Maison Dorée. Wszelkie prawa zastrzeżone.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }, index) => (
                <motion.button
                  key={index}
                  className="w-12 h-12 flex items-center justify-center rounded-lg transition-all"
                  style={{ border: `1px solid ${C.gold}`, color: C.gold, backgroundColor: "transparent" }}
                  whileHover={{ scale: 1.2, rotate: 360, backgroundColor: C.gold, color: "#0a1612" }}
                  transition={{ duration: 0.3 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════ STICKY RESERVATION BAR ═══════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-500 flex items-center justify-center gap-4"
        style={{
          backgroundColor: "rgba(14,23,20,0.95)",
          borderTop: "1px solid rgba(182,138,58,0.25)",
          backdropFilter: "blur(12px)",
          transform: showSticky ? "translateY(0)" : "translateY(100%)",
          opacity: showSticky ? 1 : 0,
        }}
      >
        <p
          className="text-sm hidden sm:block"
          style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.7)" }}
        >
          Gotowy na niezapomniany wieczór?
        </p>
        <button
          onClick={() => navigate("/reserve")}
          className="px-6 py-2 rounded-lg transition-all duration-200 text-sm"
          style={{
            fontFamily: C.sans,
            fontWeight: 500,
            letterSpacing: "0.05em",
            backgroundColor: C.gold,
            color: "#1E1A16",
          }}
        >
          ZAREZERWUJ
        </button>
        <a
          href="tel:+48223456789"
          className="px-6 py-2 rounded-lg transition-all duration-200 text-sm"
          style={{
            fontFamily: C.sans,
            fontWeight: 500,
            letterSpacing: "0.05em",
            backgroundColor: "transparent",
            color: C.gold,
            border: "1px solid rgba(182,138,58,0.4)",
          }}
        >
          ZADZWOŃ
        </a>
      </div>

      {/* ═══════════════════════ LIGHTBOX MODAL ═══════════════════════ */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full transition-colors duration-200"
            style={{ color: C.cream, backgroundColor: "rgba(255,255,255,0.1)" }}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 p-3 rounded-full transition-colors duration-200"
            style={{ color: C.cream, backgroundColor: "rgba(255,255,255,0.1)" }}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 p-3 rounded-full transition-colors duration-200"
            style={{ color: C.cream, backgroundColor: "rgba(255,255,255,0.1)" }}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          <img
            src={GALLERY_IMAGES[lightboxIdx].src.replace("w=800", "w=1400")}
            alt={GALLERY_IMAGES[lightboxIdx].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className="absolute bottom-6 text-center"
            style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)", fontSize: "13px" }}
          >
            {lightboxIdx + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </div>
  );
}