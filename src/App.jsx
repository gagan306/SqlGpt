import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDisclosure, Button } from "@heroui/react";
import './App.css';
import { Sidebar } from './OffCanvas.jsx';
import GridBackgroundDemo from './Background.jsx';
import LoginModal from './LoginModal.jsx';
import ChatInterface from './ChatInterface.jsx';
import BodyOnlyExample from './ChatHistory.jsx'

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
  const { isOpen: isModalOpen, onOpen: onModalOpen, onOpenChange: onModalOpenChange } = useDisclosure();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfileClick = () => {
    console.log("Profile clicked, opening modal");
    onModalOpen();
  };
  
 
  return (
    <Router>
      <GridBackgroundDemo />
      
      {!isSidebarOpen && <HamburgerButton onClick={toggleSidebar} />}
      
      <div className={`app-container ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <Sidebar 
          onProfileClick={handleProfileClick} 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        <div className="main-content">
          
          
          <Routes>
            <Route path="/Chat" element={<ChatInterface />} />
            <Route path="/History" element={<BodyOnlyExample />} />
          </Routes>
        </div>
      </div>
      
      <LoginModal isOpen={isModalOpen} onOpenChange={onModalOpenChange} />
    </Router>
  );
}

export default App;