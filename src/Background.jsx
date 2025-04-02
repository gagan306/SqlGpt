import React, { useEffect } from "react";

export function GridBackgroundDemo() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = '#0f172a';
    document.body.style.backgroundColor = '#0f172a';
    
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.backgroundColor = '#0f172a';
    }
    
    return () => {
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, []);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#0f172a',
      overflow: 'hidden',
      zIndex: -1,
      width: '100vw',
      height: '100vh',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        opacity: 0.5
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.8) 100%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        zIndex: 1
      }}>
        <p style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #e4e4e7,rgb(239, 239, 247))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
         
        </p>
      </div>
    </div>
  );
}

export default GridBackgroundDemo;