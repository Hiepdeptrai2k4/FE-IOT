import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function ServiceInfo() {
  const { backendConnected, useRealBackend } = useApp();
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const styles = {
    container: {
      padding: '32px',
    },
    header: {
      marginBottom: '32px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#6B7280',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      backgroundColor: '#F9FAFB',
      borderBottom: '2px solid #E5E7EB',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #F3F4F6',
      fontSize: '14px',
      color: '#6B7280',
    },
    code: {
      backgroundColor: '#F3F4F6',
      padding: '4px 8px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#059669',
    },
    codeBlock: {
      backgroundColor: '#1F2937',
      color: '#F9FAFB',
      padding: '16px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '13px',
      lineHeight: '1.6',
      overflow: 'auto',
      position: 'relative',
    },
    copyButton: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      padding: '6px 12px',
      fontSize: '12px',
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    badge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
    },
    badgeSuccess: {
      backgroundColor: '#D1FAE5',
      color: '#065F46',
    },
    badgeError: {
      backgroundColor: '#FEE2E2',
      color: '#991B1B',
    },
    badgeInfo: {
      backgroundColor: '#DBEAFE',
      color: '#1E40AF',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginTop: '16px',
    },
    statCard: {
      backgroundColor: '#F9FAFB',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
    },
    statLabel: {
      fontSize: '13px',
      color: '#6B7280',
      marginBottom: '4px',
    },
    statValue: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    link: {
      color: '#10B981',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  };

  const endpoints = [
    { method: 'GET', path: '/api/v1/temperature', desc: 'Lấy dữ liệu nhiệt độ' },
    { method: 'GET', path: '/api/v1/humidity', desc: 'Lấy dữ liệu độ ẩm không khí' },
    { method: 'GET', path: '/api/v1/soil-moisture', desc: 'Lấy dữ liệu độ ẩm đất' },
    { method: 'GET', path: '/api/v1/light', desc: 'Lấy dữ liệu ánh sáng' },
    { method: 'GET', path: '/api/v1/co2', desc: 'Lấy dữ liệu CO₂' },
    { method: 'POST', path: '/api/v1/ctrl/light/{state}', desc: 'Điều khiển đèn (on/off)' },
    { method: 'POST', path: '/api/v1/ctrl/pump/{state}', desc: 'Điều khiển bơm (on/off)' },
    { method: 'GET', path: '/api/v1/device-status', desc: 'Lấy trạng thái thiết bị' },
  ];

  const topics = [
    { topic: 'agri/sensor/temperature', desc: 'Nhiệt độ', unit: '°C' },
    { topic: 'agri/sensor/humidity', desc: 'Độ ẩm không khí', unit: '%RH' },
    { topic: 'agri/sensor/soil_moisture', desc: 'Độ ẩm đất', unit: '% (tương đối)' },
    { topic: 'agri/sensor/light', desc: 'Ánh sáng', unit: 'lux (ước lượng)' },
    { topic: 'agri/sensor/co2', desc: 'CO₂', unit: 'ADC' },
    { topic: 'agri/control/pump', desc: 'Điều khiển bơm', unit: 'ON/OFF' },
    { topic: 'agri/control/lamp', desc: 'Điều khiển đèn', unit: 'ON/OFF' },
    { topic: 'agri/status', desc: 'Trạng thái thiết bị', unit: '-' },
  ];

  const sensors = [
    { name: 'DHT11', measure: 'Nhiệt độ', unit: '°C', note: 'Giá trị thực' },
    { name: 'DHT11', measure: 'Độ ẩm không khí', unit: '%RH', note: 'Giá trị thực' },
    { name: 'Soil Sensor', measure: 'Độ ẩm đất', unit: '% (tương đối)', note: 'Cần hiệu chuẩn' },
    { name: 'BH1750 (analog)', measure: 'Ánh sáng', unit: 'lux (ước lượng)', note: 'Không I2C' },
    { name: 'MQ135', measure: 'CO₂', unit: 'ADC', note: 'Không phải ppm' },
    { name: 'Relay', measure: 'Bơm nước', unit: 'ON/OFF', note: 'Logic' },
    { name: 'LED', measure: 'Đèn', unit: 'ON/OFF', note: 'Logic' },
  ];

  const exampleCode = `// Import services
import apiService from './services/apiService';
import websocketService from './services/websocketService';

// Kết nối WebSocket
websocketService.connect();

// Lắng nghe dữ liệu nhiệt độ
websocketService.on('agri/sensor/temperature', (data) => {
  console.log('Nhiệt độ:', data.value, '°C');
});

// Lấy dữ liệu từ API
const tempData = await apiService.getSensorData('temperature', {
  page: 0,
  size: 10,
  sort: 'timestamp,desc'
});

// Điều khiển đèn
await apiService.controlLight('on');  // Bật
await apiService.controlLight('off'); // Tắt`;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🔧 Thông tin Service & API</h1>
        <p style={styles.subtitle}>
          Tài liệu kết nối backend ESP32 Farm Project
        </p>
      </div>

      {/* Connection Status */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          📊 Trạng thái kết nối
        </h2>
        
        {/* Warning message when backend is not connected */}
        {useRealBackend && !backendConnected && (
          <div style={{
            backgroundColor: '#FEF3C7',
            border: '1px solid #F59E0B',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>⚠️</span>
              <div>
                <div style={{ fontWeight: 'bold', color: '#92400E', marginBottom: '8px' }}>
                  Không thể kết nối tới backend
                </div>
                <div style={{ fontSize: '14px', color: '#78350F', lineHeight: '1.6' }}>
                  Ứng dụng đang cố kết nối tới <code style={{...styles.code, backgroundColor: '#FDE68A'}}>http://localhost:8080</code> nhưng không nhận được phản hồi.
                  <br />
                  <br />
                  <strong>Để sử dụng backend thực tế:</strong>
                  <ol style={{ marginTop: '8px', paddingLeft: '20px', marginBottom: '8px' }}>
                    <li>Đảm bảo ESP32 Farm Backend đang chạy tại <code style={{...styles.code, backgroundColor: '#FDE68A'}}>http://localhost:8080</code></li>
                    <li>Xem file <code style={{...styles.code, backgroundColor: '#FDE68A'}}>ESP32_BACKEND_GUIDE.md</code> để biết hướng dẫn chi tiết</li>
                    <li>Kiểm tra log console để xem thông tin lỗi cụ thể</li>
                  </ol>
                  <strong>Tạm thời:</strong> Ứng dụng vẫn hoạt động bình thường với mock data. Tắt toggle "Backend" để ẩn thông báo này.
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div style={styles.grid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Chế độ hoạt động</div>
            <div style={styles.statValue}>
              {useRealBackend ? 'Backend thực tế' : 'Mock Data'}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>WebSocket</div>
            <div style={styles.statValue}>
              {backendConnected ? '✅ Connected' : '❌ Disconnected'}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>REST API</div>
            <div style={styles.statValue}>
              {useRealBackend ? 'http://localhost:8080' : 'Disabled'}
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Auto Reconnect</div>
            <div style={styles.statValue}>
              {useRealBackend ? '⏱ 5s' : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* WebSocket Topics */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          🔌 WebSocket Topics
          <span
            style={{
              ...styles.badge,
              ...styles.badgeInfo,
              marginLeft: 'auto',
            }}
          >
            ws://localhost:8080/ws/iot
          </span>
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Topic</th>
              <th style={styles.th}>Mô tả</th>
              <th style={styles.th}>Đơn vị</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>
                  <code style={styles.code}>{item.topic}</code>
                </td>
                <td style={styles.td}>{item.desc}</td>
                <td style={styles.td}>{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REST API Endpoints */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          🌐 REST API Endpoints
          <span
            style={{
              ...styles.badge,
              ...styles.badgeSuccess,
              marginLeft: 'auto',
            }}
          >
            http://localhost:8080/api/v1
          </span>
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Method</th>
              <th style={styles.th}>Endpoint</th>
              <th style={styles.th}>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      ...(item.method === 'GET' ? styles.badgeInfo : styles.badgeSuccess),
                    }}
                  >
                    {item.method}
                  </span>
                </td>
                <td style={styles.td}>
                  <code style={styles.code}>{item.path}</code>
                </td>
                <td style={styles.td}>{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sensor Specifications */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          📡 Thông số Sensors
        </h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Cảm biến</th>
              <th style={styles.th}>Đại lượng</th>
              <th style={styles.th}>Đơn vị</th>
              <th style={styles.th}>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>
                  <strong>{item.name}</strong>
                </td>
                <td style={styles.td}>{item.measure}</td>
                <td style={styles.td}>
                  <code style={styles.code}>{item.unit}</code>
                </td>
                <td style={styles.td}>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Example Code */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          💻 Ví dụ sử dụng
        </h2>
        <div style={styles.codeBlock}>
          <button
            style={styles.copyButton}
            onClick={() => copyToClipboard(exampleCode, 'code')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
          >
            {copied === 'code' ? '✓ Copied!' : '📋 Copy'}
          </button>
          <pre style={{ margin: 0 }}>{exampleCode}</pre>
        </div>
      </div>

      {/* Documentation Link */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          📚 Tài liệu
        </h2>
        <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6' }}>
          Để biết thêm chi tiết về cách kết nối và sử dụng backend, vui lòng xem file{' '}
          <code style={styles.code}>ESP32_BACKEND_GUIDE.md</code> trong thư mục gốc của dự án.
        </p>
        <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6', marginTop: '12px' }}>
          <strong>GitHub Repository:</strong>{' '}
          <a
            href="https://github.com/yourusername/esp32-farm"
            style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            esp32-farm project
          </a>
        </p>
      </div>
    </div>
  );
}