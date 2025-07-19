import React from 'react';

export default function AnswerBox({ isLoading, error, answer }) {
  return (
    <section
      style={{
        maxWidth: '552px',
        margin: '24px auto',
        padding: '24px',
        backgroundColor: '#c8c8c8',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        textAlign: 'left',
        color: '#000',
        minHeight: '120px', // ✅ 保持框高度（即使沒有文字）
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
          minHeight: '60px', // ✅ 回答區保留高度
        }}
      >
        {isLoading
          ? '載入中，請稍後...'
          : error
          ? 'Oops! 發生錯誤，請稍後再試。'
          : answer
          ? answer
          : ''}
      </p>
    </section>
  );
}
