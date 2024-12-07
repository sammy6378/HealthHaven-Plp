import PropTypes from 'prop-types';

const AppointmentTable = ({ appointments }) => {
  return (
    <div className="overflow-x-auto my-6">
      <div className="overflow-hidden rounded-lg shadow-lg">
      <table className="min-w-full  border-gray-300">
        <thead>
          <tr className='bg-blue-100 text-gray-700'>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Time</th>
            <th className="p-4 text-left">Doctor</th>
            <th className="p-4 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-blue-50 transition duration-150 whitespace-nowrap">
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.time}</td>
                <td className="p-3">{appt.doctor}</td>
                <td className="p-3 max-w-xs truncate">
                  {appt.notes}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 text-center">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

AppointmentTable.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      doctor: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppointmentTable;
