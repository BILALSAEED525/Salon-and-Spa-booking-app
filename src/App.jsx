import React, { useState } from "react";

const SVGAVATARS = {
  st1: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#D4A07A"/><path d="M0 80 Q12 62 40 58 Q68 62 80 80Z" fill="#C6A87C"/><path d="M20 30 Q16 60 18 80 Q24 82 26 65 L24 30Z" fill="#1A0902"/><path d="M60 30 Q64 60 62 80 Q56 82 54 65 L56 30Z" fill="#1A0902"/><ellipse cx="40" cy="26" rx="22" ry="22" fill="#1A0902"/><ellipse cx="40" cy="44" rx="17" ry="19" fill="#D4946A"/><ellipse cx="23" cy="44" rx="2.5" ry="3.5" fill="#C07A58"/><ellipse cx="57" cy="44" rx="2.5" ry="3.5" fill="#C07A58"/><path d="M29 38 Q33 36 37 38" stroke="#1A0902" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M43 38 Q47 36 51 38" stroke="#1A0902" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="33" cy="42" rx="4" ry="3" fill="white"/><circle cx="33" cy="42" r="2.2" fill="#1A0902"/><circle cx="33.8" cy="41.2" r="0.7" fill="white"/><ellipse cx="47" cy="42" rx="4" ry="3" fill="white"/><circle cx="47" cy="42" r="2.2" fill="#1A0902"/><circle cx="47.8" cy="41.2" r="0.7" fill="white"/><path d="M38 49 Q40 52 42 49" stroke="#B07050" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M33 56 Q37 54 40 55 Q43 54 47 56 Q44 61 40 61 Q36 61 33 56Z" fill="#C86060"/></svg>`,
  st2: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#C4A882"/><path d="M0 80 Q12 62 40 58 Q68 62 80 80Z" fill="#445568"/><path d="M18 32 Q18 12 40 11 Q62 12 62 32 Q56 22 40 21 Q24 22 18 32Z" fill="#1A0902"/><ellipse cx="40" cy="46" rx="18" ry="20" fill="#C8A07A"/><ellipse cx="22" cy="46" rx="2.5" ry="3.5" fill="#B89060"/><ellipse cx="58" cy="46" rx="2.5" ry="3.5" fill="#B89060"/><path d="M22 54 Q24 70 40 73 Q56 70 58 54 Q50 62 40 63 Q30 62 22 54Z" fill="#1A0902"/><path d="M33 52 Q40 49 47 52 Q44 55 40 55 Q36 55 33 52Z" fill="#1A0902"/><path d="M28 37 Q33 34.5 38 37" stroke="#1A0902" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M42 37 Q47 34.5 52 37" stroke="#1A0902" stroke-width="2.2" fill="none" stroke-linecap="round"/><ellipse cx="33" cy="42" rx="4" ry="3" fill="white"/><circle cx="33" cy="42" r="2.2" fill="#1A0902"/><circle cx="33.8" cy="41.2" r="0.7" fill="white"/><ellipse cx="47" cy="42" rx="4" ry="3" fill="white"/><circle cx="47" cy="42" r="2.2" fill="#1A0902"/><circle cx="47.8" cy="41.2" r="0.7" fill="white"/><path d="M37 48 L36 52 Q40 55 44 52 L43 48" stroke="#A07050" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  st3: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#E8C4B0"/><path d="M0 80 Q12 62 40 58 Q68 62 80 80Z" fill="#8B1A3A"/><ellipse cx="40" cy="24" rx="20" ry="18" fill="#4A1A0A"/><ellipse cx="40" cy="11" rx="11" ry="9" fill="#4A1A0A"/><path d="M20 28 Q16 36 18 46 Q20 42 22 38Z" fill="#4A1A0A"/><path d="M60 28 Q64 36 62 46 Q60 42 58 38Z" fill="#4A1A0A"/><ellipse cx="40" cy="46" rx="17" ry="19" fill="#E0A882"/><ellipse cx="23" cy="46" rx="2.5" ry="3.5" fill="#D0946A"/><ellipse cx="57" cy="46" rx="2.5" ry="3.5" fill="#D0946A"/><ellipse cx="28" cy="48" rx="5" ry="3" fill="#F0A8A0" opacity="0.4"/><ellipse cx="52" cy="48" rx="5" ry="3" fill="#F0A8A0" opacity="0.4"/><path d="M28.5 38 Q33 36 37.5 38" stroke="#4A1A0A" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M42.5 38 Q47 36 51.5 38" stroke="#4A1A0A" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="33" cy="43" rx="4.5" ry="3.2" fill="white"/><circle cx="33" cy="43" r="2.3" fill="#1A0902"/><circle cx="33.8" cy="42.2" r="0.7" fill="white"/><ellipse cx="47" cy="43" rx="4.5" ry="3.2" fill="white"/><circle cx="47" cy="43" r="2.3" fill="#1A0902"/><circle cx="47.8" cy="42.2" r="0.7" fill="white"/><path d="M29 40.8 L27.5 39 M31 40 L30 38 M33 39.8 L33 38 M35 40 L36 38 M37 40.8 L38.5 39" stroke="#1A0902" stroke-width="0.9" fill="none"/><path d="M43 40.8 L41.5 39 M45 40 L44 38 M47 39.8 L47 38 M49 40 L50 38 M51 40.8 L52.5 39" stroke="#1A0902" stroke-width="0.9" fill="none"/><path d="M38 50 Q40 53 42 50" stroke="#C07850" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M33 57 Q37 55 40 56 Q43 55 47 57 Q44 63 40 63 Q36 63 33 57Z" fill="#D03060"/></svg>`,
};

