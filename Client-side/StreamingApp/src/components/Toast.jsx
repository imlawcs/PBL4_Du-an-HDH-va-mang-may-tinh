import "../assets/css/Toast.css";
import { useEffect, useState } from "react";

export default function Toast({ message, duration = 3000, onDispose }) {
  const [isDisposing, setIsDisposing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisposing(true);
      setTimeout(onDispose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDispose]);

  return (
    <div className={`toast ${isDisposing ? "dispose" : "show"}`}>
      <div className="toast__content">
        <p className="toast__message league-spartan-semibold fs__normal-2">
          {message}
        </p>
      </div>
    </div>
  );
}
