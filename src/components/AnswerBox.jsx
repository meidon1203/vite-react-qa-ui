import React from 'react';

// 簡單的 Markdown 解析器
const parseMarkdown = (text) => {
  if (!text) return '';
  // 處理連結 [text](url)
  let parsed = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #0044CC; text-decoration: underline;">${linkText}</a>`;
  });
  // 處理粗體 **text** 或 __text__
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/__(.*?)__/g, '<strong>$1</strong>');
  // 處理斜體 *text* 或 _text_
  parsed = parsed.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  parsed = parsed.replace(/_([^_]+)_/g, '<em>$1</em>');
  // 處理行內程式碼 `code`
  parsed = parsed.replace(/`([^`]+)`/g, '<code style="background-color: #F1F1F1; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>');
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

// 連結顯示元件
const LinkSection = ({ spotifyLink, appleLink, allSpotifyLinks, allAppleLinks }) => {
  if (!spotifyLink && !appleLink && (!allSpotifyLinks || allSpotifyLinks.length === 0) && (!allAppleLinks || allAppleLinks.length === 0)) {
    return null;
  }
  return (
    <div
      style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#F5F5F5',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
      }}
    >
      <strong style={{ fontSize: '14px', color: '#333' }}>🎧 相關 Podcast 連結：</strong>
      {/* 主要連結 */}
      <div style={{ marginTop: '8px' }}>
        {spotifyLink && (
          <div style={{ marginBottom: '8px' }}>
            <a
              href={spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 12px',
                backgroundColor: '#1DB954',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                marginRight: '8px'
              }}
            >
              🎵 Spotify 收聽
            </a>
          </div>
        )}
        {appleLink && (
          <div style={{ marginBottom: '8px' }}>
            <a
              href={appleLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 12px',
                backgroundColor: '#FF6B6B',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              🍎 Apple Podcast 收聽
            </a>
          </div>
        )}
      </div>
      {/* 所有相關連結 */}
      {(allSpotifyLinks && allSpotifyLinks.length > 1) && (
        <div style={{ marginTop: '12px' }}>
          <strong style={{ fontSize: '12px', color: '#666' }}>其他相關 Spotify 連結：</strong>
          <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {allSpotifyLinks.slice(1).map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px',
                  color: '#1DB954',
                  textDecoration: 'underline',
                  padding: '2px 4px'
                }}
              >
                Spotify {index + 2}
              </a>
            ))}
          </div>
        </div>
      )}
      {(allAppleLinks && allAppleLinks.length > 1) && (
        <div style={{ marginTop: '8px' }}>
          <strong style={{ fontSize: '12px', color: '#666' }}>其他相關 Apple Podcast 連結：</strong>
          <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {allAppleLinks.slice(1).map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px',
                  color: '#FF6B6B',
                  textDecoration: 'underline',
                  padding: '2px 4px'
                }}
              >
                Apple {index + 2}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function AnswerBox({ isLoading, error, answer, responseData }) {
  const isMobile = window.innerWidth <= 500;
  // 從 responseData 中提取連結資訊
  const spotifyLink = responseData?.spotify_link;
  const appleLink = responseData?.apple_link;
  const allSpotifyLinks = responseData?.all_spotify_links;
  const allAppleLinks = responseData?.all_apple_links;

  return (
    <section
      style={{
        width: '87%',
        maxWidth: isMobile ? '100%' : '552px',
        margin: '24px auto',
        padding: isMobile ? '16px' : '24px',
        backgroundColor: '#C8C8C8',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        textAlign: 'left',
        color: '#000',
        minHeight: '120px',
        boxSizing: 'border-box'
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
          minHeight: '60px'
        }}
      >
        {isLoading ? (
          '載入中，請稍後...'
        ) : error ? (
          answer || 'Oops! 發生錯誤，請稍後再試。'
        ) : answer ? (
          <>
            <MarkdownRenderer>{answer}</MarkdownRenderer>
            <LinkSection
              spotifyLink={spotifyLink}
              appleLink={appleLink}
              allSpotifyLinks={allSpotifyLinks}
              allAppleLinks={allAppleLinks}
            />
          </>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}
