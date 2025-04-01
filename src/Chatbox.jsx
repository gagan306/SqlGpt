import React, { useState, useRef } from "react";

export function QuestionBox({ addMessage }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addMessage(text, "user"); // Show user message immediately

    try {
      let res = await fetch("https://localhost:7053/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      let resJson = await res.json();
      addMessage(resJson.message, "bot"); // Show bot response

      setText(""); // Clear input after sending
      resizeTextarea();
    } catch (err) {
      console.error("Error:", err);
      addMessage("Failed to send the question. Please try again.", "bot");
    }
  };

  return (
    <div className="SendData">
      <div style={{
          width: "50%", position: "fixed", bottom: "3rem", left: "50%",
          transform: "translateX(-50%)", backgroundColor: "rgba(127, 121, 121, 0.2)",
          padding: "0.75rem", borderRadius: "15px", backdropFilter: "blur(5px)",
          border: "1px solid rgba(191, 53, 53, 0.05)", zIndex: 1000
        }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <textarea
            ref={textareaRef}
            placeholder="Ask your question?"
            value={text}
            onChange={(e) => { setText(e.target.value); resizeTextarea(); }}
            style={{
              flex: 1, resize: "none", borderRadius: "8px",
              backgroundColor: "rgba(17, 24, 39, 0.2)", border: "1px solid rgba(255, 255, 255, 0.05)",
              color: "#e4e4e7", padding: "0.5rem", fontSize: "0.875rem",
              overflow: "hidden", backdropFilter: "blur(3px)",
              minHeight: "45px", maxHeight: "150px"
            }}
            rows="1"
          ></textarea>
          <button type="submit" style={{
              width: "35px", height: "35px", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "1rem", color: "#e4e4e7",
              backgroundColor: "rgba(17, 24, 39, 0.2)", border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "50%", cursor: "pointer", transition: "all 0.2s",
              backdropFilter: "blur(3px)", padding: 0
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(177, 187, 209, 0.3)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(17, 24, 39, 0.2)")}
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionBox;
