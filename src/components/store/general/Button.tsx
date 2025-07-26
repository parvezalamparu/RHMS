import React from "react";

type ButtonType = {
  border: string;
  icon?: string | React.ReactNode;
  bgcolor: string;
  name?: string;
  textColor: string;
  hover?:string;
  active?: string;
  onClick?: () => void;
  type?: "submit";
};

const Button = ({
  border,
  bgcolor,
  name,
  textColor,
  icon,
  hover,
  active,
  onClick,
  type,
}: ButtonType) => {
  return (
    <button
      className={`${bgcolor} ${border} px-2 py-1 rounded-lg font-semibold tracking-tight ${textColor} flex items-center gap-1 shadow-[0px_0px_4px_#000000] cursor-pointer ${hover} ${active} active:shadow-[0px_0px_0px_#ffffff] duration-50`}
      onClick={onClick}
      type={type}
    >
      {icon}
      {name}
    </button>
  );
};

export default Button;
