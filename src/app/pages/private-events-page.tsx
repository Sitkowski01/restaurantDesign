import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Users,
  Briefcase,
  Heart,
  Building2,
  ChevronDown,
  Check,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowRight,
  Star,
  Download as _Download,
  X,
  ZoomIn,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import { Navigation } from '../components/navigation';

/* ─── colour map ──────────────────────────────────────────────────── */
/* Figma      → ours                                                   */
/* #C9975B    → #B68A3A   (gold)                                       */
/* #1a1f1a    → #0E1714   (dark)                                       */
/* #0f1511    → #0a1612   (deeper dark)                                */
/* #f5f1e8    → #F3EFEA   (cream)                                      */
/* #b8b5ad    → rgba(243,239,234,0.6)  (muted)                        */

const C = {
  gold: '#B68A3A',
  cream: '#F3EFEA',
  dark: '#0E1714',
  deeper: '#0a1612',
  card: '#182522',
  muted: 'rgba(243,239,234,0.6)',
  serif: 'Cormorant Garamond, serif',
  sans: 'Inter, sans-serif',
};

/* ─── gallery images (same as landing page) ──────────────────────── */
const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80', alt: 'Risotto truflowe' },
  { id: 2, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Elegancka sala jadalna' },
  { id: 3, src: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=800&q=80', alt: 'Wykwintna kuchnia' },
  { id: 4, src: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80', alt: 'Wybór z piwnicy winnej' },
  { id: 5, src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', alt: 'Nakrycie stołu' },
  { id: 6, src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', alt: 'Sztuka deserów' },
  { id: 7, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', alt: 'Bar i lounge' },
  { id: 8, src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80', alt: 'Polędwica wagyu' },
];

/* ─── gallery (same as landing page) ────────────────────────────── */
function GalleryTile({
  image, idx, className = '', onImageClick,
}: { image: { src: string; alt: string }; idx: number; className?: string; onImageClick: (idx: number) => void }) {
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
        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)' }}>
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ border: `2px solid ${C.gold}` }} />
    </motion.button>
  );
}

function GallerySection({ onImageClick }: { onImageClick: (idx: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  return (
    <section ref={containerRef} id="gallery" className="relative py-32 overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Fotografia</span>
            <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>Galeria Smaków</h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>Odkryj wizualną podróż przez nasze kulinarne arcydzieła</p>
        </motion.div>
        <div className="grid grid-cols-4 gap-4" style={{ gridAutoRows: '300px' }}>
          <GalleryTile image={GALLERY_IMAGES[0]} idx={0} className="col-span-2 row-span-2" onImageClick={onImageClick} />
          <GalleryTile image={GALLERY_IMAGES[1]} idx={1} onImageClick={onImageClick} />
          <GalleryTile image={GALLERY_IMAGES[2]} idx={2} onImageClick={onImageClick} />
          <GalleryTile image={GALLERY_IMAGES[3]} idx={3} className="col-span-2 row-span-2" onImageClick={onImageClick} />
          <GalleryTile image={GALLERY_IMAGES[4]} idx={4} onImageClick={onImageClick} />
          <GalleryTile image={GALLERY_IMAGES[5]} idx={5} onImageClick={onImageClick} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export function PrivateEventsPage() {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  const [selectedFormTypes, setSelectedFormTypes] = useState<Set<string>>(new Set());
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [activeHowStep, setActiveHowStep] = useState<number | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImage = useCallback(() => setLightboxIdx((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null)), []);
  const nextImage = useCallback(() => setLightboxIdx((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : null)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, closeLightbox, prevImage, nextImage]);

  const eventTypes = [
    {
      id: 'kolacja',
      icon: Users,
      title: 'Prywatna kolacja',
      subtitle: 'do 20 gości',
      description: 'Kameralne menu degustacyjne dla do 20 gości, celebrujące niezapomniane smaki kuchni.',
      image: 'https://images.unsplash.com/photo-1769638913500-4a0b6ac4561a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwZGluaW5nJTIwcm9vbSUyMGx1eHVyeSUyMHRhYmxlfGVufDF8fHx8MTc3MzkyMTQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'biznesowe',
      icon: Briefcase,
      title: 'Eventy biznesowe',
      subtitle: 'kadra zarządzająca',
      description: 'Luksusowe dla kadry zarządzającej, spotkania klientów i przyjęcia dla inwestorów.',
      image: 'https://images.unsplash.com/photo-1673081752959-addbc864f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBkaW5uZXIlMjBsdXh1cnklMjB2ZW51ZXxlbnwxfHx8fDE3NzM5MjE0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'uroczystosci',
      icon: Heart,
      title: 'Uroczystości',
      subtitle: 'rocznice & zaręczyny',
      description: 'Rocznice, kolacje zaręczynowe i prywatne chwile — razem tworzymy niepowtarzalność.',
      image: 'https://images.unsplash.com/photo-1639947866585-433f2432ce7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMGRpbm5lciUyMGNoYW1wYWduZSUyMHRvYXN0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM5MjE0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'calosc',
      icon: Building2,
      title: 'Wynajęm całości',
      subtitle: 'do 80 osób',
      description: 'Wyłączny dostęp do całej restauracji i baru, dla wydarzeń do 80 osób.',
      image: 'https://images.unsplash.com/photo-1575824244772-e180d5965ce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNsdXNpdmUlMjByZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBkYXJrfGVufDF8fHx8MTc3MzkyMTQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1763645246808-79c2c51d86ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwY2FuZGxlbGlnaHQlMjBhbWJpYW5jZXxlbnwxfHx8fDE3NzM5MjE0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwY2hlZiUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc3MzkyMTQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1562663729-4971d6802f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2luZSUyMGNlbGxhciUyMHNvbW1lbGllcnxlbnwxfHx8fDE3NzM5MjE0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1767745455688-49391131f751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhciUyMGx1eHVyeSUyMGV2ZW5pbmclMjBtb29keXxlbnwxfHx8fDE3NzM5MjE0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const faqs = [
    { question: 'Jaki jest minimalny wydatek na prywatne wydarzenie?', answer: 'Minimalny wydatek różni się w zależności od typu wydarzenia i liczby gości. Dla prywatnych kolacji zaczyna się od 8 000 PLN, dla większych wydarzeń biznesowych od 15 000 PLN, a wynajem całej przestrzeni to minimum 30 000 PLN.' },
    { question: 'Z jakim wyprzedzeniem powinienem zarezerwować?', answer: 'Zalecamy rezerwację minimum 4 tygodnie przed planowanym wydarzeniem. Dla większych imprez lub w szczycie sezonu (wrzesień-grudzień) sugerujemy 8-12 tygodni wcześniej.' },
    { question: 'Jaka jest polityka anulowania i zaliczki?', answer: 'Wymagamy wpłaty zaliczki w wysokości 30% wartości wydarzenia w momencie potwierdzenia rezerwacji. Anulacja do 14 dni przed wydarzeniem zwraca 50% zaliczki. Anulacje w krótszym terminie nie podlegają zwrotowi.' },
    { question: 'Czy mogę przyprowadzić własnego DJ-a, zespół lub artystę?', answer: 'Tak, możesz przyprowadzić własnych artystów lub korzystać z naszej listy zaufanych partnerów. Zapewniamy pełne wsparcie techniczne, w tym ekran 55", system dźwiękowy HDMI oraz Wi-Fi.' },
    { question: 'Czy sprzęt AV jest dostępny dla prezentacji?', answer: 'Tak, wszystkie nasze sale są wyposażone w profesjonalny sprzęt AV. Oferujemy ekran, projektor (w większych salach), nagłośnienie, 2x mikrofon bezprzewodowy oraz pełne wsparcie techniczne.' },
    { question: 'Czy uwzględniacie ograniczenia dietetyczne?', answer: 'Absolutnie. Nasz zespół kulinarny z przyjemnością dostosuje menu do wszelkich wymagań dietetycznych, alergii lub preferencji religijnych. Prosimy poinformować nas o tym podczas rezerwacji.' },
    { question: 'Jakie są opcje obsługi i polityka napojów?', answer: 'Zapewniamy profesjonalną obsługę kelnerską oraz sommelier do dopasowania win. Możesz wybrać spośród naszych gotowych pakietów napojów lub stworzyć własny wybór z naszej obszernej karty win i koktajli.' },
    { question: 'Czy lokal jest dostępny dla osób na wózkach inwalidzkich?', answer: 'Tak, wszystkie nasze przestrzenie są w pełni dostępne dla osób poruszających się na wózkach inwalidzkich. Parking znajduje się 50m od wejścia, a także oferujemy dedykowane miejsca parkingowe dla gości.' },
  ];

  const howSteps = [
    { number: '01', title: 'Wyślij zapytanie', description: 'Wypełnij formularz z wymaganiami wydarzenia. Odpowiemy w ciągu 4 godzin roboczych.', detail: 'Nasz dedykowany koordynator wydarzeń przeanalizuje Twoje potrzeby i zaproponuje wstępne opcje. Możesz także zadzwonić bezpośrednio — chętnie omówimy wszystko telefonicznie.' },
    { number: '02', title: 'Poznaj menedżera wydarzeń', description: 'Bezpłatna konsultacja — rozmowa o menu, analizie budżetu i logistyce — online lub osobiście.', detail: 'Spotkanie trwa ok. 45 minut. Przedstawimy próbne menu, omówimy układ sali, pokażemy sprzęt AV i odpowiemy na wszelkie pytania. Możliwość degustacji dla wydarzeń powyżej 30 osób.' },
    { number: '03', title: 'Skomponuj menu', description: 'Wspólnie z szefem kuchni stworzymy menu idealnie dopasowane do wydarzenia.', detail: 'Chef osobiście przedstawi propozycje sezonowych dań. Uwzględnimy diety gości, preferencje kulinarne oraz pairing z sommelier. Menu finalizujemy 7 dni przed wydarzeniem.' },
    { number: '04', title: 'Potwierdź i ciesz się', description: 'Zadbamy o każdy detal. Wystarczy 30% zaliczki. Resztą zajmiemy się my.', detail: 'W dniu wydarzenia nasz zespół przygotuje przestrzeń na 3h przed przyjęciem gości. Koordynator jest dostępny przez cały wieczór. Po wydarzeniu otrzymasz komplet zdjęć z wieczoru.' },
  ];

  const venues = [
    { name: 'Salon Prywatny', seated: 20, standing: 30, minSpend: '8 000', icon: '◆' },
    { name: 'Główna Sala', seated: 40, standing: 50, minSpend: '15 000', icon: '◆◆' },
    { name: 'Wynajęm całości', seated: 80, standing: 80, minSpend: '30 000', icon: '◆◆◆' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: C.dark }}>
      {/* ═══════════ NAVIGATION (our component) ═══════════ */}
      <Navigation />

      {/* ═══════════ HERO — Cinematic Split ═══════════ */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80"
            alt="Private events"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Diagonal overlay */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(160deg, ${C.dark} 35%, transparent 35.5%, transparent 65%, ${C.dark} 65.5%)`,
          opacity: 0.7,
        }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.dark}, rgba(14,23,20,0.4) 40%, rgba(14,23,20,0.2))` }} />

        {/* Decorative lines */}
        <div className="absolute top-32 left-8 w-px h-32" style={{ background: `linear-gradient(to bottom, transparent, rgba(182,138,58,0.4), transparent)` }} />
        <div className="absolute top-40 left-12 w-px h-20" style={{ background: `linear-gradient(to bottom, transparent, rgba(182,138,58,0.2), transparent)` }} />
        <div className="absolute top-32 right-8 w-px h-32" style={{ background: `linear-gradient(to bottom, transparent, rgba(182,138,58,0.4), transparent)` }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full pb-20 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-12" style={{ backgroundColor: C.gold }} />
                    <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Prywatne wydarzenia</span>
                  </div>

                  <h1 className="leading-[0.9] tracking-tight" style={{ fontFamily: C.serif, color: C.cream, fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
                    Tworzenie
                    <br />
                    <span className="italic" style={{ color: C.gold }}>wyjątkowych</span>
                    <br />
                    chwil
                  </h1>
                </motion.div>
              </div>

              <div className="lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-6"
                >
                  <p className="leading-relaxed" style={{ color: C.muted, fontFamily: C.sans }}>
                    Elegancka przestrzeń na prywatne kolacje, spotkania biznesowe i wyjątkowe uroczystości w sercu Warszawy.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="#zapytanie" className="group flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.15em] transition-all duration-500"
                      style={{ backgroundColor: C.gold, color: C.dark, fontFamily: C.sans }}>
                      ZAPYTAJ O DOSTĘPNOŚĆ
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#przestrzenie" className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.15em] transition-all duration-500"
                      style={{ border: `1px solid rgba(182,138,58,0.4)`, color: C.gold, fontFamily: C.sans }}>
                      ODKRYJ PRZESTRZENIE
                    </a>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <a href="#" className="flex items-center gap-2 text-xs transition-colors" style={{ color: C.muted, fontFamily: C.sans }}>
                      <Download className="w-4 h-4" />
                      Broszura PDF
                    </a>
                    <a href="tel:+48223456789" className="flex items-center gap-2 text-xs transition-colors" style={{ color: C.muted, fontFamily: C.sans }}>
                      <Phone className="w-4 h-4" />
                      +48 22 345 67 89
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-5 h-8 rounded-full flex items-start justify-center p-1" style={{ border: `1px solid rgba(182,138,58,0.4)` }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: C.gold }} />
          </div>
        </motion.div>
      </section>

      {/* ═══════════ TRUSTED BY — Marquee ═══════════ */}
      <section className="py-10 overflow-hidden" style={{ borderTop: `1px solid rgba(182,138,58,0.1)`, borderBottom: `1px solid rgba(182,138,58,0.1)` }}>
        <div className="flex items-center gap-16 animate-marquee-events whitespace-nowrap">
          {['Deloitte', '◆', 'BCG', '◆', 'McKinsey', '◆', 'Goldman Sachs', '◆', 'Google', '◆', 'Deloitte', '◆', 'BCG', '◆', 'McKinsey', '◆', 'Goldman Sachs', '◆', 'Google', '◆'].map((item, i) => (
            <span key={i} className="flex-shrink-0" style={{
              color: item === '◆' ? 'rgba(182,138,58,0.3)' : 'rgba(243,239,234,0.2)',
              fontSize: item === '◆' ? '0.75rem' : '1.125rem',
              fontFamily: item === '◆' ? C.sans : C.serif,
              letterSpacing: '0.1em',
            }}>
              {item}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee-events { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .animate-marquee-events { animation: marquee-events 30s linear infinite; }
        `}</style>
      </section>

      {/* ═══════════ EVENT TYPES ═══════════ */}
      <section className="py-32" id="przestrzenie" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Rodzaje</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
              Cztery sposoby<br />
              <span className="italic">na Twój wieczór</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>
              Każdy typ wydarzenia projektujemy indywidualnie. Wybierz formę, a my dopasujemy resztę.
            </p>
          </motion.div>

          <div className="space-y-4">
            {eventTypes.map((event, index) => {
              const Icon = event.icon;
              const isOpen = selectedEventType === event.id;
              return (
                <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group">
                  <button onClick={() => setSelectedEventType(isOpen ? null : event.id)} className="w-full text-left">
                    <div className="relative border transition-all duration-700 overflow-hidden" style={{
                      borderColor: isOpen ? 'rgba(182,138,58,0.6)' : 'rgba(182,138,58,0.1)',
                      backgroundColor: isOpen ? 'rgba(182,138,58,0.05)' : 'transparent',
                    }}>
                      <div className="flex items-center justify-between px-8 py-7">
                        <div className="flex items-center gap-8">
                          <span className="text-xs font-mono tracking-wider" style={{ color: 'rgba(182,138,58,0.3)' }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors"
                            style={{ borderColor: 'rgba(182,138,58,0.2)', color: C.gold }}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-2xl transition-colors" style={{ fontFamily: C.serif, color: isOpen ? C.gold : C.cream }}>
                              {event.title}
                            </h3>
                            <span className="text-xs tracking-wider uppercase" style={{ color: C.muted, fontFamily: C.sans }}>{event.subtitle}</span>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} style={{ color: C.gold }} />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0 border border-t-0" style={{ borderColor: 'rgba(182,138,58,0.2)' }}>
                          <div className="relative h-64 md:h-80">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, rgba(14,23,20,0.6))` }} />
                          </div>
                          <div className="p-10 flex flex-col justify-center" style={{ backgroundColor: C.dark }}>
                            <p className="leading-relaxed mb-6" style={{ color: C.muted, fontFamily: C.sans }}>{event.description}</p>
                            <a href="#zapytanie" className="inline-flex items-center gap-2 text-sm transition-all hover:gap-3" style={{ color: C.gold, fontFamily: C.sans }}>
                              Zapytaj o ten typ wydarzenia <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ VENUE CAPACITY ═══════════ */}
      <section className="py-32 relative" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${C.gold} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Przestrzenie</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
              Znajdź idealne miejsce
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <motion.div key={venue.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.15 }} className="group relative">
                <div className="relative border transition-all duration-700 p-10 overflow-hidden" style={{ borderColor: 'rgba(182,138,58,0.15)' }}>
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-px" style={{ backgroundColor: 'rgba(182,138,58,0.4)' }} />
                  <div className="absolute top-0 left-0 h-8 w-px" style={{ backgroundColor: 'rgba(182,138,58,0.4)' }} />
                  <div className="absolute bottom-0 right-0 w-8 h-px" style={{ backgroundColor: 'rgba(182,138,58,0.4)' }} />
                  <div className="absolute bottom-0 right-0 h-8 w-px" style={{ backgroundColor: 'rgba(182,138,58,0.4)' }} />

                  <div className="text-center space-y-8">
                    <div>
                      <span className="text-2xl tracking-[0.5em]" style={{ color: 'rgba(182,138,58,0.3)' }}>{venue.icon}</span>
                    </div>
                    <h3 className="text-2xl transition-colors" style={{ fontFamily: C.serif, color: C.cream }}>
                      {venue.name}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(182,138,58,0.1)' }}>
                        <span className="text-sm" style={{ color: C.muted, fontFamily: C.sans }}>Siedzenia</span>
                        <span className="text-xl" style={{ color: C.cream, fontFamily: C.serif }}>do {venue.seated}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(182,138,58,0.1)' }}>
                        <span className="text-sm" style={{ color: C.muted, fontFamily: C.sans }}>Stojąco</span>
                        <span className="text-xl" style={{ color: C.cream, fontFamily: C.serif }}>do {venue.standing}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: C.muted, fontFamily: C.sans }}>Min. wydatek</span>
                        <span className="text-xl" style={{ color: C.gold, fontFamily: C.serif }}>{venue.minSpend} PLN</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <a href="#zapytanie" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-all hover:gap-3" style={{ color: C.gold, fontFamily: C.sans }}>
                        ZAPYTAJ <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: 'rgba(182,138,58,0.1)' }}>
            {[
              { label: 'Sprzęt AV', desc: 'Projektor, ekrany, mikrofony' },
              { label: 'Wi-Fi', desc: 'Szybkie łącze dedykowane' },
              { label: 'Dostępność', desc: 'Parter, bez barier' },
              { label: 'Obsługa', desc: 'Dedykowany koordynator' },
            ].map((feat) => (
              <div key={feat.label} className="p-6 text-center" style={{ backgroundColor: C.dark }}>
                <p className="text-xs tracking-widest mb-1" style={{ color: C.gold, fontFamily: C.sans }}>{feat.label}</p>
                <p className="text-xs" style={{ color: C.muted, fontFamily: C.sans }}>{feat.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS — Wavy Timeline ═══════════ */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-24">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Proces</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>Jak to działa</h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>Od pierwszego zapytania do wydarzenia — cztery proste kroki.</p>
          </motion.div>

          <div className="relative">
            {/* Central wavy dashed SVG line */}
            <svg className="absolute left-1/2 -translate-x-1/2 top-0 h-full hidden md:block" width="60" viewBox="0 0 60 800" fill="none" preserveAspectRatio="none" style={{ height: '100%' }}>
              <path d="M30 0 C 50 100, 10 200, 30 300 C 50 400, 10 500, 30 600 C 50 700, 10 800, 30 900"
                stroke={C.gold} strokeWidth="1.5" strokeDasharray="8 8" strokeOpacity="0.35" fill="none" />
            </svg>

            <div className="space-y-8 md:space-y-0">
              {howSteps.map((step, index) => {
                const isOpen = activeHowStep === index;
                const isLeft = index % 2 === 0;
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative md:pb-12">
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 z-10">
                      <button
                        onClick={() => setActiveHowStep(isOpen ? null : index)}
                        className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 cursor-pointer"
                        style={{
                          borderColor: C.gold,
                          backgroundColor: isOpen ? C.gold : C.dark,
                          transform: isOpen ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        <span className="text-xs font-mono tracking-wider" style={{ color: isOpen ? C.dark : C.gold }}>
                          {step.number}
                        </span>
                      </button>
                    </div>

                    <div className={`md:grid md:grid-cols-2 md:gap-20 ${isLeft ? '' : 'md:direction-rtl'}`}>
                      <div className={`${isLeft ? 'md:text-right md:pr-4' : 'md:col-start-2 md:text-left md:pl-4'}`}>
                        <button onClick={() => setActiveHowStep(isOpen ? null : index)} className="w-full text-left md:text-inherit">
                          <div className="flex md:hidden items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all"
                              style={{ borderColor: C.gold, backgroundColor: isOpen ? C.gold : 'transparent' }}>
                              <span className="text-xs font-mono" style={{ color: isOpen ? C.dark : C.gold }}>{step.number}</span>
                            </div>
                            <h3 className="text-2xl" style={{ fontFamily: C.serif, color: C.cream }}>{step.title}</h3>
                          </div>
                          <h3 className="hidden md:block text-2xl mb-2 transition-colors" style={{ fontFamily: C.serif, color: C.cream }}>{step.title}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: C.muted, fontFamily: C.sans }}>{step.description}</p>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                              <div className="mt-4 p-6" style={{ border: `1px solid rgba(182,138,58,0.2)`, backgroundColor: 'rgba(182,138,58,0.05)' }}>
                                <p className="text-sm leading-relaxed" style={{ direction: 'ltr', color: C.muted, fontFamily: C.sans }}>{step.detail}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ INQUIRY FORM ═══════════ */}
      <section id="zapytanie" className="py-32 relative overflow-hidden" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-5 gap-0 border overflow-hidden" style={{ borderColor: 'rgba(182,138,58,0.2)' }}>
            {/* Left image strip */}
            <div className="relative lg:col-span-2 h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwY2hlZiUyMHBsYXRpbmclMjBnb3VybWV0fGVufDF8fHx8MTc3MzkyMTQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Chef"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(14,23,20,0.5), ${C.deeper})` }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,23,20,0.85) 0%, rgba(14,23,20,0.4) 50%, transparent 100%)' }} />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-2xl italic leading-snug" style={{ fontFamily: C.serif, color: C.cream, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                  "Każde wydarzenie jest wyjątkowe — i tak je traktujemy."
                </p>
                <p className="text-xs mt-3 tracking-widest" style={{ color: C.gold, fontFamily: C.sans }}>— SZEF KUCHNI MARC DUBOIS</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-8 lg:p-12" style={{ backgroundColor: C.deeper }}>
              <div className="mb-10">
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
                  <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>Kontakt</span>
                  <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>Zapytaj o wydarzenie</h2>
                <p className="text-base leading-relaxed mt-6" style={{ fontFamily: C.sans, fontWeight: 300, color: "rgba(243,239,234,0.6)" }}>Odpowiemy w ciągu 4 godzin roboczych.</p>
              </div>

              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>IMIĘ I NAZWISKO *</label>
                    <input type="text" placeholder="Jan Kowalski" className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none transition-colors"
                      style={{ border: `1px solid rgba(182,138,58,0.2)`, color: C.cream, fontFamily: C.sans }}
                      onFocus={e => e.currentTarget.style.borderColor = C.gold}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(182,138,58,0.2)'} />
                  </div>
                  <div>
                    <label className="block mb-2 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>FIRMA</label>
                    <input type="text" placeholder="Opcjonalnie" className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none transition-colors"
                      style={{ border: `1px solid rgba(182,138,58,0.2)`, color: C.cream, fontFamily: C.sans }}
                      onFocus={e => e.currentTarget.style.borderColor = C.gold}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(182,138,58,0.2)'} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>E-MAIL *</label>
                    <input type="email" placeholder="jan@firma.pl" className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none transition-colors"
                      style={{ border: `1px solid rgba(182,138,58,0.2)`, color: C.cream, fontFamily: C.sans }}
                      onFocus={e => e.currentTarget.style.borderColor = C.gold}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(182,138,58,0.2)'} />
                  </div>
                  <div>
                    <label className="block mb-2 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>TELEFON *</label>
                    <input type="tel" placeholder="+48 ..." className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none transition-colors"
                      style={{ border: `1px solid rgba(182,138,58,0.2)`, color: C.cream, fontFamily: C.sans }}
                      onFocus={e => e.currentTarget.style.borderColor = C.gold}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(182,138,58,0.2)'} />
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>RODZAJ WYDARZENIA *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'prywatna-kolacja', label: 'Prywatna kolacja' },
                      { id: 'eventy-biznesowe', label: 'Biznesowe' },
                      { id: 'uroczystosci', label: 'Uroczystości' },
                      { id: 'wynajem-calosc', label: 'Wynajem całości' },
                    ].map((type) => {
                      const isSelected = selectedFormTypes.has(type.id);
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            setSelectedFormTypes(prev => {
                              const next = new Set(prev);
                              if (next.has(type.id)) next.delete(type.id);
                              else next.add(type.id);
                              return next;
                            });
                          }}
                          className="relative px-4 py-3.5 text-xs tracking-wide text-center transition-all duration-300 cursor-pointer"
                          style={{
                            fontFamily: C.sans,
                            color: isSelected ? C.dark : C.cream,
                            backgroundColor: isSelected ? C.gold : 'transparent',
                            border: `1px solid ${isSelected ? C.gold : 'rgba(182,138,58,0.25)'}`,
                          }}
                        >
                          {isSelected && (
                            <span className="absolute top-1.5 right-2 text-[10px]" style={{ color: C.dark }}>✓</span>
                          )}
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div className="relative">
                    <label className="block mb-2 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>LICZBA GOŚCI</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 pr-10 bg-transparent text-sm focus:outline-none transition-colors appearance-none"
                        style={{ border: `1px solid rgba(182,138,58,0.2)`, color: C.cream, fontFamily: C.sans }}>
                        <option style={{ backgroundColor: C.dark }}>Zakres</option>
                        <option style={{ backgroundColor: C.dark }}>10-20</option>
                        <option style={{ backgroundColor: C.dark }}>20-40</option>
                        <option style={{ backgroundColor: C.dark }}>40-60</option>
                        <option style={{ backgroundColor: C.dark }}>60-80</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: C.gold }} />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>DATA</label>
                    <input type="date" className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none transition-colors"
                      style={{ border: `1px solid rgba(182,138,58,0.2)`, color: C.cream, fontFamily: C.sans, colorScheme: 'dark' }}
                      onFocus={e => e.currentTarget.style.borderColor = C.gold}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(182,138,58,0.2)'} />
                  </div>
                  <div className="relative">
                    <label className="block mb-2 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>GODZINA</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 pr-10 bg-transparent text-sm focus:outline-none transition-colors appearance-none"
                        style={{ border: `1px solid rgba(182,138,58,0.2)`, color: C.cream, fontFamily: C.sans }}>
                        <option style={{ backgroundColor: C.dark }}>Wybierz</option>
                        <option style={{ backgroundColor: C.dark }}>12:00</option>
                        <option style={{ backgroundColor: C.dark }}>14:00</option>
                        <option style={{ backgroundColor: C.dark }}>18:00</option>
                        <option style={{ backgroundColor: C.dark }}>19:00</option>
                        <option style={{ backgroundColor: C.dark }}>20:00</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: C.gold }} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-xs tracking-widest" style={{ color: C.muted, fontFamily: C.sans }}>WIADOMOŚĆ</label>
                  <textarea rows={4} placeholder="Opisz swoje wydarzenie..." className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none transition-colors resize-none"
                    style={{ border: `1px solid rgba(182,138,58,0.2)`, color: C.cream, fontFamily: C.sans }}
                    onFocus={e => e.currentTarget.style.borderColor = C.gold}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(182,138,58,0.2)'} />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="privacy" className="w-4 h-4 mt-0.5" style={{ accentColor: C.gold }} />
                  <label htmlFor="privacy" className="text-xs leading-relaxed" style={{ color: C.muted, fontFamily: C.sans }}>
                    Wyrażam zgodę na przetwarzanie danych zgodnie z{' '}
                    <a href="#" className="underline" style={{ color: C.gold }}>Polityką prywatności</a>. *
                  </label>
                </div>

                <motion.button type="submit" className="w-full py-4 text-xs tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-500"
                  style={{ backgroundColor: C.gold, color: C.dark, fontFamily: C.sans }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <Mail className="w-4 h-4" />
                  WYŚLIJ ZAPYTANIE
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY (same as landing page) ═══════════ */}
      <GallerySection onImageClick={(idx) => setLightboxIdx(idx)} />

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-32 relative" style={{ backgroundColor: C.dark, borderTop: "1px solid rgba(182,138,58,0.1)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: C.gold, fontFamily: C.sans }}>FAQ</span>
              <div className="h-px w-8" style={{ backgroundColor: `${C.gold}80` }} />
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]" style={{ fontFamily: C.serif, color: C.cream }}>
              Najczęściej zadawane pytania
            </h2>
          </motion.div>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}
                className="border-b" style={{ borderColor: 'rgba(182,138,58,0.1)' }}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-0 py-6 flex items-center justify-between text-left group">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono w-6" style={{ color: 'rgba(182,138,58,0.3)' }}>{String(index + 1).padStart(2, '0')}</span>
                    <span className="transition-colors" style={{ color: openFaq === index ? C.gold : C.cream, fontFamily: C.sans }}>
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-500"
                    style={{
                      borderColor: openFaq === index ? C.gold : 'rgba(182,138,58,0.2)',
                      backgroundColor: openFaq === index ? C.gold : 'transparent',
                    }}>
                    <ChevronDown className={`w-4 h-4 transition-all duration-500 ${openFaq === index ? 'rotate-180' : ''}`}
                      style={{ color: openFaq === index ? C.dark : C.gold }} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                      <div className="pb-6 pl-12">
                        <p className="leading-relaxed text-sm" style={{ color: C.muted, fontFamily: C.sans }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER (same as landing page) ═══════════ */}
      <footer className="relative py-16" style={{ backgroundColor: C.dark, borderTop: `1px solid rgba(182,138,58,0.2)` }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.div className="text-4xl font-light tracking-wide" style={{ fontFamily: C.serif, color: C.cream }} whileHover={{ scale: 1.05, rotate: -2 }}>
              La Maison Dorée
            </motion.div>
            <p className="text-sm tracking-widest" style={{ fontFamily: C.sans, color: 'rgba(197,191,181,1)' }}>
              © {new Date().getFullYear()} La Maison Dorée. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
              ].map(({ icon: Icon, label }, index) => (
                <motion.button key={index} className="w-12 h-12 flex items-center justify-center rounded-lg transition-all"
                  style={{ border: `1px solid ${C.gold}`, color: C.gold, backgroundColor: 'transparent' }}
                  whileHover={{ scale: 1.2, rotate: 360, backgroundColor: C.gold, color: C.deeper }}
                  transition={{ duration: 0.3 }}
                  aria-label={label}>
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════ LIGHTBOX ═══════════ */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.92)' }} onClick={closeLightbox}>
              <button onClick={closeLightbox} className="absolute top-6 right-6 p-2 rounded-full" style={{ color: C.cream, backgroundColor: 'rgba(255,255,255,0.1)' }} aria-label="Close">
                <X size={24} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 md:left-8 p-3 rounded-full" style={{ color: C.cream, backgroundColor: 'rgba(255,255,255,0.1)' }} aria-label="Previous">
                <ChevronLeft size={28} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 md:right-8 p-3 rounded-full" style={{ color: C.cream, backgroundColor: 'rgba(255,255,255,0.1)' }} aria-label="Next">
                <ChevronRight size={28} />
              </button>
              <img src={GALLERY_IMAGES[lightboxIdx].src.replace('w=800', 'w=1400')} alt={GALLERY_IMAGES[lightboxIdx].alt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
              <div className="absolute bottom-6 text-center" style={{ fontFamily: C.sans, fontWeight: 300, color: 'rgba(243,239,234,0.6)', fontSize: '13px' }}>
                {lightboxIdx + 1} / {GALLERY_IMAGES.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
