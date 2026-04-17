import { useState, useEffect } from "react";

export default function AnimatedCounter({ end, label, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    const el = document.getElementById(`counter-${label}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [label]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <div id={`counter-${label}`} className="text-center">
      <div className="text-5xl font-black text-white">{count}+</div>
      <div className="text-sm font-semibold text-amber-300 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}
