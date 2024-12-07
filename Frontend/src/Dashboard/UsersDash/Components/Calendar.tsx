import React from 'react';
import { Badge } from 'rsuite';
import Calendar from 'rsuite/Calendar';
import 'rsuite/Calendar/styles/index.css';

interface Appointment {
  date: string;
  title: string;
  time: string;
}

const BasicDateCalendar = ({ appointments = [] as Appointment[], onDateClick }) => {


  const getTodoList = (date) => {
    if (!date || !Array.isArray(appointments)) {
      console.error('Invalid date or appointments array');
      return [];
    }

    const formattedDate = date.toISOString().split('T')[0];
    return appointments.filter(event => event.date === formattedDate);
  };

  const renderCell = (date) => {
    const list = getTodoList(date);
  
    if (list.length) {
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Badge
            // className="calendar-todo-item-badge"
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              backgroundColor: 'red',
              borderRadius: '50%',
              padding: '4px 4px',
            }}
          >
          </Badge>
        </div>
      );
    }
    return null;
  };
  

  return (
    <Calendar 
      compact 
      renderCell={renderCell} 
      onSelect={onDateClick} 
      style={{ width: 320,position: 'relative' }}
    />
  );
};

export default BasicDateCalendar;
