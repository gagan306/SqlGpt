import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@heroui/react";

export const MailIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LockIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const UserIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill="currentColor"
      />
      <path
        d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function LoginModal({ isOpen, onOpenChange }) {
  const [mode, setMode] = useState("login"); // login, signup-step1, signup-step2
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Debug log to verify the modal is receiving the correct isOpen prop
  useEffect(() => {
    console.log("LoginModal - isOpen:", isOpen);
  }, [isOpen]);

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login with:", email, password);
    setStatusMessage("Login successful!");
  };

  const handleSignup = () => {
    // Add your signup logic here
    console.log("Signup with:", email, password);
    setStatusMessage("Registration successful!");
  };

  const handleNextStep = () => {
    if (email.trim() === "") {
      setStatusMessage("Please enter a valid email address");
      return;
    }
    setStatusMessage(""); // Clear status message
    setMode("signup-step2");
  };

  // Reset state when modal closes
  const handleOpenChange = (open) => {
    console.log("Modal open state changing to:", open);
    if (!open) {
      setMode("login");
      setStatusMessage("");
    }
    onOpenChange(open);
  };

  // Force the modal to be visible with inline styles if isOpen is true
  const modalStyle = {
    display: isOpen ? 'flex' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  };

  const modalContentStyle = {
    backgroundColor: '#121212',
    borderRadius: '10px',
    padding: '20px',
    width: '90%',
    maxWidth: '400px',
    color: 'white',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
  };

  const inputContainerStyle = {
    marginBottom: '16px',
    position: 'relative'
  };

  const inputLabelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#aaa'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#222',
    color: 'white',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const primaryButtonStyle = {
    padding: '10px 24px',
    backgroundColor: '#2563eb', // Blue color
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  const secondaryButtonStyle = {
    padding: '10px 24px',
    backgroundColor: '#4a0d24', // Dark red
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'white',
    fontSize: '14px'
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '20px'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer'
  };

  const linkStyle = {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '14px'
  };

  // This alternative rendering ensures the modal is shown regardless of heroui's modal
  if (isOpen) {
    return (
      <div style={modalStyle}>
        <div style={{...modalContentStyle, position: 'relative'}}>
          <button 
            onClick={() => handleOpenChange(false)}
            style={closeButtonStyle}
            aria-label="Close"
          >
            ×
          </button>
          
          {mode === "login" && (
            <>
              <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Log in</h2>
              
              <div style={inputContainerStyle}>
                <label style={inputLabelStyle}>Email</label>
                <input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              
              <div style={inputContainerStyle}>
                <label style={inputLabelStyle}>Password</label>
                <input 
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '16px',
                marginBottom: '24px',
                alignItems: 'center'
              }}>
                <label style={checkboxStyle}>
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ marginRight: '4px' }} 
                  />
                  Remember me
                </label>
                <a href="#" style={linkStyle}>Forgot password?</a>
              </div>
              
              <div style={footerStyle}>
                <button 
                  onClick={() => handleOpenChange(false)}
                  style={secondaryButtonStyle}
                >
                  Close
                </button>
                <button 
                  onClick={handleLogin}
                  style={primaryButtonStyle}
                >
                  Sign in
                </button>
              </div>
              
              {/* Sign up option below the login section */}
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <p style={{ color: '#aaa', fontSize: '14px' }}>
                  Don't have an account? 
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setMode("signup-step1");
                    }} 
                    style={{...linkStyle, marginLeft: '5px'}}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </>
          )}

          {mode === "signup-step1" && (
            <>
              <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Enter your Email</h2>
              
              <div style={inputContainerStyle}>
                <label style={inputLabelStyle}>Email</label>
                <input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              
              {statusMessage && (
                <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px' }}>
                  {statusMessage}
                </div>
              )}
              
              <div style={footerStyle}>
                <button 
                  onClick={() => setMode("login")}
                  style={secondaryButtonStyle}
                >
                  Back
                </button>
                <button 
                  onClick={handleNextStep}
                  style={primaryButtonStyle}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {mode === "signup-step2" && (
            <>
              <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Enter your Password</h2>
              
              <div style={{ marginBottom: '16px', color: '#aaa', fontSize: '14px' }}>
                Email: {email}
              </div>
              
              <div style={inputContainerStyle}>
                <label style={inputLabelStyle}>Password</label>
                <input 
                  type="password"
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />
              </div>
              
              {statusMessage && (
                <div style={{ color: '#22c55e', marginBottom: '16px', fontSize: '14px' }}>
                  {statusMessage}
                </div>
              )}
              
              <div style={footerStyle}>
                <button 
                  onClick={() => setMode("signup-step1")}
                  style={secondaryButtonStyle}
                >
                  Back
                </button>
                <button 
                  onClick={handleSignup}
                  style={primaryButtonStyle}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Return nothing if the modal is closed
  return null;
}