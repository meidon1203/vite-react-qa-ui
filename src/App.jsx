import { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      alert('請輸入問題');
      return;
    }

    setIsLoading(true);
    setError(false);
    setAnswer('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAnswer(`你問的是：「${question}」，這是模擬回答喔！`);
    } catch (err) {
      console.error('發生錯誤：', err);
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <div className="qa-card">
        <h1>我是臺灣吧創辦人蕭宇辰 問我點什麼吧！</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="請輸入你的問題..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? '正在回答中...' : '送出問題'}
          </button>
        </form>

        <div className="answer-box">
          <strong>AI 回答：</strong>
          <p>
            {isLoading
              ? '載入中，請稍後...'
              : error
              ? <span style={{ color: 'red' }}>Oops! 發生錯誤，請稍後再試。</span>
              : answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
