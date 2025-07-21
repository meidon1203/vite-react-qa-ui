import React from 'react';

const Footer = ({ onClickPrivacy }) => {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: '#f9f9f9',
        borderTop: '1px solid #ddd',
        marginTop: '40px'
      }}
    >
      <div style={{ fontSize: '14px', color: '#555', transform: 'translateX(-20px)' }}>
  © Taiwanbar Studio
  <br className="mobile-only-br" />
  臺灣各種吧股份有限公司
</div>

      <button
        onClick={onClickPrivacy}
        style={{
          width: '150px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e0e0e0',
          borderRadius: '8px',
          textDecoration: 'none',
          color: '#333',
          fontWeight: '500',
          fontSize: '16px',
          transition: 'background-color 0.2s ease',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d5d5d5'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
      >
        隱私權政策
      </button>
    </footer>
  );
};

export default Footer;
