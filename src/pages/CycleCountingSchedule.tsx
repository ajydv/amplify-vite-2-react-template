import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  getDate,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import "../assets/css/Calendar.css";

interface PartNumbersData {
  [date: string]: number;
}

const CycleCountingSchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const partNumbersData: PartNumbersData = {
    "2024-12-02": 78,
    "2024-12-03": 72,
    "2024-12-04": 51,
    "2024-12-05": 12,
    "2024-12-09": 78,
    "2024-12-10": 72,
    "2024-12-11": 51,
    "2024-12-12": 12,
    "2024-12-16": 128,
    "2024-12-17": 142,
    "2024-12-23": 78,
    "2024-12-24": 72,
    "2024-12-25": 51,
    "2024-12-26": 12,
    "2024-12-30": 78,
  };

  const disabledDates: string[] = ["2024-12-18"];

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (date: string) => {
    navigate(`/dailycount?date=${date}`);
  };

  const renderCalendar = (): JSX.Element[] => {
    const startDate = startOfWeek(startOfMonth(currentDate));
    const endDate = endOfWeek(endOfMonth(currentDate));
    const calendar = [];
    let currentDay = startDate;

    while (currentDay <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dateString = format(currentDay, "yyyy-MM-dd");
        const partNumbers = partNumbersData[dateString] || null;
        const isDisabled = disabledDates.includes(dateString);
        const isInCurrentMonth = isSameMonth(currentDay, currentDate);

        let cellClass = "calendar-cell";
        if (!isInCurrentMonth) cellClass += " outside-month";
        else if (isDisabled) cellClass += " disabled";
        else if (partNumbers !== null && partNumbers < 50) cellClass += " part-green";
        else if (partNumbers !== null && partNumbers >= 50 && partNumbers < 70)
          cellClass += " part-yellow";
        else if (partNumbers !== null && partNumbers >= 70) cellClass += " part-red";

        week.push(
          <td key={dateString} className={cellClass}>
            {isInCurrentMonth && (
              <>
                <div className="date">{getDate(currentDay)}</div>
                {partNumbers !== null && (
                  <button
                    className="part-button"
                    onClick={() => handleDateClick(dateString)}
                  >
                    {`${partNumbers} Part #'s`}
                  </button>
                )}
              </>
            )}
          </td>
        );
        currentDay = addDays(currentDay, 1);
      }
      calendar.push(<tr key={`week-${calendar.length}`}>{week}</tr>);
    }
    return calendar;
  };

  return (
    <div className="container-fluid">
      <header className="row bg-primary text-white py-3 px-4">
        <div className="col-md-6 d-flex align-items-center">
          <h5>Cycle Counting Schedule</h5>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-light">Create New Cycle Counting Instance 1</button>
          <button className="btn btn-danger ms-2">Sign Out</button>
        </div>
      </header>
      <main className="mt-4 text-center">
        <div className="legend mb-3 d-flex justify-content-center">
          <div className="me-3">
            <span className="legend-item green"></span> Part #'s &lt; 50
          </div>
          <div className="me-3">
            <span className="legend-item yellow"></span> 50 &lt;= Part #'s &lt; 70
          </div>
          <div>
            <span className="legend-item red"></span> Part #'s &gt;= 70
          </div>
        </div>
        <div className="calendar-header align-items-center">
          <button className="btn btn-primary" onClick={handlePrevMonth}>
            &lt;
          </button>
          <h3>{format(currentDate, "MMMM yyyy")}</h3>
          <button className="btn btn-primary" onClick={handleNextMonth}>
            &gt;
          </button>
        </div>
        <table className="table calendar-table">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
      </main>
    </div>
  );
};

export default CycleCountingSchedule;
