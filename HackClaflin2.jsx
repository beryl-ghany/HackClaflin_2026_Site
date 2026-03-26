import { useState, useEffect, useRef } from "react";

const IMGS = {
  logo: "/parent-hackclaflin-logo.png",
  gemini: "/gemini-logo.png",
  lovable: "/lovable-logo.png",
  plotly: "/plotly-logo.png",
  mlh: "/mlh.png",
};

const TRACKS = [
  { name: "AI & Machine Learning", icon: "◈", desc: "Build intelligent systems, predictive models, and generative tools" },
  { name: "Cybersecurity", icon: "◉", desc: "Defend, detect, and harden the digital world" },
  { name: "FinTech", icon: "◆", desc: "Reimagine money, access, and financial equity" },
  { name: "Social Impact", icon: "◎", desc: "Technology that lifts communities and solves real problems" },
  { name: "Health Tech", icon: "◐", desc: "Improve lives through biotech, wellness, and medical innovation" },
  { name: "Education Tech", icon: "◑", desc: "Transform learning experiences for the next generation" },
  { name: "Data Visualization & Insights", icon: "◍", desc: "Turn data into clear stories, dashboards, and actionable decisions" },
  { name: "Open Innovation", icon: "◇", desc: "No rules. Build anything that matters to you" },
];

const SCHEDULE = [
  { time: "9:00 AM", label: "Check in Opens", phase: 0 },
  { time: "9:30 AM", label: "Opening Ceremony", phase: 0 },
  { time: "10:10 AM", label: "Hacking Begins", phase: 1 },
  { time: "10:30 AM", label: "Workshops & Mentor Sessions", phase: 1 },
  { time: "11:30 AM", label: "Lunch", phase: 1 },
  { time: "1:00 PM", label: "More Workshops & Sponsor Sessions", phase: 1 },
  { time: "2:30 PM", label: "Project Submissions", phase: 2 },
  { time: "2:50 PM", label: "Demo Hour & Judging", phase: 2 },
  { time: "4:30 PM", label: "Awards & Closing Ceremony", phase: 2 },
  { time: "5:00 PM", label: "Dinner & Networking", phase: 2 },
  { time: "6:00 PM", label: "Event Ends", phase: 2 },
];

const FAQ = [
  { q: "Who can attend?", a: "HackClaflin is open to college students and recent graduates. Beginners are especially encouraged to join." },
  { q: "Do I need coding experience?", a: "No. This is a beginner-friendly event. You can learn during the hackathon." },
  { q: "Do I need a team?", a: "No. You can come with a team or form one at the event." },
  { q: "What should I bring?", a: "Bring your laptop, charger, and anything else you need to build comfortably." },
  { q: "How long is the event?", a: "HackClaflin 2026 is an 8-hour hack day, from 9:00 AM to 5:00 PM." },
  { q: "What will we be doing?", a: "You’ll spend the day building a project, attending workshops, and getting help from mentors." },
  { q: "What can I build?", a: "You can build anything, a website, app, tool, or idea you care about. It doesn’t have to be perfect." },
  { q: "Is it free?", a: "Yes. HackClaflin is free to attend." },
  { q: "Where is the event located?", a: "Claflin University Student Center, Ballroom B, Orangeburg, South Carolina." },
  { q: "Will food be provided?", a: "Yes, food and snacks will be available during the event." },
  { q: "What if I’ve never been to a hackathon before?", a: "That’s completely fine. HackClaflin is designed for first-time participants." },
  { q: "Still have questions?", a: "If you have any more questions, feel free to reach out to us at team@hackclaflin.org." },
];

const TEAM = [
  { name: "Beryl Ghany", role: "Lead Organizer" },
  { name: "Swikriti Neupane", role: "Marketing & Communications" },
  { name: "Aditi Patel", role: "Technical Lead" },
  { name: "Toluwalope Awoleke", role: "Judging & Prizes" },
  { name: "Cinthia Gomez", role: "Community & Outreach" },
  { name: "Joan Ufot", role: "Operations & Logistics" },
];

