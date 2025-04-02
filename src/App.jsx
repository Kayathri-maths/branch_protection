import React, { useState, useEffect } from "react";

const businessWeekOffs = {
  startDate: 1677628800000, // March 1, 2023
  endDate: 1704067200000, // January 1, 2024
  weekOff: {
    saturday: true,
    monday: true,
  },
  createdAt: 1678147200000,
};

// Example staff-level data
const staffWeekOffsData = {
  staff_001: {
    startDate: 1677628800000,
    endDate: 1704067200000,
    weekOff: {
      sunday: true,
      wednesday: true,
    },
    createdAt: 1678147200000,
  },
};

const WeekOffManager = ({ selectedMonth, staffId }) => {
  const [weekOffs, setWeekOffs] = useState({});

  useEffect(() => {
    // Check if the staff has a custom week-off
    if (staffWeekOffsData[staffId]) {
      setWeekOffs(staffWeekOffsData[staffId].weekOff);
    } else {
      setWeekOffs(businessWeekOffs.weekOff); // Default to business-level
    }
  }, [staffId]);

  // Handle checkbox change
  const handleCheckboxChange = (day) => {
    setWeekOffs((prev) => ({
      ...prev,
      [day]: !prev[day], // Toggle the selected day
    }));
  };

  return (
    <div>
      <h3>Week-Offs for {selectedMonth}</h3>
      <div>
        {[
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ].map((day) => (
          <label key={day} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={weekOffs[day] || false}
              onChange={() => handleCheckboxChange(day)}
            />
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

// Example Usage
const App = () => {
  return (
    <div>
      <h2>Manage Week-Offs</h2>
      <WeekOffManager selectedMonth="April 2024" staffId="staff_001" />
    </div>
  );
};

export default App;
