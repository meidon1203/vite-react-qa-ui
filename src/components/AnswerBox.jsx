import React from 'react';

// 簡單的 Markdown 解析器
const parseMarkdown = (text) => {
  if (!text) return '';
  
  // 處理連結 [text](url)
  let parsed = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #0044cc; text-decoration: underline;">${linkText}</a>`;
  });
  
  // 處理粗體 **text** 或 __text__
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // 處理斜體 *text* 或 _text_
  parsed = parsed.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  parsed = parsed.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // 處理行內程式碼 `code`
  parsed = parsed.replace(/`([^`]+)`/g, '<code style="background-color: #f1f1f1; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>');
  
  // 處理換行
  parsed = parsed.replace(/\n/g, '<br />');
  
  return parsed;
};

// Markdown 渲染元件
const MarkdownRenderer = ({ children }) => {
  const parsedHtml = parseMarkdown(children);
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
      style={{
        lineHeight: '1.6'
      }}
    />
  );
};

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
      <div
        style={{
          marginTop: '12px',
          fontSize: '16px',
          lineHeight: '1.6',
          color: error ? 'red' : '#000',
          whiteSpace: 'pre-wrap',
          minHeight: '60px',
        }}
      >
        {isLoading ? (
          '載入中，請稍後...'
        ) : error ? (
          answer || 'Oops! 發生錯誤，請稍後再試。'
        ) : answer ? (
          <MarkdownRenderer>{answer}</MarkdownRenderer>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}