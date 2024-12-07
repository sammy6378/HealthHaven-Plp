import React from 'react';

function Notify() {
  return (
    <div style={{
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '15px',
      borderRadius: '5px',
      border: '1px solid #f5c6cb',
      margin: '10px 0',
      fontSize: '14px',
      textAlign: 'center',
    }}>
      <strong>Note:</strong> The application may not work as expected, it's under development.
    </div>
  );
}

export default Notify;
