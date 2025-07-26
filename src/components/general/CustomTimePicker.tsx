import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

export default function CustomTimePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label="Pick a time"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{
            textField: {
              sx: {
                width: 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#888',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
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
