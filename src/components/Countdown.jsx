import { useEffect, useState } from "react";

export default function Countdown({ maghrib, fajr }) {
  const [iftarLeft, setIftarLeft] = useState("");
  const [sehriLeft, setSehriLeft] = useState("");

  useEffect(() => {
    if (!maghrib || !fajr) return;

    const interval = setInterval(() => {
      const now = new Date();

      const toDate = (time) => {
        const [h, m] = time.split(":");
        const d = new Date();
        d.setHours(parseInt(h), parseInt(m), 0, 0);
        return d;
      };

      let maghribTime = toDate(maghrib);
      let fajrTime = toDate(fajr);

      if (now > maghribTime) maghribTime.setDate(maghribTime.getDate() + 1);
      if (now > fajrTime) fajrTime.setDate(fajrTime.getDate() + 1);

      const format = (diff) => {
        const hrs = Math.floor(diff / 1000 / 60 / 60);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        return `${hrs}h ${mins}m ${secs}s`;
      };

      setIftarLeft(format(maghribTime - now));
      setSehriLeft(format(fajrTime - now));
    }, 1000);

    return () => clearInterval(interval);
  }, [maghrib, fajr]);

  return (
    <div className="timers">
      <div className="timerCard iftarCard">
        <div className="label">🌙 Iftar</div>
        <div className="time">{iftarLeft}</div>
      </div>

      <div className="timerCard sehriCard">
        <div className="label">⏰ Sehri Ends</div>
        <div className="time">{sehriLeft}</div>
      </div>
    </div>
  );
}
