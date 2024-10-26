// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateOptions( { formData, setFormData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      yearReleased: date.getFullYear()
    })
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showYearPicker
        dateFormat="yyyy"
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
      />
    </div>
  );
}

export default DateOptions;