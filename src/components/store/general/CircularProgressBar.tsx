import React from "react";

interface CircularProgressBarProps {
  value: number; // 0 to 100
  size?: number; // diameter in px
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  size = 120,
  strokeWidth = 10,
  color = "#0eeb66", // Tailwind green-500
  trackColor = "#e5e7eb", // Tailwind gray-200
  label = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size}>
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      {label && (
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
          {value}%
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