// Authentic geometric maze/squiggle background - drawn as SVG paths
function MazePattern({ opacity = 0.07, color = "#8B1A2B" }) {
  const paths = [
    "M0,40 L20,40 L20,20 L60,20 L60,60 L40,60 L40,80 L80,80 L80,40 L100,40",
    "M10,0 L10,30 L50,30 L50,10 L90,10 L90,50 L70,50 L70,70 L110,70",
    "M0,80 L30,80 L30,50 L70,50 L70,90 L50,90 L50,110",
    "M40,0 L40,20 L80,20 L80,0",
    "M0,0 L0,20 L20,20 L20,40 L0,40 L0,60",
    "M60,40 L80,40 L80,60 L100,60 L100,40 L120,40 L120,20",
    "M20,60 L20,80 L40,80 L40,100 L20,100 L20,120",
    "M80,70 L100,70 L100,90 L80,90 L80,110 L100,110",
    "M100,0 L100,30 L120,30 L120,10 L140,10 L140,50 L120,50",
    "M0,100 L30,100 L30,120 L10,120 L10,140 L50,140 L50,120 L70,120 L70,100",
  ];

  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }} viewBox="0 0 160 160" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="maze" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          {paths.map((d, i) => (
            <path key={i} d={d} stroke={color} strokeWidth="6" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#maze)" />
    </svg>
  );
}

function AnimatedMaze() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const cols = ["#8B1A2B","#A52030","#C0392B","#6B0F1A","#3D0A10","#B03040","#7a1525"];
    const segs = Array.from({ length: 30 }, () => ({
      x: Math.random() * 1400 - 200,
      y: Math.random() * 900 - 100,
      len: 40 + Math.random() * 80,
      dir: Math.floor(Math.random() * 4),
      color: cols[Math.floor(Math.random() * cols.length)],
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: 0.04 + Math.random() * 0.08,
      w: 4 + Math.random() * 8,
    }));

    const drawSeg = (s) => {
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.w;
      ctx.lineCap = "square";
      ctx.beginPath();
      const hw = s.len / 2;
      const hh = s.len / 3;
      if (s.dir === 0) {
        ctx.moveTo(s.x - hw, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.lineTo(s.x, s.y - hh);
      } else if (s.dir === 1) {
        ctx.moveTo(s.x, s.y - hh);
        ctx.lineTo(s.x, s.y);
        ctx.lineTo(s.x + hw, s.y);
        ctx.lineTo(s.x + hw, s.y + hh);
      } else if (s.dir === 2) {
        ctx.moveTo(s.x - hw, s.y + hh);
        ctx.lineTo(s.x - hw, s.y);
        ctx.lineTo(s.x + hw, s.y);
        ctx.lineTo(s.x + hw, s.y - hh);
      } else {
        ctx.moveTo(s.x - hw, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + hh);
        ctx.lineTo(s.x + hw, s.y + hh);
      }
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      segs.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < -200) s.x = canvas.width + 200;
        if (s.x > canvas.width + 200) s.x = -200;
        if (s.y < -200) s.y = canvas.height + 200;
        if (s.y > canvas.height + 200) s.y = -200;
        drawSeg(s);
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

function Countdown() {
  const TARGET = new Date("2026-04-18T09:00:00");
  const calc = () => Math.max(0, TARGET - new Date());
  const [diff, setDiff] = useState(calc());
  useEffect(() => { const id = setInterval(() => setDiff(calc()), 1000); return () => clearInterval(id); }, []);
  const pad = v => String(Math.floor(v)).padStart(2, "0");
  const units = [
    [pad(diff / 86400000), "days"],
    [pad((diff % 86400000) / 3600000), "hrs"],
    [pad((diff % 3600000) / 60000), "min"],
    [pad((diff % 60000) / 1000), "sec"],
  ];
  return (
    <div style={{ display: "flex", gap: "clamp(8px,2vw,20px)", alignItems: "center" }}>
      {units.map(([v, l], i) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: "clamp(8px,2vw,20px)" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "clamp(40px,8vw,80px)", fontWeight: 900,
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#fff", lineHeight: 1,
              textShadow: "4px 4px 0 #6B0F1A",
            }}>{v}</div>
            <div style={{ fontSize: "clamp(9px,1.2vw,12px)", letterSpacing: 4, color: "#f5c6c6", textTransform: "uppercase", fontWeight: 600 }}>{l}</div>
          </div>
          {i < 3 && <div style={{ fontSize: "clamp(32px,6vw,60px)", color: "#8B1A2B", fontWeight: 900, paddingBottom: 18, fontFamily: "'Bebas Neue', sans-serif" }}>:</div>}
        </div>
      ))}
    </div>
  );
}

