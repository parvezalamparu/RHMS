import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import type { DateRange } from '@mui/x-date-pickers-pro/models';
import dayjs, { Dayjs } from 'dayjs';

interface customDesign {
    width: string;
    
}

export default function CustomDateRangePicker ({width}:customDesign) {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{
            textField: ({ position }) => ({
              sx: {
                width: {width},
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
              label: position === 'start' ? 'Start date' : 'End date',
            }),
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
