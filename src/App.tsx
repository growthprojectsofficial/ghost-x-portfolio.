import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Laptop, ShoppingBag, Layout, RefreshCw, Smartphone, 
  CreditCard, Wrench, CheckCircle2, ChevronDown, Star, ArrowUpRight, 
  Sparkles, Shield, Zap, Heart, MessageSquare
} from 'lucide-react';

// --- Interfaces & Data ---
interface Project {
  title: string;
  category: string;
  desktopImg: string;
  mobileImg: string;
  color: string;
  link: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
  avatar: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const SERVICES: Service[] = [
  { icon: <Laptop className="w-6 h-6" />, title: "Business Websites", desc: "Sleek, highly authoritative websites engineered to project brand prestige and acquire clients." },
  { icon: <ShoppingBag className="w-6 h-6" />, title: "E-commerce Stores", desc: "High-conversion digital storefronts built with fluid interfaces and optimized transaction funnels." },
  { icon: <Layout className="w-6 h-6" />, title: "Landing Pages", desc: "Hyper-focused, pixel-perfect lead capture pages calibrated for high conversion rates." },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Website Redesign", desc: "Complete overhaul of existing platforms into modern, speed-optimized digital experiences." },
  { icon: <Smartphone className="w-6 h-6" />, title: "Responsive Design", desc: "Flawless screen adaptability constructed with fluid layouts for any device screen." },
  { icon: <CreditCard className="w-6 h-6" />, title: "Payment Gateway Integration", desc: "Secure, reliable, and smooth checkout architectures supporting global payment networks." },
  { icon: <Wrench className="w-6 h-6" />, title: "Website Maintenance", desc: "Proactive, reliable post-launch upkeep, backup cycles, security updates, and performance tuning." }
];

const PROJECTS: Project[] = [
  {
    title: "Aura Haute Couture",
    category: "Luxury E-Commerce Mockup",
    desktopImg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    mobileImg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
    color: "from-[#a21caf] to-[#6366f1]",
    link: "#"
  },
  {
    title: "Zenith Intelligence",
    category: "SaaS Enterprise Interface",
    desktopImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    mobileImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    color: "from-[#0ea5e9] to-[#8b5cf6]",
    link: "#"
  },
  {
    title: "Veloce Automotive",
    category: "Interactive Customizer Showcase",
    desktopImg: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    mobileImg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
    color: "from-[#ef4444] to-[#f97316]",
    link: "#"
  },
  {
    title: "Novus Spatial Design",
    category: "Architecture & Portfolio Site",
    desktopImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    mobileImg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
    color: "from-[#10b981] to-[#3b82f6]",
    link: "#"
  }
];

const VALUES: ValueCard[] = [
  { icon: <Sparkles className="text-violet-400" />, title: "Modern UI/UX", desc: "Sleek typography, subtle gradients, and functional elegance tailored to captivate." },
  { icon: <Zap className="text-amber-400" />, title: "Fast Delivery", desc: "Carefully structured sprints ensuring clean deployments strictly within scheduled timelines." },
  { icon: <Smartphone className="text-blue-400" />, title: "Mobile Responsive", desc: "Exquisite interface performance scaled meticulously from widescreen displays to smartphones." },
  { icon: <Layout className="text-emerald-400" />, title: "Clean Code", desc: "Production-ready, highly organized TypeScript/React components optimized for long-term maintainability." },
  { icon: <Shield className="text-indigo-400" />, title: "Reliable Support", desc: "Direct, transparent communication and post-launch guarantees for uninterrupted service." },
  { icon: <Heart className="text-rose-400" />, title: "Attention to Detail", desc: "Subtle micro-interactions, precise alignments, and crisp asset optimizations." }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alexander Mercer",
    role: "Director, Mercer Group Ltd.",
    text: "The web interface built by Ghost X completely re-established our online presence. Our inquiry rate increased significantly, and client confidence is at an all-time high.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Elena Rostova",
    role: "Founder, Zenith Studios",
    text: "Meticulous design, seamless animations, and clean layouts. Ghost X operates with a level of design mastery that is rare to find in freelance development.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Marcus Vance",
    role: "Product Lead, Valo Technologies",
    text: "Our product landing page is lightning fast and visually breathtaking. Ghost X turned complex requirements into a smooth, elegant, and modern masterpiece.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const FAQS: FAQItem[] = [
  { q: "How long does a website take to build?", a: "Depending on size and functional complexity, typical luxury portfolios or landing pages take 1-2 weeks, while advanced e-commerce platforms or custom business websites take 3-5 weeks." },
  { q: "Can you redesign my existing website?", a: "Yes. I can audit your legacy platform for structural, visual, and performance issues, transforming it into a high-converting, responsive modern framework." },
  { q: "Do you build online stores?", a: "Absolutely. I construct elegant e-commerce platforms tailored with optimized checkout structures, secure gateways, and fluid catalog browsing." },
  { q: "Can I request revisions?", a: "Yes. Every project includes structured feedback iterations within the design and staging phases to ensure the final product perfectly matches your vision." }
];

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Loading Screen Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for sticky nav highlighting
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'portfolio', 'why-me', 'testimonials', 'faq', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center z-50 select-none">
        <div className="relative flex flex-col items-center">
          {/* Ambient Glow */}
          <div className="absolute w-40 h-40 bg-violet-600/20 blur-3xl rounded-full -top-10" />
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-3xl font-extrabold tracking-[0.4em] uppercase mb-4 z-10 font-sans"
          >
            Ghost <span className="text-violet-500">X</span>
          </motion.div>
          