function NavBar({ scrollTo }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: solid ? "rgba(10,3,5,0.96)" : "transparent",
      backdropFilter: solid ? "blur(16px)" : "none",
      borderBottom: solid ? "1px solid rgba(139,26,43,0.3)" : "none",
      transition: "all 0.4s",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "8px clamp(16px,4vw,48px)",
    }}>
      <img src={IMGS.logo} alt="Hack Claflin" style={{ height: 62, width: "auto" }} />
      <div className="nav-scroll" style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "nowrap", whiteSpace: "nowrap", overflowX: "auto", maxWidth: "70vw" }}>
        {["about","tracks","schedule","sponsors","team","faqs"].map(s => (
          <button key={s} onClick={() => scrollTo(s)} style={{
            background: "transparent", border: "none", color: "rgba(255,255,255,0.75)",
            fontFamily: "'Cabinet Grotesk', 'Syne', sans-serif",
            fontWeight: 600, fontSize: 13, letterSpacing: 0.5,
            padding: "6px 12px", cursor: "pointer", borderRadius: 6, transition: "color 0.2s", flexShrink: 0,
          }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}
          >{s}</button>
        ))}
        <a href="https://events.mlh.io/events/13938-hackclaflin-2026" target="_blank" rel="noopener noreferrer"
          style={{
            marginLeft: 8, background: "#8B1A2B", color: "#fff", fontWeight: 800,
            fontSize: 13, padding: "9px 20px", borderRadius: 8, textDecoration: "none",
            fontFamily: "'Cabinet Grotesk', 'Syne', sans-serif", letterSpacing: 0.3, flexShrink: 0,
            transition: "background 0.2s",
          }}>Register Now</a>
      </div>
    </nav>
  );
}

