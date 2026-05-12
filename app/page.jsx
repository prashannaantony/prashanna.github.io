"use client";
import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0f",
  bg2: "#0f0f1a",
  bg3: "#141428",
  accent: "#7c5cfc",
  accent2: "#c084fc",
  accent3: "#38bdf8",
  text: "#e8e6f0",
  muted: "#7a7a9a",
  border: "rgba(124,92,252,0.18)",
  border2: "rgba(255,255,255,0.06)",
  green: "#4ade80",
  orange: "#fb923c",
};

const skills = [
  { cat: "Engine", name: "Unreal Engine 5", level: 80 },
  { cat: "Language", name: "C++", level: 75 },
  { cat: "Visual scripting", name: "Blueprints", level: 82 },
  { cat: "Gameplay", name: "AI / NavMesh / Behavior Trees", level: 70 },
  { cat: "Gameplay", name: "Physics Systems", level: 72 },
  { cat: "3D Art", name: "Blender", level: 55 },
  { cat: "Version control", name: "Git", level: 68 },
  { cat: "Language", name: "C · Java", level: 60 },
  { cat: "Target platforms", name: "Mobile (Android/iOS) · PC", level: 65 },
];

const projects = [
  {
    emoji: "🏎️",
    bg: "linear-gradient(135deg,#0f0f2a,#1a0a3a)",
    tags: [
      { label: "Unreal Engine 5", color: COLORS.accent2, bg: "rgba(124,92,252,0.15)", border: "rgba(124,92,252,0.25)" },
      { label: "C++", color: COLORS.accent3, bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.2)" },
      { label: "Blueprints", color: COLORS.orange, bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.2)" },
    ],
    title: "3D Racing Game",
    desc: "A full 3D racing experience built in Unreal Engine 5 with realistic vehicle physics, lap timing, and opponent AI using NavMesh navigation.",
    features: ["Vehicle physics with Chaos Physics engine","AI opponents with NavMesh path-finding","Lap timer, speed HUD, race UI","Custom camera system in C++"],
  },
  {
    emoji: "🏃",
    bg: "linear-gradient(135deg,#0a1a0f,#0f2a1a)",
    tags: [
      { label: "Unreal Engine 5", color: COLORS.accent2, bg: "rgba(124,92,252,0.15)", border: "rgba(124,92,252,0.25)" },
      { label: "C++", color: COLORS.accent3, bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.2)" },
      { label: "Mobile", color: COLORS.green, bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)" },
    ],
    title: "Endless Runner",
    desc: "An infinite procedurally-generated runner targeting Android mobile. Features dynamic obstacle spawning, score multipliers, and progressive difficulty scaling.",
    features: ["Procedural level generation system","Mobile touch input + swipe gestures","Score, coins, difficulty progression","Optimised for Android performance"],
  },
  {
    emoji: "🗡️",
    bg: "linear-gradient(135deg,#1a0a10,#2a0f1a)",
    tags: [
      { label: "Unreal Engine 5", color: COLORS.accent2, bg: "rgba(124,92,252,0.15)", border: "rgba(124,92,252,0.25)" },
      { label: "Blueprints", color: COLORS.orange, bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.2)" },
      { label: "C++", color: COLORS.accent3, bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.2)" },
    ],
    title: "2D Platformer",
    desc: "A side-scrolling 2D platformer built in UE5 with Paper2D. Includes enemy AI, collectibles, checkpoints, and multi-level progression with a complete UI flow.",
    features: ["Paper2D — sprite animation state machine","Enemy AI with patrol + detection","Health, lives, checkpoint system","Complete main menu + game over UI"],
  },
];

const marqueeItems = ["Unreal Engine 5","C++ Gameplay Programming","Blueprints","AI · NavMesh · Behavior Trees","Physics Systems","3D Racing Game","2D Platformer","Endless Runner","Blender · Git","Mobile · PC · Android"];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)", transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

function SkillBar({ level, animate }) {
  return (
    <div style={{ height: 2, background: COLORS.border, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: animate ? `${level}%` : "0%", background: `linear-gradient(90deg,${COLORS.accent},${COLORS.accent2})`, borderRadius: 2, transition: "width 1s ease-out" }} />
    </div>
  );
}

function SkillsSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="skills" ref={ref} style={{ position: "relative", zIndex: 2, padding: "100px 48px", background: COLORS.bg2 }}>
      <Reveal><p style={styles.sectionLabel}>// 02 — Skills</p></Reveal>
      <Reveal delay={0.1}><h2 style={styles.sectionTitle}>Technical <em style={{ color: COLORS.muted, fontStyle: "normal" }}>expertise</em></h2></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        {skills.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.05}>
            <div style={styles.skillCard} onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border2; e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: COLORS.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{s.cat}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: COLORS.text }}>{s.name}</div>
              <SkillBar level={s.level} animate={visible} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ ...styles.projectCard, borderColor: hovered ? COLORS.accent : COLORS.border2, transform: hovered ? "translateY(-6px)" : "none" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ height: 200, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, background: project.bg }}>
          {project.emoji}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(124,92,252,0.12)", opacity: hovered ? 1 : 0, transition: "opacity .3s" }} />
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 12 }}>
          {project.tags.map(t => (
            <span key={t.label} style={{ display: "inline-block", fontFamily: "'Space Mono',monospace", fontSize: 10, padding: "4px 10px", borderRadius: 3, marginRight: 6, color: t.color, background: t.bg, border: `1px solid ${t.border}` }}>{t.label}</span>
          ))}
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: COLORS.text }}>{project.title}</h3>
        <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7 }}>{project.desc}</p>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {project.features.map(f => (
            <div key={f} style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'Space Mono',monospace", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: COLORS.accent, fontSize: 16 }}>›</span>{f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  sectionLabel: { fontFamily: "'Space Mono',monospace", fontSize: 11, color: COLORS.accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 },
  sectionTitle: { fontSize: "clamp(36px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.0, marginBottom: 48, color: COLORS.text },
  skillCard: { background: COLORS.bg3, border: `1px solid ${COLORS.border2}`, borderRadius: 8, padding: "20px 24px", transition: "all .25s", cursor: "default" },
  projectCard: { background: COLORS.bg2, border: "1px solid", borderRadius: 12, overflow: "hidden", transition: "all .3s" },
};

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const ringRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; setCursor({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", onMove);
    const animate = () => {
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.12;
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  const interactiveProps = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "'Syne',sans-serif", overflowX: "hidden", cursor: "none", minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

      {/* Custom cursor */}
      <div style={{ position: "fixed", width: hovering ? 16 : 10, height: hovering ? 16 : 10, background: hovering ? COLORS.accent2 : COLORS.accent, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, left: cursor.x, top: cursor.y, transform: "translate(-50%,-50%)", transition: "width .2s,height .2s,background .2s" }} />
      <div style={{ position: "fixed", width: hovering ? 48 : 32, height: hovering ? 48 : 32, border: `1px solid rgba(124,92,252,0.5)`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, left: ring.x, top: ring.y, transform: "translate(-50%,-50%)", transition: "width .15s,height .15s" }} />

      {/* Grid bg */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(rgba(124,92,252,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,92,252,0.04) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${COLORS.border2}`, backdropFilter: "blur(20px)", background: scrolled ? "rgba(10,10,15,0.9)" : "rgba(10,10,15,0.7)", transition: "background .3s" }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.12em", color: COLORS.accent2, textTransform: "uppercase", fontFamily: "'Space Mono',monospace" }}>
          P<span style={{ color: COLORS.muted }}>rashanna</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["about","skills","projects","contact"].map(s => (
            <a key={s} href={`#${s}`} {...interactiveProps} style={{ fontSize: 13, color: COLORS.muted, textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Space Mono',monospace", transition: "color .2s", cursor: "none" }}
              onMouseEnter={e => { e.currentTarget.style.color = COLORS.text; setHovering(true); }}
              onMouseLeave={e => { e.currentTarget.style.color = COLORS.muted; setHovering(false); }}>
              {s}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: COLORS.green, fontFamily: "'Space Mono',monospace" }}>
          <span style={{ width: 7, height: 7, background: COLORS.green, borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
          Available for hire
        </div>
      </nav>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(74,222,128,0.4);}50%{opacity:0.8;box-shadow:0 0 0 5px rgba(74,222,128,0);} }
        @keyframes spin { to{transform:rotate(360deg);} }
        @keyframes marquee { to{transform:translateX(-50%);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:none;} }
        @keyframes fadeIn { from{opacity:0;}to{opacity:1;} }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px" }}>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: COLORS.accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, animation: "fadeUp .8s .2s both" }}>
          // Unreal Engine Developer · Bengaluru, India
        </p>
        <h1 style={{ fontSize: "clamp(56px,9vw,110px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: 24, animation: "fadeUp .8s .35s both" }}>
          Prashanna<br />
          <span style={{ background: `linear-gradient(135deg,${COLORS.accent} 0%,${COLORS.accent2} 50%,${COLORS.accent3} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Builds Worlds.</span>
        </h1>
        <p style={{ fontSize: 18, color: COLORS.muted, maxWidth: 520, lineHeight: 1.6, marginBottom: 48, fontWeight: 400, animation: "fadeUp .8s .5s both" }}>
          <strong style={{ color: COLORS.text }}>Unreal Engine 5 · C++ · Blueprints</strong><br />
          Junior game developer crafting immersive 3D experiences — from racing games to AI-driven systems. Open to relocation. Available immediately.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp .8s .65s both" }}>
          {[["View Projects","#projects","primary"],["Contact Me","#contact","outline"],["Download CV","https://drive.google.com/drive/folders/1mh7R1UWz7RgIAG1LRO0fqtF4g1tFK_QT?usp=drive_link","outline"]].map(([label, href, type]) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}
              style={{ padding: "14px 32px", background: type === "primary" ? COLORS.accent : "transparent", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 4, border: type === "primary" ? "none" : `1px solid ${COLORS.border}`, transition: "all .2s", cursor: "none" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = type === "primary" ? COLORS.accent2 : "transparent"; e.currentTarget.style.borderColor = type !== "primary" ? COLORS.accent : "none"; e.currentTarget.style.color = type !== "primary" ? COLORS.accent : "#fff"; setHovering(true); }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.background = type === "primary" ? COLORS.accent : "transparent"; e.currentTarget.style.borderColor = type !== "primary" ? COLORS.border : "none"; e.currentTarget.style.color = "#fff"; setHovering(false); }}>
              {label}
            </a>
          ))}
        </div>
        {/* Deco rings */}
        <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "45%", height: 600, animation: "fadeIn 1.2s .8s both", pointerEvents: "none" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[[400,30,"rgba(124,92,252,0.2)"],[280,20,"rgba(192,132,252,0.25)"],[160,14,"rgba(56,189,248,0.3)"]].map(([size,dur,color],i) => (
              <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `1px solid ${color}`, animation: `spin ${dur}s linear ${i===1?"reverse":""} infinite` }} />
            ))}
            <div style={{ width: 60, height: 60, background: COLORS.accent, borderRadius: "50%", opacity: 0.8 }} />
            <div style={{ position: "absolute", top: "20%", left: "60%", width: 6, height: 6, background: COLORS.accent2, borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: "25%", right: "20%", width: 6, height: 6, background: COLORS.accent3, borderRadius: "50%" }} />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${COLORS.border2}`, borderBottom: `1px solid ${COLORS.border2}`, padding: "16px 0", overflow: "hidden", background: COLORS.bg2 }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", width: "max-content" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: COLORS.muted, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0 40px", whiteSpace: "nowrap" }}>
              <span style={{ color: COLORS.accent, marginRight: 40 }}>✦</span>{item}
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" style={{ position: "relative", zIndex: 2, padding: "100px 48px" }}>
        <Reveal><p style={styles.sectionLabel}>// 01 — About</p></Reveal>
        <Reveal delay={0.1}><h2 style={styles.sectionTitle}>Passionate about <em style={{ color: COLORS.muted, fontStyle: "normal" }}>game mechanics</em><br />and engine internals.</h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["I'm <strong>Prashanna</strong>, a game developer based in Bengaluru with a BE in Mechanical Engineering (2021–2024, Easwari Engineering College, Chennai). I transitioned into game development driven by a deep passion for interactive systems and real-time 3D worlds.",
                "My core stack is <strong>Unreal Engine 5 with C++</strong>, with solid experience in Blueprints, physics systems, AI behaviour, and UI/UX. I'm currently being mentored by a senior game developer and actively building toward my first shipped title.",
                "I'm <strong>available immediately</strong> for full-time junior/fresher game developer roles and open to relocation anywhere in India or internationally."]
                .map((p, i) => <p key={i} style={{ fontSize: 16, color: COLORS.muted, lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, `<strong style="color:${COLORS.text}">`) }} />)}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["3+","Completed game projects"],["UE5","Primary engine"],["C++","Core language"],["Now","Available to join"]].map(([num, desc]) => (
                <div key={num} style={{ background: COLORS.bg2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 24, transition: "border-color .2s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
                  <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.accent, lineHeight: 1, marginBottom: 6 }}>{num}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.04em", textTransform: "uppercase" }}>{desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <SkillsSection />

      {/* Projects */}
      <section id="projects" style={{ position: "relative", zIndex: 2, padding: "100px 48px" }}>
        <Reveal><p style={styles.sectionLabel}>// 03 — Projects</p></Reveal>
        <Reveal delay={0.1}><h2 style={styles.sectionTitle}>What I've <em style={{ color: COLORS.muted, fontStyle: "normal" }}>built</em></h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ position: "relative", zIndex: 2, padding: "100px 48px", background: COLORS.bg2 }}>
        <Reveal><p style={styles.sectionLabel}>// 04 — Contact</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal delay={0.1}>
            <h2 style={styles.sectionTitle}>Let's work<br /><em style={{ color: COLORS.muted, fontStyle: "normal" }}>together.</em></h2>
            <p style={{ fontSize: 16, color: COLORS.muted, lineHeight: 1.8 }}>
              I'm actively looking for junior game developer roles — full-time, contract, or internship. Available immediately in Bengaluru and open to relocation anywhere in India or internationally.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "✉", label: "Email", value: "prashanna876@gmail.com", href: "mailto:prashanna876@gmail.com" },
                { icon: "in", label: "LinkedIn", value: "linkedin.com/in/prashanna-a", href: "https://www.linkedin.com/in/prashanna-a-3176102b0/" },
                { icon: "</>", label: "GitHub", value: "github.com/prashannaantony", href: "https://github.com/prashannaantony" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: COLORS.bg3, border: `1px solid ${COLORS.border2}`, borderRadius: 8, textDecoration: "none", color: COLORS.text, fontSize: 14, transition: "all .2s", cursor: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.transform = "translateX(6px)"; setHovering(true); }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border2; e.currentTarget.style.transform = "none"; setHovering(false); }}>
                  <div style={{ width: 36, height: 36, background: "rgba(124,92,252,0.15)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{link.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'Space Mono',monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{link.label}</div>
                    <div style={{ fontSize: 14, color: COLORS.text }}>{link.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} style={{ marginTop: 64 }}>
          <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 64, textAlign: "center", background: "linear-gradient(135deg,rgba(124,92,252,0.06) 0%,rgba(56,189,248,0.04) 100%)" }}>
            <h3 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, color: COLORS.text }}>Ready to hire an<br />Unreal dev?</h3>
            <p style={{ fontSize: 16, color: COLORS.muted, marginBottom: 36 }}>Available immediately · Bengaluru · Open to relocation</p>
            <a href="mailto:prashanna876@gmail.com"
              style={{ display: "inline-block", padding: "14px 32px", background: COLORS.accent, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 4, transition: "all .2s", cursor: "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.accent2; e.currentTarget.style.transform = "translateY(-2px)"; setHovering(true); }}
              onMouseLeave={e => { e.currentTarget.style.background = COLORS.accent; e.currentTarget.style.transform = "none"; setHovering(false); }}>
              Get in Touch
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 2, padding: "32px 48px", borderTop: `1px solid ${COLORS.border2}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: COLORS.muted }}>© 2026 <span style={{ color: COLORS.accent }}>Prashanna</span> — Unreal Engine Developer</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: COLORS.muted }}>Built with <span style={{ color: COLORS.accent }}>React · Next.js</span></div>
      </footer>
    </div>
  );
}