          <div className="w-48 h-[2px] bg-neutral-900 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-neutral-500 tracking-widest mt-2">{progress}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased relative overflow-x-hidden selection:bg-violet-500 selection:text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-10 w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-10 w-[600px] h-[600px] bg-emerald-950/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-400 transform-origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- Sticky Header --- */}
      <header className="fixed top-0 left-0 w-full z-40 bg-neutral-950/70 backdrop-blur-md border-b border-neutral-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
            <span className="text-xl font-extrabold tracking-[0.2em] text-white">
              GHOST <span className="text-violet-500 transition-colors group-hover:text-violet-400">X</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['about', 'services', 'portfolio', 'why-me', 'faq', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollTo(sect)}
                className={`text-xs uppercase tracking-widest transition-colors relative py-1 ${
                  activeSection === sect ? 'text-violet-400' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {sect.replace('-', ' ')}
                {activeSection === sect && (
                  <motion.span 
                    layoutId="activeTab" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex">
            <button 
              onClick={() => scrollTo('contact')}
              className="relative group px-5 py-2.5 rounded-full overflow-hidden bg-neutral-900 border border-neutral-800 text-xs uppercase tracking-widest font-semibold text-white hover:border-violet-500/50 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              Get In Touch
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-neutral-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a] border-b border-neutral-900 absolute top-20 left-0 w-full overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['about', 'services', 'portfolio', 'why-me', 'faq', 'contact'].map((sect) => (
                  <button
                    key={sect}
                    onClick={() => scrollTo(sect)}
                    className="text-left text-sm uppercase tracking-widest text-neutral-300 hover:text-violet-400 transition-colors"
                  >
                    {sect.replace('-', ' ')}
                  </button>
                ))}
                <button 
                  onClick={() => scrollTo('contact')}
                  className="w-full text-center py-3 bg-violet-600 hover:bg-violet-700 text-white text-xs uppercase tracking-widest rounded-lg transition-colors font-bold"
                >
                  Contact Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-950/30 border border-violet-800/30 text-xs text-violet-300 w-fit tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" /> Web Designer & Frontend Developer
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans"
            >
              Creating Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-emerald-400">
                Digital Real Estate
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-neutral-400 text-base sm:text-lg max-w-xl leading-relaxed font-light"
            >
              Hi, I am <strong className="text-neutral-200 font-semibold">Ghost X</strong>. I build elegant, hyper-responsive websites and fluid interfaces for modern brands demanding pristine design and rapid performance.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button 
                onClick={() => scrollTo('portfolio')}
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs uppercase tracking-widest font-bold rounded-full overflow-hidden transition-all shadow-lg shadow-violet-500/10 flex items-center gap-2"
              >
                View My Work 
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 bg-transparent border border-neutral-800 text-xs uppercase tracking-widest font-bold text-neutral-300 rounded-full hover:bg-neutral-900 hover:text-white hover:border-neutral-700 transition-all"
              >
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Hero Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end select-none"
          >
            {/* Ambient Backglow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-emerald-500/10 rounded-3xl blur-2xl" />
            
            {/* Visual Panel Mockup */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] bg-[#0c0c0c] border border-neutral-800/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700" />
              
              {/* Fake Window Header */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] text-neutral-600 tracking-widest font-mono">ghostx.studio</span>
              </div>

              {/* Mock Code Output / Abstract Visual */}
              <div className="flex-1 flex flex-col justify-center space-y-4 py-6 font-mono">
                <div className="space-y-1.5 text-xs text-neutral-500">
                  <p><span className="text-violet-400">const</span> developer = <span className="text-emerald-400">"Ghost X"</span>;</p>
                  <p><span className="text-violet-400">const</span> skills = [</p>
                  <p className="pl-4"><span className="text-amber-400">"React + Tailwind CSS"</span>,</p>
                  <p className="pl-4"><span className="text-amber-400">"Premium UI/UX Design"</span>,</p>
                  <p className="pl-4"><span className="text-amber-400">"Framer Motion"</span></p>
                  <p>];</p>
                </div>

                <div className="w-full bg-neutral-900/60 rounded-lg p-3 border border-neutral-800/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-neutral-400 tracking-wider">Optimized for production</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">100/100 Speed</span>
                </div>
              </div>

              {/* Custom micro card showing interactive dynamic elements */}
              <div className="border-t border-neutral-900 pt-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 tracking-wide uppercase">Engineered With</span>
                  <span className="text-xs font-semibold text-neutral-300">Absolute Precision</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-violet-950/40 border border-violet-800/40 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5">
            <span className="text-xs tracking-[0.2em] text-violet-500 font-semibold uppercase">The Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight font-sans">
              Bridging Artistic Intuition <br /> & Pure Code
            </h2>
            <p className="text-neutral-400 font-light mt-6 leading-relaxed">
              I view the browser as an open canvas for high-end digital experiences. Far beyond just simple templates, I deliver uniquely structured digital identities crafted to match top-tier brand expectations.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="text-neutral-400 font-light text-base leading-relaxed mb-8">
              Every client has custom needs, and standard designs often fail to project proper brand value. I work meticulously on details such as spatial symmetry, custom typographic hierarchy, responsive physics, and code optimizations to deliver an immersive and clean user journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Modern Business Websites",
                "High-Conversion Landing Pages",
                "Luxury Portfolio Interfaces",
                "E-Commerce Architectures",
                "Adaptive Responsive Systems"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/30 border border-neutral-800/40"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs tracking-wider text-neutral-300 uppercase">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-violet-500 font-semibold uppercase">What I Deliver</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-sans tracking-tight">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-neutral-400 text-sm mt-4 font-light leading-relaxed">
            I craft tailored digital infrastructures mapped strictly around your strategic business objectives. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-[#090909] border border-neutral-900 rounded-xl p-8 hover:border-neutral-800 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="w-12 h-12 rounded-lg bg-violet-950/30 border border-violet-800/20 flex items-center justify-center text-violet-400 mb-6 group-hover:text-white group-hover:bg-violet-600 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">{service.title}</h3>
                <p className="text-neutral-400 text-xs font-light mt-3 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-violet-500 font-semibold uppercase">Concept Work</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-sans tracking-tight">
            Curated Design Showcase
          </h2>
          <p className="text-neutral-400 text-sm mt-4 font-light leading-relaxed">
            A selection of beautiful, conceptual projects engineered to showcase layout mastery, responsive precision, and visual depth.
          </p>
        </div>

        <div className="space-y-16">
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center bg-[#070707] border border-neutral-900 rounded-2xl p-8 lg:p-12 overflow-hidden relative group`}
            >
              {/* Backglow */}
              <div className={`absolute -inset-10 bg-gradient-to-tr ${project.color} opacity-0 group-hover:opacity-[0.03] blur-3xl transition-opacity duration-700 pointer-events-none`} />

              {/* Text side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-[10px] font-bold tracking-widest text-violet-400 uppercase">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  Engineered strictly from scratch using React, Framer Motion, and Tailwind CSS. Responsive mechanics ensure a rich client journey on both screen structures.
                </p>
                <div className="flex gap-4 pt-4">
                  <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 uppercase tracking-widest rounded-full">
                    React
                  </span>
                  <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 uppercase tracking-widest rounded-full">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 uppercase tracking-widest rounded-full">
                    Framer Motion
                  </span>
                </div>
              </div>

              {/* Preview Graphics side */}
              <div className="w-full lg:w-1/2 flex justify-center relative h-[300px] sm:h-[400px]">
                {/* Desktop Preview */}
                <div className="absolute w-[80%] aspect-[16/10] bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden left-0 top-4 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                  <img 
                    src={project.desktopImg} 
                    alt={`${project.title} Desktop View`} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-950/25 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Mobile Preview */}
                <div className="absolute w-[28%] aspect-[9/18] bg-neutral-950 border-2 border-neutral-800 rounded-xl shadow-2xl overflow-hidden right-4 bottom-4 z-10 transition-transform duration-500 group-hover:translate-y-1 group-hover:-rotate-1">
                  <img 
                    src={project.mobileImg} 
                    alt={`${project.title} Mobile View`} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-950/25 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE ME SECTION --- */}
      <section id="why-me" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-violet-500 font-semibold uppercase">The Standard</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-sans tracking-tight">
            Why Partner With Ghost X?
          </h2>
          <p className="text-neutral-400 text-sm mt-4 font-light leading-relaxed">
            I prioritize high-caliber deliverables and structural reliability over mass production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((val, idx) => (
            <div 
              key={idx}
              className="bg-[#090909] border border-neutral-900 rounded-xl p-8 hover:bg-neutral-900/40 hover:border-neutral-800/80 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6">
                {val.icon}
              </div>
              <h3 className="text-base font-semibold text-white tracking-wide uppercase">{val.title}</h3>
              <p className="text-neutral-400 text-xs font-light mt-3 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonials" className="py-24 px-6 max-w-5xl mx-auto border-t border-neutral-900/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-violet-500 font-semibold uppercase">Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-sans tracking-tight">
            Client Perspectives
          </h2>
          <p className="text-neutral-400 text-sm mt-4 font-light leading-relaxed">
            Honest feedback from collaborative digital conceptualizations.
          </p>
        </div>

        {/* Testimonial Display Area */}
        <div className="relative min-h-[300px] flex items-center justify-center bg-[#070707] border border-neutral-900 rounded-2xl p-8 sm:p-12 overflow-hidden">
          <div className="absolute top-4 left-6 text-7xl text-neutral-800/40 select-none font-serif">“</div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center space-y-6 max-w-2xl relative z-10"
            >
              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(TESTIMONIALS[activeTestimonial].stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light italic">
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>

              {/* User Bio */}
              <div className="flex items-center gap-3 pt-4">
                <img 
                  src={TESTIMONIALS[activeTestimonial].avatar} 
                  alt={TESTIMONIALS[activeTestimonial].name}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-800" 
                />
                <div className="text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    {TESTIMONIALS[activeTestimonial].name}
                  </h4>
                  <span className="text-[10px] text-neutral-500 tracking-wide uppercase">
                    {TESTIMONIALS[activeTestimonial].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeTestimonial === idx ? 'w-6 bg-violet-500' : 'w-2 bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto border-t border-neutral-900/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-violet-500 font-semibold uppercase">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-sans tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-sm mt-4 font-light leading-relaxed">
            Everything you need to know about the onboarding and deployment process.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-[#070707] border border-neutral-900 rounded-xl overflow-hidden transition-colors hover:border-neutral-850"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-xs uppercase tracking-wider text-neutral-200 font-medium">
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180 text-violet-400' : ''
                  }`} 
                />
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-5 text-xs text-neutral-400 font-light leading-relaxed border-t border-neutral-900 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900/50 text-center relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-8 relative z-10">
          <span className="text-xs tracking-[0.2em] text-violet-500 font-semibold uppercase">Let's Connect</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Have A Vision? <br /> Let's Bring It To Life.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Get in touch directly through Telegram or WhatsApp. I reply promptly to assist you with custom scopes and custom mockups.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            
            {/* Telegram Button */}
            <a 
              href="https://t.me/Ghost_X56" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#1f2937]/30 hover:bg-[#1f2937]/50 border border-neutral-800 text-xs uppercase tracking-widest font-bold text-neutral-200 rounded-full hover:border-violet-500/50 hover:text-white transition-all group"
            >
              <MessageSquare className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              Telegram Chat
            </a>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/2349161174405" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-emerald-950/20 hover:bg-emerald-950/35 border border-emerald-900/40 text-xs uppercase tracking-widest font-bold text-emerald-400 rounded-full hover:border-emerald-500/50 hover:text-emerald-300 transition-all group"
            >
              <svg className="w-4 h-4 text-emerald-400 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.21 1.468 4.76 1.468 5.4 0 9.79-4.39 9.79-9.79 0-2.6-1.01-5.05-2.84-6.88C16.48 2.12 14.03 1.11 11.43 1.11 6.03 1.11 1.64 5.5 1.64 10.9c0 1.74.48 3.39 1.47 4.88l-.99 3.61 3.93-.94z"/>
              </svg>
              WhatsApp Us
            </a>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#030303] border-t border-neutral-900/60 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo Brand info */}
          <div className="text-center md:text-left space-y-2">
            <span className="text-base font-extrabold tracking-[0.25em] text-white">
              GHOST <span className="text-violet-500">X</span>
            </span>
            <p className="text-[10px] text-neutral-500 tracking-wider uppercase">
              Web Designer & Frontend Developer
            </p>
          </div>

          {/* Nav Quicklinks */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['about', 'services', 'portfolio', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollTo(sect)}
                className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
              >
                {sect}
              </button>
            ))}
          </div>

          {/* Copyright details */}
          <div className="text-[10px] text-neutral-600 tracking-wider text-center md:text-right">
            © {new Date().getFullYear()} Ghost X. All Rights Reserved. <br />
            Crafted for premium performance.
          </div>

        </div>
      </footer>
    </div>
  );
}
