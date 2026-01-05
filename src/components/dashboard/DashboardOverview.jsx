import { useApp } from '../../context/AppContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

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
  
  // FIX LỖI: Ép kiểu Number để không bị crash khi dùng toFixed
  const rawSoilMoisture = currentGarden.environmentalData.soilMoisture[currentGarden.environmentalData.soilMoisture.length - 1];
  const soilMoisture = Number(rawSoilMoisture || 0);
  
  const airQuality = Number(currentGarden.environmentalData.airQuality || 0);
  const temperature = Number(currentGarden.environmentalData.temperature || 0);

  // Chuẩn bị dữ liệu cho biểu đồ (Lấy từ mảng soilMoisture trong Context)
  const chartData = currentGarden.environmentalData.soilMoisture.map((val, index) => ({
    time: index,
    value: Number(val)
  }));

  const styles = {
    container: { padding: '32px' },
    header: { marginBottom: '32px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' },
    subtitle: { fontSize: '16px', color: '#6B7280' },
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
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
    cardTitle: { fontSize: '14px', color: '#6B7280', marginBottom: '8px' },
    cardIcon: { fontSize: '32px' },
    cardValue: { fontSize: '32px', fontWeight: 'bold', color: '#1F2937' },
    cardUnit: { fontSize: '18px', color: '#9CA3AF', marginLeft: '4px' },
    cardFooter: { marginTop: '12px', fontSize: '13px', color: '#10B981' },
    chartSection: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
      marginBottom: '32px',
      height: '350px' // Đảm bảo biểu đồ có chiều cao
    },
    sectionTitle: { fontSize: '18px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px' },
    deviceList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    deviceItem: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 16px', backgroundColor: '#F9FAFB', borderRadius: '8px',
    },
    deviceInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
    deviceName: { fontSize: '14px', fontWeight: '500', color: '#374151' },
    deviceStatus: { fontSize: '12px', padding: '4px 12px', borderRadius: '12px', fontWeight: '500' },
    statusOnline: { backgroundColor: '#D1FAE5', color: '#065F46' },
    statusOffline: { backgroundColor: '#FEE2E2', color: '#991B1B' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{currentGarden.name}</h1>
        <p style={styles.subtitle}>{currentGarden.description}</p>
      </div>

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
              <div style={styles.cardTitle}>Nhiệt độ</div>
              <div>
                <span style={styles.cardValue}>{temperature.toFixed(1)}</span>
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
              <div style={styles.cardTitle}>Chất lượng khí (CO2)</div>
              <div>
                <span style={styles.cardValue}>{airQuality}</span>
                <span style={styles.cardUnit}>ppm</span>
              </div>
            </div>
            <span style={styles.cardIcon}>🌿</span>
          </div>
          <div style={styles.cardFooter}>
            {airQuality < 600 ? '✓ Tốt' : '⚠ Cần thông gió'}
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ ĐỘ ẨM ĐẤT THỜI GIAN THỰC */}
      <div style={styles.chartSection}>
        <h2 style={styles.sectionTitle}>Biểu đồ Độ ẩm đất (%)</h2>
        <div style={{ width: '100%', height: '250px' }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorMoisture)" 
                isAnimationActive={false} // Tắt animation để biểu đồ mượt khi update liên tục
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.grid}>
          {/* Next Watering */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>Lần tưới tiếp theo</div>
            <div style={{ ...styles.cardValue, color: '#10B981' }}>
              {formatTime(currentGarden.settings.nextWatering)}
            </div>
            <div style={styles.cardFooter}>
              Lịch: {currentGarden.settings.wateringSchedule}
            </div>
          </div>

          {/* Device Status Summary */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
                <div style={styles.cardTitle}>Thiết bị Online</div>
                <span style={styles.cardIcon}>📱</span>
            </div>
            <div style={styles.cardValue}>{onlineDevices} / {totalDevices}</div>
            <div style={styles.cardFooter}>Sẵn sàng điều khiển</div>
          </div>
      </div>
    </div>
  );
}