import { useState, useEffect } from "react";

const backgrounds = [
  "/bg1.jpg",
  "/bg2.jpg",
  "/bg3.jpg",
];

export default function Background({ children }) {
  const [bg, setBg] = useState(backgrounds[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      setBg(nextBg);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  );
}
