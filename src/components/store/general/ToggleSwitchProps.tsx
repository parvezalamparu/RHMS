import * as React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import type { SwitchProps } from "@mui/material";

interface ToggleSwitchProps extends Omit<SwitchProps, "onChange"> {
  checked: boolean;
  onChange: () => void;
}

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    transition: 'background-color 300ms ease 200ms',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
      transition: 'opacity 300ms ease 200ms',
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
      transition: 'opacity 300ms ease 200ms',
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
    transition: 'transform 00ms ease 200ms',
  },
}));

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  ...props
}) => {
  return (
    <Android12Switch
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
};

export default ToggleSwitch;
