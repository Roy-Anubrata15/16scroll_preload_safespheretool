// SprintoConnectionsResponsive.js
import React, {
  useRef,
  useEffect,
  useState,
  useMemo
} from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  ShieldCheck,
  FileText,
  SearchCheck,
  CheckCircle2,
  Users,
  Server,
  MonitorSmartphone,
  Workflow,
  Lock
} from "lucide-react";

gsap.registerPlugin(MotionPathPlugin);

// ---------- SHARED CONFIG (DESKTOP) ----------

const ENTITIES = [
  { id: "risk", label: "Risk Management", color: "#f97316" },
  { id: "docs", label: "Documentation", color: "#2563eb" },
  { id: "gap", label: "Gap Assessment", color: "#eab308" }
];

const TSCS = [
  { id: "sec", label: "Security" },
  { id: "conf", label: "Confidentiality" },
  { id: "priv", label: "Privacy" },
  { id: "avail", label: "Availability" },
  { id: "procint", label: "Process Integrity" }
];

const COLORS = {
  bg: "#f9fafb",
  cardBg: "#ffffff",
  borderSoft: "rgba(148,163,184,0.35)",
  textMuted: "#6b7280",
  heading: "#111827",
  accentBlue: "#2563eb",
  accentBlueSoft: "#60a5fa",
  accentGreen: "#16a34a",
  path: "rgba(148,163,184,0.45)",
  pathActive: "#2563eb"
};

// ---------- DESKTOP ROOT ----------

const SprintoConnectionsDesktop = ({ onConnectionClick }) => {
  const [entityProgress, setEntityProgress] = useState(
    ENTITIES.reduce((acc, e) => ({ ...acc, [e.id]: 10 }), {})
  );
  const [entityComplete, setEntityComplete] = useState(
    ENTITIES.reduce((acc, e) => ({ ...acc, [e.id]: false }), {})
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const tlRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        setEntityProgress(
          ENTITIES.reduce((acc, e) => ({ ...acc, [e.id]: 10 }), {})
        );
        setEntityComplete(
          ENTITIES.reduce((acc, e) => ({ ...acc, [e.id]: false }), {})
        );
        setActiveIndex(0);
      }
    });

    ENTITIES.forEach((entity, index) => {
      const stateObj = { value: 10 };

      tl.to(stateObj, {
        value: 100,
        duration: 3,
        ease: "power1.inOut",
        onStart: () => setActiveIndex(index),
        onUpdate: () => {
          setEntityProgress(prev => ({
            ...prev,
            [entity.id]: stateObj.value
          }));
        },
        onComplete: () => {
          setEntityComplete(prev => ({
            ...prev,
            [entity.id]: true
          }));
        }
      });
    });

    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  const allComplete = ENTITIES.every(e => entityComplete[e.id]);

  return (
    <div
      style={{
        borderRadius: 28,
        background: COLORS.bg,
        padding: 32,
        border: `1px solid ${COLORS.borderSoft}`,
        boxShadow: "0 24px 90px rgba(15,23,42,0.14)",
        maxWidth: 1100
      }}
    >
      <HeaderRow />
      <MainGrid
        onConnectionClick={onConnectionClick}
        entityProgress={entityProgress}
        entityComplete={entityComplete}
        activeIndex={activeIndex}
        allComplete={allComplete}
      />
    </div>
  );
};

// ---------- DESKTOP SUBCOMPONENTS ----------

