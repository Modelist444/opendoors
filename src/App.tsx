import { useState, useRef } from 'react';
import {
  Star,
  Clock,
  Calendar,
  Play,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Info,
  Copy,
  Check,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Radio,
  Tv,
  Flame,
  BookOpen
} from 'lucide-react';

interface FeaturedSermon {
  title: string;
  date: string;
  url: string;
}

interface HeroSlide {
  id: string;
  badge: string;
  host: string;
  location: string;
  title: string;
  description: string;
  actionText: string;
  actionType: 'sermon' | 'info' | 'giving' | 'zoom';
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'sots-weekly',
    badge: 'FAITH | PROPHECY | MIRACLES',
    host: 'Apostle Babs Adewunmi',
    location: 'Plateau Hotel Novel Suites, Jos',
    title: 'School of the Spirit',
    description: 'Kingdom prophetic & apostolic equipping platform located in Jos, Plateau State, Nigeria. Empowering sons to walk in divine dominion, supernatural revelation, and apostolic authority every Monday.',
    actionText: 'Listen Live',
    actionType: 'sermon',
  },
  {
    id: 'inwas-annual',
    badge: 'AUGUST ANNUALLY • JOS, NIGERIA',
    host: 'Apostle Babs Adewunmi',
    location: 'Rayfield, Novel Suites, Jos',
    title: 'International New Wine Apostolic Summit',
    description: 'A global apostolic convergence bringing together ministers and seekers worldwide for deep spiritual activation, divine alignment, and heavenly encounters.',
    actionText: 'Summit Details',
    actionType: 'info',
  },
  {
    id: 'prophetic-declarations',
    badge: '2024 PROPHETIC DECLARATIONS',
    host: 'Apostle Babs Adewunmi',
    location: 'Shift in Dimensions',
    title: 'Acceleration & Divine Outpouring',
    description: '"There is an acceleration of time coming. What used to take years will now manifest in months. A wave of supernatural wisdom and creative solutions is released from this altar."',
    actionText: 'Read Declarations',
    actionType: 'info',
  },
  {
    id: 'midnight-watch',
    badge: 'TUESDAYS & WEDNESDAYS • 11:00 PM',
    host: 'Zoom ID: 449 399 7238 • Passcode: WATCH',
    location: 'Online Prayer Altar',
    title: 'The Midnight Watch & Prayer Surges',
    description: 'Join Apostle Babs Adewunmi for midnight intercession, breaking spiritual strongholds, and stepping into apostolic intimacy on Zoom.',
    actionText: 'Join Zoom Watch',
    actionType: 'zoom',
  },
  {
    id: 'featured-message',
    badge: 'FEATURED SERMON • JAN 14, 2024',
    host: 'Apostle Babs Adewunmi',
    location: 'Plateau Hotel Novel Suites, Jos',
    title: 'Trading Floors in the Spirit',
    description: 'Unveiling deep spiritual realms, kingdom covenants, heavenly transactions, and standing victorious in spiritual warfare.',
    actionText: 'Watch Sermon',
    actionType: 'sermon',
  }
];

