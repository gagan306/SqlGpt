import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDisclosure } from "@heroui/react";
import './App.css';
import { Sidebar } from './OffCanvas.jsx';
import GridBackgroundDemo from './Background.tsx';
import RegistrationBox from './UserAccount.jsx';
import ChatInterface from './ChatInterface.js';

const HistoryComponent = () => <div style={{ color: 'white' }}>History Content Here</div>;

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); 

  return (
    <Router>
      <div className="app-container">
        {/* Pass onOpen to Sidebar */}
        <Sidebar onProfileClick={onOpen} />

        <div className="main-content" style={{ marginLeft: '250px', position: 'relative' }}>
          <GridBackgroundDemo />

          <Routes>
            <Route path="/Chat" element={<ChatInterface />} />
            <Route path="/History" element={<HistoryComponent />} />
            {/* Remove profile route since it's now a modal */}
          </Routes>
        </div>
        
        {/* Render Registration Modal outside of main content */}
        <RegistrationBox isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </Router>
  );
}

export default App;
