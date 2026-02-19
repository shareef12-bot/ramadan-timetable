import { useEffect, useRef } from "react";

export default function AdhanPlayer({ times }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!times) return;

    const check = setInterval(() => {
      const now = new Date();
      const current =
        now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");

      const prayers = [
        times.Fajr,
        times.Dhuhr,
        times.Asr,
        times.Maghrib,
        times.Isha,
      ];

      if (prayers.includes(current)) {
        audioRef.current.play();
      }
    }, 20000);

    return () => clearInterval(check);
  }, [times]);

  return <audio ref={audioRef} src="/adhan.mp3" preload="auto" />;
}
