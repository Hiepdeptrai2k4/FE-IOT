// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import Component App của bạn (Thành phần gốc)
// import './index.css'; // Đường dẫn đến file CSS gốc (Nếu có)

// Lấy element DOM nơi ứng dụng React sẽ được render (thường là <div id="root"> trong index.html)
const rootElement = document.getElementById('root');

if (rootElement) {
  // Tạo root React và render component App
  ReactDOM.createRoot(rootElement).render(
    // StrictMode giúp phát hiện các vấn đề tiềm ẩn trong code trong quá trình phát triển
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element with ID 'root'.");
}