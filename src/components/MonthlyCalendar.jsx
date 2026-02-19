export default function MonthlyCalendar({ monthData, onSelect }) {
  if (!monthData) return null;

  const today = new Date().getDate();

  return (
    <div className="monthContainer">
      {monthData.map((day, index) => {
        const isToday = index + 1 === today;

        return (
          <div
            key={index}
            className={`dayCard ${isToday ? "todayCard" : ""}`}
            onClick={() => onSelect(day.timings)}
          >
            <div className="dayHeader">
              <span className="dayNumber">{index + 1}</span>
              {isToday && <span className="todayBadge">TODAY</span>}
            </div>

            <div className="timeRow">
              <span>Fajr</span>
              <span>{day.timings.Fajr}</span>
            </div>

            <div className="timeRow">
              <span>Iftar</span>
              <span>{day.timings.Maghrib}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
