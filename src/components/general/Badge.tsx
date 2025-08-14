
import React from "react";

interface BadgeProps {
  label: string;
  color?: string;
  text?: string; 
}

const Badge: React.FC<BadgeProps> = ({ label, color,text }) => {
  return (
    <span
      className={`text-xs font-normal px-3 py-1 ${text} rounded ${color ?? "bg-gray-200 text-gray-800"}`}
    >
      {label}
    </span>
  );
};

export default Badge;
