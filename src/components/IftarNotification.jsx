import { useEffect } from "react";

export default function IftarNotification({ maghrib, fajr }) {
  useEffect(() => {
    if (!maghrib || !fajr) return;

    // request permission once
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const check = setInterval(() => {
      const now = new Date();

      const toDate = (time) => {
        const [h, m] = time.split(":");
        const d = new Date();
        d.setHours(parseInt(h), parseInt(m), 0, 0);
        return d;
      };

      const maghribTime = toDate(maghrib);
      const fajrTime = toDate(fajr);

      const maghribDiff = (maghribTime - now) / 1000 / 60;
      const fajrDiff = (fajrTime - now) / 1000 / 60;

      // IFTAR reminder (10 min before)
      if (maghribDiff > 9 && maghribDiff < 10) {
        new Notification("🌙 Iftar Reminder", {
          body: "10 minutes left for Maghrib. Prepare for Iftar!",
        });
      }

      // SEHRI reminder (15 min before Fajr)
      if (fajrDiff > 14 && fajrDiff < 15) {
        new Notification("⏰ Sehri Ending Soon", {
          body: "Fajr is قريب. Finish Sehri now!",
        });
      }
    }, 30000);

    return () => clearInterval(check);
  }, [maghrib, fajr]);

  return null;
}
