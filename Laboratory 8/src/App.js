import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {
  const [value, setValue] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef();

  const downloadQR = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      saveAs(pngFile, "qr-code.png");
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const downloadSVG = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    saveAs(blob, 'qr-code.svg');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="feature-badge">QR CODE GENERATOR</div>
        
        <h1 className="App-title">
          QR Suite <span className="highlight">Pro</span>
        </h1>
        
        <p className="App-subtitle">
          Create, customize, and download beautiful QR codes instantly
        </p>

        <div className="card-container">
          {/* Input Section */}
          <div className="input-section">
            <h2 className="input-section-title">Content to Encode</h2>
            
            <div className="input-wrapper">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input-field"
                placeholder="Enter URL, text, or email..."
              />
              <button
                onClick={copyToClipboard}
                className={`copy-button ${copied ? 'copied' : ''}`}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            {/* Color Controls */}
            <div className="color-controls">
              <div className="color-control-group">
                <label className="color-label">Foreground Color</label>
                <div className="color-picker-wrapper">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="color-picker"
                  />
                  <span className="color-code">{fgColor.toUpperCase()}</span>
                </div>
              </div>

              <div className="color-control-group">
                <label className="color-label">Background Color</label>
                <div className="color-picker-wrapper">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="color-picker"
                  />
                  <span className="color-code">{bgColor.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Preview Section */}
          <div className="qr-section">
            <div className="qr-preview">
              <QRCode
                id="QRCode"
                value={value}
                fgColor={fgColor}
                bgColor={bgColor}
                size={280}
                level="H"
                includeMargin={true}
                ref={qrRef}
              />
            </div>

            {/* Button Group */}
            <div className="button-group">
              <button
                onClick={downloadQR}
                className="btn-primary"
              >
                ↓ Download PNG
              </button>
              <button
                onClick={downloadSVG}
                className="btn-secondary"
              >
                ↓ Download SVG
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="info-section">
            <div className="info-item">
              <div className="info-item-title">High Quality</div>
              <div className="info-item-desc">Vector SVG & PNG formats</div>
            </div>
            <div className="info-item">
              <div className="info-item-title">Customizable</div>
              <div className="info-item-desc">Colors & content</div>
            </div>
            <div className="info-item">
              <div className="info-item-title">Instant Download</div>
              <div className="info-item-desc">No registration needed</div>
            </div>
          </div>
        </div>

        <div className="App-footer">
          ✨ Create unlimited QR codes instantly
        </div>
      </div>
    </div>
  );
};

export default App;