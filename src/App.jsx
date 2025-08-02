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

      const res = await fetch('https://my-fast-api-155896525530.asia-east1.run.app/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      // 檢查 API 是否回傳錯誤
      if (data.error) {
        throw new Error(data.error);
      }

      setAnswer(data.answer || '後端沒有回傳 answer');
    } catch (err) {
      console.error('發生錯誤：', err.message);
      setError(true);
      setAnswer('發生錯誤，請稍後再試');
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
            <h3>一、隱私權保護政策的適用範圍</h3>
            <p>隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。</p>
            <h3>二、個人資料的蒐集、處理及利用方式</h3>
            <ul>
              <li>當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。</li>
              <li>本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。</li>
              <li>於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的 IP 位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公開。</li>
              <li>為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。</li>
              <li>您可以隨時向我們提出請求，以更正或刪除本網站所蒐集您錯誤或不完整的個人資料。</li>
            </ul>
            <h3>三、資料之保護</h3>
            <ul>
              <li>本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。</li>
              <li>如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。</li>
            </ul>
            <h3>四、網站對外的相關連結</h3>
            <p>本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。</p>
            <h3>五、與第三人共用個人資料之政策</h3>
            <p>本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。</p>
            <p>前項但書之情形包括不限於：</p>
            <ul>
              <li>經由您書面同意。</li>
              <li>法律明文規定。</li>
              <li>為免除您生命、身體、自由或財產上之危險。</li>
              <li>與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。</li>
              <li>當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。</li>
              <li>有利於您的權益。</li>
              <li>本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。</li>
            </ul>
            <h3>六、Cookie 之使用</h3>
            <p>為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的 Cookie，若您不願接受 Cookie 的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但可能會導致網站某些功能無法正常執行 。</p>
            <h3>七、隱私權保護政策之修正</h3>
            <p>本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。</p>
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