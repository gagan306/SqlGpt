import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDisclosure } from "@heroui/react";
import './App.css';
import { Sidebar } from './OffCanvas.jsx';
import GridBackgroundDemo from './Background.jsx';
import RegistrationBox from './UserAccount.jsx';
import ChatInterface from './ChatInterface.jsx';

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
      {/* Background is now outside the container to cover entire screen */}
      <GridBackgroundDemo />
      
      {/* Show hamburger menu only when sidebar is collapsed */}
      {!isSidebarOpen && <HamburgerButton onClick={toggleSidebar} />}
      
      <div className={`app-container ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        {/* Pass all required props to Sidebar */}
        <Sidebar 
          onProfileClick={onOpen} 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        <div className="main-content">
          <Routes>
            <Route path="/Chat" element={<ChatInterface />} />
            <Route path="/History" element={<HistoryComponent />} />
            {/* Remove profile route since it's now a modal */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
