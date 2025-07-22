import React from 'react';

export default function Header({ onShowAbout, onShowXiao }) {
  return (
    <header
      style={{
        width: '100%',
        height: '100px',
        backgroundColor: '#E1E1E1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 60px',
        boxSizing: 'border-box',
      }}
    >
      {/* 左邊 Logo */}
     <div className="header-logo">
  <a href="https://taiwanbar.cc" style={{ textDecoration: 'none' }}>
    <img
      src="/twblogo.png"
      alt="Taiwan Bar Logo"
      style={{ height: '100px', maxHeight: '100%' }}
    />
  </a>
</div>

      {/* 右邊按鈕區塊 */}
      <nav style={{ display: 'flex', gap: '24px' }}>
        <a
          href="https://school.taiwanbar.cc"
          style={{
            width: '150px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            color: '#333',
          }}
        >
          大抓周學院
        </a>
        <button
          onClick={onShowAbout}
          style={{
            width: '150px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#333',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          關於老湯
        </button>
        <button
          onClick={onShowXiao}
          style={{
            width: '150px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#333',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          關於蕭宇辰
        </button>
      </nav>
    </header>
  );
}
