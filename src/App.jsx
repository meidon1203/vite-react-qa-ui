import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import QuestionInput from './components/QuestionInput';
import AnswerBox from './components/AnswerBox';
import Footer from './components/Footer';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showXiaoModal, setShowXiaoModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
       console.log('送出的 payload:', JSON.stringify({ question }));

      const res = await fetch('https://ai-lao-tang-test.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const errorText = await res.text(); // 讀取錯誤訊息
        throw new Error(`HTTP error! status: ${res.status}`);
      }

        const data = await res.json();
    setAnswer(data.answer || '後端沒有回傳 answer');
  } catch (err) {
    console.error('發生錯誤：', err.message);
    setError(true);
    setAnswer(`錯誤：${err.message}`); // 顯示在畫面上
  }

    setIsLoading(false);
  };

  return (
    <div className="app-wrapper">
      <Header
        onShowAbout={() => setShowModal(true)}
        onShowXiao={() => setShowXiaoModal(true)}
      />

      <main className="app-container">
        <QuestionInput
          question={question}
          setQuestion={setQuestion}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />

        <AnswerBox isLoading={isLoading} error={error} answer={answer} />
      </main>

      <Footer onClickPrivacy={() => setShowPrivacyModal(true)} />

      {showModal && (
        <div onClick={() => setShowModal(false)} style={modalOverlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={modalContentStyle}>
            <h2 style={modalTitleStyle}>關於 AI 老湯</h2>
            <p>
              AI老湯，是臺灣吧行銷團隊為了保存並活化創辦人蕭宇辰過去的思想內容、語言風格與觀點而打造的AI互動系統。
              團隊蒐集超過60集Podcast逐字稿與數萬字訪談內容，透過LlamaIndex結合FastAPI與OpenAPI技術，建立專屬語意向量資料庫，
              並以AI模型進行知識重建與語言模擬。
            </p>
            <br />
            <p>
              AI老湯能夠理解使用者問題，並以貼近蕭宇辰語氣的方式回應，成為內部夥伴進行策略發想、品牌提案與文化對齊時的虛擬參考智囊。
              這不只是技術實驗，更是一次將思想數位化、人格延續的創新實踐。
            </p>
            <div style={{ textAlign: 'right', marginTop: '24px' }}>
              <button onClick={() => setShowModal(false)} style={modalButtonStyle}>關閉</button>
            </div>
          </div>
        </div>
      )}

      {showXiaoModal && (
        <div onClick={() => setShowXiaoModal(false)} style={modalOverlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={modalContentStyle}>
            <h2 style={modalTitleStyle}>關於蕭宇辰</h2>
            <p>
              蕭宇辰（Yu Chen, Hsiao），國立臺灣大學歷史系畢業，曾任景美女中與台北市復興高中歷史教師，現為臺灣吧共同創辦人暨執行長。
              出身勞工家庭，親身經歷教育帶來的階級流動，讓他對教育懷抱深厚信念。2014年，他與夥伴創立臺灣吧，從《動畫臺灣史》起家，
              將歷史、哲學、法律等知識以動畫形式普及，打開臺灣知識轉譯的新篇章。
            </p>
            <br />
            <p>
              蕭宇辰自許為教育工作者，不僅致力於數位內容創作，更推動教材設計、教師增能與素養教育的創新實踐。
              他強調教育不應只是灌輸知識，而是啟發思考與行動的力量。
              在AI與網路時代，他持續引領臺灣吧向亞洲拓展視野，將臺灣經驗轉化為亞洲教育內容的創新典範。
              從講臺前的老師，到數位轉譯的實踐者，蕭宇辰持續用創意與執著，擴大教育的可能性。
            </p>
            <div style={{ textAlign: 'right', marginTop: '24px' }}>
              <button onClick={() => setShowXiaoModal(false)} style={modalButtonStyle}>關閉</button>
            </div>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div onClick={() => setShowPrivacyModal(false)} style={modalOverlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={modalContentStyle}>
            <h2 style={modalTitleStyle}>隱私權政策</h2>
            <p>非常歡迎您光臨「臺灣吧ai老湯網站」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</p>
            {/* 省略隱私權條款內容以節省篇幅 */}
            <div style={{ textAlign: 'right', marginTop: '24px' }}>
              <button onClick={() => setShowPrivacyModal(false)} style={modalButtonStyle}>關閉</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '16px',
  maxWidth: '680px',
  width: '90%',
  maxHeight: '80vh',
  overflowY: 'auto',
  color: '#222',
  lineHeight: '1.7',
  fontSize: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
};

const modalTitleStyle = {
  fontSize: '22px',
  marginBottom: '16px',
};

const modalButtonStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
};

export default App;
