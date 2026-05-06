import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { ShieldCheck, Bug, ScanSearch, Activity, BadgeCheck, Mail, ExternalLink } from "lucide-react";
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
    <section id={id} className="relative mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300/80">Portfolio Node</p>
        <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (window.history && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      
      {/* Cursor Following Dot */}
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
      
      <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-2xl glass">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">Vishwa Joshi</div>
            <div className="text-xs text-slate-300">Cybersecurity Analyst</div>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-200 md:flex">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen overflow-hidden px-6 pt-32 md:px-10">
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[3, 3, 3]} intensity={2} />
              <Stars radius={60} depth={20} count={2500} factor={3} saturation={0} fade speed={0.6} />
              <Orb />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.4} />
            </Canvas>
          </div>

          <div className="relative z-10 mx-auto grid min-h-[82vh] max-w-6xl items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-300">Security+ Certified</p>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[0.95] md:text-7xl">
                Cybersecurity Engineer
                <span className="block text-cyan-300">with a Frontend Mindset</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
                I build secure digital experiences with strengths in vulnerability assessment, web application
                security testing, threat analysis, secure coding, and modern frontend execution.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#projects" className="rounded-full border border-cyan-300/30 bg-cyan-300/15 px-6 py-3 text-sm font-medium text-cyan-100">
                  Explore Projects
                </a>
                <a href="#contact" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/90">
                  Contact Me
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass cyber-line rounded-[28px] p-6"
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
          </div>
        </section>

        <Section id="about" title="About">
          <FloatingDots count={35} scrollOffset={scrollY} />
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(82, 224, 255, 0.3), transparent)",
              filter: "blur(40px)",
              transform: `perspective(1000px) rotateX(${scrollY * 0.08}deg) rotateY(${scrollY * 0.04}deg) translateZ(${scrollY * 0.3}px)`,
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 pointer-events-none opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent)",
              filter: "blur(40px)",
              transform: `perspective(1000px) rotateX(${scrollY * -0.06}deg) rotateY(${scrollY * -0.05}deg) translateZ(${-scrollY * 0.2}px)`,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 pointer-events-none opacity-12"
            style={{
              background: "conic-gradient(from 0deg, rgba(34, 197, 94, 0.18), rgba(251, 146, 60, 0.12), transparent)",
              filter: "blur(35px)",
              transform: `perspective(1200px) rotateZ(${scrollY * 0.12}deg) rotateX(${scrollY * 0.05}deg) translateX(-50%) translateY(-50%) translateZ(${scrollY * 0.15}px)`,
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-10"
            style={{
              background: "radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.15), transparent)",
              filter: "blur(30px)",
              transform: `perspective(1100px) rotateY(${scrollY * 0.09}deg) rotateX(${scrollY * 0.03}deg) translateZ(${scrollY * 0.25}px)`,
            }}
          />
          <motion.div
            className="absolute top-14 right-16 w-20 h-20 rounded-full pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(82, 224, 255, 0.45), rgba(168, 85, 247, 0.12), transparent)",
              filter: "blur(18px)",
              transform: `perspective(1000px) rotateX(${scrollY * 0.1}deg) translateZ(${scrollY * 0.12}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-24 left-16 w-24 h-12 rounded-3xl pointer-events-none opacity-20"
            style={{
              background: "linear-gradient(135deg, rgba(82,224,255,0.3), rgba(255,255,255,0.08))",
              boxShadow: "0 20px 80px rgba(82,224,255,0.12)",
              transform: `perspective(1000px) rotateX(${scrollY * 0.08}deg) rotateZ(${scrollY * 0.05}deg) translateZ(${scrollY * 0.14}px)`,
            }}
          />
          <div className="glass rounded-[28px] p-8 text-slate-300 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="max-w-3xl text-lg leading-8"
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
            className="absolute top-1/2 -left-32 w-80 h-80 pointer-events-none opacity-20"
            style={{
              background: "conic-gradient(from 0deg, rgba(52, 211, 153, 0.25), rgba(82, 224, 255, 0.2), transparent)",
              borderRadius: "50%",
              filter: "blur(50px)",
              transform: `perspective(1200px) rotateZ(${scrollY * 0.1}deg) rotateX(${(scrollY - 1000) * 0.08}deg) translateY(${Math.sin(scrollY / 100) * 25}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-72 h-72 pointer-events-none opacity-15"
            style={{
              background: "radial-gradient(circle at 40% 60%, rgba(251, 146, 60, 0.2), transparent)",
              filter: "blur(45px)",
              transform: `perspective(1200px) rotateY(${scrollY * 0.09}deg) rotateZ(${-scrollY * 0.06}deg) translateZ(${(scrollY - 1000) * 0.25}px)`,
            }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-56 h-56 pointer-events-none opacity-12"
            style={{
              background: "conic-gradient(from 180deg, rgba(168, 85, 247, 0.18), rgba(82, 224, 255, 0.15), transparent)",
              borderRadius: "50%",
              filter: "blur(40px)",
              transform: `perspective(1000px) rotateX(${(scrollY - 1000) * 0.12}deg) rotateY(${(scrollY - 1000) * 0.08}deg) translateZ(${(scrollY - 1000) * 0.18}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-0 w-64 h-64 pointer-events-none opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.15), rgba(139, 92, 246, 0.1), transparent)",
              filter: "blur(38px)",
              transform: `perspective(1100px) rotateZ(${(scrollY - 1000) * 0.13}deg) rotateX(${-(scrollY - 1000) * 0.06}deg) translateZ(${-(scrollY - 1000) * 0.2}px)`,
            }}
          />
          <motion.div
            className="absolute top-24 left-24 w-24 h-24 rounded-full pointer-events-none opacity-25"
            style={{
              background: "radial-gradient(circle, rgba(251, 146, 60, 0.35), rgba(82, 224, 255, 0.08), transparent)",
              filter: "blur(20px)",
              transform: `perspective(1100px) rotateY(${(scrollY - 1000) * 0.06}deg) translateZ(${(scrollY - 1000) * 0.16}px)`,
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-28 h-14 rounded-[32px] pointer-events-none opacity-20"
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
                className="glass rounded-[28px] p-7"
              >
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="text-cyan-300">{item.company}</p>
                  </div>
                  <p className="text-sm text-slate-400">{item.period}</p>
                </div>
                <ul className="mt-5 space-y-3 text-slate-300">
                  {item.points.map((point, pointIndex) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.65, delay: (index * 0.1) + (pointIndex * 0.05), ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
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
            className="absolute top-0 right-1/3 w-96 h-96 pointer-events-none opacity-20"
            style={{
              background: "conic-gradient(from 180deg, rgba(82, 224, 255, 0.3), rgba(139, 92, 246, 0.25), transparent)",
              borderRadius: "50%",
              filter: "blur(50px)",
              transform: `perspective(1500px) rotateX(${(scrollY - 2000) * 0.1}deg) rotateY(${(scrollY - 2000) * 0.06}deg) scale(${1 + (scrollY - 2000) * 0.00008}) translateZ(${(scrollY - 2000) * 0.4}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none opacity-12"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.2), transparent)",
              filter: "blur(45px)",
              transform: `perspective(1500px) rotateZ(${(scrollY - 2000) * 0.12}deg) rotateX(${-(scrollY - 2000) * 0.08}deg) translateY(${Math.cos((scrollY - 2000) / 100) * 35}px)`,
            }}
          />
          <motion.div
            className="absolute top-1/4 left-1/2 w-72 h-72 pointer-events-none opacity-14"
            style={{
              background: "conic-gradient(from 90deg, rgba(251, 146, 60, 0.22), rgba(52, 211, 153, 0.18), transparent)",
              borderRadius: "50%",
              filter: "blur(42px)",
              transform: `perspective(1300px) rotateY(${(scrollY - 2000) * 0.09}deg) rotateZ(${(scrollY - 2000) * 0.11}deg) translateX(-50%) translateZ(${(scrollY - 2000) * 0.22}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-1/2 right-0 w-60 h-60 pointer-events-none opacity-10"
            style={{
              background: "radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.16), transparent)",
              filter: "blur(38px)",
              transform: `perspective(1200px) rotateX(${-(scrollY - 2000) * 0.07}deg) rotateZ(${(scrollY - 2000) * 0.14}deg) translateZ(${-(scrollY - 2000) * 0.28}px)`,
            }}
          />
          <motion.div
            className="absolute top-28 left-16 w-20 h-20 rounded-full pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(251, 146, 60, 0.36), rgba(82, 224, 255, 0.08), transparent)",
              filter: "blur(18px)",
              transform: `perspective(1200px) rotateY(${(scrollY - 2000) * 0.05}deg) translateZ(${(scrollY - 2000) * 0.15}px)`,
            }}
          />
          <motion.div
            className="absolute top-40 right-16 w-28 h-14 rounded-[32px] pointer-events-none opacity-20"
            style={{
              background: "linear-gradient(135deg, rgba(82,224,255,0.24), rgba(139,92,246,0.12))",
              boxShadow: "0 18px 70px rgba(82,224,255,0.12)",
              transform: `perspective(1200px) rotateX(${(scrollY - 2000) * 0.08}deg) rotateZ(${(scrollY - 2000) * 0.04}deg) translateZ(${(scrollY - 2000) * 0.16}px)`,
            }}
          />
          <div className="grid gap-6 md:grid-cols-2 relative z-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, rotateX: 4, rotateY: 4, scale: 1.02 }}
                viewport={{ once: true }}
                className="glass rounded-[28px] p-7"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, delay: (index * 0.2) + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="text-2xl font-semibold"
                >
                  {project.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, delay: (index * 0.2) + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="mt-4 leading-8 text-slate-300"
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
            className="absolute -top-20 -left-20 w-96 h-96 pointer-events-none opacity-16"
            style={{
              background: "conic-gradient(from 45deg, rgba(168, 85, 247, 0.25), rgba(52, 211, 153, 0.2), transparent)",
              borderRadius: "50%",
              filter: "blur(50px)",
              transform: `perspective(1200px) rotateY(${(scrollY - 3200) * 0.08}deg) rotateZ(${(scrollY - 3200) * 0.1}deg) translateZ(${(scrollY - 3200) * 0.3}px)`,
            }}
          />
          <motion.div
            className="absolute top-1/3 -right-32 w-80 h-80 pointer-events-none opacity-14"
            style={{
              background: "radial-gradient(circle at 60% 40%, rgba(251, 146, 60, 0.18), transparent)",
              filter: "blur(45px)",
              transform: `perspective(1200px) rotateX(${(scrollY - 3200) * 0.07}deg) rotateY(${-(scrollY - 3200) * 0.12}deg) translateZ(${-(scrollY - 3200) * 0.25}px)`,
            }}
          />
          <motion.div
            className="absolute top-16 left-16 w-20 h-20 rounded-full pointer-events-none opacity-28"
            style={{
              background: "radial-gradient(circle, rgba(82,224,255,0.4), rgba(168,85,247,0.1), transparent)",
              filter: "blur(18px)",
              transform: `perspective(1100px) rotateY(${(scrollY - 3200) * 0.06}deg) translateZ(${(scrollY - 3200) * 0.18}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-64 h-64 pointer-events-none opacity-10"
            style={{
              background: "conic-gradient(from 270deg, rgba(82, 224, 255, 0.2), rgba(139, 92, 246, 0.15), transparent)",
              borderRadius: "50%",
              filter: "blur(38px)",
              transform: `perspective(1100px) rotateZ(${(scrollY - 3200) * 0.13}deg) rotateX(${(scrollY - 3200) * 0.06}deg) translateZ(${(scrollY - 3200) * 0.2}px)`,
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/4 w-56 h-56 pointer-events-none opacity-12"
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
              className="glass rounded-[28px] p-7"
            >
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="mb-5 text-2xl font-semibold"
              >
                Skill Matrix
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, delay: 0.3 + (index * 0.05), ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    viewport={{ once: true }}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
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
              className="glass rounded-[28px] p-7"
            >
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="mb-5 text-2xl font-semibold"
              >
                Credentials
              </motion.h3>
              <ul className="space-y-3 text-slate-300">
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
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <BadgeCheck className="mt-0.5 text-cyan-300" size={18} />
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
            className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none opacity-20"
            style={{
              background: "conic-gradient(from 270deg, rgba(82, 224, 255, 0.3), rgba(168, 85, 247, 0.25), transparent)",
              borderRadius: "50%",
              filter: "blur(50px)",
              transform: `perspective(1500px) rotateZ(${(scrollY - 4400) * 0.15}deg) rotateX(${(scrollY - 4400) * 0.06}deg) scale(${1 + (scrollY - 4400) * 0.0001})`,
            }}
          />
          <motion.div
            className="absolute bottom-0 -right-40 w-96 h-96 pointer-events-none opacity-12"
            style={{
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.2), rgba(82, 224, 255, 0.1), transparent)",
              filter: "blur(45px)",
              transform: `perspective(1500px) rotateY(${(scrollY - 4400) * 0.1}deg) rotateX(${-(scrollY - 4400) * 0.08}deg)`,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-80 h-80 pointer-events-none opacity-16"
            style={{
              background: "conic-gradient(from 135deg, rgba(251, 146, 60, 0.22), rgba(52, 211, 153, 0.18), transparent)",
              borderRadius: "50%",
              filter: "blur(48px)",
              transform: `perspective(1400px) rotateX(${(scrollY - 4400) * 0.09}deg) rotateZ(${(scrollY - 4400) * 0.12}deg) translateZ(${(scrollY - 4400) * 0.28}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-72 h-72 pointer-events-none opacity-14"
            style={{
              background: "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.18), transparent)",
              filter: "blur(42px)",
              transform: `perspective(1300px) rotateZ(${-(scrollY - 4400) * 0.11}deg) rotateY(${(scrollY - 4400) * 0.07}deg) translateZ(${-(scrollY - 4400) * 0.22}px)`,
            }}
          />
          <div className="glass rounded-[28px] p-8 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="max-w-2xl text-lg leading-8 text-slate-300"
            >
              Open to cybersecurity analyst, application security, SOC, and security engineering opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                href="mailto:joshivishwa211@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm text-cyan-100 transition-all duration-300 hover:bg-cyan-300/20"
              >
                <Mail size={16} />
                Email Me
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/vishwa-joshi09"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/90 transition-all duration-300 hover:bg-white/5"
              >
                <ExternalLink size={16} />
                LinkedIn
              </motion.a>
            </motion.div>
          </div>
        </Section>
      </main>
    </div>
  );
}