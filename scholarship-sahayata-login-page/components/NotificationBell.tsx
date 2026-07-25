import React, { useState, useEffect } from "react";
import "./NotificationBell.css";

const NotificationBell: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const notifUrl = import.meta.env.VITE_STUDENT_NOTIFICATION_URL;

  useEffect(() => {
    console.log("[NotificationBell] Loaded env:", notifUrl);
  }, []);
const handleClick = () => {
  setClicked(true);

  // ⭐ Save current page before leaving
  sessionStorage.setItem(
    "LAST_ROUTE",
    window.location.pathname + window.location.search
  );

  if (notifUrl) {
    window.location.assign(notifUrl);
  } else {
    console.warn("Notification URL missing!");
  }
};

  return (
    <button className="nb-btn" onClick={handleClick}>
      🔔
    </button>
  );
};

export default NotificationBell;
