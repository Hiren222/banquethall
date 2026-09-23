'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Sparkles,
  Car,
  UtensilsCrossed,
  Users,
  Mic2,
  Palette,
  Zap,
  KeyRound,
  CheckCircle2,
  X,
  Menu,
  ArrowRight,
  Star,
  ExternalLink,
  Quote,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'wedding' | 'reception' | 'birthday' | 'corporate';
  title: string;
  subtitle: string;
  categoryLabel: string;
  imgSrc: string;
  largeImgSrc: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: '1',
    category: 'wedding',
    title: 'Grand Royal Mandap & Stage',
    subtitle: 'Exquisite fresh florals, crystal chandeliers & regal seating',
    categoryLabel: 'Wedding Setup',
    imgSrc: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    largeImgSrc: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '2',
    category: 'reception',
    title: 'Evening Reception Ballroom',
    subtitle: 'Round table banquet dining with warm candle accents',
    categoryLabel: 'Reception',
    imgSrc: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    largeImgSrc: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '3',
    category: 'corporate',
    title: 'Annual Corporate Gala & Awards',
    subtitle: 'State-of-the-art stage lighting, projector screens & acoustics',
    categoryLabel: 'Corporate Event',
    imgSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    largeImgSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '4',
    category: 'birthday',
    title: 'Milestone Jubilee Celebration',
    subtitle: 'Custom balloon arch, gourmet cake table & photo-booth corner',
    categoryLabel: 'Birthday Party',
    imgSrc: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    largeImgSrc: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '5',
    category: 'wedding',
    title: 'Floral Entrance Arch & Aisle',
    subtitle: 'Romantic pastel blooms, lantern lights & velvet runner',
    categoryLabel: 'Wedding Setup',
    imgSrc: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    largeImgSrc: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '6',
    category: 'reception',
    title: 'Gourmet Catering & Live Counters',
    subtitle: 'Multi-course gourmet delicacies tailored to your tradition',
    categoryLabel: 'Reception',
    imgSrc: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    largeImgSrc: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80',
  },
];

