import { useEffect, useState } from "react";

export default function QiblaCompass() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = (pos.coords.latitude * Math.PI) / 180;
      const lon = (pos.coords.longitude * Math.PI) / 180;

      const kaabaLat = (21.4225 * Math.PI) / 180;
      const kaabaLon = (39.8262 * Math.PI) / 180;

      const qibla =
        Math.atan2(
          Math.sin(kaabaLon - lon),
          Math.cos(lat) * Math.tan(kaabaLat) -
            Math.sin(lat) * Math.cos(kaabaLon - lon),
        ) *
        (180 / Math.PI);

      setAngle(qibla);
    });

    window.addEventListener("deviceorientationabsolute", (e) => {
      if (e.alpha !== null) {
        setAngle((prev) => prev - e.alpha);
      }
    });
  }, []);

  return (
    <div className="qibla">
      <h2>🧭 Qibla Direction</h2>
      <div className="compass" style={{ transform: `rotate(${angle}deg)` }}>
        ↑
      </div>
    </div>
  );
}
