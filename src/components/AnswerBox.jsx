import React from 'react';

export default function AnswerBox({ isLoading, error, answer }) {
  const isMobile = window.innerWidth <= 500;

  return (
    <section
      style={{
        width: '87%',
        maxWidth: isMobile ? '100%' : '552px', // ✅ 桌機限制最大寬度
        margin: '24px auto',
        padding: isMobile ? '16px' : '24px',
        backgroundColor: '#c8c8c8',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        textAlign: 'left',
        color: '#000',
        minHeight: '120px',
        boxSizing: 'border-box',
      }}
    >
      <strong style={{ fontSize: '18px' }}>AI 老湯回答：</strong>
      <p
        style={{
          marginTop: '12px',
          fontSize: '16px',
          lineHeight: '1.6',
          color: error ? 'red' : '#000',
          whiteSpace: 'pre-wrap',
          minHeight: '60px',
        }}
      >
       {isLoading
  ? '載入中，請稍後...'
  : error
  ? answer || 'Oops! 發生錯誤，請稍後再試。'
  : answer
  ? answer
  : ''}

      </p>
    </section>
  );
}
