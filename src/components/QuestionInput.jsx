import React from 'react';

export default function QuestionInput({
  question,
  setQuestion,
  isLoading,
  handleSubmit
}) {
  return (
    <section
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 24px',
        textAlign: 'center', // 讓標題置中
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '24px',color: '#000' }}>
        我是臺灣吧創辦人 <span style={{ whiteSpace: 'nowrap' }}>蕭宇辰</span>，問我點什麼吧！
      </h1>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="請輸入你的問題..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: '100%',
            height: '100px',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            resize: 'none',
            marginBottom: '16px',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#333',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {isLoading ? '正在回答中...' : '送出問題'}
        </button>
      </form>
    </section>
  );
}
