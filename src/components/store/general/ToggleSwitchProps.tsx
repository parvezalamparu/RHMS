import React from "react";
import "./ToggleSwitch.css";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="slider" />
    </label>
  );
};

export default ToggleSwitch;
