import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar = ({ onProfileClick, isOpen, toggleSidebar }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: isOpen ? 0 : -250,
        top: 0,
        height: '100vh',
        width: '250px',
        zIndex: 1000,
        backgroundColor: '#111827',
        color: '#fff',
        overflow: 'hidden',
        transition: 'left 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{ 
        padding: '20px 16px', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i 
            className="fa fa-bars" 
            onClick={toggleSidebar}
            style={{ cursor: 'pointer', fontSize: '16px' }}
          ></i>
          <a href="/" style={{ 
            color: 'inherit', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            fontSize: '18px' 
          }}>
            SqlGPT
          </a>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ flex: 1, padding: '20px 0' }}>
        <NavLink 
          to="/Chat" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 20px',
            color: 'white',
            textDecoration: 'none',
            gap: '10px'
          }}
          activeStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <i className="fa fa-comment"></i>
          <span>Chat</span>
        </NavLink>

        <NavLink 
          to="/History" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 20px',
            color: 'white',
            textDecoration: 'none',
            gap: '10px'
          }}
          activeStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <i className="fa fa-table"></i>
          <span>History</span>
        </NavLink>

        <div 
          onClick={onProfileClick}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 20px',
            color: 'white',
            textDecoration: 'none',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <i className="fa fa-user"></i>
          <span>Account</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        padding: '20px 5px', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        THE GAGS
      </div>
    </div>
  );
};