const SERVICES = [
  {
    cat: "Hair care",
    icon: "ti-cut",
    color: "#C6A87C",
    bg: "#F3ECE0",
    items: [
      { id: "h1", name: "Balayage coloring", dur: 120, price: 7500 },
      { id: "h2", name: "Signature haircut & style", dur: 60, price: 4000 },
      { id: "h3", name: "Keratin smoothing", dur: 150, price: 12000 },
    ],
  },
  {
    cat: "Makeup artistry",
    icon: "ti-sparkles",
    color: "#9E6A8A",
    bg: "#F8F0F5",
    items: [
      { id: "m1", name: "Bridal makeup package", dur: 180, price: 25000 },
      { id: "m2", name: "Event soft glam", dur: 60, price: 6000 },
    ],
  },
  {
    cat: "Body & spa",
    icon: "ti-droplet",
    color: "#5A8A80",
    bg: "#EEF6F4",
    items: [
      { id: "s1", name: "Deep tissue massage", dur: 60, price: 5500 },
      { id: "s2", name: "Swedish relaxation", dur: 90, price: 7000 },
    ],
  },
];

const STAFF = [
  {
    id: "st1",
    name: "Ayesha Khan",
    title: "Senior stylist",
    rating: 4.9,
    ws: 9 * 60,
    we: 17 * 60,
    specs: [
      ["Haircut", "ti-cut"],
      ["Styling", "ti-sparkles"],
      ["Coloring", "ti-droplet"],
    ],
  },
  {
    id: "st2",
    name: "Ali Raza",
    title: "Massage therapist",
    rating: 4.8,
    ws: 9 * 60,
    we: 17 * 60,
    specs: [
      ["Deep tissue", "ti-user"],
      ["Swedish", "ti-droplet"],
      ["Hot stone", "ti-flame"],
    ],
  },
  {
    id: "st3",
    name: "Sana Malik",
    title: "Makeup specialist",
    rating: 4.9,
    ws: 11 * 60,
    we: 19 * 60,
    specs: [
      ["Bridal", "ti-heart"],
      ["Events", "ti-calendar"],
      ["Editorial", "ti-star"],
    ],
  },
];

function makeExisting() {
  const t = new Date();
  const mk = (sid, d, s, e) => {
    const dt = new Date(t);
    dt.setDate(dt.getDate() + d);
    dt.setHours(0, 0, 0, 0);
    return { sid, date: dt, s, e };
  };
  return [
    mk("st1", 0, 11 * 60, 12 * 60),
    mk("st1", 0, 14 * 60, 16 * 60),
    mk("st2", 1, 9 * 60, 10 * 60),
    mk("st3", 1, 12 * 60, 13.5 * 60),
  ];
}

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}
function minsToLabel(m) {
  let h = Math.floor(m / 60),
    mn = m % 60,
    ap = h >= 12 ? "PM" : "AM",
    h12 = h % 12 || 12;
  return `${h12}:${pad(mn)} ${ap}`;
}
function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function startDay(d) {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}
function fmtLong(d) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
function fmtShort(d) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function price(p) {
  return `Rs. ${p.toLocaleString()}`;
}
function calGrid(v) {
  const y = v.getFullYear(),
    m = v.getMonth(),
    sw = new Date(y, m, 1).getDay(),
    dim = new Date(y, m + 1, 0).getDate(),
    c = [];
  for (let i = 0; i < sw; i++) c.push(null);
  for (let d = 1; d <= dim; d++) c.push(new Date(y, m, d));
  return c;
}

