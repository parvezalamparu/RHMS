import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CustomDatePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{
            textField: {
              sx: {
                height: 20, // Sets the total height of the TextField within the DatePicker
                // You might need to adjust padding inside if text isn't centered   kete
                '& .MuiInputBase-root': {
                  height: '100%',
                },
                '& .MuiInputBase-input': {
                  paddingTop: '12px', // Adjust padding to vertically center
                  paddingBottom: '12px',
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
