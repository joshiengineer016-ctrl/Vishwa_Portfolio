import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { ShieldCheck, Bug, ScanSearch, Activity, BadgeCheck, Mail, ExternalLink, Menu } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const skills = [
  "Vulnerability Assessment",
  "Penetration Testing",
  "OWASP Top 10",
  "Threat Analysis",
  "Network Security",
  "Splunk (Basic)",
  "Nmap",
  "Burp Suite",
  "Wireshark",
  "Kali Linux",
];

const experience = [
  {
    title: "Assistant System Engineer",
    company: "Tata Consultancy Services",
    period: "Aug 2024 – Present",
    points: [
      "Developed and maintained full-stack applications using Angular and .NET with focus on secure coding practices.",
      "Implemented input validation and error handling to reduce risks such as XSS and injection vulnerabilities.",
      "Performed QA and validation across environments to support stability and security compliance.",
    ],
  },
  {
    title: "Cybersecurity Intern",
    company: "Cyber Secured India",
    period: "May 2023 – Jun 2023",
    points: [
      "Conducted reconnaissance and vulnerability scanning using Nmap and Burp Suite.",
      "Identified XSS and SQL Injection issues in simulated environments.",
      "Documented findings and remediation guidance through penetration testing exercises.",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company: "Service Box",
    period: "Jan 2023 – Apr 2023",
    points: [
      "Redesigned and optimized client websites using HTML, CSS, Bootstrap, and JavaScript.",
      "Improved responsive behavior, performance, and user experience.",
    ],
  },
];

const projects = [
  {
    name: "Cyberattack Detection using Machine Learning",
    desc: "Built Python ML models for cyberattack detection using structured datasets, preprocessing, and evaluation workflows.",
  },
  {
    name: "SIEM Log Analysis",
    desc: "Analyzed simulated logs in Splunk to detect failed logins, anomalies, and suspicious traffic patterns.",
  },
];

function Orb() {
  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <Icosahedron args={[1.8, 8]}>
        <MeshDistortMaterial
          color="#52e0ff"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.7}
          transparent
          opacity={0.8}
        />
      </Icosahedron>
    </Float>
  );
}