const REVIEWS = [
  {
    author: 'Priya & Rahul Sharma',
    occasion: 'Wedding Ceremony & Reception',
    quote: 'Beautiful venue, great staff, our wedding was absolutely perfect! The decor exceeded all our expectations, and the centralized AC kept everyone so comfortable.',
  },
  {
    author: 'Amit & Shweta Patel',
    occasion: 'Golden Anniversary Gala',
    quote: 'Outstanding catering and prompt valet service. All 400 of our guests complimented the delicious food and royal ambience of the hall.',
  },
  {
    author: 'David Richardson',
    occasion: 'Corporate Annual Conference & Dinner',
    quote: 'The stage acoustic setup and digital sound system were top tier. Smooth transitions, zero power interruptions, and very professional event coordinators.',
  },
  {
    author: 'Sneha & Rohan Kapoor',
    occasion: 'Sangeet & Cocktail Night',
    quote: 'The lighting and grand dance floor made our Sangeet night magical! Highly recommend Banquet Hall to anyone planning their dream wedding.',
  },
  {
    author: 'Meera & Sunita Joshi',
    occasion: '1st Birthday Grand Celebration',
    quote: 'Generous parking space made arrival effortless for our family. The dedicated in-house decoration team created the cutest fairy-tale theme.',
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('100-250');
  const [phoneError, setPhoneError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const filteredGallery = activeFilter === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === activeFilter);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneClean = phoneNumber.trim();
    const phoneRegex = /^[0-9+\-\s()]{8,20}$/;
    if (!phoneRegex.test(phoneClean)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await new Promise(res => setTimeout(res, 900));
      setSubmitSuccess(true);
      setFullName('');
      setPhoneNumber('');
      setEventDate('');
      setEventType('');
    } catch {
      setSubmitError('Unable to submit inquiry at this time. Please contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans antialiased selection:bg-[#F2E4B8] selection:text-[#34080F]">

      {/* STICKY NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <a href="#hero" id="nav-logo" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#34080F] text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/40 shadow-inner group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#220409] block leading-tight">
                  Banquet Hall
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#947219] font-medium block">
                  Luxury Venue &amp; Events
                </span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
              <a href="#hero" id="link-hero" className="hover:text-[#4A0E17] transition-colors py-1">Home</a>
              <a href="#gallery" id="link-gallery" className="hover:text-[#4A0E17] transition-colors py-1">Gallery</a>
              <a href="#amenities" id="link-amenities" className="hover:text-[#4A0E17] transition-colors py-1">Capacity &amp; Amenities</a>
              <a href="#testimonials" id="link-testimonials" className="hover:text-[#4A0E17] transition-colors py-1">Reviews</a>
              <a href="#location" id="link-location" className="hover:text-[#4A0E17] transition-colors py-1">Location</a>
            </nav>

            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#booking"
                id="nav-book-btn"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#4A0E17] hover:bg-[#34080F] shadow-md hover:shadow-lg transition-all border border-[#D4AF37]/30"
              >
                Book Your Date
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                type="button"
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-700 hover:text-[#4A0E17] hover:bg-stone-100 transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-[#4A0E17] hover:bg-stone-50"
            >
              Home
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-[#4A0E17] hover:bg-stone-50"
            >
              Gallery
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-[#4A0E17] hover:bg-stone-50"
            >
              Capacity &amp; Amenities
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-[#4A0E17] hover:bg-stone-50"
            >
              Reviews
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-[#4A0E17] hover:bg-stone-50"
            >
              Location &amp; Map
            </a>
            <div className="pt-2">
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-full text-sm font-semibold text-white bg-[#4A0E17] hover:bg-[#34080F] shadow"
              >
                Book Your Date
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80')" }}
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#220409]/90 via-stone-950/80 to-[#220409]/90" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-20 opacity-75" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/40 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-[#F2E4B8]">
              Premium Event Destination
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
            Banquet Hall
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#F2E4B8] font-light mb-6 drop-shadow">
            &ldquo;Where Every Celebration Becomes a Memory&rdquo;
          </p>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-200 font-light mb-10 leading-relaxed">
            An exquisitely curated ballroom designed for grand weddings, royal receptions, milestone celebrations, and prestigious corporate gatherings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#booking"
              id="hero-book-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white bg-[#4A0E17] hover:bg-[#34080F] border-2 border-[#D4AF37]/70 shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-base flex items-center justify-center gap-2"
            >
              <span>Book Your Date</span>
              <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
            </a>

            <a
              href="https://wa.me/1234567890?text=Hello%20Banquet%20Hall%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20date."
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-btn"
              className="w-full sm:w-auto px-7 py-4 rounded-full font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-base flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-stone-300 text-xs sm:text-sm">
            <div>
              <span className="block text-[#F2E4B8] font-serif text-lg font-bold">1,000+</span>
              <span>Max Capacity</span>
            </div>
            <div>
              <span className="block text-[#F2E4B8] font-serif text-lg font-bold">250+</span>
              <span>Cars Parking</span>
            </div>
            <div>
              <span className="block text-[#F2E4B8] font-serif text-lg font-bold">100%</span>
              <span>Centralized AC</span>
            </div>
            <div>
              <span className="block text-[#F2E4B8] font-serif text-lg font-bold">Gourmet</span>
              <span>In-House Catering</span>
            </div>
          </div>

        </div>
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#FDFBF7] to-transparent z-20" />
      </section>

      {/* 2. GALLERY SECTION */}
      <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F9F4DF] border border-[#EAD38F] mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#715413]">
              Our Visual Showcase
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#220409] mb-4">
            Moments &amp; Setups
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Explore our versatile halls staged for timeless wedding ceremonies, enchanting evening receptions, joyful birthdays, and elite corporate banquets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Celebrations' },
              { id: 'wedding', label: 'Wedding Setup' },
              { id: 'reception', label: 'Reception' },
              { id: 'birthday', label: 'Birthday Party' },
              { id: 'corporate', label: 'Corporate Event' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                id={`filter-${tab.id}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#4A0E17] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGallery.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              id={`gallery-item-${item.id}`}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              onClick={() => setSelectedPhoto(item)}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl bg-stone-100 cursor-pointer aspect-[4/3] transform-gpu will-change-transform"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#220409]/95 via-[#220409]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#220409] rounded-full w-max mb-2 shadow-sm">
                  {item.categoryLabel}
                </span>
                <h3 className="font-serif text-xl font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-stone-200 mt-1 line-clamp-2">{item.subtitle}</p>
                <span className="text-xs text-[#F2E4B8] mt-2 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Click to view full photo &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              id="gallery-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
                onClick={e => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close lightbox"
                  className="absolute top-4 right-4 z-10 p-2 text-white bg-black/60 rounded-full hover:bg-[#4A0E17] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="max-h-[75vh] flex items-center justify-center bg-black">
                  <img
                    src={selectedPhoto.largeImgSrc}
                    alt={selectedPhoto.title}
                    className="max-h-[75vh] w-auto object-contain mx-auto"
                  />
                </div>
                <div className="p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                      {selectedPhoto.categoryLabel}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-white">{selectedPhoto.title}</h4>
                  </div>
                  <a
                    href="#booking"
                    onClick={() => setSelectedPhoto(null)}
                    className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#4A0E17] hover:bg-[#34080F] border border-[#D4AF37]/40 w-fit"
                  >
                    Inquire for This Setup
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. CAPACITY & AMENITIES SECTION */}
      <section id="amenities" className="py-24 bg-[#FAF5EE] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F9F4DF] border border-[#EAD38F] mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#715413]">
                World-Class Facilities
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#220409] mb-4">
              Capacity &amp; Amenities
            </h2>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              From intimate functions of 200 guests to royal assemblies of 1,000+, our infrastructure guarantees flawless comfort and hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/70 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center mb-5 group-hover:bg-[#4A0E17] group-hover:text-[#F2E4B8] transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#220409] mb-2">Air Conditioning</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Centralized high-tonnage climate control ensuring refreshing guest comfort in every season.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/70 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center mb-5 group-hover:bg-[#4A0E17] group-hover:text-[#F2E4B8] transition-colors">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#220409] mb-2">Parking (250+ Capacity)</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Spacious, paved, secure parking zone accommodating 250+ cars and 400+ two-wheelers.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/70 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center mb-5 group-hover:bg-[#4A0E17] group-hover:text-[#F2E4B8] transition-colors">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#220409] mb-2">In-House Catering</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Master chefs crafting tailored multi-cuisine buffets, authentic traditional feasts, and live counters.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/70 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center mb-5 group-hover:bg-[#4A0E17] group-hover:text-[#F2E4B8] transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#220409] mb-2">Capacity (200 / 500 / 1000)</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Modular acoustic partition walls adaptable for 200, 500, or grand gala crowds up to 1,000 guests.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/70 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center mb-5 group-hover:bg-[#4A0E17] group-hover:text-[#F2E4B8] transition-colors">
                <Mic2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#220409] mb-2">Stage &amp; Sound System</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Expansive raised performance stage with digital audio mixing, cordless microphones, and ambient spotlights.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/70 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center mb-5 group-hover:bg-[#4A0E17] group-hover:text-[#F2E4B8] transition-colors">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#220409] mb-2">Decoration Services</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Creative in-house design team delivering bespoke floral arches, royal mandaps, and tailored theme decor.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/70 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center mb-5 group-hover:bg-[#4A0E17] group-hover:text-[#F2E4B8] transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#220409] mb-2">100% Power Backup</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Continuous uninterrupted power backed by automatic heavy-duty silent industrial generators.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-[#D4AF37]/70 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center mb-5 group-hover:bg-[#4A0E17] group-hover:text-[#F2E4B8] transition-colors">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#220409] mb-2">Valet Parking Service</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Courteous, uniformed valet drivers offering seamless vehicle handling directly at the grand entrance.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. TESTIMONIALS (REVIEWS) SECTION - HORIZONTAL SCROLLING */}
      <section id="testimonials" className="py-24 bg-white border-b border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F9F4DF] border border-[#EAD38F] mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#715413]">
                Client Experiences
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#220409] mb-3">
              Celebration Stories &amp; Reviews
            </h2>
            <p className="text-xs sm:text-sm text-[#715413] italic font-medium mb-3">
              (Sample testimonials — replace with real client reviews)
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Hover over any card to pause the continuous horizontal glide.
            </p>
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div className="relative w-full overflow-hidden group py-2">
          {/* Edge Gradients for Smooth In/Out Fade */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-horizontal flex gap-6 px-4">
            {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((item, idx) => (
              <div
                key={idx}
                className="w-[320px] sm:w-[380px] shrink-0 p-6 sm:p-7 rounded-2xl bg-[#FDFBF7] border border-stone-200/90 shadow-sm hover:shadow-md hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-[#D4AF37]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#D4AF37]/40" />
                  </div>
                  <p className="text-stone-700 text-sm sm:text-base italic leading-relaxed mb-6 font-light">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-[#220409] text-base leading-tight">
                      {item.author}
                    </h4>
                    <span className="text-xs text-stone-500 mt-0.5 block">
                      {item.occasion}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#947219] bg-[#F9F4DF] px-2.5 py-1 rounded-full border border-[#EAD38F] shrink-0">
                    Verified Host
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOOKING FORM SECTION */}
      <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#4A0E17] via-[#D4AF37] to-[#4A0E17]" />

          <div className="p-8 sm:p-12 lg:p-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F9F4DF] border border-[#EAD38F] mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#715413]">
                  Inquire &amp; Reserve
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#220409] mb-3">
                Book Your Date
              </h2>
              <p className="text-stone-600 text-sm sm:text-base">
                Tell us about your upcoming celebration. We will verify hall availability and prepare a personalized package tailored to your schedule and guest count.
              </p>
            </div>

            {submitSuccess && (
              <div className="mb-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-emerald-950 mb-1">
                      Inquiry Received Successfully!
                    </h4>
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      Thank you for reaching out to Banquet Hall. Our banquet manager will contact you via phone or WhatsApp within 24 hours to confirm date availability and arrange a private hall tour.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitError && (
              <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
                <p>{submitError}</p>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="full-name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Full Name <span className="text-[#4A0E17]">*</span>
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="full_name"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Evelyn Vance"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#4A0E17] transition-all text-sm bg-stone-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="phone-number" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Phone Number <span className="text-[#4A0E17]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone-number"
                    name="phone_number"
                    required
                    value={phoneNumber}
                    onChange={e => {
                      setPhoneNumber(e.target.value);
                      if (phoneError) setPhoneError(false);
                    }}
                    placeholder="e.g. +1 (555) 234-5678"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#4A0E17] transition-all text-sm bg-stone-50/50"
                  />
                  {phoneError && (
                    <p className="text-xs text-red-600 mt-1">
                      Please enter a valid phone number (minimum 8 digits).
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="event-date" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Event Date <span className="text-[#4A0E17]">*</span>
                  </label>
                  <input
                    type="date"
                    id="event-date"
                    name="event_date"
                    min={todayStr}
                    required
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#4A0E17] transition-all text-sm bg-stone-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="event-type" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Event Type <span className="text-[#4A0E17]">*</span>
                  </label>
                  <select
                    id="event-type"
                    name="event_type"
                    required
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#4A0E17] transition-all text-sm bg-stone-50/50"
                  >
                    <option value="" disabled>Select event category...</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Other">Other Celebration</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="guest-count" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Estimated Guest Count (Optional)
                </label>
                <select
                  id="guest-count"
                  name="guest_count"
                  value={guestCount}
                  onChange={e => setGuestCount(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#4A0E17] transition-all text-sm bg-stone-50/50"
                >
                  <option value="100-250">Intimate Celebration (100 – 250 Guests)</option>
                  <option value="250-500">Medium Grand Gathering (250 – 500 Guests)</option>
                  <option value="500-1000">Grand Assembly (500 – 1,000 Guests)</option>
                  <option value="1000+">Mega Gala (1,000+ Guests)</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  id="submit-booking-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full font-semibold text-white bg-[#4A0E17] hover:bg-[#34080F] border border-[#D4AF37]/40 shadow-lg hover:shadow-xl transition-all text-base flex items-center justify-center gap-2 group disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <span>Check Availability &amp; Request Quote</span>
                  )}
                </button>
                <p className="text-center text-xs text-stone-500 mt-3">
                  We respect your privacy. No spam. A banquet coordinator will contact you promptly.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 6. LOCATION + MAP SECTION */}
      <section id="location" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F9F4DF] border border-[#EAD38F]">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#715413]">
                Visit Our Venue
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#220409] leading-tight">
              Convenient Central Location
            </h2>

            <p className="text-stone-600 text-base leading-relaxed">
              Situated on a prime boulevard with swift highway and airport access, our banquet venue offers seamless transit and abundant on-site parking for all your invitees.
            </p>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide">Venue Address</h4>
                  <p className="text-stone-700 text-base mt-0.5">
                    Banquet Hall, 124 Palace Boulevard,<br />
                    Near Royal Gardens, Central City 400001
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Landmark: Opposite Grand Orchid Hotel, 5 mins from Metro Station
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-full bg-[#4A0E17]/10 text-[#4A0E17] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide">Tour &amp; In-Person Hours</h4>
                  <p className="text-stone-700 text-sm mt-0.5">
                    Monday – Sunday: 10:00 AM – 8:00 PM
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Walk-ins welcome, appointments recommended for private hall tours.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <a
                href="https://maps.google.com/?q=Banquet+Hall+Grand+Ballroom"
                target="_blank"
                rel="noopener noreferrer"
                id="get-directions-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-[#4A0E17] hover:bg-[#34080F] border border-[#D4AF37]/40 shadow-md hover:shadow-lg transition-all text-sm"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden shadow-lg border border-stone-200 relative bg-stone-100">
              <iframe
                id="google-map-iframe"
                title="Banquet Hall Location Map"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7923724128036!2d72.825833!3d19.072833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzIyLjIiTiA3MsKwNDknMzMuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#220409] text-stone-300 border-t border-[#4A0E17]/60 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-14">
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-black/40 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/40">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  Banquet Hall
                </span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Where every celebration becomes a memory. Offering royal ballrooms, bespoke culinary experiences, and full-service event styling for life&apos;s greatest milestones.
              </p>
              <div className="text-xs text-[#D4AF37]/80 font-medium">
                Weddings • Receptions • Anniversaries • Galas
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-[#F2E4B8] mb-4 tracking-wide">Quick Navigation</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#hero" className="text-stone-300 hover:text-[#D4AF37] transition-colors">Home Overview</a></li>
                <li><a href="#gallery" className="text-stone-300 hover:text-[#D4AF37] transition-colors">Event Photo Gallery</a></li>
                <li><a href="#amenities" className="text-stone-300 hover:text-[#D4AF37] transition-colors">Capacity &amp; Amenities</a></li>
                <li><a href="#booking" className="text-stone-300 hover:text-[#D4AF37] transition-colors">Book Your Date</a></li>
                <li><a href="#testimonials" className="text-stone-300 hover:text-[#D4AF37] transition-colors">Sample Reviews</a></li>
                <li><a href="#location" className="text-stone-300 hover:text-[#D4AF37] transition-colors">Location &amp; Directions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-[#F2E4B8] mb-4 tracking-wide">Direct Contact</h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <a href="tel:+1234567890" className="flex items-center gap-3 text-stone-300 hover:text-white group">
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#220409] transition-colors shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span>+1 (234) 567-890</span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://wa.me/1234567890?text=Hello%20Banquet%20Hall%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20date."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-stone-300 hover:text-[#25D366] group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span>Chat on WhatsApp</span>
                  </a>
                </li>

                <li>
                  <a href="mailto:events@banquethall.com" className="flex items-center gap-3 text-stone-300 hover:text-white group">
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#220409] transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span>events@banquethall.com</span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://instagram.com/banquethall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-stone-300 hover:text-pink-400 group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#220409] transition-all shrink-0">
                      <Instagram className="w-4 h-4" />
                    </span>
                    <span>@banquethall</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-[#4A0E17]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <p>&copy; 2026 Banquet Hall. All rights reserved.</p>
            <p className="text-stone-400">
              Designed for memorable weddings, corporate events &amp; milestone celebrations.
            </p>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/1234567890?text=Hello%20Banquet%20Hall%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20date."
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        aria-label="WhatsApp Us"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400" />
        </span>
        <Phone className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-sm pr-1">
          WhatsApp Us
        </span>
      </a>

    </div>
  );
}