const HeaderRow = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background:
            "linear-gradient(135deg, rgba(79,70,229,0.1), rgba(59,130,246,0.2))",
          border: `1px solid ${COLORS.borderSoft}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.accentBlue
        }}
      >
        S
      </div>
      <div>
        <div
          style={{
            fontWeight: 600,
            letterSpacing: 0.04,
            color: COLORS.heading,
            fontSize: 20
          }}
        >
          SafeSphere
        </div>
        <div style={{ fontSize: 14, color: COLORS.textMuted }}>
          Modules mapped to ISO 27001 criteria
        </div>
      </div>
    </div>
  </div>
);

const MainGrid = ({
  onConnectionClick,
  entityProgress,
  entityComplete,
  activeIndex,
  allComplete
}) => {
  const [hoverId, setHoverId] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        height: "auto",
        display: "grid",
        gridTemplateColumns: "1.4fr 1.9fr 1.4fr",
        gap: 20
      }}
    >
      <Column title="Entities">
        {ENTITIES.map((e, i) => (
          <HoverScale
            key={e.id}
            active={hoverId?.startsWith(`L-${e.id}`) || activeIndex === i}
          >
            <EntityCard
              entity={e}
              value={entityProgress[e.id] || 0}
              complete={entityComplete[e.id]}
            />
          </HoverScale>
        ))}
      </Column>

      <CenterMonitor
        active={Boolean(hoverId)}
        activeIndex={activeIndex}
        allComplete={allComplete}
      />

      <Column title="ISO 27001">
        {TSCS.map(t => (
          <HoverScale key={t.id} active={hoverId?.startsWith(`R-${t.id}`)}>
            <TscCard label={t.label} />
          </HoverScale>
        ))}
      </Column>

      <ConnectionsOverlay
        hoverId={hoverId}
        setHoverId={setHoverId}
        onConnectionClick={onConnectionClick}
      />
    </div>
  );
};

const Column = ({ title, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <div
      style={{
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: 1.8,
        color: COLORS.textMuted,
        marginBottom: 4
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

const CardShell = ({ children }) => (
  <div
    style={{
      background: COLORS.cardBg,
      borderRadius: 16,
      padding: 18,
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 34px rgba(15,23,42,0.12)",
      border: "1px solid rgba(226,232,240,1)"
    }}
  >
    {children}
  </div>
);

const HoverScale = ({ active, children }) => (
  <div
    style={{
      transform: active ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
      transition: "transform 0.18s ease, box-shadow 0.18s ease",
      boxShadow: active ? "0 14px 30px rgba(15,23,42,0.14)" : "none"
    }}
  >
    {children}
  </div>
);

const EntityCard = ({ entity, value, complete }) => {
  return (
    <CardShell>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          flex: 120
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 100,
            background: entity.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 22
          }}
        >
          ●
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: COLORS.heading
            }}
          >
            {entity.label}
          </div>
          <ProgressBar value={value} />
        </div>
      </div>
      <StatusBadge complete={complete} />
    </CardShell>
  );
};

const TscCard = ({ label }) => (
  <CardShell>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 999,
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          color: COLORS.accentGreen
        }}
      >
        ✓
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: COLORS.heading,
          paddingLeft: 40
        }}
      >
        {label}
      </div>
    </div>
  </CardShell>
);

const ProgressBar = ({ value }) => (
  <div
    style={{
      marginTop: 6,
      height: 5,
      width: 96,
      borderRadius: 999,
      background: "#e5e7eb",
      overflow: "hidden"
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${Math.min(100, Math.max(0, value))}%`,
        background: `linear-gradient(90deg, ${COLORS.accentBlueSoft}, ${COLORS.accentBlue})`
      }}
    />
  </div>
);

const StatusBadge = ({ complete }) => (
  <div
    style={{
      width: 28,
      height: 28,
      borderRadius: "999px",
      border: complete
        ? `2px solid ${COLORS.accentGreen}`
        : "2px solid rgba(148,163,184,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      color: complete ? COLORS.accentGreen : COLORS.textMuted
    }}
  >
    {complete ? "✓" : ""}
  </div>
);

// ---------- CENTER MONITOR (DESKTOP) ----------

