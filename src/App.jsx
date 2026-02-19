import { useEffect, useState } from "react";
import TimesCard from "./components/TimesCard";
import Countdown from "./components/CountDown";
import NextPrayer from "./components/NextPrayer";
import MonthlyCalendar from "./components/MonthlyCalendar";
import Tasbih from "./components/Tasbih";
import DuaCard from "./components/DuaCard";
import QiblaCompass from "./components/QiblaCompass";
import AdhanPlayer from "./components/AdhanPlayer";

import IftarNotification from "./components/IftarNotification";

export default function App() {
  const [city, setCity] = useState("Hyderabad");
  const [country, setCountry] = useState("India");
  const [todayTimes, setTodayTimes] = useState(null);
  const [theme, setTheme] = useState("night");
  const [monthData, setMonthData] = useState(null);

  const updateTheme = (times) => {
    if (!times) return;

    const now = new Date();

    const toDate = (time) => {
      const [h, m] = time.split(":");
      const d = new Date();
      d.setHours(parseInt(h), parseInt(m), 0, 0);
      return d;
    };

    const fajr = toDate(times.Fajr);
    const maghrib = toDate(times.Maghrib);
    const isha = toDate(times.Isha);

    if (now >= fajr && now < maghrib) setTheme("day");
    else if (now >= maghrib && now < isha) setTheme("sunset");
    else setTheme("night");
  };
  const fetchMonth = async () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const res = await fetch(
      `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2&month=${month}&year=${year}`,
    );

    const data = await res.json();
    setMonthData(data.data);
  };
  const detectLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lon}&method=2`,
      );

      const data = await res.json();
      setTodayTimes(data.data.timings);

      // Optional: show detected city name
      setCity(data.data.meta.timezone.split("/")[1] || "Your City");
    });
  };

  const fetchTimes = async () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=${city}&country=${country}&method=2`,
    );
    const data = await res.json();

    setTodayTimes(data.data.timings);
    updateTheme(data.data.timings);
  };
  fetchMonth();

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className={`app ${theme}`}>
      <h1 className="heading">🌙 Ramadan Kareem</h1>
      <p className="sub">Live prayer times with Iftar countdown</p>

      <div className="searchBox">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />

        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />

        <button onClick={fetchTimes}>Get Times</button>

        <button onClick={detectLocation}>Use My Location 📍</button>
      </div>

      <Countdown maghrib={todayTimes?.Maghrib} fajr={todayTimes?.Fajr} />
      <MonthlyCalendar monthData={monthData} onSelect={setTodayTimes} />
      <Tasbih />
      <DuaCard />
      <AdhanPlayer times={todayTimes} />

      <NextPrayer times={todayTimes} />
      <IftarNotification
        maghrib={todayTimes?.Maghrib}
        fajr={todayTimes?.Fajr}
      />
      <QiblaCompass />

      <TimesCard times={todayTimes} />

      <footer>Auto updated daily • Real time countdown</footer>
    </div>
  );
}
