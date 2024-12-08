
import React from 'react';
import Badge from '@mui/material/Badge';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';

interface Appointment {
  date: string;
  title: string;
  time: string;
}

interface BasicDateCalendarProps {
  appointments?: Appointment[];
  onDateClick?: (date: Dayjs) => void;
}

function CustomDay(
  props: PickersDayProps<Dayjs> & { appointmentsOnDay?: Appointment[] }
) {
  const { appointmentsOnDay = [], day, outsideCurrentMonth, ...other } = props;

  const hasAppointments = appointmentsOnDay.length > 0;

  return (
    <Badge
      overlap="circular"
      badgeContent={hasAppointments ? appointmentsOnDay.length : undefined}
      className='z-10'
      color="primary"
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

const BasicDateCalendar: React.FC<BasicDateCalendarProps> = ({ appointments = [], onDateClick }) => {
  const getAppointmentsForDay = (date: Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return appointments.filter(event => event.date === formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={(date) => {
          if (date && onDateClick) {
            onDateClick(date);
          }
        }}
        slots={{
          day: (props) => (
            <CustomDay
              {...props}
              appointmentsOnDay={getAppointmentsForDay(props.day)}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDateCalendar;