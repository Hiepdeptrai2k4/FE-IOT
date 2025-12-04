import { useApp } from '../../context/AppContext';

export default function DashboardOverview() {
  const { currentGarden } = useApp();

  if (!currentGarden) return null;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const onlineDevices = currentGarden.devices.filter(d => d.status === 'online').length;
  const totalDevices = currentGarden.devices.length;
  const soilMoisture = currentGarden.environmentalData.soilMoisture[currentGarden.environmentalData.soilMoisture.length - 1];
  const airQuality = currentGarden.environmentalData.airQuality;

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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px',
    },
    cardTitle: {
      fontSize: '14px',
      color: '#6B7280',
      marginBottom: '8px',
    },
    cardIcon: {
      fontSize: '32px',
    },
    cardValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    cardUnit: {
      fontSize: '18px',
      color: '#9CA3AF',
      marginLeft: '4px',
    },
    cardFooter: {
      marginTop: '12px',
      fontSize: '13px',
      color: '#10B981',
    },
    alertCard: {
      backgroundColor: '#FEF2F2',
      border: '2px solid #FCA5A5',
    },
    alertHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
    },
    alertTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#DC2626',
    },
    alertMessage: {
      fontSize: '14px',
      color: '#991B1B',
      lineHeight: '1.6',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '20px',
    },
    deviceList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    deviceItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#F9FAFB',
      borderRadius: '8px',
    },
    deviceInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    deviceName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
    },
    deviceStatus: {
      fontSize: '12px',
      padding: '4px 12px',
      borderRadius: '12px',
      fontWeight: '500',
    },
    statusOnline: {
      backgroundColor: '#D1FAE5',
      color: '#065F46',
    },
    statusOffline: {
      backgroundColor: '#FEE2E2',
      color: '#991B1B',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{currentGarden.name}</h1>
        <p style={styles.subtitle}>{currentGarden.description}</p>
      </div>

      {/* Alert Card */}
      {currentGarden.alerts.wateringAlert && (
        <div style={{ ...styles.card, ...styles.alertCard, marginBottom: '24px' }}>
          <div style={styles.alertHeader}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <span style={styles.alertTitle}>Cảnh báo tưới nước!</span>
          </div>
          <p style={styles.alertMessage}>
            Đã đến giờ tưới nước theo lịch. Hệ thống sẽ tự động bật van tưới trong vài giây nữa.
            {currentGarden.alerts.buzzerActive && ' Còi cảnh báo đang kêu.'}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardTitle}>Độ ẩm đất</div>
              <div>
                <span style={styles.cardValue}>{soilMoisture.toFixed(1)}</span>
                <span style={styles.cardUnit}>%</span>
              </div>
            </div>
            <span style={styles.cardIcon}>💧</span>
          </div>
          <div style={styles.cardFooter}>
            {soilMoisture > 60 ? '✓ Tốt' : soilMoisture > 40 ? '⚠ Trung bình' : '❌ Cần tưới'}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardTitle}>Chất lượng không khí</div>
              <div>
                <span style={styles.cardValue}>{airQuality}</span>
                <span style={styles.cardUnit}>AQI</span>
              </div>
            </div>
            <span style={styles.cardIcon}>🌿</span>
          </div>
          <div style={styles.cardFooter}>
            {airQuality > 80 ? '✓ Tốt' : airQuality > 50 ? '⚠ Trung bình' : '❌ Kém'}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardTitle}>Nhiệt độ</div>
              <div>
                <span style={styles.cardValue}>{currentGarden.environmentalData.temperature}</span>
                <span style={styles.cardUnit}>°C</span>
              </div>
            </div>
            <span style={styles.cardIcon}>🌡️</span>
          </div>
          <div style={styles.cardFooter}>✓ Bình thường</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardTitle}>Thiết bị hoạt động</div>
              <div>
                <span style={styles.cardValue}>{onlineDevices}</span>
                <span style={styles.cardUnit}>/ {totalDevices}</span>
              </div>
            </div>
            <span style={styles.cardIcon}>📱</span>
          </div>
          <div style={styles.cardFooter}>✓ Tất cả đang online</div>
        </div>
      </div>

      {/* Next Watering */}
      <div style={{ ...styles.card, marginBottom: '24px' }}>
        <div style={styles.cardTitle}>Lần tưới tiếp theo</div>
        <div style={{ ...styles.cardValue, color: '#10B981' }}>
          {formatTime(currentGarden.settings.nextWatering)}
        </div>
        <div style={styles.cardFooter}>
          Lịch: {currentGarden.settings.wateringSchedule}
        </div>
      </div>

      {/* Recent Devices */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Thiết bị gần đây</h2>
        <div style={styles.deviceList}>
          {currentGarden.devices.slice(0, 5).map((device) => (
            <div key={device.id} style={styles.deviceItem}>
              <div style={styles.deviceInfo}>
                <span>{device.type === 'sensor' ? '📊' : '🎛️'}</span>
                <span style={styles.deviceName}>{device.name}</span>
              </div>
              <span
                style={{
                  ...styles.deviceStatus,
                  ...(device.status === 'online' ? styles.statusOnline : styles.statusOffline),
                }}
              >
                {device.status === 'online' ? '● Online' : '○ Offline'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
