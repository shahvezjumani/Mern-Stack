import { useEffect, useState } from "react";

function Popup({ message, barColor, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 0));
    }, 30);

    if (progress === 0) {
      onClose();
    }

    return () => clearInterval(interval);
  }, [progress, onClose]);

  return (
    <div className="fixed top-4 right-4 w-64 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <p className="text-sm">{message}</p>
      <div
        className="mt-2 h-1 rounded-full"
        style={{ width: `${progress}%`, backgroundColor: barColor }}
      ></div>
    </div>
  );
}

export default Popup;
