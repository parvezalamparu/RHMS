import React from "react";
import "./scrollbar.css";

interface CustomScrollbarProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children, style }) => {
  return (
    <div
      className="custom-scrollbar"
      style={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CustomScrollbar;
