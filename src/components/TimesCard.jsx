export default function TimesCard({ times }) {
  if (!times) return <div className="card">Loading prayer times...</div>;

  return (
    <div className="card animate">
      <h2 className="title">Today Prayer Times</h2>
      <div className="grid">
        <div>
          🌙 Sehri <span>{times.Fajr}</span>
        </div>
        <div>
          🕌 Fajr <span>{times.Fajr}</span>
        </div>
        <div>
          ☀️ Dhuhr <span>{times.Dhuhr}</span>
        </div>
        <div>
          🌤 Asr <span>{times.Asr}</span>
        </div>
        <div>
          🌇 Maghrib / Iftar <span>{times.Maghrib}</span>
        </div>
        <div>
          🌌 Isha <span>{times.Isha}</span>
        </div>
      </div>
    </div>
  );
}
