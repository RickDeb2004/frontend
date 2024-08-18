import React from 'react';

const ConfirmationDialog = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  const dialogStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    padding: '20px',
    backgroundColor: '#1f2937',
    borderRadius: '8px',
    zIndex: 1000,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 5px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#ef4444',
    color: 'white',
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={dialogStyle}>
        <h2 style={{ color: 'white', textAlign: 'center' }}>Confirm Delete</h2>
        <p style={{ color: 'white', textAlign: 'center' }}>Are you sure you want to delete this user?</p>
        <div style={{ textAlign: 'center' }}>
          <button style={buttonStyle} onClick={onConfirm}>Delete</button>
          <button style={{ ...buttonStyle, backgroundColor: '#3b82f6' }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationDialog;
