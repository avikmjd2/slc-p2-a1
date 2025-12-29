import React from 'react';

export default function LoadingOverlay() {
  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 9999,
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dims the background
        zIndex: 9999,                          // Sits on top of everything
        pointerEvents: 'all'                 
      }}
    >
      <div className="text-center">
        {/* Bootstrap Spinner */}
        <div 
          className="spinner-border text-primary" 
          role="status" 
          style={{ width: '4rem', height: '4rem' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="text-white mt-3">
            <strong>Please wait...</strong>
        </div>
      </div>
    </div>
  );
}