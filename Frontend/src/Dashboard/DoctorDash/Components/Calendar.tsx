import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

interface CalendarProps {
  appointmentDates: string[];
  names: string[]; 
  appointments: { date: string; name: string }[];
}

const Calendar: React.FC<CalendarProps> = ({ appointmentDates, names,appointments }) => { // Accept appointmentDates as props
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [tooltip, setTooltip] = useState<{ day: Date; names: string } | null>(null); // State to manage tooltip visibility

  const getAppointmentNamesForDay = (day) => {
    return appointments
      .filter(appt => isSameDay(new Date(appt.date), day)) // Check if the appointment is on the current day
      .map(appt => appt.name.split(', ')[0]) // Extract the name
      .join(', '); // Join names with a comma
  };

  
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header flex justify-between items-center p-4 bg-gray-800 text-white">
        <button onClick={prevMonth} className="cursor-pointer">&lt;</button>
        <span>{format(currentMonth, dateFormat)}</span>
        <button onClick={nextMonth} className="cursor-pointer">&gt;</button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="days grid grid-cols-7 bg-gray-800 text-white">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="p-2 text-center">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;

        
  const appointmentNames = getAppointmentNamesForDay(cloneDay); // Get names for the current day

  const isAppointmentDate = appointmentNames.length > 0;

        // Check if the current day has an appointment
        // const isAppointmentDate = appointmentDates.some(date => date === format(day, 'yyyy-MM-dd'));

        days.push(
          <div
            className={`p-3 text-center cursor-pointer ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""} ${
              isSameDay(day, selectedDate) ? "bg-orange-400 text-white rounded-full w-12 h-12" : ""
            } ${isAppointmentDate ? "bg-blue-200 rounded-full w-12 h-12" : ""}`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
            onMouseEnter={() => appointmentNames && setTooltip({ day, names: appointmentNames })} // Show tooltip on hover
            onMouseLeave={() => setTooltip(null)} // Hide tooltip when not hovering
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };

  return (
    <div className="calendar bg-gray-100 p-4 rounded-lg shadow-md flex-grow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {tooltip && (
        <div
          className="absolute bg-white border rounded p-2 shadow-md"
          style={{
            top: tooltip.day.getTime() % 7 * 100, 
            left: "45%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}>
          {`Appointment(s) with: ${tooltip.names}`}
        </div>)}

      </div>
  );
};


export default Calendar;
