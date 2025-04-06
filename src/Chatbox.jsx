import React, { useState, useRef } from "react";
import { sendChatQuestion } from "./api/ChatHistory.js";

export function QuestionBox({ addMessage }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    addMessage(text, "user"); // Show user message immediately

    try {
      const response = await sendChatQuestion(text); // Centralized call
      addMessage(response.message, "bot"); // Assuming response has `message`
      setText("");
      resizeTextarea();
    } catch (err) {
      addMessage("Failed to send the question. Please try again.", "bot");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    // If Enter is pressed without Shift key, send the message
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (new line)
      sendMessage();
    }
  };

  return (
    <div className="SendData">
      <div style={{
          width: "100%", 
          backgroundColor: "rgba(17, 24, 39, 0.5)",
          padding: "0.75rem", 
          borderRadius: "15px", 
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <textarea
            ref={textareaRef}
            placeholder="Ask your question?"
            value={text}
            onChange={(e) => { setText(e.target.value); resizeTextarea(); }}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, 
              resize: "none", 
              borderRadius: "10px",
              backgroundColor: "rgba(30, 41, 59, 0.7)", 
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#e4e4e7", 
              padding: "0.75rem", 
              fontSize: "0.95rem",
              fontFamily: "inherit",
              overflow: "hidden", 
              backdropFilter: "blur(3px)",
              minHeight: "45px", 
              maxHeight: "150px",
              outline: "none"
            }}
            rows="1"
          ></textarea>
          <button type="submit" style={{
              width: "42px", 
              height: "42px", 
              display: "flex", 
              alignItems: "center",
              justifyContent: "center", 
              fontSize: "1.2rem", 
              color: "#ffffff",
              backgroundColor: "rgba(59, 130, 246, 0.7)", 
              border: "none",
              borderRadius: "50%", 
              cursor: "pointer", 
              transition: "all 0.2s",
              backdropFilter: "blur(3px)", 
              padding: 0,
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.9)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.7)")}
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionBox;
