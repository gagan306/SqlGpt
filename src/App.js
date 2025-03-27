import React from 'react';
import './App.css';
import Sidebar from './offcanvas.js';
import { GridBackgroundDemo } from './Background.tsx';
import QuestionBox from "./Chatbox.js";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <GridBackgroundDemo />
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: 'calc(250px + 2rem)',
            right: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            zIndex: 1000
          }}>
            <QuestionBox />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;