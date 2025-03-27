import React from "react";

export function QuestionBox() {
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'rgba(127, 121, 121, 0.2)',
      padding: '1rem',
      borderRadius: '20px',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(191, 53, 53, 0.05)'
    }}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-end'
      }}>
        <textarea
          placeholder="Ask your question?"
          style={{
            flex: 1,
            resize: 'none',
            borderRadius: '10px',
            backgroundColor: 'rgba(17, 24, 39, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: '#e4e4e7',
            padding: '0.75rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            height: '50px',
            maxHeight: '90px',
            overflow: 'auto',
            backdropFilter: 'blur(3px)'
          }}
          rows="1"
        ></textarea>

        <button
          type="button"
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            color: '#e4e4e7',
            backgroundColor: 'rgba(17, 24, 39, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backdropFilter: 'blur(3px)',
            padding: 0
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(17, 24, 39, 0.3)'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(17, 24, 39, 0.2)'}
        >
          ↑
        </button>
      </div>
    </div>
  );
}

export default QuestionBox; 