function FloatingDots({ count = 40, scrollOffset = 0 }) {
  const colors = useMemo(
    () => [
      "rgba(82, 224, 255, ",
      "rgba(168, 85, 247, ",
      "rgba(34, 197, 94, ",
      "rgba(249, 115, 22, ",
      "rgba(96, 165, 250, ",
    ],
    []
  );

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.8,
        duration: Math.random() * 25 + 20,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.5 + 0.25,
        color,
      };
    });
  }, [count, colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `translateY(${scrollOffset * 0.03}px)`,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), ${particle.color}${particle.opacity})`,
            boxShadow: `0 0 ${particle.size + 3}px ${particle.color}${particle.opacity * 0.8}`,
          }}
          animate={{
            y: [-20, -window.innerHeight - 120],
            x: [0, (Math.random() - 0.5) * 120],
            opacity: [0, particle.opacity, particle.opacity * 0.4, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-3 xs:px-4 sm:px-6 py-10 xs:py-12 sm:py-16 md:px-10 md:py-24">
      <div className="mb-6 sm:mb-8">
        <p className="mb-2 xs:mb-3 text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.3em] xs:tracking-[0.35em] text-cyan-300/80">Portfolio Node</p>
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (window.history && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const handleMouseMove = (e) => {
      // Only track cursor on non-touch devices
      if (!isMobile) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      
      {/* Cursor Following Dot - Hidden on Mobile */}
      {!isMobile && (
        <motion.div
          animate={{ x: cursorPosition.x - 4, y: cursorPosition.y - 4 }}
          transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
          className="fixed w-2 h-2 pointer-events-none z-40"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(82, 224, 255, 0.6), rgba(82, 224, 255, 0.2))",
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(82, 224, 255, 0.8), inset -2px -2px 5px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
          }}
        />
      )}
      
      <header className="fixed left-1/2 top-1.5 xs:top-2 sm:top-3 md:top-4 z-50 w-[calc(100%-0.75rem)] xs:w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] md:w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-lg xs:rounded-xl sm:rounded-2xl glass">
        <div className="flex items-center justify-between px-3 xs:px-4 sm:px-5 md:px-6 py-2.5 xs:py-3 sm:py-3.5 md:py-4 gap-2 xs:gap-3">
          <div className="min-w-0">
            <div className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.3em] xs:tracking-[0.35em] text-cyan-300 truncate">Vishwa Joshi</div>
            <div className="text-[9px] xs:text-xs sm:text-xs text-slate-300 truncate">Cybersecurity Analyst</div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-[10px] sm:text-xs md:text-sm text-slate-200 md:flex md:ml-auto">
            <a href="#about" className="transition-colors hover:text-cyan-300 whitespace-nowrap">About</a>
            <a href="#experience" className="transition-colors hover:text-cyan-300 whitespace-nowrap">Experience</a>
            <a href="#projects" className="transition-colors hover:text-cyan-300 whitespace-nowrap">Projects</a>
            <a href="#certifications" className="transition-colors hover:text-cyan-300 whitespace-nowrap">Skills</a>
            <a href="#contact" className="transition-colors hover:text-cyan-300 whitespace-nowrap">Contact</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1 p-1.5 xs:p-2 ml-auto"
            aria-label="Toggle menu"
          >
            <span className={`w-5 xs:w-6 h-0.5 bg-slate-200 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5 xs:translate-y-2' : ''}`}></span>
            <span className={`w-5 xs:w-6 h-0.5 bg-slate-200 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 xs:w-6 h-0.5 bg-slate-200 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5 xs:-translate-y-2' : ''}`}></span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-white/5"
          >
            <nav className="flex flex-col gap-0">
              {['about', 'experience', 'projects', 'certifications', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 xs:px-4 py-2.5 xs:py-3 text-xs xs:text-sm text-slate-300 border-b border-white/5 transition-colors hover:text-cyan-300 hover:bg-white/5 first:rounded-bl-lg xs:first:rounded-bl-xl last:rounded-br-lg xs:last:rounded-br-xl last:border-0"
                >
                  {item === 'certifications' ? 'Skills' : item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </header>

      <main className="w-full overflow-x-hidden">
        <section className="relative min-h-screen overflow-x-hidden px-3 xs:px-4 sm:px-6 pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-40 md:px-10">
          {/* 3D Canvas - Reduced or hidden on mobile */}
          <div className="absolute inset-0 hidden sm:block">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[3, 3, 3]} intensity={2} />
              <Stars radius={60} depth={20} count={2500} factor={3} saturation={0} fade speed={0.6} />
              <Orb />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.4} />
            </Canvas>
          </div>

          <div className="relative z-10 mx-auto w-full grid min-h-[70vh] sm:min-h-[82vh] max-w-6xl items-center gap-4 sm:gap-6 md:gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <p className="mb-3 sm:mb-4 text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.3em] xs:tracking-[0.4em] text-cyan-300">Security+ Certified</p>
              <h1 className="max-w-2xl text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight sm:leading-[0.95]">
                Cybersecurity Engineer
                <span className="block text-cyan-300">with a Frontend Mindset</span>
              </h1>
              <p className="mt-3 sm:mt-6 max-w-xl text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed sm:leading-8 text-slate-300">
                I build secure digital experiences with strengths in vulnerability assessment, web application
                security testing, threat analysis, secure coding, and modern frontend execution.
              </p>

              <div className="mt-4 sm:mt-8 flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-3 sm:gap-4">
                <a href="#projects" className="text-center rounded-full border border-cyan-300/30 bg-cyan-300/15 px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-xs font-medium text-cyan-100 transition-all hover:bg-cyan-300/25 active:scale-95 flex-1 xs:flex-initial">
                  Explore Projects
                </a>
                <a href="#contact" className="text-center rounded-full border border-white/15 px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-xs font-medium text-white/90 transition-all hover:bg-white/5 active:scale-95 flex-1 xs:flex-initial">
                  Contact Me
                </a>
              </div>
            </motion.div>

            {/* Hero Card - Hidden on mobile, visible on md+ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block glass cyber-line rounded-[28px] p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-300">Live Profile Signal</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">Available</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="mb-3 text-cyan-300" size={20} />
                  <h3 className="text-lg font-medium">Secure Coding</h3>
                  <p className="mt-2 text-sm text-slate-300">Angular + .NET experience with input validation and vulnerability-aware development.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Bug className="mb-3 text-rose-300" size={20} />
                  <h3 className="text-lg font-medium">VAPT Exposure</h3>
                  <p className="mt-2 text-sm text-slate-300">Hands-on reconnaissance, scanning, XSS testing, and SQLi identification in labs.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <ScanSearch className="mb-3 text-cyan-300" size={20} />
                  <h3 className="text-lg font-medium">Tooling</h3>
                  <p className="mt-2 text-sm text-slate-300">Nmap, Burp Suite, Wireshark, Splunk, Kali Linux, TryHackMe.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Activity className="mb-3 text-amber-300" size={20} />
                  <h3 className="text-lg font-medium">Threat Thinking</h3>
                  <p className="mt-2 text-sm text-slate-300">Risk assessment, OWASP Top 10 awareness, and log-driven analysis mindset.</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Card - Mobile Version (Collapsed) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.15 }}
              className="md:hidden glass rounded-[16px] xs:rounded-[20px] p-3 xs:p-4 sm:p-5 w-full"
            >
              <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
                <span className="text-[10px] xs:text-xs uppercase tracking-[0.25em] xs:tracking-[0.35em] text-slate-300">Profile Signal</span>
                <span className="rounded-full bg-emerald-400/15 px-2 xs:px-3 py-0.5 xs:py-1 text-[9px] xs:text-xs text-emerald-300 whitespace-nowrap">Available</span>
              </div>
              <div className="grid gap-2 xs:gap-3 grid-cols-2">
                <div className="rounded-lg xs:rounded-xl border border-white/10 bg-white/5 p-2.5 xs:p-3">
                  <ShieldCheck className="mb-1.5 xs:mb-2 text-cyan-300" size={14} />
                  <h3 className="text-[11px] xs:text-xs font-medium">Secure Coding</h3>
                </div>
                <div className="rounded-lg xs:rounded-xl border border-white/10 bg-white/5 p-2.5 xs:p-3">
                  <Bug className="mb-1.5 xs:mb-2 text-rose-300" size={14} />
                  <h3 className="text-[11px] xs:text-xs font-medium">VAPT</h3>
                </div>
                <div className="rounded-lg xs:rounded-xl border border-white/10 bg-white/5 p-2.5 xs:p-3">
                  <ScanSearch className="mb-1.5 xs:mb-2 text-cyan-300" size={14} />
                  <h3 className="text-[11px] xs:text-xs font-medium">Tooling</h3>
                </div>
                <div className="rounded-lg xs:rounded-xl border border-white/10 bg-white/5 p-2.5 xs:p-3">
                  <Activity className="mb-1.5 xs:mb-2 text-amber-300" size={14} />
                  <h3 className="text-[11px] xs:text-xs font-medium">Threats</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Section id="about" title="About">
          <FloatingDots count={35} scrollOffset={scrollY} />
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 pointer-events-none opacity-20 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(82, 224, 255, 0.3), transparent)",
              filter: "blur(40px)",
              transform: `perspective(1000px) rotateX(${scrollY * 0.08}deg) rotateY(${scrollY * 0.04}deg) translateZ(${scrollY * 0.3}px)`,
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 pointer-events-none opacity-15 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent)",
              filter: "blur(40px)",
              transform: `perspective(1000px) rotateX(${scrollY * -0.06}deg) rotateY(${scrollY * -0.05}deg) translateZ(${-scrollY * 0.2}px)`,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 pointer-events-none opacity-12 hidden sm:block"
            style={{
              background: "conic-gradient(from 0deg, rgba(34, 197, 94, 0.18), rgba(251, 146, 60, 0.12), transparent)",
              filter: "blur(35px)",
              transform: `perspective(1200px) rotateZ(${scrollY * 0.12}deg) rotateX(${scrollY * 0.05}deg) translateX(-50%) translateY(-50%) translateZ(${scrollY * 0.15}px)`,
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-10 hidden sm:block"
            style={{
              background: "radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.15), transparent)",
              filter: "blur(30px)",
              transform: `perspective(1100px) rotateY(${scrollY * 0.09}deg) rotateX(${scrollY * 0.03}deg) translateZ(${scrollY * 0.25}px)`,
            }}
          />
          <motion.div
            className="absolute top-14 right-16 w-20 h-20 rounded-full pointer-events-none opacity-30 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(82, 224, 255, 0.45), rgba(168, 85, 247, 0.12), transparent)",
              filter: "blur(18px)",
              transform: `perspective(1000px) rotateX(${scrollY * 0.1}deg) translateZ(${scrollY * 0.12}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-24 left-16 w-24 h-12 rounded-3xl pointer-events-none opacity-20 hidden sm:block"
            style={{
              background: "linear-gradient(135deg, rgba(82,224,255,0.3), rgba(255,255,255,0.08))",
              boxShadow: "0 20px 80px rgba(82,224,255,0.12)",
              transform: `perspective(1000px) rotateX(${scrollY * 0.08}deg) rotateZ(${scrollY * 0.05}deg) translateZ(${scrollY * 0.14}px)`,
            }}
          />
          <div className="glass rounded-[20px] sm:rounded-[28px] p-4 sm:p-8 text-slate-300 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="max-w-3xl text-sm sm:text-base md:text-lg leading-7 sm:leading-8"
            >
              I am a cybersecurity-focused engineer with hands-on experience in vulnerability assessment, web
              application security testing, and threat analysis, backed by secure full-stack development experience.
              My goal is to build systems that are both resilient and beautifully engineered.
            </motion.p>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <FloatingDots count={40} scrollOffset={scrollY} />
          <motion.div
            className="absolute top-1/2 -left-32 w-80 h-80 pointer-events-none opacity-20 hidden sm:block"
            style={{
              background: "conic-gradient(from 0deg, rgba(52, 211, 153, 0.25), rgba(82, 224, 255, 0.2), transparent)",
              borderRadius: "50%",
              filter: "blur(50px)",
              transform: `perspective(1200px) rotateZ(${scrollY * 0.1}deg) rotateX(${(scrollY - 1000) * 0.08}deg) translateY(${Math.sin(scrollY / 100) * 25}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-72 h-72 pointer-events-none opacity-15 hidden sm:block"
            style={{
              background: "radial-gradient(circle at 40% 60%, rgba(251, 146, 60, 0.2), transparent)",
              filter: "blur(45px)",
              transform: `perspective(1200px) rotateY(${scrollY * 0.09}deg) rotateZ(${-scrollY * 0.06}deg) translateZ(${(scrollY - 1000) * 0.25}px)`,
            }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-56 h-56 pointer-events-none opacity-12 hidden sm:block"
            style={{
              background: "conic-gradient(from 180deg, rgba(168, 85, 247, 0.18), rgba(82, 224, 255, 0.15), transparent)",
              borderRadius: "50%",
              filter: "blur(40px)",
              transform: `perspective(1000px) rotateX(${(scrollY - 1000) * 0.12}deg) rotateY(${(scrollY - 1000) * 0.08}deg) translateZ(${(scrollY - 1000) * 0.18}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-0 w-64 h-64 pointer-events-none opacity-10 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.15), rgba(139, 92, 246, 0.1), transparent)",
              filter: "blur(38px)",
              transform: `perspective(1100px) rotateZ(${(scrollY - 1000) * 0.13}deg) rotateX(${-(scrollY - 1000) * 0.06}deg) translateZ(${-(scrollY - 1000) * 0.2}px)`,
            }}
          />
          <motion.div
            className="absolute top-24 left-24 w-24 h-24 rounded-full pointer-events-none opacity-25 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(251, 146, 60, 0.35), rgba(82, 224, 255, 0.08), transparent)",
              filter: "blur(20px)",
              transform: `perspective(1100px) rotateY(${(scrollY - 1000) * 0.06}deg) translateZ(${(scrollY - 1000) * 0.16}px)`,
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-28 h-14 rounded-[32px] pointer-events-none opacity-20 hidden sm:block"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.22), rgba(34,197,94,0.14))",
              boxShadow: "0 18px 65px rgba(168,85,247,0.12)",
              transform: `perspective(1100px) rotateX(${(scrollY - 1000) * 0.08}deg) rotateZ(${(scrollY - 1000) * 0.05}deg) translateZ(${(scrollY - 1000) * 0.18}px)`,
            }}
          />
          <div className="grid gap-6 relative z-10">
            {experience.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                viewport={{ once: true }}
                key={item.title}
                className="glass rounded-[20px] sm:rounded-[28px] p-4 sm:p-7"
              >
                <div className="flex flex-col justify-between gap-2 sm:gap-3 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-semibold">{item.title}</h3>
                    <p className="text-xs sm:text-base text-cyan-300">{item.company}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">{item.period}</p>
                </div>
                <ul className="mt-3 sm:mt-5 space-y-2 sm:space-y-3 text-xs sm:text-base text-slate-300">
                  {item.points.map((point, pointIndex) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.65, delay: (index * 0.1) + (pointIndex * 0.05), ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3"
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <FloatingDots count={45} scrollOffset={scrollY} />
          <motion.div
            className="absolute top-0 right-1/3 w-96 h-96 pointer-events-none opacity-20 hidden sm:block"
            style={{
              background: "conic-gradient(from 180deg, rgba(82, 224, 255, 0.3), rgba(139, 92, 246, 0.25), transparent)",
              borderRadius: "50%",
              filter: "blur(50px)",
              transform: `perspective(1500px) rotateX(${(scrollY - 2000) * 0.1}deg) rotateY(${(scrollY - 2000) * 0.06}deg) scale(${1 + (scrollY - 2000) * 0.00008}) translateZ(${(scrollY - 2000) * 0.4}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none opacity-12 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.2), transparent)",
              filter: "blur(45px)",
              transform: `perspective(1500px) rotateZ(${(scrollY - 2000) * 0.12}deg) rotateX(${-(scrollY - 2000) * 0.08}deg) translateY(${Math.cos((scrollY - 2000) / 100) * 35}px)`,
            }}
          />
          <motion.div
            className="absolute top-1/4 left-1/2 w-72 h-72 pointer-events-none opacity-14 hidden sm:block"
            style={{
              background: "conic-gradient(from 90deg, rgba(251, 146, 60, 0.22), rgba(52, 211, 153, 0.18), transparent)",
              borderRadius: "50%",
              filter: "blur(42px)",
              transform: `perspective(1300px) rotateY(${(scrollY - 2000) * 0.09}deg) rotateZ(${(scrollY - 2000) * 0.11}deg) translateX(-50%) translateZ(${(scrollY - 2000) * 0.22}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-1/2 right-0 w-60 h-60 pointer-events-none opacity-10 hidden sm:block"
            style={{
              background: "radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.16), transparent)",
              filter: "blur(38px)",
              transform: `perspective(1200px) rotateX(${-(scrollY - 2000) * 0.07}deg) rotateZ(${(scrollY - 2000) * 0.14}deg) translateZ(${-(scrollY - 2000) * 0.28}px)`,
            }}
          />
          <motion.div
            className="absolute top-28 left-16 w-20 h-20 rounded-full pointer-events-none opacity-30 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(251, 146, 60, 0.36), rgba(82, 224, 255, 0.08), transparent)",
              filter: "blur(18px)",
              transform: `perspective(1200px) rotateY(${(scrollY - 2000) * 0.05}deg) translateZ(${(scrollY - 2000) * 0.15}px)`,
            }}
          />
          <motion.div
            className="absolute top-40 right-16 w-28 h-14 rounded-[32px] pointer-events-none opacity-20 hidden sm:block"
            style={{
              background: "linear-gradient(135deg, rgba(82,224,255,0.24), rgba(139,92,246,0.12))",
              boxShadow: "0 18px 70px rgba(82,224,255,0.12)",
              transform: `perspective(1200px) rotateX(${(scrollY - 2000) * 0.08}deg) rotateZ(${(scrollY - 2000) * 0.04}deg) translateZ(${(scrollY - 2000) * 0.16}px)`,
            }}
          />
          <div className="grid gap-6 sm:grid-cols-2 relative z-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, rotateX: 4, rotateY: 4, scale: 1.02 }}
                viewport={{ once: true }}
                className="glass rounded-[20px] sm:rounded-[28px] p-4 sm:p-7"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, delay: (index * 0.2) + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="text-lg sm:text-2xl font-semibold"
                >
                  {project.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, delay: (index * 0.2) + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="mt-3 sm:mt-4 text-xs sm:text-base leading-6 sm:leading-8 text-slate-300"
                >
                  {project.desc}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="certifications" title="Certifications & Skills">
          <FloatingDots count={50} scrollOffset={scrollY} />
          <motion.div
            className="absolute -top-20 -left-20 w-96 h-96 pointer-events-none opacity-16 hidden sm:block"
            style={{
              background: "conic-gradient(from 45deg, rgba(168, 85, 247, 0.25), rgba(52, 211, 153, 0.2), transparent)",
              borderRadius: "50%",
              filter: "blur(50px)",
              transform: `perspective(1200px) rotateY(${(scrollY - 3200) * 0.08}deg) rotateZ(${(scrollY - 3200) * 0.1}deg) translateZ(${(scrollY - 3200) * 0.3}px)`,
            }}
          />
          <motion.div
            className="absolute top-1/3 -right-32 w-80 h-80 pointer-events-none opacity-14 hidden sm:block"
            style={{
              background: "radial-gradient(circle at 60% 40%, rgba(251, 146, 60, 0.18), transparent)",
              filter: "blur(45px)",
              transform: `perspective(1200px) rotateX(${(scrollY - 3200) * 0.07}deg) rotateY(${-(scrollY - 3200) * 0.12}deg) translateZ(${-(scrollY - 3200) * 0.25}px)`,
            }}
          />
          <motion.div
            className="absolute top-16 left-16 w-20 h-20 rounded-full pointer-events-none opacity-28 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(82,224,255,0.4), rgba(168,85,247,0.1), transparent)",
              filter: "blur(18px)",
              transform: `perspective(1100px) rotateY(${(scrollY - 3200) * 0.06}deg) translateZ(${(scrollY - 3200) * 0.18}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-64 h-64 pointer-events-none opacity-10 hidden sm:block"
            style={{
              background: "conic-gradient(from 270deg, rgba(82, 224, 255, 0.2), rgba(139, 92, 246, 0.15), transparent)",
              borderRadius: "50%",
              filter: "blur(38px)",
              transform: `perspective(1100px) rotateZ(${(scrollY - 3200) * 0.13}deg) rotateX(${(scrollY - 3200) * 0.06}deg) translateZ(${(scrollY - 3200) * 0.2}px)`,
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/4 w-56 h-56 pointer-events-none opacity-12 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.16), rgba(251, 146, 60, 0.12), transparent)",
              filter: "blur(35px)",
              transform: `perspective(1000px) rotateY(${(scrollY - 3200) * 0.11}deg) rotateX(${-(scrollY - 3200) * 0.09}deg) translateZ(${(scrollY - 3200) * 0.18}px)`,
            }}
          />
          <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="glass rounded-[20px] sm:rounded-[28px] p-4 sm:p-7"
            >
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="mb-4 sm:mb-5 text-lg sm:text-2xl font-semibold"
              >
                Skill Matrix
              </motion.h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.3 + (index * 0.05), ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    viewport={{ once: true }}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-cyan-100"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="glass rounded-[20px] sm:rounded-[28px] p-4 sm:p-7"
            >
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="mb-4 sm:mb-5 text-lg sm:text-2xl font-semibold"
              >
                Credentials
              </motion.h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-base text-slate-300">
                {[
                  "CompTIA Security+",
                  "Google Cybersecurity Certification",
                  "Microsoft Azure Data Fundamentals (DP-900)",
                  "Tata Cybersecurity Analyst Job Simulation",
                  "Responsive Web Design – FreeCodeCamp",
                  "Intro to Python – Kaggle",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.75, delay: 0.4 + (index * 0.1), ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3"
                  >
                    <BadgeCheck className="mt-0.5 flex-shrink-0 text-cyan-300" size={16} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <FloatingDots count={55} scrollOffset={scrollY} />
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none opacity-20 hidden sm:block"
            style={{
              background: "conic-gradient(from 270deg, rgba(82, 224, 255, 0.3), rgba(168, 85, 247, 0.25), transparent)",
              borderRadius: "50%",
              filter: "blur(50px)",
              transform: `perspective(1500px) rotateZ(${(scrollY - 4400) * 0.15}deg) rotateX(${(scrollY - 4400) * 0.06}deg) scale(${1 + (scrollY - 4400) * 0.0001})`,
            }}
          />
          <motion.div
            className="absolute bottom-0 -right-40 w-96 h-96 pointer-events-none opacity-12 hidden sm:block"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.2), rgba(82, 224, 255, 0.1), transparent)",
              filter: "blur(45px)",
              transform: `perspective(1500px) rotateY(${(scrollY - 4400) * 0.1}deg) rotateX(${-(scrollY - 4400) * 0.08}deg)`,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-80 h-80 pointer-events-none opacity-16 hidden sm:block"
            style={{
              background: "conic-gradient(from 135deg, rgba(251, 146, 60, 0.22), rgba(52, 211, 153, 0.18), transparent)",
              borderRadius: "50%",
              filter: "blur(48px)",
              transform: `perspective(1400px) rotateX(${(scrollY - 4400) * 0.09}deg) rotateZ(${(scrollY - 4400) * 0.12}deg) translateZ(${(scrollY - 4400) * 0.28}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-72 h-72 pointer-events-none opacity-14 hidden sm:block"
            style={{
              background: "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.18), transparent)",
              filter: "blur(42px)",
              transform: `perspective(1300px) rotateZ(${-(scrollY - 4400) * 0.11}deg) rotateY(${(scrollY - 4400) * 0.07}deg) translateZ(${-(scrollY - 4400) * 0.22}px)`,
            }}
          />
          <div className="glass rounded-[20px] sm:rounded-[28px] p-4 sm:p-8 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-300"
            >
              Open to cybersecurity analyst, application security, SOC, and security engineering opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <motion.a
                href="mailto:joshivishwa211@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center sm:justify-start gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm text-cyan-100 transition-all hover:bg-cyan-300/20 active:scale-95 touch-manipulation"
              >
                <Mail size={14} className="sm:w-4 sm:h-4" />
                Email Me
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/vishwa-joshi09"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center sm:justify-start gap-2 rounded-full border border-white/15 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm text-white/90 transition-all hover:bg-white/5 active:scale-95 touch-manipulation"
              >
                <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                LinkedIn
              </motion.a>
            </motion.div>
          </div>
        </Section>
      </main>
    </div>
  );
}