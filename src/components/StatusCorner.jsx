import { useEffect, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const AMPM_TAB = assetUrl("/hero/v2/status/time/ampm-tab.png");
const NY_TZ = "America/New_York";

function readNewYorkTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: NY_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).formatToParts(date);

  const hour = parts.find((part) => part.type === "hour")?.value ?? "--";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "--";
  const dayPeriod = (parts.find((part) => part.type === "dayPeriod")?.value ?? "AM").toUpperCase();

  return {
    clock: `${hour}:${minute}`,
    period: dayPeriod === "AM" || dayPeriod === "PM" ? dayPeriod : "AM"
  };
}

export default function StatusCorner() {
  const [nyTime, setNyTime] = useState(() => readNewYorkTime());

  useEffect(() => {
    const tick = () => setNyTime(readNewYorkTime());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="status-rail">
      <aside className="status-corner status-corner--left" aria-label="AY">
        <span className="status-corner__initials">AY</span>
      </aside>

      <aside
        className="status-corner status-corner--right"
        aria-label={`New York time ${nyTime.clock} ${nyTime.period}`}
      >
        <span className="status-corner__time">{nyTime.clock}</span>
        <span className="status-corner__ampm" aria-hidden="true">
          <img className="status-corner__ampm-tab" src={AMPM_TAB} alt="" draggable={false} />
          <span className="status-corner__ampm-label">{nyTime.period}</span>
        </span>
      </aside>
    </div>
  );
}
