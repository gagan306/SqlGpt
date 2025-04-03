import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDisclosure } from "@heroui/react";
import './App.css';
import { Sidebar } from './OffCanvas.jsx';
import GridBackgroundDemo from './Background.jsx';

import ChatInterface from './ChatInterface.jsx';
import SignupFormDemo from './UserAccount.tsx';
const HistoryComponent = () => <div style={{ color: 'white' }}>History Content Here</div>;

// Simple hamburger button component
const HamburgerButton = ({ onClick }) => (
  <button 
    className="hamburger-menu" 
    onClick={onClick}
    aria-label="Toggle Menu"
  >
    <i className="fa fa-bars"></i>
  </button>
);

function App() {
  const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      
      <GridBackgroundDemo />
      
      
      {!isSidebarOpen && <HamburgerButton onClick={toggleSidebar} />}
      
      <div className={`app-container ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        
        <Sidebar 
          onProfileClick={onOpen} 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        <div className="main-content">
          <Routes>
            <Route path="/Chat" element={<ChatInterface />} />
            <Route path="/History" element={<HistoryComponent />} />
            <Route path="/Profile" element={<SignupFormDemo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
