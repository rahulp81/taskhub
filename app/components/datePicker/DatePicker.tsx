import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
       <DatePicker
      className="border-2"
      selected={startDate}
      onChange={(date) => setStartDate(date as Date)}
      isClearable
      placeholderText="Due Date"
    />
  );
};

export default  Example