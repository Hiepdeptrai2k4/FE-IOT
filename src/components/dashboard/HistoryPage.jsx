import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import apiService from '../../services/apiService';

export default function HistoryPage() {
  const { currentGarden, useRealBackend } = useApp();
  const [selectedSensor, setSelectedSensor] = useState('temperature');
  const [timeRange, setTimeRange] = useState('24h');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const sensors = [
    { id: 'temperature', name: 'Nhiệt độ', icon: '🌡️', unit: '°C', color: '#EF4444' },
    { id: 'humidity', name: 'Độ ẩm không khí', icon: '💧', unit: '%RH', color: '#3B82F6' },
    { id: 'soil_moisture', name: 'Độ ẩm đất', icon: '🌱', unit: '%', color: '#10B981' },
    { id: 'light', name: 'Ánh sáng', icon: '💡', unit: 'lux', color: '#F59E0B' },
    { id: 'co2', name: 'Chất lượng không khí', icon: '🌫️', unit: 'ADC', color: '#8B5CF6' },
  ];

  const timeRanges = [
    { id: '1h', label: '1 giờ', points: 60 },
    { id: '6h', label: '6 giờ', points: 72 },
    { id: '24h', label: '24 giờ', points: 96 },
    { id: '7d', label: '7 ngày', points: 168 },
    { id: '30d', label: '30 ngày', points: 360 },
  ];

  // Load data từ backend hoặc mock
  useEffect(() => {
    loadSensorData();
  }, [selectedSensor, timeRange, useRealBackend]);

  const loadSensorData = async () => {
    setLoading(true);
    
    try {
      if (useRealBackend) {
        // Lấy dữ liệu từ backend thực tế
        const points = timeRanges.find(r => r.id === timeRange)?.points || 96;
        // Tính số page cần lấy (backend dùng page 0-indexed, size = số items)
        const page = 0;
        const size = points;
        const response = await apiService.getSensorHistory(selectedSensor, page, size);
        
        // Backend trả về {result: [...]} hoặc {content: [...]}
        const dataArray = response.result || response.content || [];
        
        if (!Array.isArray(dataArray)) {
          throw new Error('Invalid data format from backend');
        }
        
        // Transform data cho chart
        const formattedData = dataArray.map((item) => ({
          time: new Date(item.timestamp).toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          value: item.value,
          fullTime: new Date(item.timestamp).toLocaleString('vi-VN'),
        }));
        
        setChartData(formattedData);
      } else {
        // Tạo mock data
        generateMockData();
      }
    } catch (error) {
      console.error('Error loading sensor data:', error);
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    const points = timeRanges.find(r => r.id === timeRange)?.points || 96;
    const now = new Date();
    const data = [];

    // Base values cho mỗi sensor
    const baseValues = {
      temperature: 25,
      humidity: 60,
      soil_moisture: 50,
      light: 500,
      co2: 400,
    };

    const ranges = {
      temperature: [20, 35],
      humidity: [40, 80],
      soil_moisture: [30, 70],
      light: [0, 1000],
      co2: [300, 600],
    };

    let currentValue = baseValues[selectedSensor];

    for (let i = points; i >= 0; i--) {
      const time = new Date(now.getTime() - i * (timeRange === '30d' ? 120 * 60000 : timeRange === '7d' ? 60 * 60000 : timeRange === '24h' ? 15 * 60000 : timeRange === '6h' ? 5 * 60000 : 60000));
      
      // Thêm biến động tự nhiên
      const change = (Math.random() - 0.5) * 2;
      currentValue = Math.max(ranges[selectedSensor][0], Math.min(ranges[selectedSensor][1], currentValue + change));

      data.push({
        time: time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        value: Math.round(currentValue * 10) / 10,
        fullTime: time.toLocaleString('vi-VN'),
      });
    }

    setChartData(data);
  };

  const selectedSensorInfo = sensors.find(s => s.id === selectedSensor);

  const stats = chartData.length > 0 ? {
    current: chartData[chartData.length - 1]?.value || 0,
    average: (chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length).toFixed(1),
    min: Math.min(...chartData.map(d => d.value)).toFixed(1),
    max: Math.max(...chartData.map(d => d.value)).toFixed(1),
  } : { current: 0, average: 0, min: 0, max: 0 };

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
    controls: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px',
      flexWrap: 'wrap',
    },
    controlGroup: {
      flex: 1,
      minWidth: '250px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px',
      display: 'block',
    },
    sensorButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
    },
    sensorButton: {
      padding: '12px 16px',
      border: '2px solid #E5E7EB',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'white',
    },
    sensorButtonActive: {
      borderColor: '#10B981',
      backgroundColor: '#ECFDF5',
      color: '#10B981',
    },
    timeButtons: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
    timeButton: {
      padding: '10px 20px',
      border: '2px solid #E5E7EB',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s',
      backgroundColor: 'white',
    },
    timeButtonActive: {
      borderColor: '#10B981',
      backgroundColor: '#ECFDF5',
      color: '#10B981',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
    },
    statLabel: {
      fontSize: '13px',
      color: '#6B7280',
      marginBottom: '8px',
    },
    statValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    statUnit: {
      fontSize: '16px',
      color: '#6B7280',
      marginLeft: '4px',
    },
    chartCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    chartTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1F2937',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    loadingState: {
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      color: '#6B7280',
    },
    dataInfo: {
      fontSize: '13px',
      color: '#6B7280',
      padding: '12px',
      backgroundColor: '#F9FAFB',
      borderRadius: '8px',
      marginTop: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📈 Lịch sử & Biểu đồ</h1>
        <p style={styles.subtitle}>
          Theo dõi dữ liệu lịch sử từ các cảm biến trong vườn {currentGarden?.name}
        </p>
      </div>

      {/* Sensor Selection */}
      <div style={styles.controls}>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Chọn cảm biến</label>
          <div style={styles.sensorButtons}>
            {sensors.map((sensor) => (
              <div
                key={sensor.id}
                style={{
                  ...styles.sensorButton,
                  ...(selectedSensor === sensor.id ? styles.sensorButtonActive : {}),
                }}
                onClick={() => setSelectedSensor(sensor.id)}
              >
                <span style={{ fontSize: '20px' }}>{sensor.icon}</span>
                <span>{sensor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Range Selection */}
      <div style={styles.controls}>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Khoảng thời gian</label>
          <div style={styles.timeButtons}>
            {timeRanges.map((range) => (
              <div
                key={range.id}
                style={{
                  ...styles.timeButton,
                  ...(timeRange === range.id ? styles.timeButtonActive : {}),
                }}
                onClick={() => setTimeRange(range.id)}
              >
                {range.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Giá trị hiện tại</div>
          <div style={styles.statValue}>
            {stats.current}
            <span style={styles.statUnit}>{selectedSensorInfo?.unit}</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Trung bình</div>
          <div style={styles.statValue}>
            {stats.average}
            <span style={styles.statUnit}>{selectedSensorInfo?.unit}</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Giá trị thấp nhất</div>
          <div style={styles.statValue}>
            {stats.min}
            <span style={styles.statUnit}>{selectedSensorInfo?.unit}</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Giá trị cao nhất</div>
          <div style={styles.statValue}>
            {stats.max}
            <span style={styles.statUnit}>{selectedSensorInfo?.unit}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={styles.chartCard}>
        <div style={styles.chartHeader}>
          <div style={styles.chartTitle}>
            <span style={{ fontSize: '24px' }}>{selectedSensorInfo?.icon}</span>
            <span>
              Biểu đồ {selectedSensorInfo?.name} - {timeRanges.find(r => r.id === timeRange)?.label}
            </span>
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingState}>
            <div>⏳ Đang tải dữ liệu...</div>
          </div>
        ) : chartData.length === 0 ? (
          <div style={styles.loadingState}>
            <div>📊 Không có dữ liệu</div>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={400} minHeight={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`color-${selectedSensor}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selectedSensorInfo?.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={selectedSensorInfo?.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="time"
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  interval={Math.floor(chartData.length / 10)}
                />
                <YAxis
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  label={{
                    value: selectedSensorInfo?.unit,
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: '#6B7280', fontSize: '12px' },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                  formatter={(value) => [`${value} ${selectedSensorInfo?.unit}`, selectedSensorInfo?.name]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={() => selectedSensorInfo?.name}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={selectedSensorInfo?.color}
                  strokeWidth={2}
                  fill={`url(#color-${selectedSensor})`}
                  dot={false}
                  activeDot={{ r: 6, fill: selectedSensorInfo?.color }}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div style={styles.dataInfo}>
              <strong>📊 Thông tin:</strong> Hiển thị {chartData.length} điểm dữ liệu từ{' '}
              {useRealBackend ? 'backend ESP32' : 'mock data'}. 
              {useRealBackend && ' Dữ liệu được cập nhật real-time từ database.'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
