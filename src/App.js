import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Timer = ({ targetDate }) => {
  const [timeElapsed, setTimeElapsed] = React.useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    if (targetDate) {
      const timer = setInterval(() => {
        const now = new Date();
        let difference = now - targetDate;

        if (difference >= 0) {
          const years = now.getFullYear() - targetDate.getFullYear();
          const months = now.getMonth() - targetDate.getMonth() + (years * 12);
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeElapsed({ years, months, days, hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [targetDate]);

  return (
    <div className="timer">
      <span>{timeElapsed.years}y </span>
      <span>{timeElapsed.months % 12}m </span>
      <span>{timeElapsed.days % 30}d </span>
      <span>{timeElapsed.hours < 10 ? "0" + timeElapsed.hours : timeElapsed.hours}:</span>
      <span>{timeElapsed.minutes < 10 ? "0" + timeElapsed.minutes : timeElapsed.minutes}:</span>
      <span>{timeElapsed.seconds < 10 ? "0" + timeElapsed.seconds : timeElapsed.seconds}</span>
    </div>
  );
};

function App() {
  const [targetDate, setTargetDate] = React.useState(null);

  const handleDateChange = (event) => {
    setTargetDate(new Date(event.target.value));
  };

  const handleClear = () => {
    setTargetDate(null);
  };

  return (
    <div className="container mt-5 text-center">
    <h1>How long has it been?</h1>
    <p>Enter a date to see how long it has been since then.</p>
      <div className="timer_container card p-4 mt-3">
        <input
          type="datetime-local"
          className="form-control mb-3"
          onChange={handleDateChange}
          max={new Date().toISOString().slice(0, -8)}
        />
        {targetDate && <Timer targetDate={targetDate} />}
        <button className="btn btn-primary mt-3" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

export default App;
