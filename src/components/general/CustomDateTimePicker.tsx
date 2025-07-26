import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CustomDateTimePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label="Pick date & time"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{
            textField: {
              sx: {
                width: 250, // Customize width
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#ccc', // Default border
                  },
                  '&:hover fieldset': {
                    borderColor: '#888', // On hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2', // On focus
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)', // Glow
                  },
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
