import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set up moment localizer for React Big Calendar
const localizer = momentLocalizer(moment);

interface MyCalendarProps {
  events: any[];
  addEvent: (event: any) => void; // Function to add event to the parent component
}

const MyCalendar: React.FC<MyCalendarProps> = ({ events, addEvent }) => {
  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events.map((event) => ({
          ...event,
          title: (
            <a
              href="#"
              style={{ textDecoration: 'underline', color: 'gold' }}
              onClick={() => {
                // Optionally handle what happens when the event link is clicked
                toast.info(`Event clicked: ${event.title}`);
              }}
            >
              {event.title}
            </a>
          ),
        }))}
        startAccessor="start"
        endAccessor="end"
        selectable={false} // Disable slot selection
        defaultDate={new Date()}
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
      />

      {/* Toast container for notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default MyCalendar;
