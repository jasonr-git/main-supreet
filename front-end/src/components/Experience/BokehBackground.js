import React, { useEffect, useState } from 'react';
import './BokehBackground.css';

const BokehBackground = () => {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    const generateLights = () => {
      const newLights = [];
      for (let i = 0; i < 6; i++) { // Generate only 6 lights
        newLights.push({
          id: i,
          x: Math.random() * 200, // Spread wider horizontally (0-200)
          y: Math.random() * 200, // Spread wider vertically (0-200)
          delay: Math.random() * 5,
          size: Math.random() * 150 + 50, // Increase size range (50-200)
          color: Math.random() > 0.5 ? 'red' : 'blue',
        });
      }
      setLights(newLights);
    };
    generateLights();
    const interval = setInterval(generateLights, 8000); // Repeat every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bokeh-background">
      <div className="bokeh-overlay"></div>
      {lights.map((light) => (
        <div
          key={light.id}
          className="bokeh-light"
          style={{
            top: `${light.y}vh`,
            left: `${light.x}vw`,
            animationDelay: `${light.delay}s`,
            width: `${light.size}px`,
            height: `${light.size}px`,
            backgroundColor: light.color,
          }}
        ></div>
      ))}
    </div>
  );
};

export default BokehBackground;
