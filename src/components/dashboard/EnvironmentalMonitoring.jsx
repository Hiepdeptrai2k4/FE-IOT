import { useApp } from '../../context/AppContext';

export default function EnvironmentalMonitoring() {
  const { currentGarden } = useApp();

  if (!currentGarden) return null;

  const soilMoisture = currentGarden.environmentalData.soilMoisture[currentGarden.environmentalData.soilMoisture.length - 1];
  const airQuality = currentGarden.environmentalData.airQuality;

  // Calculate AQI gauge position
  const getAQIColor = (aqi) => {
    if (aqi > 80) return '#10B981';
    if (aqi > 50) return '#F59E0B';
    return '#EF4444';
  };

  const getAQILabel = (aqi) => {
    if (aqi > 80) return 'Tốt';
    if (aqi > 50) return 'Trung bình';
    return 'Kém';
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    chartContainer: {
      position: 'relative',
      height: '250px',
      marginBottom: '16px',
    },
    chartLine: {
      position: 'relative',
      height: '200px',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '8px',
      padding: '20px 0',
      borderBottom: '2px solid #E5E7EB',
    },
    bar: {
      flex: 1,
      backgroundColor: '#10B981',
      borderRadius: '4px 4px 0 0',
      transition: 'all 0.3s',
      position: 'relative',
    },
    barLabel: {
      position: 'absolute',
      top: '-24px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '12px',
      fontWeight: '500',
      color: '#1F2937',
    },
    xAxis: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '8px',
      fontSize: '12px',
      color: '#9CA3AF',
    },
    gaugeContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
    },
    gauge: {
      width: '200px',
      height: '100px',
      position: 'relative',
      marginBottom: '20px',
    },
    gaugeBg: {
      width: '200px',
      height: '100px',
      borderRadius: '100px 100px 0 0',
      border: '16px solid #E5E7EB',
      borderBottom: 'none',
      position: 'relative',
    },
    gaugeFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '200px',
      height: '100px',
      borderRadius: '100px 100px 0 0',
      borderBottom: 'none',
      overflow: 'hidden',
    },
    gaugeValue: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    gaugeLabel: {
      fontSize: '16px',
      fontWeight: '500',
      marginTop: '16px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: '20px',
    },
    statCard: {
      backgroundColor: '#F9FAFB',
      padding: '16px',
      borderRadius: '12px',
    },
    statLabel: {
      fontSize: '13px',
      color: '#6B7280',
      marginBottom: '4px',
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    statUnit: {
      fontSize: '14px',
      color: '#9CA3AF',
      marginLeft: '4px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Giám sát môi trường</h1>
        <p style={styles.subtitle}>Theo dõi các thông số môi trường theo thời gian thực</p>
      </div>

      <div style={styles.grid}>
        {/* Soil Moisture Chart */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span>💧</span>
            Độ ẩm đất (6 phút gần nhất)
          </h2>
          <div style={styles.chartContainer}>
            <div style={styles.chartLine}>
              {currentGarden.environmentalData.soilMoisture.map((value, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.bar,
                    height: `${(value / 100) * 180}px`,
                    backgroundColor: value > 60 ? '#10B981' : value > 40 ? '#F59E0B' : '#EF4444',
                  }}
                >
                  <span style={styles.barLabel}>{value.toFixed(0)}%</span>
                </div>
              ))}
            </div>
            <div style={styles.xAxis}>
              <span>-5m</span>
              <span>-4m</span>
              <span>-3m</span>
              <span>-2m</span>
              <span>-1m</span>
              <span>Hiện tại</span>
            </div>
          </div>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Giá trị hiện tại</div>
              <div>
                <span style={styles.statValue}>{soilMoisture.toFixed(1)}</span>
                <span style={styles.statUnit}>%</span>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Trung bình</div>
              <div>
                <span style={styles.statValue}>
                  {(currentGarden.environmentalData.soilMoisture.reduce((a, b) => a + b, 0) / 6).toFixed(1)}
                </span>
                <span style={styles.statUnit}>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality Gauge */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span>🌿</span>
            Chất lượng không khí (AQI)
          </h2>
          <div style={styles.gaugeContainer}>
            <div style={styles.gauge}>
              <div style={styles.gaugeBg}></div>
              <div
                style={{
                  ...styles.gaugeFill,
                  width: `${airQuality}%`,
                }}
              >
                <div
                  style={{
                    width: '200px',
                    height: '100px',
                    borderRadius: '100px 100px 0 0',
                    border: `16px solid ${getAQIColor(airQuality)}`,
                    borderBottom: 'none',
                  }}
                ></div>
              </div>
              <div style={styles.gaugeValue}>{airQuality}</div>
            </div>
            <div style={{ ...styles.gaugeLabel, color: getAQIColor(airQuality) }}>
              {getAQILabel(airQuality)}
            </div>
          </div>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Nhiệt độ</div>
              <div>
                <span style={styles.statValue}>{currentGarden.environmentalData.temperature}</span>
                <span style={styles.statUnit}>°C</span>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Độ ẩm không khí</div>
              <div>
                <span style={styles.statValue}>{currentGarden.environmentalData.humidity}</span>
                <span style={styles.statUnit}>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Light Level */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span>☀️</span>
            Cường độ ánh sáng
          </h2>
          <div style={styles.gaugeContainer}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
              {currentGarden.environmentalData.lightLevel > 500 ? '☀️' : '🌙'}
            </div>
            <div>
              <span style={{ ...styles.statValue, fontSize: '48px' }}>
                {currentGarden.environmentalData.lightLevel}
              </span>
              <span style={{ ...styles.statUnit, fontSize: '20px' }}>lux</span>
            </div>
            <div style={{ ...styles.gaugeLabel, color: currentGarden.environmentalData.lightLevel > 500 ? '#F59E0B' : '#6B7280' }}>
              {currentGarden.environmentalData.lightLevel > 500 ? 'Đủ sáng' : 'Thiếu sáng'}
            </div>
          </div>
          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
            <div style={styles.statLabel}>Ngưỡng tự động bật đèn</div>
            <div>
              <span style={styles.statValue}>{currentGarden.settings.lightingThreshold}</span>
              <span style={styles.statUnit}>lux</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
