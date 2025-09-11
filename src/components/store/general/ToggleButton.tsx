import React from "react";
import { MdBarChart, MdTableChart } from "react-icons/md";

interface ToggleButtonProps {
  viewMode: "table" | "graph";
  setViewMode: React.Dispatch<React.SetStateAction<"table" | "graph">>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ viewMode, setViewMode }) => {
  return (
    <button
      onClick={() => setViewMode(viewMode === "table" ? "graph" : "table")}
      className="border border-gray-300 px-3 py-2 w-[6rem] rounded shadow-sm flex items-center gap-2 text-sm hover:bg-gray-100 cursor-pointer"
    >
      {viewMode === "table" ? (
        <>
          <MdBarChart className="text-lg" />
          Graph
        </>
      ) : (
        <>
          <MdTableChart className="text-lg" />
          Table
        </>
      )}
    </button>
  );
};

export default ToggleButton;
