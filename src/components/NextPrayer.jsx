import { useEffect, useState } from "react";

export default function NextPrayer({ times }) {
  const [text, setText] = useState("");

  const getNextPrayer = () => {
    if (!times) return;

    const now = new Date();

    const prayers = [
      { name: "Fajr", time: times.Fajr },
      { name: "Dhuhr", time: times.Dhuhr },
      { name: "Asr", time: times.Asr },
      { name: "Maghrib", time: times.Maghrib },
      { name: "Isha", time: times.Isha },
    ];

    const toDate = (t) => {
      const [h, m] = t.split(":");
      const d = new Date();
      d.setHours(parseInt(h), parseInt(m), 0, 0);
      return d;
    };

    for (let p of prayers) {
      const prayerTime = toDate(p.time);
      if (prayerTime > now) {
        const diff = prayerTime - now;
        const mins = Math.floor(diff / 1000 / 60);
        setText(`Next Prayer: ${p.name} in ${mins} min`);
        return;
      }
    }

    setText("Next Prayer: Fajr tomorrow 🌙");
  };

  useEffect(() => {
    getNextPrayer();
    const interval = setInterval(getNextPrayer, 60000);
    return () => clearInterval(interval);
  }, [times]);

  return <div className="nextPrayer">{text}</div>;
}
