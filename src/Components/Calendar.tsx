import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import BirthdayList from './BirthdayList';

const Calendar = () => {

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [clickedStars, setClickedStars] = useState<boolean[]>([]);


  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date ?? dayjs()); // If date is null, use current date
    setClickedStars([]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <StaticDatePicker orientation="portrait" value={selectedDate || undefined} onChange={handleDateChange} />
      {selectedDate && <BirthdayList selectedDate={selectedDate.toDate()}
        clickedStars={clickedStars} setClickedStars={setClickedStars}
      />}

    </LocalizationProvider>
  );
};

export default Calendar;






























