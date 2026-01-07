import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function SmartControls() {
  const { currentGarden, updateGardenSettings, controlDevice } = useApp();
  const [manualWatering, setManualWatering] = useState(false);

  if (!currentGarden) return null;

  // Lấy trạng thái thiết bị từ devices
  const lightDevice = currentGarden.devices.find(d => d.category === 'light' && d.type === 'actuator');
  const waterDevice = currentGarden.devices.find(d => d.category === 'water' && d.type === 'actuator');
  const isLightOn = lightDevice?.state === 'ON';
  const isPumpOn = waterDevice?.state === 'ON';
  
  // Sync manualLighting với device state
  const manualLighting = isLightOn;

  // Format wateringSchedule để hiển thị
  const formatWateringSchedule = (schedule) => {
    if (typeof schedule === 'number') {
      if (schedule < 60) {
        return `Mỗi ${schedule} phút`;
      } else if (schedule === 60) {
        return 'Mỗi 1 giờ';
      } else {
        const hours = Math.floor(schedule / 60);
        const minutes = schedule % 60;
        if (minutes === 0) {
          return `Mỗi ${hours} giờ`;
        } else {
          return `Mỗi ${hours} giờ ${minutes} phút`;
        }
      }
    }
    return schedule; // Giữ nguyên nếu là string cũ
  };

  const handleToggle = (setting, value) => {
    updateGardenSettings(currentGarden.id, { [setting]: value });
  };

  const handleManualWater = () => {
    setManualWatering(true);
    controlDevice(currentGarden.id, 'water', true);
    setTimeout(() => {
      setManualWatering(false);
      controlDevice(currentGarden.id, 'water', false);
    }, 3000);
  };

  const handleManualLight = () => {
    const newState = !isLightOn;
    // controlDevice sẽ tự động cập nhật UI (Optimistic UI)
    // Không cần backend, hoạt động hoàn toàn ở frontend
    controlDevice(currentGarden.id, 'light', newState);
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px',
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
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
    },
    cardIcon: {
      fontSize: '32px',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    controlGroup: {
      marginBottom: '20px',
    },
    controlLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
    },
    toggle: {
      position: 'relative',
      width: '52px',
      height: '28px',
      backgroundColor: '#D1D5DB',
      borderRadius: '14px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    toggleActive: {
      backgroundColor: '#10B981',
    },
    toggleKnob: {
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: '24px',
      height: '24px',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: 'transform 0.3s',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    toggleKnobActive: {
      transform: 'translateX(24px)',
    },
    slider: {
      width: '100%',
      height: '6px',
      borderRadius: '3px',
      background: '#E5E7EB',
      outline: 'none',
      marginTop: '8px',
    },
    button: {
      width: '100%',
      padding: '14px',
      fontSize: '15px',
      fontWeight: '600',
      color: 'white',
      backgroundColor: '#10B981',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    buttonActive: {
      backgroundColor: '#059669',
    },
    buttonDisabled: {
      backgroundColor: '#D1D5DB',
      cursor: 'not-allowed',
    },
    info: {
      backgroundColor: '#F0FDF4',
      border: '1px solid #BBF7D0',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '13px',
      color: '#166534',
      marginTop: '12px',
      lineHeight: '1.5',
    },
    warning: {
      backgroundColor: '#FEF3C7',
      border: '1px solid #FDE68A',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '13px',
      color: '#92400E',
      marginTop: '12px',
      lineHeight: '1.5',
    },
    divider: {
      height: '1px',
      backgroundColor: '#E5E7EB',
      margin: '20px 0',
    },
    status: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: '500',
      marginLeft: '8px',
    },
    statusActive: {
      backgroundColor: '#D1FAE5',
      color: '#065F46',
    },
    statusInactive: {
      backgroundColor: '#F3F4F6',
      color: '#6B7280',
    },
  };

  const Toggle = ({ checked, onChange }) => (
    <div
      style={{
        ...styles.toggle,
        ...(checked ? styles.toggleActive : {}),
      }}
      onClick={() => onChange(!checked)}
    >
      <div
        style={{
          ...styles.toggleKnob,
          ...(checked ? styles.toggleKnobActive : {}),
        }}
      ></div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Điều khiển thông minh</h1>
        <p style={styles.subtitle}>Quản lý các hệ thống tự động và điều khiển thủ công</p>
      </div>

      <div style={styles.grid}>
        {/* Watering Control */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>💧</span>
            <div>
              <h2 style={styles.cardTitle}>Hệ thống tưới nước</h2>
            </div>
          </div>

          <div style={styles.controlGroup}>
            <div style={styles.controlLabel}>
              <span style={styles.label}>Tưới tự động</span>
              <Toggle
                checked={currentGarden.settings.autoWatering}
                onChange={(value) => handleToggle('autoWatering', value)}
              />
            </div>
            {currentGarden.settings.autoWatering && (
              <div style={styles.info}>
                ✓ Hệ thống sẽ tự động tưới nước theo lịch: {formatWateringSchedule(currentGarden.settings.wateringSchedule)}
              </div>
            )}
          </div>

          <div style={styles.divider}></div>

          <div style={styles.controlGroup}>
            <span style={styles.label}>Điều khiển thủ công</span>
            <button
              style={{
                ...styles.button,
                ...(manualWatering ? styles.buttonActive : {}),
              }}
              onClick={handleManualWater}
              disabled={manualWatering}
              onMouseEnter={(e) => !manualWatering && (e.target.style.backgroundColor = '#059669')}
              onMouseLeave={(e) => !manualWatering && (e.target.style.backgroundColor = '#10B981')}
            >
              {manualWatering ? (
                <>
                  <span>⏳</span>
                  <span>Đang tưới...</span>
                </>
              ) : (
                <>
                  <span>🚿</span>
                  <span>Bật tưới ngay</span>
                </>
              )}
            </button>
            {manualWatering && (
              <div style={styles.info}>
                Van tưới đang mở. Sẽ tự động đóng sau 3 giây.
              </div>
            )}
          </div>
        </div>

        {/* Lighting Control */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>💡</span>
            <div>
              <h2 style={styles.cardTitle}>Hệ thống chiếu sáng</h2>
            </div>
          </div>

          <div style={styles.controlGroup}>
            <div style={styles.controlLabel}>
              <span style={styles.label}>Đèn tự động</span>
              <Toggle
                checked={currentGarden.settings.autoLighting}
                onChange={(value) => handleToggle('autoLighting', value)}
              />
            </div>
            {currentGarden.settings.autoLighting && (
              <div style={styles.info}>
                ✓ Đèn sẽ tự động bật khi ánh sáng {'<'} {currentGarden.settings.lightingThreshold} lux
              </div>
            )}
          </div>

          <div style={styles.controlGroup}>
            <label style={styles.label}>
              Ngưỡng ánh sáng: {currentGarden.settings.lightingThreshold} lux
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={currentGarden.settings.lightingThreshold}
              onChange={(e) => handleToggle('lightingThreshold', parseInt(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div style={styles.divider}></div>

          <div style={styles.controlGroup}>
            <div style={styles.controlLabel}>
              <span style={styles.label}>Điều khiển thủ công</span>
              <span
                style={{
                  ...styles.status,
                  ...(manualLighting ? styles.statusActive : styles.statusInactive),
                }}
              >
                {manualLighting ? '● BẬT' : '○ TẮT'}
              </span>
            </div>
            <button
              style={{
                ...styles.button,
                backgroundColor: manualLighting ? '#F59E0B' : '#10B981',
              }}
              onClick={handleManualLight}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              <span>{manualLighting ? '🌙' : '☀️'}</span>
              <span>{manualLighting ? 'Tắt đèn' : 'Bật đèn'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}