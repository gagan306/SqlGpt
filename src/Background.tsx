import React from "react";

export function GridBackgroundDemo() {
  return (
    <div style={{ 
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#111827',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingBottom: '2rem'
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(to right, #262626 1px, transparent 1px),
          linear-gradient(to bottom, #262626 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        zIndex: 1
      }} />
      {/* Radial gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, transparent 20%, #111827 70%)',
        zIndex: 2
      }} />
      
      {/* Content container */}
      <div style={{ 
        position: 'relative', 
        zIndex: 3,
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <p style={{ 
          fontSize: '2.25rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to bottom, #e4e4e7, #71717a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          padding: '2rem 0'
        }}>
         
        </p>
      </div>
    </div>
  );
}

export default GridBackgroundDemo;