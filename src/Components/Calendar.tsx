import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import BirthdayList from './BirthdayList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

const theme = createTheme({
  components: {
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: '#bbdefb',
          borderRadius: '2px',
          borderWidth: '1px',
          borderColor: '#2196f3',
          border: '1px solid',
          backgroundColor: '#0d47a1',
        },
        content:{
          justifyContent: 'center',
        }
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#4CAF50 !important',
          },
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          boxShadow: '3px 2px 10px 5px #285848 !important',
          borderRadius: '20px 20px 0 0',
          maxHeight: '450px',
        },
        actionBar: {
          display: 'none !important',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiDatePickerToolbar-title': {
            fontFamily: '"Lancelot", serif !important',
            fontWeight: 600,
            fontStyle: 'normal',
            color: 'gainsboro',
            padding: '25px',
            
          },
        },
        overline:{
          visibility: 'hidden',
          maxHeight: '0px',
        }
      },
    },
  },
});

const Calendar = () => {

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [clickedStars, setClickedStars] = useState<boolean[]>([]);


  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date ?? dayjs()); // If date is null, use current date
    setClickedStars([]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>  
      <StaticDatePicker orientation="portrait" value={selectedDate || undefined} onChange={handleDateChange} 
      /></ThemeProvider>
      {selectedDate && <BirthdayList selectedDate={selectedDate.toDate()}
        clickedStars={clickedStars} setClickedStars={setClickedStars}
      />}

    </LocalizationProvider>
  );
};

export default Calendar;






























