export default function Calendar({ data, onSelect }) {
  return (
    <div className="calendar">
      {data.map((d) => (
        <button key={d.date} className="date" onClick={() => onSelect(d)}>
          {new Date(d.date).getDate()}
        </button>
      ))}
    </div>
  );
}
