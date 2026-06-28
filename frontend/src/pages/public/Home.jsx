import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, start, duration]);
  return value;
}

function StatCard({ value, label, suffix = "+", animate, isLast }) {
  const count = useCountUp(value, 1600, animate);
  return (
    <div className={`text-center py-8 px-6 cursor-default transition-all duration-300
      hover:bg-slate-800 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:scale-105 rounded-2xl
      ${!isLast ? "border-r border-slate-700" : ""}`}>
      <div className="text-4xl font-extrabold text-blue-400 tracking-tighter leading-none">
        {animate ? count : 0}{suffix}
      </div>
      <div className="text-sm text-slate-400 font-medium mt-1.5">{label}</div>
    </div>
  );
}

export default function Home() {
  const [stats, setStats] = useState({ total_volunteers: 0, total_organizers: 0, total_sessions: 0 });
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/public/stats`);
        const data = await res.json();
        if (data?.data) {
          setStats(data.data);
          setStatsLoaded(true);
        }
      } catch {
        setStats({ total_volunteers: 120, total_organizers: 30, total_sessions: 1200 });
        setStatsLoaded(true);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (!statsLoaded) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimateStats(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsLoaded]);

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a0f1e] border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
              <span className="text-white font-bold text-sm">শ</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Shikkha Setu</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Link to="/login" className="text-slate-400 text-sm font-medium px-4 py-2 rounded-lg border border-slate-700 hover:text-white hover:border-slate-500 transition-colors">
              Login
            </Link>
            <Link to="/register" className="text-white text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-opacity shadow-[0_2px_8px_rgba(37,99,235,0.35)]">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#0a0f1e] py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/25 rounded-full px-6 py-2 text-sm font-semibold mb-7 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            Volunteer-Based Learning Platform
          </span>
          <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tighter mb-5">
            সবার জন্য শিক্ষা,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              সবার হাতের নাগালে
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-11 max-w-xl mx-auto">
            Shikkha Setu connects organizers and volunteers to bring free education to those who need it most — online or in person.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] transition-all">
              Get Started — It's Free →
            </Link>
            <Link to="/login" className="bg-white/5 hover:bg-white/10 text-slate-200 font-medium px-7 py-3.5 rounded-xl text-sm border border-white/10 transition-colors">
              Already a member? Login
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="bg-[#0f172a] border-b border-slate-800 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-3">
          {[
            { value: stats.total_volunteers, label: "Active Volunteers" },
            { value: stats.total_organizers, label: "Organizers" },
            { value: stats.total_sessions, label: "Sessions Completed" },
          ].map((stat, i, arr) => (
            <StatCard key={i} value={stat.value ?? 0} label={stat.label} animate={animateStats} isLast={i === arr.length - 1} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#111827] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-xs uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-extrabold text-white mt-2 tracking-tight">Simple. Free. Effective.</h2>
            <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">Two roles, one mission — bringing free education to every corner of Bangladesh.</p>
          </div>

          {/* Organizer flow */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                🏢 Organizer Flow
              </div>
              <div className="h-px flex-1 bg-slate-700" />
            </div>

            <div className="grid grid-cols-2 gap-4 relative">
              {[
                { step: "01", icon: "📋", title: "Create an Account", desc: "Sign up as an Organizer and set up your profile in under 2 minutes.", badge: "Start here", badgeColor: "bg-indigo-500/10 text-indigo-400" },
                { step: "02", icon: "📨", title: "Request a Volunteer", desc: "Send a volunteering request to available volunteers — specify subject, date, and whether it's online or offline.", badge: "Next step", badgeColor: "bg-indigo-500/10 text-indigo-400" },
              ].map((item, i, arr) => (
                <div key={i} className="relative flex gap-4">
                  <div className="flex-1 bg-[#0f172a] border border-slate-700 rounded-2xl p-6 relative cursor-default transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${item.badgeColor}`}>{item.badge}</span>
                      <span className="text-2xl font-black text-slate-700 group-hover:text-indigo-500/40 transition-colors">{item.step}</span>
                    </div>
                    <div className="w-11 h-11 bg-indigo-500/10 group-hover:bg-indigo-500/20 rounded-xl flex items-center justify-center text-xl mb-3 transition-colors">
                      {item.icon}
                    </div>
                    <div className="font-bold text-base text-white mb-1.5 group-hover:text-indigo-400 transition-colors">{item.title}</div>
                    <div className="text-sm text-slate-400 leading-relaxed">{item.desc}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-slate-700 shadow flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px flex-1 bg-slate-700" />
            <div className="flex items-center gap-2 bg-[#0f172a] border border-slate-700 rounded-full px-4 py-1.5">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="text-xs text-slate-500 font-semibold">Volunteer receives request</span>
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          {/* Volunteer flow */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                🙋 Volunteer Flow
              </div>
              <div className="h-px flex-1 bg-slate-700" />
            </div>

            <div className="grid grid-cols-3 gap-4 relative">
              {[
                { step: "03", icon: "✍️", title: "Join as a Volunteer", desc: "Sign up and complete your profile with the subjects you can teach.", badge: "Start here", badgeColor: "bg-blue-500/10 text-blue-400" },
                { step: "04", icon: "📬", title: "Accept or Reject", desc: "Review requests from organizers. Accept, reject, or cancel based on your availability.", badge: "Review", badgeColor: "bg-amber-500/10 text-amber-400" },
                { step: "05", icon: "🎓", title: "Run the Session", desc: "Create the session — online or offline — and start teaching your students.", badge: "Final step", badgeColor: "bg-green-500/10 text-green-400" },
              ].map((item, i, arr) => (
                <div key={i} className="relative flex gap-4">
                  <div className="flex-1 bg-[#0f172a] border border-slate-700 rounded-2xl p-6 relative cursor-default transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(59,130,246,0.15)] hover:border-blue-500/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${item.badgeColor}`}>{item.badge}</span>
                      <span className="text-2xl font-black text-slate-700 group-hover:text-blue-500/40 transition-colors">{item.step}</span>
                    </div>
                    <div className="w-11 h-11 bg-blue-500/10 group-hover:bg-blue-500/20 rounded-xl flex items-center justify-center text-xl mb-3 transition-colors">
                      {item.icon}
                    </div>
                    <div className="font-bold text-base text-white mb-1.5 group-hover:text-blue-400 transition-colors">{item.title}</div>
                    <div className="text-sm text-slate-400 leading-relaxed">{item.desc}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-slate-700 shadow flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#0f172a] py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-blue-400 font-semibold text-xs uppercase tracking-widest">About</span>
            <h2 className="text-4xl font-extrabold text-white mt-2 mb-5 leading-tight tracking-tight">
              Built for Bangladesh's Communities
            </h2>
            <p className="text-slate-400 leading-relaxed text-base mb-4">
              Shikkha Setu was born from a simple belief — that access to quality education shouldn't be limited by geography or income. Organizers identify where help is needed; volunteers bring the knowledge.
            </p>
            <p className="text-slate-400 leading-relaxed text-base">
              Whether it's an online session over a video call or an in-person class in a local community center — every session is a step toward a more equitable Bangladesh.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🎯", title: "Focused Sessions", desc: "Real academic goals, structured and trackable" },
              { icon: "🤝", title: "Volunteer-Led", desc: "Educators giving back to their community" },
              { icon: "🌐", title: "Online & Offline", desc: "Sessions run wherever works best" },
              { icon: "🆓", title: "Always Free", desc: "Zero cost, always" },
            ].map((card, i) => (
              <div key={i} className="bg-[#111827] border border-slate-700 rounded-2xl p-5 cursor-default transition-all duration-300 hover:bg-slate-800 hover:border-blue-500/40 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]">
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="font-bold text-sm text-white mb-1">{card.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 py-20 px-6 text-center border-y border-slate-700">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">Ready to make a difference?</h2>
          <p className="text-blue-200 text-base leading-relaxed mb-10">
            Join as a volunteer or organizer and help bring free education to communities across Bangladesh.
          </p>
          <Link to="/register" className="bg-white text-blue-900 font-bold px-8 py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity inline-block">
            Create Free Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1e] mt-auto">
        <div className="max-w-6xl mx-auto px-6 pt-16">
          <div className="grid grid-cols-3 gap-12 pb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">শ</span>
                </div>
                <span className="text-white font-bold text-base">Shikkha Setu</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Connecting organizers and volunteers to make quality education accessible for everyone in Bangladesh and beyond.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Email", value: "support@shikkhasetu.com", href: "mailto:support@shikkhasetu.com" },
                  { label: "Phone", value: "+8801XXXXXXXXX", href: "tel:+8801XXXXXXXXX" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-slate-600 text-xs uppercase tracking-wide mb-0.5">{item.label}</div>
                    <a href={item.href} className="text-slate-400 text-sm hover:text-white transition-colors">{item.value}</a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Follow Us</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Facebook", href: "https://www.facebook.com/shreeshantoroy", value: "facebook.com/shikkhasetu" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/shanto-roy-633a772b5/", value: "linkedin.com/company/shikkhasetu" },
                  { label: "GitHub", href: "https://github.com/shanto140", value: "github.com/shikkhasetu" },
                  { label: "Website", href: "https://www.shikkhasetu.com", value: "www.shikkhasetu.com" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-slate-600 text-xs uppercase tracking-wide mb-0.5">{item.label}</div>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-white transition-colors">{item.value}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 py-6 flex justify-between items-center">
            <span className="text-slate-600 text-sm">© 2026 Shikkha Setu. All Rights Reserved.</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-slate-600 text-sm hover:text-slate-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-slate-600 text-sm hover:text-slate-400 transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}