const SERMONS: FeaturedSermon[] = [
  {
    title: 'Trading floors in the spirit',
    date: 'Jan 14, 2024',
    url: 'https://youtu.be/BfkjnxHoaCI',
  },
  {
    title: 'The Power Of Prayer',
    date: 'Jan 07, 2024',
    url: 'https://youtu.be/HeK4pi9UJds',
  },
  {
    title: 'Understanding Grace',
    date: 'Dec 31, 2023',
    url: 'https://youtu.be/arUzp_nTT1c',
  },
  {
    title: 'The Anointing Within',
    date: 'Dec 24, 2023',
    url: 'https://youtu.be/GZspjZ7i-p0',
  },
  {
    title: 'Walking in Victory',
    date: 'Dec 17, 2023',
    url: 'https://www.youtube.com/live/DftCov46sJM',
  },
  {
    title: 'Divine Encounters',
    date: 'Dec 10, 2023',
    url: 'https://youtu.be/gZeXk9n5PFA',
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [activeModal, setActiveModal] = useState<'sermon' | 'info' | 'giving' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    triggerToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      triggerToast(isMuted ? 'Audio Unmuted' : 'Audio Muted');
    }
  };

  const navLinks = [
    { name: 'Events', modal: 'info', tab: 'Events', delay: '100ms' },
    { name: 'Sermons', modal: 'sermon', tab: 'Sermons', delay: '150ms' },
    { name: 'Declarations', modal: 'info', tab: 'Declarations', delay: '200ms' },
    { name: 'Giving', modal: 'giving', tab: 'Giving', delay: '250ms' },
    { name: 'Contact', modal: 'info', tab: 'Contact', delay: '300ms' },
  ];

  const filteredSermons = SERMONS.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main id="hero-main-container" className="relative w-screen h-screen overflow-hidden bg-black text-white flex flex-col justify-between select-none font-sans">
      {/* BACKGROUND VIDEO */}
      <video
        id="bg-hero-video"
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
      />

      {/* BOTTOM BLUR OVERLAY (no gradient darkening) */}
      <div
        id="bottom-blur-overlay"
        className="fixed inset-0 w-full h-full z-[1] pointer-events-none backdrop-blur-xl bottom-blur-mask"
      />

      {/* NAVBAR */}
      <header id="main-navbar" className="relative z-50 w-full px-4 sm:px-6 md:px-12 py-4 md:py-6 flex items-center justify-between">
        {/* Left: Text Logo */}
        <div id="brand-logo-container" className="flex items-center gap-3">
          <a
            id="brand-logo"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveModal('info');
              setActiveTab('Overview');
            }}
            className="animate-blur-fade-up h-8 md:h-10 flex items-center font-bold tracking-[0.2em] text-lg sm:text-2xl text-white uppercase hover:opacity-80 transition-opacity"
            style={{ animationDelay: '0ms' }}
          >
            SPIRIT AGENCY <span className="text-xs sm:text-sm font-light text-gray-400 ml-2 tracking-normal hidden sm:inline">/ NEW WINE SOTS</span>
          </a>
        </div>

        {/* Center: Desktop Navigation Links (hidden below lg) */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              id={`nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => {
                setActiveTab(link.tab);
                setActiveModal(link.modal as 'sermon' | 'info' | 'giving');
              }}
              className={`animate-blur-fade-up text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                activeTab === link.tab && activeModal !== null ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
              style={{ animationDelay: link.delay }}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right: Search, Giving, Mute Control & Hamburger Toggle */}
        <div id="navbar-actions-right" className="flex items-center gap-3 md:gap-4">
          {/* Mute toggle indicator button */}
          <button
            id="audio-toggle-btn"
            onClick={toggleMute}
            className="animate-blur-fade-up w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
            style={{ animationDelay: '300ms' }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-emerald-400" />}
          </button>

          {/* Quick Giving button */}
          <button
            id="giving-btn-desktop"
            onClick={() => setActiveModal('giving')}
            className="animate-blur-fade-up hidden sm:flex items-center gap-2 rounded-full liquid-glass px-4 md:px-5 py-2 text-sm font-medium text-white hover:bg-white/10 transition-all cursor-pointer"
            style={{ animationDelay: '350ms' }}
          >
            <CreditCard size={16} className="text-amber-400" />
            <span>Giving / Accounts</span>
          </button>

          {/* Search button (visible sm and up) */}
          <button
            id="search-btn-desktop"
            onClick={() => setSearchOpen(!searchOpen)}
            className="animate-blur-fade-up hidden sm:flex items-center justify-center w-10 h-10 rounded-full liquid-glass text-white hover:bg-white/10 transition-all cursor-pointer"
            style={{ animationDelay: '400ms' }}
            aria-label="Search Messages & Information"
          >
            <Search size={18} />
          </button>

          {/* Hamburger Menu Toggle (visible only below lg) */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="animate-blur-fade-up lg:hidden w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white relative cursor-pointer"
            style={{ animationDelay: '350ms' }}
            aria-label="Toggle Mobile Navigation"
          >
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                mobileMenuOpen ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100 rotate-0'
              }`}
            >
              <Menu size={18} />
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                mobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'
              }`}
            >
              <X size={18} />
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU DROPDOWN (below lg breakpoint) */}
      <div
        id="mobile-menu-dropdown"
        className={`absolute top-[72px] left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-12 z-40 lg:hidden transition-all duration-500 ease-out transform ${
          mobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div id="mobile-menu-card" className="bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl rounded-2xl p-4 sm:p-6 space-y-2">
          {navLinks.map((link, idx) => (
            <button
              key={link.name}
              id={`mobile-nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => {
                setActiveTab(link.tab);
                setActiveModal(link.modal as 'sermon' | 'info' | 'giving');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left block py-3 px-4 rounded-lg text-sm font-medium transition-all text-gray-200 hover:bg-gray-800/50 hover:text-white"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </button>
          ))}

          {/* Below sm, also show Search and Giving buttons */}
          <div id="mobile-menu-bottom-actions" className="block sm:hidden border-t border-gray-800 pt-4 mt-3 space-y-3">
            <button
              id="mobile-search-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-full liquid-glass py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <Search size={18} />
              <span>Search Sermons & Info</span>
            </button>
            <button
              id="mobile-giving-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal('giving');
              }}
              className="w-full flex items-center justify-center gap-2 rounded-full liquid-glass py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <CreditCard size={18} className="text-amber-400" />
              <span>Bank Account Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH BAR MODAL OVERLAY */}
      {searchOpen && (
        <div id="search-modal-overlay" className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md transition-opacity">
          <div id="search-modal-box" className="w-full max-w-xl bg-gray-900/95 border border-gray-700/60 rounded-2xl p-4 shadow-2xl liquid-glass">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-gray-400" />
              <input
                id="search-input-field"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sermons, events, contact hotlines, bank details..."
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-base sm:text-lg"
                autoFocus
              />
              <button
                id="close-search-modal-btn"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800 text-xs sm:text-sm text-gray-300 space-y-2 max-h-80 overflow-y-auto">
              <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Sermons & Resources</p>
              {filteredSermons.map((sermon, i) => (
                <a
                  key={i}
                  href={sermon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg hover:bg-white/10 flex items-center justify-between transition-colors block"
                >
                  <div className="flex items-center gap-2">
                    <Tv size={16} className="text-amber-400 shrink-0" />
                    <span className="font-medium text-white">{sermon.title}</span>
                  </div>
                  <span className="text-xs text-gray-400">{sermon.date}</span>
                </a>
              ))}
              <div
                className="p-2.5 rounded-lg hover:bg-white/10 cursor-pointer flex items-center justify-between"
                onClick={() => {
                  setSearchOpen(false);
                  setActiveModal('giving');
                }}
              >
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-emerald-400 shrink-0" />
                  <span className="font-medium text-white">Bank Account Details (TAJBank & GTBank Domiciliary)</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">View</span>
              </div>
              <div
                className="p-2.5 rounded-lg hover:bg-white/10 cursor-pointer flex items-center justify-between"
                onClick={() => {
                  setSearchOpen(false);
                  setActiveModal('info');
                  setActiveTab('Contact');
                }}
              >
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-400 shrink-0" />
                  <span className="font-medium text-white">Contact Hotlines & Abuja Office</span>
                </div>
                <span className="text-xs text-blue-400 font-medium">View</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO CONTENT CONTAINER (bottom of viewport) */}
      <div id="hero-content-wrapper" className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16 z-10 relative">
        <div id="hero-grid-layout" className="flex flex-col md:flex-row items-end justify-between gap-8">
          
          {/* LEFT SIDE: Metadata, Title, Description, CTA buttons */}
          <div id="hero-left-column" className="flex-1 max-w-3xl">
            
            {/* Metadata row */}
            <div
              id="hero-metadata-row"
              key={`meta-${currentSlide.id}`}
              className="animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-4 md:mb-6 text-xs sm:text-sm text-white/90"
              style={{ animationDelay: '300ms' }}
            >
              <div id="meta-item-badge" className="flex items-center gap-1.5 font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span>{currentSlide.badge}</span>
              </div>
              <div id="meta-item-host" className="flex items-center gap-1.5 text-gray-300">
                <Flame size={16} className="text-orange-400" />
                <span>{currentSlide.host}</span>
              </div>
              <div id="meta-item-location" className="flex items-center gap-1.5 text-gray-300 hidden sm:flex">
                <MapPin size={16} className="text-rose-400" />
                <span>{currentSlide.location}</span>
              </div>
            </div>

            {/* Title */}
            <h1
              id="hero-title"
              key={`title-${currentSlide.id}`}
              className="animate-blur-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] mb-4 md:mb-6 text-white leading-[0.98]"
              style={{ animationDelay: '400ms' }}
            >
              {currentSlide.title}
            </h1>

            {/* Description */}
            <p
              id="hero-description"
              key={`desc-${currentSlide.id}`}
              className="animate-blur-fade-up text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-2xl leading-relaxed font-light"
              style={{ animationDelay: '500ms' }}
            >
              {currentSlide.description}
            </p>

            {/* CTA Buttons Row */}
            <div id="hero-cta-buttons" className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Primary CTA */}
              <button
                id="cta-btn-primary"
                onClick={() => {
                  if (currentSlide.actionType === 'zoom') {
                    window.open('https://us02web.zoom.us/j/4493997238?pwd=N2p2eXl3ZUFGdUpXS2k1dXUwZHNJZz09', '_blank');
                  } else if (currentSlide.actionType === 'sermon') {
                    setActiveModal('sermon');
                  } else {
                    setActiveModal('info');
                    setActiveTab('Overview');
                  }
                }}
                className="animate-blur-fade-up bg-white text-black rounded-full font-semibold px-6 sm:px-8 py-3 flex items-center gap-2.5 hover:bg-gray-200 transition-all transform active:scale-95 cursor-pointer shadow-xl text-sm sm:text-base"
                style={{ animationDelay: '600ms' }}
              >
                <Play size={18} className="fill-black text-black" />
                <span>{currentSlide.actionText}</span>
              </button>

              {/* Learn More Button */}
              <button
                id="cta-btn-learn-more"
                onClick={() => {
                  setActiveModal('info');
                  setActiveTab('Overview');
                }}
                className="animate-blur-fade-up rounded-full font-semibold liquid-glass px-6 sm:px-8 py-3 flex items-center gap-2 text-white hover:bg-white/10 transition-all transform active:scale-95 cursor-pointer text-sm sm:text-base"
                style={{ animationDelay: '700ms' }}
              >
                <Info size={18} />
                <span>Platform Details</span>
              </button>

              {/* Direct Waystream Radio button */}
              <a
                id="cta-btn-waystream"
                href="https://app.waystream.io/newwinesots"
                target="_blank"
                rel="noopener noreferrer"
                className="animate-blur-fade-up rounded-full liquid-glass px-4 sm:px-5 py-3 flex items-center gap-2 text-xs sm:text-sm text-emerald-400 hover:bg-emerald-500/10 transition-all cursor-pointer"
                style={{ animationDelay: '750ms' }}
                title="Waystream Live Audio Radio"
              >
                <Radio size={16} className="animate-pulse" />
                <span className="hidden sm:inline">Waystream Live</span>
              </a>
            </div>

          </div>

          {/* RIGHT SIDE: Navigation arrows */}
          <div id="hero-right-column" className="flex items-center gap-3 self-start md:self-end">
            <button
              id="nav-arrow-prev"
              onClick={handlePrev}
              className="animate-blur-fade-up w-12 h-12 sm:w-14 sm:h-14 rounded-full liquid-glass flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer transform active:scale-95"
              style={{ animationDelay: '800ms' }}
              aria-label="Previous Feature"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              id="nav-arrow-next"
              onClick={handleNext}
              className="animate-blur-fade-up w-12 h-12 sm:w-14 sm:h-14 rounded-full liquid-glass flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer transform active:scale-95"
              style={{ animationDelay: '900ms' }}
              aria-label="Next Feature"
            >
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      </div>

      {/* SERMONS & MEDIA MODAL */}
      {activeModal === 'sermon' && (
        <div id="sermons-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div id="sermons-modal-content" className="relative w-full max-w-4xl bg-gray-900/95 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 sm:p-8 border-b border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Featured Messages</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Apostle Babs Adewunmi Sermons</h2>
              </div>
              <button
                id="close-sermons-modal-btn"
                onClick={() => setActiveModal(null)}
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERMONS.map((sermon, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-xs text-amber-400 font-medium">{sermon.date}</span>
                      <h4 className="text-lg font-semibold text-white mt-1">{sermon.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">Preached by Apostle Babs Adewunmi</p>
                    </div>
                    <a
                      href={sermon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors self-start"
                    >
                      <Play size={14} className="fill-black" />
                      <span>Watch on YouTube</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div>
                  <h4 className="font-semibold text-white text-base">Waystream Live Audio Radio</h4>
                  <p className="text-xs text-emerald-300">Tune into live audio broadcast for ongoing School of the Spirit meetings.</p>
                </div>
                <a
                  href="https://app.waystream.io/newwinesots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0 flex items-center gap-2"
                >
                  <Radio size={16} />
                  <span>Open Waystream</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GIVING & BANK ACCOUNT DETAILS MODAL */}
      {activeModal === 'giving' && (
        <div id="giving-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div id="giving-modal-content" className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              id="close-giving-modal-btn"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">Kingdom Investment & Giving</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">Bank Account Details</h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Support New Wine School of the Spirit & Landed Property Project in Rayfield, Jos.</p>
            </div>

            {/* Local Naira Account */}
            <div className="p-5 rounded-2xl bg-white/5 border border-amber-400/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Local Naira Account</span>
                <span className="text-xs text-gray-400">TAJBank</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Account Name: <strong className="text-white">I-New Wine</strong></p>
                <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="font-mono text-lg font-bold text-amber-300">0001470168</span>
                  <button
                    onClick={() => copyToClipboard('0001470168', 'Naira Account Number')}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  >
                    {copiedKey === 'Naira Account Number' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedKey === 'Naira Account Number' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-400 italic mt-1">Note: Subsidiary of ARTOFINSERVE LTD (Landed Property Project)</p>
              </div>
            </div>

            {/* GTBank Domiciliary Accounts */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">GTBank Domiciliary Accounts (Foreign Transfers)</span>
                <span className="text-xs text-gray-400">Account Name: Adewunmi B.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Dollar */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                  <span className="text-xs text-gray-400">USD ($) Account</span>
                  <span className="font-mono text-sm font-bold text-white my-1">0665688697</span>
                  <button
                    onClick={() => copyToClipboard('0665688697', 'USD Domiciliary Account')}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 self-start cursor-pointer mt-1"
                  >
                    <Copy size={12} /> Copy USD
                  </button>
                </div>

                {/* Euro */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                  <span className="text-xs text-gray-400">EUR (€) Account</span>
                  <span className="font-mono text-sm font-bold text-white my-1">0665688714</span>
                  <button
                    onClick={() => copyToClipboard('0665688714', 'EUR Domiciliary Account')}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 self-start cursor-pointer mt-1"
                  >
                    <Copy size={12} /> Copy EUR
                  </button>
                </div>

                {/* GBP */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                  <span className="text-xs text-gray-400">GBP (£) Account</span>
                  <span className="font-mono text-sm font-bold text-white my-1">0665688707</span>
                  <button
                    onClick={() => copyToClipboard('0665688707', 'GBP Domiciliary Account')}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 self-start cursor-pointer mt-1"
                  >
                    <Copy size={12} /> Copy GBP
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <strong>Transfer Reference Note:</strong> Please include reference <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-amber-300">"#glory generation 500"</span> or <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-amber-300">"#land property"</span> when making transfers.
              </div>
            </div>

            {/* Landed Property Project */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
              <span className="font-semibold text-white">📍 Rayfield Land Property Project:</span>
              <p className="text-gray-300">6 plots of land acquired for 15 Million Naira opposite the new Government House Complex, Rayfield, Jos.</p>
            </div>
          </div>
        </div>
      )}

      {/* INFORMATION MODAL (Overview, Events, Declarations, Contact) */}
      {activeModal === 'info' && (
        <div id="info-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div id="info-modal-content" className="relative w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              id="close-info-modal-btn"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-4">
              {['Overview', 'Events', 'Declarations', 'Contact', 'Digital Channels'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'Overview' && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">🕊️ Identity & Mission</span>
                  <h3 className="text-2xl font-bold text-white mt-1">New Wine School of the Spirit / Spirit Agency</h3>
                  <p className="text-xs text-amber-400 font-medium">Slogan: Faith | Prophecy | Miracles</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Led by <strong>Apostle Babs Adewunmi</strong>, New Wine School of the Spirit is a Kingdom prophetic & apostolic equipping platform located in Jos, Plateau State, Nigeria. It serves as an altar of revival, spiritual alignment, deep intercession, and divine illumination.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400 block font-semibold uppercase">Primary Coordinator</span>
                    <span className="text-base font-bold text-white">Apostle Babs Adewunmi</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400 block font-semibold uppercase">Meeting Location</span>
                    <span className="text-sm font-semibold text-white">Plateau Hotel Novel Suites, Rayfield, Jos</span>
                  </div>
                </div>
              </div>
            )}

            {/* EVENTS TAB */}
            {activeTab === 'Events' && (
              <div className="space-y-4">
                <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">📅 Weekly & Annual Gatherings</span>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h4 className="font-bold text-white text-base">1. School of the Spirit (SOTS)</h4>
                    <p className="text-xs text-gray-300"><strong>When:</strong> Every Monday</p>
                    <p className="text-xs text-gray-300"><strong>Where:</strong> Plateau Hotel Novel Suites, Rayfield, Jos</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h4 className="font-bold text-white text-base">2. Midnight Watch</h4>
                    <p className="text-xs text-gray-300"><strong>When:</strong> Tuesdays & Wednesdays at 11:00 PM</p>
                    <p className="text-xs text-gray-300"><strong>Where:</strong> Zoom (Meeting ID: <span className="font-mono text-amber-300">449 399 7238</span>, Passcode: <span className="font-mono text-amber-300">WATCH</span>)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h4 className="font-bold text-white text-base">3. Prayer Surges</h4>
                    <p className="text-xs text-gray-300"><strong>When:</strong> Monthly</p>
                    <p className="text-xs text-gray-300"><strong>Where:</strong> Rayfield, Novel Suites, Jos</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h4 className="font-bold text-white text-base">4. Healing Streams</h4>
                    <p className="text-xs text-gray-300"><strong>When:</strong> February & September (Bi-annual)</p>
                    <p className="text-xs text-gray-300"><strong>Where:</strong> Rayfield, Novel Suites, Jos</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h4 className="font-bold text-white text-base">5. International New Wine Apostolic Summit (I-NWAS)</h4>
                    <p className="text-xs text-gray-300"><strong>When:</strong> August Annually</p>
                    <p className="text-xs text-gray-300"><strong>Where:</strong> Rayfield, Novel Suites, Jos</p>
                  </div>
                </div>
              </div>
            )}

            {/* DECLARATIONS TAB */}
            {activeTab === 'Declarations' && (
              <div className="space-y-4">
                <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">⚡ 2024 Prophetic Declarations</span>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-amber-400/20 space-y-2">
                    <h4 className="font-bold text-amber-300 text-base">Shift in Dimensions</h4>
                    <p className="text-xs text-gray-200 italic leading-relaxed">
                      "There is an acceleration of time coming. What used to take years will now manifest in months. The veil between heaven and earth is thinning for those who seek the secret place."
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-amber-400/20 space-y-2">
                    <h4 className="font-bold text-amber-300 text-base">Divine Outpouring</h4>
                    <p className="text-xs text-gray-200 italic leading-relaxed">
                      "I see a wave of creativity hitting the youth. New songs, new sounds, and new inventions that will solve global crises will emerge from this house as you prioritize My presence."
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-amber-400/20 space-y-2">
                    <h4 className="font-bold text-amber-300 text-base">The Reapers' Call</h4>
                    <p className="text-xs text-gray-200 italic leading-relaxed">
                      "The harvest is no longer in the distance; it is at your door. I am releasing a fresh anointing for bold evangelism. Signs and wonders will follow your 'yes' to the streets."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'Contact' && (
              <div className="space-y-4">
                <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">📞 Contact Channels & Hotlines</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-gray-400 block font-semibold">Primary Email</span>
                    <a href="mailto:newwinesots@gmail.com" className="text-white hover:underline flex items-center gap-1.5 font-medium">
                      <Mail size={14} className="text-amber-400" /> newwinesots@gmail.com
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-gray-400 block font-semibold">Alternative Email</span>
                    <a href="mailto:info@newwinesots.org" className="text-white hover:underline flex items-center gap-1.5 font-medium">
                      <Mail size={14} className="text-amber-400" /> info@newwinesots.org
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-gray-400 block font-semibold">General Enquiries</span>
                    <a href="tel:+2348065570604" className="text-white hover:underline flex items-center gap-1.5 font-medium">
                      <Phone size={14} className="text-emerald-400" /> +234 806 557 0604
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-gray-400 block font-semibold">Attendees Outside Jos</span>
                    <a href="tel:+2348101938603" className="text-white hover:underline flex items-center gap-1.5 font-medium">
                      <Phone size={14} className="text-emerald-400" /> +234 810 193 8603
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-gray-400 block font-semibold">Abuja Zone 6 Office</span>
                    <a href="tel:+2348032148453" className="text-white hover:underline flex items-center gap-1.5 font-medium">
                      <Phone size={14} className="text-blue-400" /> +234 803 214 8453
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-gray-400 block font-semibold">Abuja Alt Hotline</span>
                    <a href="tel:+2348033589532" className="text-white hover:underline flex items-center gap-1.5 font-medium">
                      <Phone size={14} className="text-blue-400" /> +234 803 358 9532
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-400 font-semibold block">General Hotline</span>
                    <span className="text-lg font-bold text-white">0815 765 7776</span>
                  </div>
                  <a href="tel:08157657776" className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-gray-200">Call Now</a>
                </div>
              </div>
            )}

            {/* DIGITAL CHANNELS TAB */}
            {activeTab === 'Digital Channels' && (
              <div className="space-y-4">
                <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">🌐 Digital Streams & Channels</span>
                <div className="space-y-3 text-xs">
                  <a
                    href="https://us02web.zoom.us/j/4493997238?pwd=N2p2eXl3ZUFGdUpXS2k1dXUwZHNJZz09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors flex items-center justify-between block"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">Zoom Midnight Watch</h4>
                      <p className="text-gray-300">Meeting ID: <span className="font-mono text-amber-300">449 399 7238</span> | Passcode: <span className="font-mono text-amber-300">WATCH</span></p>
                    </div>
                    <ExternalLink size={16} className="text-amber-400" />
                  </a>

                  <a
                    href="https://t.me/newwinesots"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition-colors flex items-center justify-between block"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">Telegram Channel</h4>
                      <p className="text-gray-300">t.me/newwinesots</p>
                    </div>
                    <ExternalLink size={16} className="text-blue-400" />
                  </a>

                  <a
                    href="https://app.waystream.io/newwinesots"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors flex items-center justify-between block"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">Waystream (Live Audio Broadcast)</h4>
                      <p className="text-gray-300">app.waystream.io/newwinesots</p>
                    </div>
                    <Radio size={16} className="text-emerald-400" />
                  </a>

                  <a
                    href="https://www.youtube.com/channel/UCv6NRsMslWfI-1jhFy5NF-g/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-rose-400/40 transition-colors flex items-center justify-between block"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">Official YouTube Channel</h4>
                      <p className="text-gray-300">Watch full audio & video sermons</p>
                    </div>
                    <Tv size={16} className="text-rose-400" />
                  </a>

                  <a
                    href="https://newineapp.wordpress.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition-colors flex items-center justify-between block"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">Legacy Blog & Archives</h4>
                      <p className="text-gray-300">newineapp.wordpress.com</p>
                    </div>
                    <BookOpen size={16} className="text-purple-400" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div id="toast-notification" className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full liquid-glass text-xs sm:text-sm font-medium text-white shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles size={14} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}


