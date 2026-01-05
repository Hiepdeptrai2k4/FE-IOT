import { useApp } from '../context/AppContext';

export default function BackendToggle() {
  const { backendConnected, useRealBackend, toggleBackend } = useApp();

  const styles = {
    container: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '16px 20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(16, 185, 129, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: '280px',
    },
    statusDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      animation: 'pulse 2s infinite',
    },
    statusDotConnected: {
      backgroundColor: '#10B981',
      boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
    },
    statusDotDisconnected: {
      backgroundColor: '#EF4444',
    },
    info: {
      flex: 1,
    },
    title: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '2px',
    },
    status: {
      fontSize: '12px',
      color: '#6B7280',
    },
    switchContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    switch: {
      position: 'relative',
      width: '48px',
      height: '26px',
      backgroundColor: useRealBackend ? '#10B981' : '#D1D5DB',
      borderRadius: '13px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    switchKnob: {
      position: 'absolute',
      top: '3px',
      left: useRealBackend ? '25px' : '3px',
      width: '20px',
      height: '20px',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: 'left 0.3s',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    label: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#6B7280',
    },
  };

  const statusText = useRealBackend
    ? backendConnected
      ? '🟢 Đã kết nối backend'
      : '🔴 Mất kết nối backend'
    : '⚪ Chế độ demo (mock data)';

  const statusDetail = useRealBackend
    ? backendConnected
      ? 'WebSocket & REST API hoạt động'
      : 'Backend không phản hồi - Sử dụng mock data tạm thời'
    : 'Sử dụng dữ liệu giả lập';

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
            }
            70% {
              box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
            }
          }
        `}
      </style>
      <div style={styles.card}>
        <div
          style={{
            ...styles.statusDot,
            ...(backendConnected && useRealBackend
              ? styles.statusDotConnected
              : styles.statusDotDisconnected),
          }}
        />
        <div style={styles.info}>
          <div style={styles.title}>{statusText}</div>
          <div style={styles.status}>{statusDetail}</div>
        </div>
        <div style={styles.switchContainer}>
          <span style={styles.label}>Backend</span>
          <div style={styles.switch} onClick={toggleBackend}>
            <div style={styles.switchKnob} />
          </div>
        </div>
      </div>
    </div>
  );
}