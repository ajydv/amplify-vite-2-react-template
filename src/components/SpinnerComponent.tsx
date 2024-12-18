import React from 'react';

const SpinnerComponent: React.FC = () => {
  const spinnerContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999, // Ensure it's on top of other content
  };

  const spinnerStyle: React.CSSProperties = {
    border: '8px solid #f3f3f3', // Light gray
    borderTop: '8px solid #3498db', // Blue color
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1.5s linear infinite', // Rotate the spinner
  };

  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SpinnerComponent;
