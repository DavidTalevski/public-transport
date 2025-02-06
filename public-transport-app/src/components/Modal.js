import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          position: 'relative',
          minWidth: '300px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