export default function App() {
  const [view, setView] = useState("home");
  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState(null);
  const [staff, setStaff] = useState(null);
  const [vMonth, setVMonth] = useState(new Date());
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [justBooked, setJustBooked] = useState(null);
  const [existingSlots, setExistingSlots] = useState(makeExisting());

  // States to replace window globals from the script
  const [catIdxState, setCatIdxState] = useState(0);
  const [bTab, setBTab] = useState("upcoming");

  function genSlots(staff, date, dur) {
    if (!staff || !date) return [];
    const now = new Date(),
      today = sameDay(date, now),
      nowM = now.getHours() * 60 + now.getMinutes();
    const dayB = existingSlots.filter(
      (b) => b.sid === staff.id && sameDay(b.date, date),
    );
    const out = [];
    for (let t = staff.ws; t + dur <= staff.we; t += 30) {
      const over = dayB.some((b) => t < b.e && t + dur > b.s),
        past = today && t <= nowM + 30;
      out.push({ start: t, label: minsToLabel(t), avail: !over && !past });
    }
    return out;
  }

  const go = (v) => {
    setView(v);
    if (v === "booking") {
      setStep(1);
      setJustBooked(null);
    }
  };
  const jumpStep = (n) => {
    setStep(n);
  };
  const setCat = (i) => {
    setCatIdxState(i);
  };

  const selectSvc = (id) => {
    let found = null;
    SERVICES.forEach((s) =>
      s.items.forEach((it) => {
        if (it.id === id) found = it;
      }),
    );
    setSvc(found);
    setStep(2);
  };

  const selectStaff = (id) => {
    setStaff(STAFF.find((s) => s.id === id));
  };
  const chMonth = (d) => {
    setVMonth(new Date(vMonth.getFullYear(), vMonth.getMonth() + d, 1));
  };
  const selDateFn = (ts) => {
    setSelDate(new Date(ts));
    setSelTime(null);
  };
  const selTimeFn = (t) => {
    setSelTime(t);
  };
  const setTab = (t) => {
    setBTab(t);
  };

  const bookAnother = () => {
    setSvc(null);
    setStaff(null);
    setSelDate(null);
    setSelTime(null);
    setJustBooked(null);
    setStep(1);
    setView("booking");
  };

  const confirmBooking = () => {
    const b = {
      id: "bk_" + Date.now(),
      svc,
      staff,
      date: selDate,
      time: selTime,
      status: "Pending",
    };
    setBookings([b, ...bookings]);
    setJustBooked(b);
  };

  const cancelBooking = (id) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)),
    );
  };

  const renderNav = () => {
    const navs = [
      ["home", "Home"],
      ["booking", "Services"],
      ["about", "About"],
      ["bookings", "My bookings"],
    ];
    return (
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #E7E5E4",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: "64px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={() => go("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            className="logo-text"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              letterSpacing: "0.18em",
            }}
          >
            LUXE
          </div>
          <div
            className="logo-sub"
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#78716C",
              marginTop: "3px",
            }}
          >
            Salon &amp; Spa
          </div>
        </button>
        <div className="nav-links" style={{ display: "flex", gap: "24px" }}>
          {navs.map(([v, l]) => (
            <button
              key={v}
              className={`nav-btn ${view === v ? "active" : ""}`}
              onClick={() => go(v)}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
          }}
        >
          <i
            className="ti ti-user"
            style={{ fontSize: "18px", color: "#57534E" }}
          ></i>
        </button>
      </nav>
    );
  };

  const renderHome = () => {
    const cats = [
      ["Hair care", "ti-cut", "#C6A87C", "#F3ECE0", "Cuts, color & treatments"],
      [
        "Makeup",
        "ti-sparkles",
        "#9E6A8A",
        "#F8F0F5",
        "Bridal, events & editorial",
      ],
      [
        "Body & spa",
        "ti-droplet",
        "#5A8A80",
        "#EEF6F4",
        "Massage & relaxation",
      ],
    ];
    return (
      <div className="fade-in">
        <div
          style={{
            background: "#FDFBF7",
            borderBottom: "1px solid #F0EDE8",
            padding: "64px 20px 52px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#F3ECE0",
              borderRadius: "999px",
              padding: "5px 14px",
              marginBottom: "20px",
            }}
          >
            <i
              className="ti ti-star"
              style={{ fontSize: "12px", color: "#C6A87C" }}
            ></i>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#B0946A",
                fontWeight: 600,
              }}
            >
              Premium beauty destination
            </span>
          </div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(28px,5vw,48px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Luxe Salon &amp; Spa —<br />
            <em style={{ color: "#C6A87C", fontStyle: "italic" }}>
              Book your luxe experience
            </em>
          </h1>
          <p
            style={{
              color: "#78716C",
              fontSize: "15px",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "420px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Welcome to the salon where your beauty journey begins. Premium
            services tailored just for you.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="gold-btn"
              onClick={() => go("booking")}
              style={{ padding: "13px 28px", fontSize: "14px" }}
            >
              Book now
            </button>
            <button
              className="ghost-btn"
              onClick={() => go("booking")}
              style={{ padding: "13px 28px", fontSize: "14px" }}
            >
              Our services
            </button>
          </div>
        </div>

        <div
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 20px" }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#A8A29E",
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            What we offer
          </p>
          <h2
            className="serif"
            style={{
              textAlign: "center",
              fontSize: "26px",
              fontWeight: 600,
              marginBottom: "36px",
            }}
          >
            Our signature services
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "20px",
              marginBottom: "48px",
            }}
          >
            {cats.map(([n, ic, co, bg, d], i) => (
              <button
                key={i}
                onClick={() => go("booking")}
                style={{
                  background: "#fff",
                  border: "1px solid #E7E5E4",
                  borderRadius: "16px",
                  padding: "28px 22px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className={`ti ${ic}`}
                    style={{ fontSize: "30px", color: co }}
                  ></i>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      marginBottom: "5px",
                    }}
                  >
                    {n}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#78716C",
                      lineHeight: 1.5,
                    }}
                  >
                    {d}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: co,
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                >
                  <span>Explore</span>
                  <i
                    className="ti ti-chevron-right"
                    style={{ fontSize: "14px" }}
                  ></i>
                </div>
              </button>
            ))}
          </div>

          <div
            style={{
              background: "#1C1C1C",
              borderRadius: "16px",
              padding: "36px 24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
                gap: "28px",
                textAlign: "center",
              }}
            >
              {[
                ["500+", "Happy clients"],
                ["3", "Expert professionals"],
                ["4.9★", "Average rating"],
                ["5+", "Years of luxury"],
              ].map(([v, l], i) => (
                <div key={i}>
                  <div
                    className="serif"
                    style={{
                      fontSize: "32px",
                      color: "#C6A87C",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#A8A29E",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      marginTop: "8px",
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAbout = () => {
    const cards = [
      [
        "ti-award",
        "Expert team",
        "Certified specialists with years of proven experience in their craft.",
      ],
      [
        "ti-heart",
        "Premium products",
        "We use only finest, skin-safe products for every treatment.",
      ],
      [
        "ti-star",
        "Client focused",
        "Every appointment is tailored to your unique beauty goals.",
      ],
      [
        "ti-map-pin",
        "Find us",
        "Located in the heart of the city, open 7 days a week.",
      ],
    ];
    return (
      <div
        className="fade-in"
        style={{ maxWidth: "900px", margin: "0 auto", padding: "52px 20px" }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#C6A87C",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Our story
        </p>
        <h1
          className="serif"
          style={{ fontSize: "36px", fontWeight: 700, marginBottom: "16px" }}
        >
          About Luxe Salon &amp; Spa
        </h1>
        <p
          style={{
            color: "#78716C",
            lineHeight: 1.8,
            fontSize: "15px",
            maxWidth: "560px",
            marginBottom: "44px",
          }}
        >
          Founded on the belief that everyone deserves a luxurious self-care
          experience, Luxe brings Pakistan's finest beauty professionals
          together under one roof.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "18px",
            marginBottom: "44px",
          }}
        >
          {cards.map(([ic, t, d], i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "1px solid #E7E5E4",
                borderRadius: "14px",
                padding: "22px 18px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "#F3ECE0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <i
                  className={`ti ${ic}`}
                  style={{ fontSize: "22px", color: "#C6A87C" }}
                ></i>
              </div>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                {t}
              </h3>
              <p
                style={{ fontSize: "13px", color: "#78716C", lineHeight: 1.6 }}
              >
                {d}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#1C1C1C",
            borderRadius: "16px",
            padding: "32px 28px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              className="serif"
              style={{ fontSize: "20px", color: "#fff", marginBottom: "6px" }}
            >
              Ready to experience Luxe?
            </p>
            <p style={{ color: "#A8A29E", fontSize: "13px" }}>
              Book your appointment today — it only takes a minute.
            </p>
          </div>
          <button
            className="gold-btn"
            onClick={() => go("booking")}
            style={{ padding: "12px 26px" }}
          >
            Book now
          </button>
        </div>
      </div>
    );
  };

  const renderProgress = (step) => {
    const labels = ["Service", "Specialist", "Date & time", "Confirm"];
    return (
      <div style={{ marginBottom: "44px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "16px",
              width: "100%",
              height: "1px",
              background: "#E7E5E4",
              zIndex: 0,
            }}
          ></div>
          {[1, 2, 3, 4].map((n, i) => {
            const act = step === n,
              past = step > n;
            return (
              <button
                key={n}
                disabled={n > step}
                onClick={() => jumpStep(n)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "var(--cream)",
                  padding: "0 8px",
                  border: "none",
                  cursor: n <= step ? "pointer" : "not-allowed",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 500,
                    background: act ? "#C6A87C" : past ? "#1C1C1C" : "#fff",
                    color: act || past ? "#fff" : "#A8A29E",
                    border: act || past ? "none" : "1px solid #D6D3D1",
                    boxShadow: act ? "0 0 0 4px rgba(198,168,124,0.2)" : "none",
                    transition: "all .3s",
                  }}
                >
                  {past ? (
                    <i className="ti ti-check" style={{ fontSize: "14px" }}></i>
                  ) : (
                    n
                  )}
                </div>
                <span
                  style={{
                    position: "absolute",
                    top: "38px",
                    fontSize: "10px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    whiteSpace: "nowrap",
                    color: act ? "#1C1C1C" : "#A8A29E",
                  }}
                >
                  {labels[i]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep1 = (catIdx) => {
    const cat = SERVICES[catIdx];
    return (
      <div className="fade-in">
        <h1
          className="serif"
          style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
        >
          Choose your service
        </h1>
        <p style={{ color: "#78716C", fontSize: "13px", marginBottom: "28px" }}>
          Select from our curated menu of premium treatments.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          {SERVICES.map((s, i) => (
            <button
              key={i}
              onClick={() => setCat(i)}
              style={{
                background: catIdx === i ? s.bg : "#fff",
                border: `2px solid ${catIdx === i ? s.color : "#E7E5E4"}`,
                borderRadius: "14px",
                padding: "18px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  background: catIdx === i ? s.color : s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className={`ti ${s.icon}`}
                  style={{
                    fontSize: "26px",
                    color: catIdx === i ? "#fff" : s.color,
                  }}
                ></i>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: ".03em",
                  color: catIdx === i ? "#1C1C1C" : "#78716C",
                  textAlign: "center",
                }}
              >
                {s.cat}
              </span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {cat.items.map((item) => {
            const sel = svc?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => selectSvc(item.id)}
                style={{
                  background: sel ? cat.bg : "#fff",
                  border: `1.5px solid ${sel ? cat.color : "#E7E5E4"}`,
                  borderRadius: "12px",
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "14px",
                  transition: "all .2s",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "10px",
                      background: sel ? cat.color : cat.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={`ti ${cat.icon}`}
                      style={{
                        fontSize: "20px",
                        color: sel ? "#fff" : cat.color,
                      }}
                    ></i>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        marginBottom: "3px",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#78716C",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <i
                        className="ti ti-clock"
                        style={{ fontSize: "12px" }}
                      ></i>
                      {item.dur} min
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#1C1C1C",
                      fontSize: "14px",
                    }}
                  >
                    {price(item.price)}
                  </span>
                  <i
                    className="ti ti-chevron-right"
                    style={{
                      fontSize: "18px",
                      color: sel ? cat.color : "#D6D3D1",
                    }}
                  ></i>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="fade-in">
        <h1
          className="serif"
          style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
        >
          Choose your specialist
        </h1>
        <p style={{ color: "#78716C", fontSize: "13px", marginBottom: "28px" }}>
          Our certified professionals are here to make you look your best.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
            gap: "18px",
            marginBottom: "32px",
          }}
        >
          {STAFF.map((st) => {
            const sel = staff?.id === st.id;
            return (
              <div
                key={st.id}
                style={{
                  background: "#fff",
                  border: `2px solid ${sel ? "#C6A87C" : "#E7E5E4"}`,
                  borderRadius: "18px",
                  overflow: "hidden",
                  transform: sel ? "translateY(-4px)" : "none",
                  transition: "all .25s",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(160deg,#F3ECE0,#E8D5C0)",
                    padding: "22px 16px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "rgba(255,255,255,.9)",
                      borderRadius: "999px",
                      padding: "3px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <i
                      className="ti ti-star-filled"
                      style={{ fontSize: "11px", color: "#F59E0B" }}
                    ></i>
                    <span style={{ fontSize: "12px", fontWeight: 700 }}>
                      {st.rating}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid #fff",
                    }}
                    dangerouslySetInnerHTML={{ __html: SVGAVATARS[st.id] }}
                  />
                  <div style={{ textAlign: "center", padding: "14px 0 18px" }}>
                    <h3
                      className="serif"
                      style={{ fontSize: "16px", fontWeight: 700 }}
                    >
                      {st.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        color: "#A8A29E",
                        fontWeight: 500,
                        marginTop: "3px",
                      }}
                    >
                      {st.title}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px 16px 18px",
                    borderTop: "1px solid #F5F5F4",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      color: "#A8A29E",
                      fontWeight: 600,
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    Specialties
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    {st.specs.map(([n, ic], i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "9px",
                            background: "#F5F5F4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i
                            className={`ti ${ic}`}
                            style={{ fontSize: "15px", color: "#78716C" }}
                          ></i>
                        </div>
                        <span style={{ fontSize: "10px", color: "#78716C" }}>
                          {n}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => selectStaff(st.id)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "12px",
                      letterSpacing: ".05em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      background: sel ? "#C6A87C" : "#F5F5F4",
                      color: sel ? "#fff" : "#57534E",
                      transition: "all .18s",
                    }}
                  >
                    {sel ? "✓ Selected" : "Select stylist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="ghost-btn" onClick={() => jumpStep(1)}>
            Back
          </button>
          <button
            className={staff ? "gold-btn" : "ghost-btn"}
            onClick={() => {
              if (staff) jumpStep(3);
            }}
            disabled={!staff}
            style={{ opacity: staff ? 1 : 0.5 }}
          >
            Next: date &amp; time
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const today = startDay(new Date());
    const cells = calGrid(vMonth);
    const mLabel = vMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const canPrev =
      vMonth.getFullYear() > today.getFullYear() ||
      vMonth.getMonth() > today.getMonth();
    const slots = selDate ? genSlots(staff, selDate, svc.dur) : [];

    return (
      <div className="fade-in">
        <h1
          className="serif"
          style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
        >
          Select date &amp; time
        </h1>
        <p style={{ color: "#78716C", fontSize: "13px", marginBottom: "28px" }}>
          Pick your preferred appointment slot.
        </p>
        <div
          style={{
            background: "#fff",
            border: "1px solid #E7E5E4",
            borderRadius: "18px",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "220px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "18px",
                }}
              >
                <button
                  onClick={() => chMonth(-1)}
                  disabled={!canPrev}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#F5F5F4",
                    border: "none",
                    cursor: canPrev ? "pointer" : "not-allowed",
                    opacity: canPrev ? 1 : 0.3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="ti ti-chevron-left"
                    style={{ fontSize: "16px", color: "#57534E" }}
                  ></i>
                </button>
                <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{mLabel}</h3>
                <button
                  onClick={() => chMonth(1)}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#F5F5F4",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="ti ti-chevron-right"
                    style={{ fontSize: "16px", color: "#57534E" }}
                  ></i>
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "4px",
                  textAlign: "center",
                }}
              >
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div
                    key={`day-${i}`}
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#A8A29E",
                      paddingBottom: "6px",
                    }}
                  >
                    {d}
                  </div>
                ))}
                {cells.map((d, i) => {
                  if (!d) return <div key={i}></div>;
                  const isPast = d < today,
                    isSel = selDate && sameDay(d, selDate),
                    isTod = sameDay(d, today);
                  return (
                    <div
                      key={i}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        onClick={() => selDateFn(d.getTime())}
                        disabled={isPast}
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          border:
                            isTod && !isSel
                              ? "1.5px solid #C6A87C"
                              : "1.5px solid transparent",
                          background: isSel ? "#C6A87C" : "transparent",
                          color: isPast
                            ? "#D6D3D1"
                            : isSel
                              ? "#fff"
                              : "#44403C",
                          fontWeight: isSel ? 600 : 400,
                          cursor: isPast ? "not-allowed" : "pointer",
                        }}
                      >
                        {d.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: "200px",
                borderLeft: "1px solid #F5F5F4",
                paddingLeft: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                Available slots
              </h3>
              {!selDate ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 0",
                    color: "#A8A29E",
                  }}
                >
                  <i
                    className="ti ti-calendar"
                    style={{
                      fontSize: "36px",
                      opacity: 0.3,
                      display: "block",
                      marginBottom: "10px",
                    }}
                  ></i>
                  <p style={{ fontSize: "13px" }}>Select a date first</p>
                </div>
              ) : slots.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 0",
                    color: "#A8A29E",
                  }}
                >
                  <i
                    className="ti ti-info-circle"
                    style={{
                      fontSize: "30px",
                      opacity: 0.4,
                      display: "block",
                      marginBottom: "10px",
                    }}
                  ></i>
                  <p style={{ fontSize: "13px" }}>No openings today</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px",
                  }}
                >
                  {slots.map((s) => (
                    <button
                      key={s.start}
                      onClick={() => selTimeFn(s.start)}
                      disabled={!s.avail}
                      style={{
                        padding: "10px 6px",
                        borderRadius: "10px",
                        border: `1.5px solid ${selTime === s.start ? "#C6A87C" : "#E7E5E4"}`,
                        background:
                          selTime === s.start ? "#C6A87C" : "transparent",
                        color:
                          selTime === s.start
                            ? "#fff"
                            : s.avail
                              ? "#44403C"
                              : "#D6D3D1",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: s.avail ? "pointer" : "not-allowed",
                        textDecoration: s.avail ? "none" : "line-through",
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "24px",
          }}
        >
          <button className="ghost-btn" onClick={() => jumpStep(2)}>
            Back
          </button>
          <button
            className={selDate && selTime != null ? "gold-btn" : "ghost-btn"}
            onClick={() => {
              if (selDate && selTime != null) jumpStep(4);
            }}
            disabled={!(selDate && selTime != null)}
            style={{ opacity: selDate && selTime != null ? 1 : 0.5 }}
          >
            Next: confirmation
          </button>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    return (
      <div className="fade-in">
        <h1
          className="serif"
          style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
        >
          Confirm your booking
        </h1>
        <p style={{ color: "#78716C", fontSize: "13px", marginBottom: "28px" }}>
          Review the details below before confirming.
        </p>
        <div
          style={{
            background: "#fff",
            border: "1px solid #E7E5E4",
            borderRadius: "18px",
            padding: "28px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #F5F5F4",
              paddingBottom: "20px",
              marginBottom: "22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "#C6A87C",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
              >
                Service
              </p>
              <h2 className="serif" style={{ fontSize: "20px" }}>
                {svc.name}
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "28px", fontWeight: 300 }}>
                {price(svc.price)}
              </p>
              <p
                style={{ fontSize: "12px", color: "#78716C", marginTop: "2px" }}
              >
                {svc.dur} minutes
              </p>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#F5F5F4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i
                  className="ti ti-calendar"
                  style={{ fontSize: "18px", color: "#78716C" }}
                ></i>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#A8A29E",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  Date &amp; time
                </p>
                <p style={{ fontWeight: 500, fontSize: "13px" }}>
                  {fmtLong(selDate)}
                </p>
                <p
                  style={{
                    color: "#78716C",
                    fontSize: "12px",
                    marginTop: "2px",
                  }}
                >
                  {minsToLabel(selTime)}
                </p>
              </div>
            </div>
            <div
              style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #F5F5F4",
                  flexShrink: 0,
                }}
                dangerouslySetInnerHTML={{ __html: SVGAVATARS[staff.id] }}
              />
              <div>
                <p
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#A8A29E",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  Specialist
                </p>
                <p style={{ fontWeight: 500, fontSize: "13px" }}>
                  {staff.name}
                </p>
                <p
                  style={{
                    color: "#78716C",
                    fontSize: "12px",
                    marginTop: "2px",
                  }}
                >
                  {staff.title}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#F9F8F6",
            border: "1px solid #E7E5E4",
            borderRadius: "12px",
            padding: "18px",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              marginBottom: "8px",
            }}
          >
            Cancellation policy
          </h3>
          <p style={{ fontSize: "13px", color: "#78716C", lineHeight: 1.7 }}>
            24-hour notice required for cancellations. Appointments cancelled
            within 24 hours may incur a 50% charge.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            className="gold-btn"
            onClick={() => confirmBooking()}
            style={{
              padding: "15px",
              fontSize: "15px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(198,168,124,.35)",
            }}
          >
            Confirm &amp; pay
          </button>
          <button
            className="ghost-btn"
            onClick={() => jumpStep(3)}
            style={{ padding: "13px", borderRadius: "12px" }}
          >
            Edit booking
          </button>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E7E5E4",
          borderRadius: "18px",
          padding: "22px",
        }}
      >
        <h3
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".12em",
            borderBottom: "1px solid #F5F5F4",
            paddingBottom: "12px",
            marginBottom: "18px",
          }}
        >
          Booking summary
        </h3>
        {!svc ? (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#F5F5F4",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
              }}
            >
              <i
                className="ti ti-sparkles"
                style={{ fontSize: "20px", color: "#D6D3D1" }}
              ></i>
            </div>
            <p style={{ fontSize: "12px", color: "#A8A29E" }}>
              Select a service to begin
            </p>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "14px" }}>
              <h4
                className="serif"
                style={{ fontSize: "14px", marginBottom: "8px" }}
              >
                {svc.name}
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#78716C",
                  marginBottom: "3px",
                }}
              >
                <span>Duration</span>
                <span style={{ color: "#1C1C1C", fontWeight: 500 }}>
                  {svc.dur} min
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#78716C",
                }}
              >
                <span>Price</span>
                <span style={{ color: "#1C1C1C", fontWeight: 500 }}>
                  {price(svc.price)}
                </span>
              </div>
            </div>
            {staff ? (
              <div
                style={{
                  borderTop: "1px solid #F5F5F4",
                  paddingTop: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #F5F5F4",
                    flexShrink: 0,
                  }}
                  dangerouslySetInnerHTML={{ __html: SVGAVATARS[staff.id] }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      color: "#A8A29E",
                    }}
                  >
                    Specialist
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      marginTop: "2px",
                    }}
                  >
                    {staff.name}
                  </p>
                </div>
              </div>
            ) : null}
            {selDate && selTime != null ? (
              <div
                style={{
                  borderTop: "1px solid #F5F5F4",
                  paddingTop: "14px",
                  display: "flex",
                  gap: "9px",
                  marginBottom: "14px",
                }}
              >
                <i
                  className="ti ti-calendar"
                  style={{
                    fontSize: "14px",
                    color: "#A8A29E",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                ></i>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      color: "#A8A29E",
                    }}
                  >
                    Date &amp; time
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      marginTop: "2px",
                    }}
                  >
                    {fmtShort(selDate)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#78716C" }}>
                    {minsToLabel(selTime)}
                  </p>
                </div>
              </div>
            ) : null}
            <div
              style={{
                borderTop: "2px solid #1C1C1C",
                paddingTop: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                }}
              >
                Total
              </span>
              <span className="serif" style={{ fontSize: "17px" }}>
                {price(svc.price)}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderBookingInner = (step, catIdx) => {
    return (
      <div style={{ display: "flex", gap: "36px", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {renderProgress(step)}
          {step === 1 ? renderStep1(catIdx) : null}
          {step === 2 && svc ? renderStep2() : null}
          {step === 3 && svc && staff ? renderStep3() : null}
          {step === 4 && svc && staff && selDate && selTime != null
            ? renderStep4()
            : null}
        </div>
        <div
          style={{
            width: "260px",
            flexShrink: 0,
            position: "sticky",
            top: "80px",
          }}
        >
          {renderSidebar()}
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    const b = justBooked;
    return (
      <div
        className="fade-in"
        style={{
          maxWidth: "540px",
          margin: "0 auto",
          textAlign: "center",
          padding: "48px 0",
        }}
      >
        <div
          className="scale-in"
          style={{
            width: "88px",
            height: "88px",
            background: "#F3ECE0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 21L17 28L30 13"
              stroke="#B0946A"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="check-anim"
            />
          </svg>
        </div>
        <h2
          className="serif"
          style={{ fontSize: "28px", marginBottom: "12px" }}
        >
          Booking request sent!
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#78716C",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}
        >
          <strong>{b.svc.name}</strong> with {b.staff.name} on {fmtLong(b.date)}{" "}
          at {minsToLabel(b.time)} — marked <strong>Pending</strong> until
          confirmed.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            className="gold-btn"
            onClick={() => go("bookings")}
            style={{ borderRadius: "999px", padding: "12px 24px" }}
          >
            View my bookings
          </button>
          <button
            className="ghost-btn"
            onClick={() => bookAnother()}
            style={{ borderRadius: "999px", padding: "12px 24px" }}
          >
            Book another
          </button>
        </div>
      </div>
    );
  };

  const renderBooking = () => {
    let catIdx = catIdxState;
    if (svc) {
      for (let i = 0; i < SERVICES.length; i++) {
        if (SERVICES[i].items.find((x) => x.id === svc.id)) {
          catIdx = i;
          break;
        }
      }
    }
    return (
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "28px 20px 60px",
        }}
      >
        {justBooked ? renderSuccess() : renderBookingInner(step, catIdx)}
      </div>
    );
  };

  const renderBookings = () => {
    const upcoming = bookings.filter(
      (b) => b.status === "Pending" || b.status === "Confirmed",
    );
    const hist = bookings.filter(
      (b) => b.status === "Completed" || b.status === "Cancelled",
    );
    const list = bTab === "upcoming" ? upcoming : hist;
    const statStyles = {
      Pending: { bg: "#F3ECE0", c: "#B0946A" },
      Confirmed: { bg: "#E7EFE7", c: "#4F7A52" },
      Completed: { bg: "#EFEDE8", c: "#8A8378" },
      Cancelled: { bg: "#F6E7E4", c: "#B4483C" },
    };

    return (
      <div
        className="fade-in"
        style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 20px" }}
      >
        <h1
          className="serif"
          style={{ fontSize: "34px", fontWeight: 700, marginBottom: "32px" }}
        >
          My bookings
        </h1>
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #E7E5E4",
            marginBottom: "28px",
          }}
        >
          {[
            ["upcoming", `Upcoming (${upcoming.length})`],
            ["history", `History (${hist.length})`],
          ].map(([t, l]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "11px 16px",
                fontSize: "12px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: ".06em",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${bTab === t ? "#C6A87C" : "transparent"}`,
                marginBottom: "-1px",
                color: bTab === t ? "#1C1C1C" : "#A8A29E",
                cursor: "pointer",
              }}
            >
              {l}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <div style={{ textAlign: "center", padding: "56px 0" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "#F5F5F4",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
              }}
            >
              <i
                className="ti ti-calendar"
                style={{ fontSize: "22px", color: "#D6D3D1" }}
              ></i>
            </div>
            <p
              className="serif"
              style={{ fontSize: "20px", marginBottom: "8px" }}
            >
              {bTab === "upcoming"
                ? "No upcoming appointments"
                : "No past appointments yet"}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#78716C",
                marginBottom: "20px",
              }}
            >
              {bTab === "upcoming"
                ? "When you book, it'll appear here."
                : "Completed & cancelled bookings appear here."}
            </p>
            {bTab === "upcoming" ? (
              <button
                className="gold-btn"
                onClick={() => go("booking")}
                style={{ borderRadius: "999px", padding: "11px 24px" }}
              >
                Book an appointment
              </button>
            ) : null}
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {list.map((b) => {
              const ss = statStyles[b.status] || statStyles.Pending;
              return (
                <div
                  key={b.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #E7E5E4",
                    borderRadius: "14px",
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid #F5F5F4",
                        flexShrink: 0,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: SVGAVATARS[b.staff.id],
                      }}
                    />
                    <div>
                      <p
                        className="serif"
                        style={{ fontSize: "14px", marginBottom: "2px" }}
                      >
                        {b.svc.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "#78716C" }}>
                        {b.staff.name} · {fmtLong(b.date)} ·{" "}
                        {minsToLabel(b.time)}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          marginTop: "3px",
                        }}
                      >
                        {price(b.svc.price)}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        background: ss.bg,
                        color: ss.c,
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {b.status}
                    </span>
                    {b.status === "Pending" || b.status === "Confirmed" ? (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#B4483C",
                          fontSize: "11px",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <i
                          className="ti ti-trash"
                          style={{ fontSize: "13px" }}
                        ></i>
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,500&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        
        :root{--cream:#FDFBF7;--ink:#1C1C1C;--gold:#C6A87C;--gold-d:#B0946A;--gold-l:#F3ECE0;--danger:#B4483C;--r:12px;}
        *{box-sizing:border-box;margin:0;padding:0;}
        #app{font-family:'Inter',sans-serif;background:var(--cream);color:var(--ink);min-height:600px;-webkit-font-smoothing:antialiased;}
        .serif{font-family:'Playfair Display',serif;}
        .logo-text{font-family:'Playfair Display',serif;font-size:20px;letter-spacing:0.18em;}
        .logo-sub{font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#78716C;margin-top:3px;}
        .nav-btn{background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;padding:6px 0;border-bottom:2px solid transparent;color:#78716C;transition:all .15s;}
        .nav-btn.active{color:var(--ink);border-bottom-color:var(--gold);}
        .nav-btn:hover{color:var(--ink);}
        .gold-btn{background:var(--gold);color:#fff;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;letter-spacing:0.04em;border-radius:8px;padding:10px 22px;transition:opacity .15s;}
        .gold-btn:hover{opacity:.9;}
        .ghost-btn{background:none;color:var(--ink);border:1.5px solid #D6D3D1;cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;font-size:13px;border-radius:8px;padding:10px 22px;transition:all .15s;}
        .ghost-btn:hover{border-color:var(--gold);}
        
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fade-in{animation:fadeUp .4s ease both;}
        
        @keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
        .scale-in{animation:scaleIn .45s ease both;}
        
        @keyframes checkDraw{from{stroke-dashoffset:48}to{stroke-dashoffset:0}}
        .check-anim{stroke-dasharray:48;animation:checkDraw .6s ease .2s both;}
      `}</style>

      <div id="app">
        {renderNav()}
        {view === "home"
          ? renderHome()
          : view === "about"
            ? renderAbout()
            : view === "bookings"
              ? renderBookings()
              : renderBooking()}
      </div>
    </>
  );
}