const CenterMonitor = ({ active, activeIndex, allComplete }) => {
  const messages = [
    "Running Risk Management checks...",
    "Processing Documentation evidence...",
    "Evaluating Gap Assessment...",
    "All modules complete. Compliance achieved."
  ];

  const iconComponents = [ShieldCheck, FileText, SearchCheck, CheckCircle2];

  const stepIndex = allComplete ? 3 : Math.min(activeIndex, 2);
  const text = allComplete ? messages[3] : messages[stepIndex];
  const Icon = iconComponents[stepIndex];

  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { scale: 0.96 },
      { scale: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [stepIndex]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: 210,
          height: 210,
          borderRadius: 26,
          background: "linear-gradient(160deg,#2563eb,#22c55e)",
          padding: 12,
          boxShadow: "0 20px 55px rgba(37,99,235,0.4)",
          transform: active ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.18s ease, box-shadow 0.18s ease"
        }}
      >
        <div
          ref={cardRef}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 18,
            background: COLORS.cardBg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            textAlign: "center"
          }}
        >
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: 22,
              background: COLORS.accentBlue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              marginBottom: 14,
              boxShadow: "0 16px 46px rgba(37,99,235,0.6)"
            }}
          >
            <Icon size={38} strokeWidth={2.4} />
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: COLORS.heading,
              marginBottom: 4
            }}
          >
            SAFESPHERE
          </div>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textMuted,
              lineHeight: 1.5
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- SVG CONNECTIONS (DESKTOP) ----------

const ConnectionsOverlay = ({ hoverId, setHoverId, onConnectionClick }) => {
  const [tooltip, setTooltip] = useState(null);

  const { width, height, leftPoints, rightPoints, center } = useMemo(() => {
    const w = 930;
    const h = 340;

    const leftX = 160;
    const rightX = w - 180;
    const centerX = w / 2;
    const centerY = h / 2;

    const leftYBase = 70;
    const leftYGap = 90;

    const rightYBase = 40;
    const rightYGap = 78;

    const leftPts = ENTITIES.map((_, i) => ({
      x: leftX,
      y: leftYBase + i * leftYGap
    }));

    const rightPts = TSCS.map((_, i) => ({
      x: rightX,
      y: rightYBase + i * rightYGap
    }));

    return {
      width: w,
      height: h,
      leftPoints: leftPts,
      rightPoints: rightPts,
      center: { x: centerX, y: centerY }
    };
  }, []);

  const conns = useMemo(() => {
    const leftConns = leftPoints.map((p, i) => ({
      id: `L-${ENTITIES[i].id}`,
      from: p,
      to: center,
      label: ENTITIES[i].label + " → Hub"
    }));
    const rightConns = rightPoints.map((p, i) => ({
      id: `R-${TSCS[i].id}`,
      from: center,
      to: p,
      label: "Hub → " + TSCS[i].label
    }));
    return [].concat(leftConns, rightConns);
  }, [leftPoints, rightPoints, center]);

  const handleEnter = (id, label, pos) => {
    setHoverId(id);
    setTooltip({ label: label, x: pos.x, y: pos.y });
  };

  const handleLeave = id => {
    setHoverId(prev => (prev === id ? null : prev));
    setTooltip(null);
  };

  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox={"0 0 " + width + " " + height}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none"
        }}
      >
        <defs>
          <filter id="connGlowLight">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {conns.map(c => (
          <Connection
            key={c.id}
            conn={c}
            hovered={hoverId === c.id}
            onEnter={handleEnter}
            onLeave={handleLeave}
            onClick={onConnectionClick}
          />
        ))}
      </svg>

      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + "px",
            top: tooltip.y + "px",
            transform: "translate(-50%, -120%)",
            background: "white",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 11,
            color: COLORS.heading,
            boxShadow: "0 4px 18px rgba(15,23,42,0.20)",
            pointerEvents: "none",
            whiteSpace: "nowrap"
          }}
        >
          {tooltip.label}
        </div>
      )}
    </>
  );
};

