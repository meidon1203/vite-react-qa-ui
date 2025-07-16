import { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      alert('請輸入問題');
      return;
    }

    // 模擬回覆
    setAnswer(`你問的是：「${question}」，這是模擬回答喔！`);
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://i.ibb.co/TqBdTB79/image.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        minWidth: '100vw',
        margin: 0,
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Noto Sans TC', 
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '42%',
          left: '80%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#e0e0e0',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          width: '400px',
          maxWidth: '90vw',
        }}
      >
        <h1 style={{ color: '#000', textAlign: 'center', fontSize: '28px', marginBottom: '24px' }}>
          我是臺灣吧創辦人蕭宇辰 問我點什麼吧！
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
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              border: 'none',
              resize: 'none',
              marginBottom: '16px',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            送出問題
          </button>
        </form>
        <div
          style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '16px',
            borderRadius: '8px',
            minHeight: '80px',
            fontSize: '16px',
          }}
        >
          <strong>AI 回答：</strong>
          <p style={{ marginTop: '8px' }}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
