import React from 'react';

const CalendarIcon = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      style={{ fill: 'rgb(26, 195, 26)', transform: 'msFilter:' }}
    >
      <path d="M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7v2H5a2 2 0 0 0-2 2zm16 14H5V8h14z"></path>
      <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="green" fontWeight={600} >
        {day}
      </text>
    </svg>
  );
};

export default CalendarIcon;