const Connection = ({ conn, hovered, onEnter, onLeave, onClick }) => {
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const tlRef = useRef(null);
  const d = useMemo(
    () => makeCubicPath(conn.from, conn.to),
    [conn.from, conn.to]
  );

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: 0
    });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(dot, {
      duration: 4,
      ease: "none",
      motionPath: {
        path: path,
        align: path,
        autoRotate: false,
        alignOrigin: [0.5, 0.5]
      }
    });
    tlRef.current = tl;

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const tl = tlRef.current;
    if (!path || !tl) return;

    const length = path.getTotalLength();

    if (hovered) {
      gsap.to(path, {
        stroke: COLORS.pathActive,
        strokeWidth: 2,
        strokeDashoffset: -length * 0.2,
        duration: 0.4,
        ease: "power2.out"
      });
      tl.timeScale(2.3);
    } else {
      gsap.to(path, {
        stroke: COLORS.path,
        strokeWidth: 1.3,
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      tl.timeScale(1);
    }
  }, [hovered]);

  const mid = {
    x: (conn.from.x + conn.to.x) / 2,
    y: (conn.from.y + conn.to.y) / 2
  };

  const handleMouseEnter = () => onEnter(conn.id, conn.label, mid);
  const handleMouseLeave = () => onLeave(conn.id);
  const handleClick = () => {
    if (onClick) onClick(conn.id);
  };

  return (
    <g
      style={{ cursor: "pointer", pointerEvents: "auto" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={COLORS.path}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path d={d} fill="none" stroke="transparent" strokeWidth={18} />
      <circle
        ref={dotRef}
        r={4}
        fill={COLORS.accentBlue}
        stroke="#93c5fd"
        strokeWidth={1.3}
        filter="url(#connGlowLight)"
      />
      <circle r={3} cx={conn.from.x} cy={conn.from.y} fill="#e5e7eb" />
      <circle r={3} cx={conn.to.x} cy={conn.to.y} fill="#e5e7eb" />
    </g>
  );
};

const makeCubicPath = (from, to) => {
  const midX = (from.x + to.x) / 2;
  const verticalOffset = (to.y - from.y) * 0.15;
  const c1 = { x: midX, y: from.y + verticalOffset };
  const c2 = { x: midX, y: to.y - verticalOffset };
  return (
    "M " +
    from.x +
    " " +
    from.y +
    " C " +
    c1.x +
    " " +
    c1.y +
    " " +
    c2.x +
    " " +
    c2.y +
    " " +
    to.x +
    " " +
    to.y
  );
};

// ---------- MOBILE CONFIG ----------

const MOBILE_COLORS = {
  bg: "#f9fafb",
  cardBg: "#ffffff",
  panelBg: "#ffffff",
  chipBg: "rgba(226,232,240,0.9)",
  borderSoft: "rgba(148,163,184,0.35)",
  textMuted: "#6b7280",
  textBright: "#111827",
  heading: "#111827",
  accentBlue: "#2563eb",
  accentBlueSoft: "#60a5fa",
  accentGreen: "#16a34a"
};

const MOBILE_ENTITIES = [
  { id: "risk", label: "Risk Management", icon: Users },
  { id: "docs", label: "Documentation", icon: MonitorSmartphone },
  { id: "gap", label: "Gap Assessment", icon: Server },

];



const MOBILE_TSCS = [
  { id: "sec", label: "Security", icon: ShieldCheck },
  { id: "priv", label: "Privacy", icon: Lock },
  { id: "conf", label: "Confidentiality", icon: FileText },
  { id: "avail", label: "Availability", icon: Server },
  { id: "procint", label: "Process Integrity", icon: SearchCheck }
];

const STATUS_MESSAGES = [
  "Linking People, Assets, Infra, Apps and Process…",
  "Evaluating security controls across all entities…",
  "Mapping controls to SOC 2 Trust Services Criteria…",
  "All checks complete. Controls aligned to SOC 2."
];

// ---------- MOBILE COMPONENT ----------

const SprintoConnectionsMobile = () => {
  const [step, setStep] = useState(0);
  const [activeEntity, setActiveEntity] = useState(0);
  const [activeTsc, setActiveTsc] = useState(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } });

    // Risk Assessment
    tl.to({}, {
      duration: 2,
      onStart: () => {
        setStep(0);
        setActiveEntity(0);
        setActiveTsc(null);
      }
    })
    // Documentation
    .to({}, {
      duration: 2,
      onStart: () => {
        setStep(1);
        setActiveEntity(1);
        setActiveTsc(null);
      }
    })
    // Gap Assessment
    .to({}, {
      duration: 2,
      onStart: () => {
        setStep(2);
        setActiveEntity(2);
        setActiveTsc(null);
      }
    })
    // Tick TSCs one by one
    .to({}, {
      duration: 1.5,
      onStart: () => {
        setStep(3);
        setActiveEntity(2);
        setActiveTsc(0);
      }
    })
    .to({}, {
      duration: 1.5,
      onStart: () => {
        setStep(3);
        setActiveEntity(2);
        setActiveTsc(1);
      }
    })
    .to({}, {
      duration: 1.5,
      onStart: () => {
        setStep(3);
        setActiveEntity(2);
        setActiveTsc(2);
      }
    })
    .to({}, {
      duration: 1.5,
      onStart: () => {
        setStep(3);
        setActiveEntity(2);
        setActiveTsc(3);
      }
    })
    .to({}, {
      duration: 1.5,
      onStart: () => {
        setStep(3);
        setActiveEntity(2);
        setActiveTsc(4);
      }
    })
    // Slight delay before restart
    .to({}, {
      duration: 3,
      onStart: () => {
        setStep(3);
        setActiveEntity(2);
        setActiveTsc(4);
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!statusRef.current) return;
    gsap.fromTo(
      statusRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [step]);

  const StatusIconArr = [ShieldCheck, FileText, SearchCheck, CheckCircle2];
  const StatusIcon = StatusIconArr[step];

  return (
    <div
      style={{
        borderRadius: 16,
        background: MOBILE_COLORS.bg,
        padding: 8,
        border: "1px solid " + MOBILE_COLORS.borderSoft,
        boxShadow: "0 22px 70px rgba(15,23,42,0.14)",
        maxWidth: '100%',
        color: MOBILE_COLORS.textBright,
        overflowX: 'hidden',
        width: '100%'
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(56,189,248,0.32))",
              border: "1px solid " + MOBILE_COLORS.borderSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              color: MOBILE_COLORS.accentBlue
            }}
          >
            S
          </div>
          <div>
            <div
              style={{
                fontWeight: 600,
                letterSpacing: 0.04,
                color: MOBILE_COLORS.heading,
                fontSize: 18
              }}
            >
              SafeSphere
            </div>
            <div style={{ fontSize: 12, color: MOBILE_COLORS.textMuted }}>
              Entities mapped to SOC 2 TSCs
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            border: "1px solid " + MOBILE_COLORS.borderSoft,
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: MOBILE_COLORS.textMuted
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: MOBILE_COLORS.accentGreen,
              boxShadow: "0 0 12px rgba(34,197,94,0.8)"
            }}
          />
          Live monitoring
        </div>
      </div>

      {/* MOBILE STACK */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* ENTITIES */}
        <div
          style={{
            padding: 8,
            borderRadius: 16,
            background: MOBILE_COLORS.panelBg,
            border: "1px solid " + MOBILE_COLORS.borderSoft,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: "0 4px 20px rgba(15,23,42,0.08)"
          }}
        >
          <div
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 1.6,
              color: MOBILE_COLORS.textMuted
            }}
          >
            Entities
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}
          >
            {MOBILE_ENTITIES.map((e, i) => {
              const Icon = e.icon;
              const active = i === activeEntity;
              return (
                <div
                  key={e.id}
                  style={{
                    flex: "1 1 48%",
                    minWidth: "48%",
                    padding: 8,
                    borderRadius: 12,
                    border:
                      "1px solid " +
                      (active
                        ? MOBILE_COLORS.accentBlueSoft
                        : MOBILE_COLORS.borderSoft),
                    background: MOBILE_COLORS.chipBg,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transform: active ? "translateY(-1px) scale(1.02)" : "none",
                    boxShadow: active
                      ? "0 14px 30px rgba(15,23,42,0.7)"
                      : "none",
                    transition:
                      "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease"
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 999,
                      background: "rgba(30,64,175,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon size={14} color="#e5e7eb" />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{e.label}</div>
                  <div style={{ marginLeft: "auto" }}>
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 999,
                        border:
                          "1.5px solid " +
                          (active
                            ? MOBILE_COLORS.accentGreen
                            : MOBILE_COLORS.borderSoft),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: active
                          ? MOBILE_COLORS.accentGreen
                          : MOBILE_COLORS.textMuted
                      }}
                    >
                      {active ? "✓" : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER ENGINE */}
        <div
          style={{
            borderRadius: 22,
            padding: 2,
            background:
              "linear-gradient(150deg, rgba(37,99,235,0.9), rgba(16,185,129,0.9))",
            boxShadow: "0 22px 70px rgba(37,99,235,0.7)"
          }}
        >
          <div
            style={{
              borderRadius: 20,
              background: MOBILE_COLORS.cardBg,
              padding: 14,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 18,
                background: MOBILE_COLORS.accentBlue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 16px 40px rgba(37,99,235,0.9)"
              }}
            >
              <StatusIcon size={26} color="#f9fafb" strokeWidth={2.4} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: MOBILE_COLORS.heading,
                  marginBottom: 2
                }}
              >
                Automation Engine
              </div>
              <div
                ref={statusRef}
                style={{
                  fontSize: 12,
                  color: MOBILE_COLORS.textMuted,
                  lineHeight: 1.4
                }}
              >
                {STATUS_MESSAGES[step]}
              </div>
            </div>
          </div>
        </div>

        {/* TSCs */}
        <div
          style={{
            padding: 12,
            borderRadius: 20,
            background: MOBILE_COLORS.panelBg,
            border: "1px solid " + MOBILE_COLORS.borderSoft,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 4px 20px rgba(15,23,42,0.08)"
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.6,
              color: MOBILE_COLORS.textMuted
            }}
          >
            SOC 2 TSCs
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8
            }}
          >
            {MOBILE_TSCS.map((t, idx) => {
              const Icon = t.icon;
              const active = activeTsc === idx;
              return (
                <div
                  key={t.id}
                  style={{
                    padding: 9,
                    borderRadius: 12,
                    border:
                      "1px solid " +
                      (active
                        ? MOBILE_COLORS.accentGreen
                        : MOBILE_COLORS.borderSoft),
                    background: MOBILE_COLORS.cardBg,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transform: active ? "translateY(-1px) scale(1.01)" : "none",
                    transition:
                      "transform 0.16s ease, border-color 0.16s ease, background 0.16s ease"
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon size={16} color={MOBILE_COLORS.accentGreen} />
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: MOBILE_COLORS.textBright
                    }}
                  >
                    {t.label}
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 11 }}>
                    {active ? "Active" : "Ready"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- RESPONSIVE WRAPPER ----------
// forceMode: "desktop" | "mobile" | undefined

const SprintoConnections = ({ onConnectionClick, forceMode }) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 639px)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (forceMode === "desktop") {
      setIsMobile(false);
      return;
    }
    if (forceMode === "mobile") {
      setIsMobile(true);
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const handleChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [forceMode]);

  if (isMobile) {
    return <SprintoConnectionsMobile />;
  }
  return <SprintoConnectionsDesktop onConnectionClick={onConnectionClick} />;
};

export default SprintoConnections;
