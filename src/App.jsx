import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import BookingFlow from "./components/BookingFlow";
import MyBookingsPage from "./components/MyBookingsPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import BarberLoginPage from "./components/barber/BarberLoginPage";
import BarberRegisterPage from "./components/barber/BarberRegisterPage";
import BarberDashboard from "./components/barber/BarberDashboard";
import { SERVICES } from "./data/constants";
import { makeExistingSlots } from "./utils/helpers";
import { getSession, clearSession } from "./utils/auth";
import { getBarberSession, clearBarberSession } from "./utils/barberAuth";
import { saveBooking, getBookingsForUser, updateBookingStatus } from "./utils/bookings";

const NAV_KEYS = ["home", "booking", "about", "bookings"];

/* ══════════════════════════════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  // ── routing ──
  // views: home | booking | about | bookings | login | signup
  //        barber-login | barber-register | barber-dashboard
  const [view, setView] = useState(() => {
    // If a barber session already exists, open their dashboard immediately
    if (getBarberSession()) return "barber-dashboard";
    return "home";
  });

  // ── customer auth ──
  const [user, setUser]                       = useState(() => getSession());
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);

  // ── barber auth ──
  const [barberSession, setBarberSession] = useState(() => getBarberSession());

  // ── booking wizard ──
  const [step, setStep]       = useState(1);
  const [catIdx, setCatIdx]   = useState(0);
  const [svc, setSvc]         = useState(null);
  const [staff, setStaff]     = useState(null);
  const [vMonth, setVMonth]   = useState(new Date());
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState(null);

  // ── in-memory bookings + justBooked ──
  const [bookings, setBookings]     = useState(() => user ? getBookingsForUser(user.id) : []);
  const [justBooked, setJustBooked] = useState(null);
  const [existingSlots]             = useState(makeExistingSlots);

  /* ── customer navigation ── */
  const navigate = (dest) => {
    if (dest === "bookings" && !user) {
      setPostLoginRedirect({ view: "bookings" });
      setView("login");
      return;
    }
    setView(dest);
    if (dest === "booking") { setStep(1); setJustBooked(null); }
    if (dest === "home")    { setJustBooked(null); }
  };

  /* ── customer auth ── */
  const handleCustomerLogin = (sessionUser) => {
    setUser(sessionUser);
    setBookings(getBookingsForUser(sessionUser.id));
    if (postLoginRedirect) {
      setView(postLoginRedirect.view);
      if (postLoginRedirect.step) setStep(postLoginRedirect.step);
      setPostLoginRedirect(null);
    } else {
      setView("home");
    }
  };

  const handleCustomerLogout = () => {
    clearSession();
    setUser(null);
    setBookings([]);
    setView("home");
  };

  /* ── barber auth ── */
  const handleBarberLogin = (session) => {
    setBarberSession(session);
    setView("barber-dashboard");
  };

  const handleBarberLogout = () => {
    clearBarberSession();
    setBarberSession(null);
    setView("home");
  };

  /* ── booking actions ── */
  const handleSelectSvc = (item) => {
    if (svc?.id !== item.id) { setSelDate(null); setSelTime(null); }
    setSvc(item);
    SERVICES.forEach((s, i) => { if (s.items.find((x) => x.id === item.id)) setCatIdx(i); });
  };

  const handleConfirm = () => {
    if (!user) {
      setPostLoginRedirect({ view: "booking", step: 4 });
      setView("login");
      return;
    }
    const newBooking = {
      id:           "bk_" + Date.now(),
      userId:       user.id,
      customerName: user.name,       // ← barber dashboard reads this
      svc,
      staff,
      date:         selDate,
      time:         selTime,
      status:       "Pending",
    };
    // persist to localStorage so barber portal can see it
    saveBooking(newBooking);
    // update local state
    setBookings((prev) => [newBooking, ...prev]);
    setJustBooked(newBooking);
  };

  const handleCancelBooking = (id) => {
    updateBookingStatus(id, "Cancelled");
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)));
  };

  const handleBookAnother = () => {
    setSvc(null); setStaff(null); setSelDate(null); setSelTime(null);
    setJustBooked(null); setStep(1); setView("booking");
  };

  const activeView = NAV_KEYS.includes(view) ? view : null;

  /* ════════════════════════════════════════════════════════════════════════
     BARBER PORTAL
  ════════════════════════════════════════════════════════════════════════ */
  if (view === "barber-login") {
    return (
      <>
        <GlobalStyles />
        <BarberLoginPage
          onLogin={handleBarberLogin}
          onSwitchToRegister={() => setView("barber-register")}
          onGoCustomer={() => setView("home")}
        />
      </>
    );
  }

  if (view === "barber-register") {
    return (
      <>
        <GlobalStyles />
        <BarberRegisterPage
          onRegister={handleBarberLogin}
          onSwitchToLogin={() => setView("barber-login")}
        />
      </>
    );
  }

  if (view === "barber-dashboard" && barberSession) {
    return (
      <>
        <GlobalStyles />
        <BarberDashboard
          barber={barberSession}
          onLogout={handleBarberLogout}
          onGoCustomer={() => { clearBarberSession(); setBarberSession(null); setView("home"); }}
        />
      </>
    );
  }

  /* ════════════════════════════════════════════════════════════════════════
     CUSTOMER PORTAL
  ════════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <GlobalStyles />
      <NavBar
        activeView={activeView}
        onNavigate={navigate}
        user={user}
        onLogout={handleCustomerLogout}
      />

      {view === "home" && <HomePage onBook={() => navigate("booking")} />}

      {view === "about" && <AboutPage onBook={() => navigate("booking")} />}

      {view === "login" && (
        <LoginPage
          onLogin={handleCustomerLogin}
          onSwitchToSignup={() => setView("signup")}
        />
      )}

      {view === "signup" && (
        <SignupPage
          onSignup={handleCustomerLogin}
          onSwitchToLogin={() => setView("login")}
        />
      )}

      {view === "booking" && (
        <div className="page-wrap" style={{ paddingTop: 32, paddingBottom: 72 }}>
          <BookingFlow
            step={step}         onJump={setStep}
            catIdx={catIdx}     onCatChange={setCatIdx}
            svc={svc}           onSelectSvc={handleSelectSvc}
            staff={staff}       onSelectStaff={setStaff}
            existingSlots={existingSlots}
            vMonth={vMonth}     setVMonth={setVMonth}
            selDate={selDate}   setSelDate={setSelDate}
            selTime={selTime}   setSelTime={setSelTime}
            onConfirm={handleConfirm}
            justBooked={justBooked}
            onViewBookings={() => navigate("bookings")}
            onBookAnother={handleBookAnother}
          />
        </div>
      )}

      {view === "bookings" && user && (
        <MyBookingsPage
          bookings={bookings}
          onCancel={handleCancelBooking}
          onStart={() => navigate("booking")}
        />
      )}
    </>
  );
}
