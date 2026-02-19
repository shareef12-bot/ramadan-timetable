import { useState, useEffect } from "react";

export default function Tasbih() {
  const [count, setCount] = useState(0);

  // load saved value
  useEffect(() => {
    const saved = localStorage.getItem("tasbih");
    if (saved) setCount(parseInt(saved));
  }, []);

  // save value
  useEffect(() => {
    localStorage.setItem("tasbih", count);
  }, [count]);

  const add = () => {
    setCount(count + 1);

    // mobile vibration
    if (navigator.vibrate) navigator.vibrate(40);
  };

  const reset = () => setCount(0);

  return (
    <div className="tasbih">
      <h2>Digital Tasbih</h2>

      <div className="circle" onClick={add}>
        {count}
      </div>

      <button className="resetBtn" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