export default function HackClaflin() {
  const [faqOpen, setFaqOpen] = useState(null);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="hackclaflin-page" style={{ fontFamily: "'Cabinet Grotesk', 'Syne', sans-serif", background: "#08020a", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800;900&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        .hackclaflin-page, .hackclaflin-page * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.03); } }
        @keyframes bob { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }

        ::selection { background: #8B1A2B; color: #fff; }

        .section { padding: clamp(72px,10vw,120px) clamp(20px,6vw,80px); max-width: 1140px; margin: 0 auto; }

        .track-card {
          background: rgba(139,26,43,0.07);
          border: 1px solid rgba(139,26,43,0.2);
          border-radius: 4px;
          padding: 28px 24px;
          transition: all 0.3s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .track-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: #8B1A2B;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s;
        }
        .track-card:hover { background: rgba(139,26,43,0.14); border-color: rgba(139,26,43,0.5); transform: translateY(-2px); }
        .track-card:hover::before { transform: scaleY(1); }

        .sched-item {
          display: flex; align-items: flex-start; gap: 20px;
          padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: all 0.2s;
        }
        .sched-item:hover { padding-left: 8px; }

        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .faq-q {
          padding: 20px 0; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          font-weight: 700; font-size: 17px; transition: color 0.2s;
          font-family: 'Syne', sans-serif;
        }
        .faq-q:hover { color: #dc3c50; }
        .faq-q:focus-visible {
          outline: 2px solid #8B1A2B;
          outline-offset: 4px;
          border-radius: 4px;
        }
        .faq-a {
          overflow: hidden; transition: max-height 0.4s ease, opacity 0.3s;
          color: rgba(255,255,255,0.65); font-size: 15px; line-height: 1.75;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        .sponsor-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 32px 28px;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          transition: all 0.3s;
        }
        .sponsor-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(139,26,43,0.4); transform: translateY(-3px); }

        .stat-block { text-align: center; }
        .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(52px,8vw,88px); color: #8B1A2B; line-height: 0.9; }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.55); letter-spacing: 2px; text-transform: uppercase; margin-top: 8px; }

        .team-card {
          display: flex; align-items: center; gap: 14px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px; padding: 18px 20px; transition: all 0.25s;
        }
        .team-card:hover { background: rgba(139,26,43,0.1); border-color: rgba(139,26,43,0.3); }

        .avatar { width: 48px; height: 48px; border-radius: 50%; background: rgba(139,26,43,0.25); border: 1.5px solid rgba(139,26,43,0.5); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: #dc6070; flex-shrink: 0; font-family: 'DM Mono', monospace; }

        .phase-badge { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 3px 10px; border-radius: 2px; font-family: 'DM Mono', monospace; }
        .nav-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .nav-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <NavBar scrollTo={scrollTo} />

      {/* ====== HERO ====== */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 110 }}>

        {/* Maroon maze background */}
        <MazePattern opacity={0.12} color="#8B1A2B" />
        <AnimatedMaze />

        {/* Deep radial glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(139,26,43,0.18) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 700, height: 700, borderRadius: "50%", border: "1px solid rgba(139,26,43,0.12)", transform: "translate(-50%,-50%)", animation: "spin 60s linear infinite" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 450, height: 450, borderRadius: "50%", border: "1px dashed rgba(139,26,43,0.1)", transform: "translate(-50%,-50%)", animation: "spin 40s linear infinite reverse" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 clamp(16px,5vw,60px)", animation: "fadeUp 0.9s ease", maxWidth: 1000 }}>
          <div style={{ fontSize: "clamp(11px,1.5vw,13px)", letterSpacing: 5, color: "#dc6070", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 16, fontWeight: 500 }}>
            First Student Led Hackathon at Claflin University
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(72px,16vw,180px)",
            lineHeight: 0.85, letterSpacing: "clamp(2px,1vw,8px)",
            color: "#fff", marginBottom: 8,
            textShadow: "6px 6px 0 #3D0A10, 12px 12px 0 rgba(61,10,16,0.3)",
          }}>HackClaflin</h1>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px,9vw,100px)",
            color: "#8B1A2B", lineHeight: 0.9, marginBottom: 28,
            textShadow: "4px 4px 0 #3D0A10",
          }}>2026</div>

          <p style={{ fontSize: "clamp(15px,2vw,19px)", color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto 12px", lineHeight: 1.6 }}>
            One day. Real projects. No experience needed.
          </p>
          <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "rgba(255,255,255,0.4)", marginBottom: 44, fontFamily: "'DM Mono', monospace" }}>
            April 18, 2026 &nbsp;·&nbsp; 9AM, 5PM &nbsp;·&nbsp; Student Center, Ballroom B &nbsp;·&nbsp; Orangeburg, SC
          </p>

          <div style={{ marginBottom: 52, display: "flex", justifyContent: "center", width: "100%" }}>
            <Countdown />
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://events.mlh.io/events/13938-hackclaflin-2026" target="_blank" rel="noopener noreferrer" style={{
              background: "#8B1A2B", color: "#fff", fontWeight: 800, fontSize: "clamp(14px,2vw,17px)",
              padding: "clamp(14px,2vw,18px) clamp(28px,4vw,52px)", borderRadius: 4,
              textDecoration: "none", letterSpacing: 0.5, fontFamily: "'Syne', sans-serif",
              transition: "all 0.25s", border: "2px solid #8B1A2B",
              display: "inline-block",
            }}>Register to Hack</a>
            <a href="https://tally.so/r/ZjjGg0" target="_blank" rel="noopener noreferrer" style={{
              background: "transparent", color: "#fff", fontWeight: 700, fontSize: "clamp(14px,2vw,16px)",
              padding: "clamp(14px,2vw,18px) clamp(28px,4vw,44px)", borderRadius: 4,
              border: "2px solid rgba(255,255,255,0.25)", textDecoration: "none",
              fontFamily: "'Syne', sans-serif", transition: "all 0.25s",
            }}>Volunteer</a>
          </div>

          {/* MLH badge style */}
          <div style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>AN MLH HACK DAY</span>
            <img src={IMGS.mlh} alt="MLH" style={{ height: 28, width: "auto", filter: "brightness(0.9)" }} />
          </div>
        </div>
      </section>

      {/* ====== TICKER ====== */}
      <div style={{ background: "#8B1A2B", padding: "12px 0", overflow: "hidden", borderTop: "3px solid #6B0F1A", borderBottom: "3px solid #6B0F1A" }}>
        <div style={{ display: "flex", animation: "ticker 22s linear infinite", width: "max-content" }}>
          {[...Array(3)].map((_, r) => (
            <div key={r} style={{ display: "flex" }}>
              {["150+ Hackers Expected", "First Student Led Hackathon", "Open to All Majors", "8 Hours of Building", "April 18 · 2026", "No Experience Needed", "Free to Attend"].map((t, i) => (
                <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 3, padding: "0 36px", borderRight: "2px solid rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ====== ABOUT ====== */}
      <div id="about" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px,7vw,80px)", lineHeight: 0.9, marginBottom: 24, letterSpacing: 2 }}>
                Build.<br />Learn.<br /><span style={{ color: "#8B1A2B" }}>Ship.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "clamp(15px,1.5vw,17px)", marginBottom: 16 }}>
                HackClaflin 2026 is a one-day hackathon where students come together to build real projects, learn new skills, and try something new.
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "clamp(15px,1.5vw,17px)", marginBottom: 32 }}>
                No experience needed. No matter your major. All you need is curiosity and a laptop.
              </p>
              <div style={{ background: "rgba(139,26,43,0.1)", border: "1px solid rgba(139,26,43,0.3)", borderRadius: 4, padding: "24px 28px" }}>
                {[["Date", "Saturday, April 18, 2026"], ["Time", "9:00 AM, 5:00 PM"], ["Building", "8 hours of hacking"], ["Location", "Student Center, Ballroom B"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 20, marginBottom: 12, alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, color: "#8B1A2B", fontFamily: "'DM Mono', monospace", fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", minWidth: 72 }}>{k}</span>
                    <span style={{ fontSize: 18, color: "#fff", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 40 }}>
                {[["150+", "Hackers Expected"], ["8", "Hours of Building"], ["7+", "Tracks to Explore"], ["0", "Experience Required"]].map(([n, l]) => (
                  <div key={l} className="stat-block">
                    <div className="stat-num">{n}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ position: "relative", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(139,26,43,0.3)" }}>
                <MazePattern opacity={0.25} color="#8B1A2B" />
                <div style={{ padding: "28px 24px", position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 14, letterSpacing: 3, color: "#8B1A2B", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>What to expect</div>
                  {["Hands-on building from day one", "Workshops with real tools", "Industry mentor sessions", "Prizes for top projects", "Free food & swag"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 17, color: "rgba(255,255,255,0.8)" }}>
                      <div style={{ width: 7, height: 7, background: "#8B1A2B", borderRadius: 1, flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== TRACKS ====== */}
      <div id="tracks" style={{ background: "rgba(139,26,43,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section">
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px,7vw,80px)", lineHeight: 0.9, marginBottom: 16, letterSpacing: 2 }}>
            What will you <span style={{ color: "#8B1A2B" }}>build?</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, marginBottom: 48 }}>7+ tracks. One day. Infinite possibilities.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
            {TRACKS.map(({ name, icon, desc }) => (
              <div key={name} className="track-card">
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, color: "#8B1A2B", marginBottom: 12 }}>{icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, marginBottom: 8, color: "#fff" }}>{name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== SCHEDULE ====== */}
      <div id="schedule" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section" style={{ maxWidth: 800 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#8B1A2B", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 12, fontWeight: 500 }}>April 18, 2026</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px,7vw,80px)", lineHeight: 0.9, marginBottom: 48, letterSpacing: 2 }}>
            Schedule
          </h2>
          {SCHEDULE.map((item, i) => {
            const phaseColors = ["rgba(139,26,43,0.6)", "#8B1A2B", "rgba(61,10,16,0.8)"];
            const phaseLabels = ["Opening", "Build", "Demos"];
            const phaseBg = ["rgba(139,26,43,0.08)", "rgba(139,26,43,0.15)", "rgba(61,10,16,0.1)"];
            return (
              <div key={i} className="sched-item">
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#8B1A2B", minWidth: 75, paddingTop: 2, fontWeight: 500 }}>{item.time}</div>
                <div style={{ width: 2, background: phaseColors[item.phase], alignSelf: "stretch", borderRadius: 2, flexShrink: 0, minHeight: 24 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 4 }}>{item.label}</div>
                  <span className="phase-badge" style={{ background: phaseBg[item.phase], color: phaseColors[item.phase] }}>{phaseLabels[item.phase]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====== SPONSORS ====== */}
      <div id="sponsors" style={{ background: "rgba(139,26,43,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section">
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#8B1A2B", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 12, fontWeight: 500 }}>Partners</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px,7vw,80px)", lineHeight: 0.9, marginBottom: 48, letterSpacing: 2 }}>
            Backed by the <span style={{ color: "#8B1A2B" }}>best</span>
          </h2>

          {/* League partner */}
          <div style={{ marginBottom: 16, fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>League Partner</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginBottom: 40 }}>
            <div className="sponsor-card" style={{ border: "1px solid rgba(139,26,43,0.35)" }}>
              <img src={IMGS.mlh} alt="MLH" style={{ height: 56, width: "auto", filter: "brightness(1.1)" }} />
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>Major League Hacking</div>
            </div>
          </div>

          {/* Powered by */}
          <div style={{ marginBottom: 16, fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>Powered by</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginBottom: 40 }}>
            <div className="sponsor-card">
              <img src={IMGS.gemini} alt="Google Gemini" style={{ height: 40, width: "auto", maxWidth: "100%" }} />
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>Google Gemini</div>
            </div>
          </div>

          {/* Community partners */}
          <div style={{ marginBottom: 16, fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>Community Partners</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16, marginBottom: 48 }}>
            {[
              { img: IMGS.lovable, alt: "Lovable", label: "Lovable" },
              { img: IMGS.plotly, alt: "Plotly", label: "Plotly" },
            ].map(({ img, alt, label }) => (
              <div key={alt} className="sponsor-card">
                <img src={img} alt={alt} style={{ height: 36, width: "auto", maxWidth: "90%", filter: alt === "Lovable" ? "brightness(10)" : "brightness(1.5)" }} />
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16, fontSize: 15 }}>Want to sponsor HackClaflin 2026?</p>
            <a href="mailto:sponsors@hackclaflin.org" style={{ background: "transparent", color: "#8B1A2B", fontWeight: 700, fontSize: 14, padding: "11px 28px", borderRadius: 4, border: "1.5px solid #8B1A2B", textDecoration: "none", fontFamily: "'Syne', sans-serif" }}>Get in Touch</a>
          </div>
        </div>
      </div>

      {/* ====== TEAM ====== */}
      <div id="team" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section">
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#8B1A2B", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 12, fontWeight: 500 }}>Organizers</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px,7vw,80px)", lineHeight: 0.9, marginBottom: 48, letterSpacing: 2 }}>
            Meet the <span style={{ color: "#8B1A2B" }}>team</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 28, fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>
            Organized by Panther Hacks
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
            {TEAM.map((t, i) => (
              <div key={i} className="team-card">
                <div className="avatar">{t.name.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", fontFamily: "'Syne', sans-serif" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#8B1A2B", marginTop: 2, fontFamily: "'DM Mono', monospace" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== FAQ ====== */}
      <div id="faqs" style={{ background: "rgba(139,26,43,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#8B1A2B", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 12, fontWeight: 500 }}>FAQs</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px,7vw,80px)", lineHeight: 0.9, marginBottom: 48, letterSpacing: 2 }}>
            Got <span style={{ color: "#8B1A2B" }}>questions?</span>
          </h2>
          {FAQ.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                type="button"
                className="faq-q"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                aria-expanded={faqOpen === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                style={{ width: "100%", background: "transparent", border: 0, color: "inherit", textAlign: "left" }}
              >
                {item.q}
                <span style={{ color: "#8B1A2B", fontSize: 22, transition: "transform 0.3s", transform: faqOpen === i ? "rotate(45deg)" : "rotate(0)", display: "inline-block", flexShrink: 0, marginLeft: 16, fontFamily: "'DM Mono', monospace" }}>+</span>
              </button>
              <div
                className="faq-a"
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                style={{ maxHeight: faqOpen === i ? 180 : 0, opacity: faqOpen === i ? 1 : 0, paddingBottom: faqOpen === i ? 20 : 0 }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== FINAL CTA ====== */}
      <div style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,12vw,140px) 24px", textAlign: "center", background: "linear-gradient(180deg, #08020a 0%, #1a0408 50%, #08020a 100%)" }}>
        <MazePattern opacity={0.15} color="#8B1A2B" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,26,43,0.2) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px,10vw,110px)", lineHeight: 0.85, letterSpacing: 4, marginBottom: 20 }}>
            Secure your<br /><span style={{ color: "#8B1A2B" }}>spot. It's free.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(14px,1.8vw,17px)", marginBottom: 44, maxWidth: 480, margin: "0 auto 44px" }}>
            Registration is free and open to all college students. Limited spots, do not wait.
          </p>
          <a href="https://events.mlh.io/events/13938-hackclaflin-2026" target="_blank" rel="noopener noreferrer" style={{
            background: "#8B1A2B", color: "#fff", fontWeight: 800,
            fontSize: "clamp(15px,2vw,18px)", padding: "clamp(16px,2vw,20px) clamp(36px,5vw,64px)",
            borderRadius: 4, textDecoration: "none", fontFamily: "'Syne', sans-serif",
            letterSpacing: 0.5, display: "inline-block",
          }}>Register to Hack on MLH</a>
        </div>
      </div>

      {/* ====== FOOTER ====== */}
      <footer style={{
        background: "#04010a", borderTop: "1px solid rgba(139,26,43,0.2)",
        padding: "32px clamp(20px,5vw,60px)",
        display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20,
      }}>
        <img src={IMGS.logo} alt="Hack Claflin" style={{ height: 38, opacity: 0.85 }} />
        <div style={{ textAlign: "center", flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>HackClaflin 2026 · April 18 · Claflin University · Orangeburg, SC</div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["team@hackclaflin.org"].map(e => (
            <a key={e} href={`mailto:${e}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", fontFamily: "'DM Mono', monospace", transition: "color 0.2s" }}
              onMouseEnter={ev => ev.target.style.color = "#8B1A2B"}
              onMouseLeave={ev => ev.target.style.color = "rgba(255,255,255,0.4)"}
            >{e}</a>
          ))}
        </div>
        <div style={{ width: "100%", textAlign: "center", marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}>
          © 2026 HackClaflin • Built with ❤️ for Panthers by panthers
        </div>
      </footer>
    </div>
  );
}
