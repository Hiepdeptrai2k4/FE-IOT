import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function DeviceManager() {
  const { currentGarden, addDevice, removeDevice } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'sensor',
    category: 'soil',
  });

  if (!currentGarden) return null;

  const handleAddDevice = (e) => {
    e.preventDefault();
    addDevice(currentGarden.id, {
      ...newDevice,
      status: 'online',
      lastUpdate: new Date().toISOString(),
    });
    setNewDevice({ name: '', type: 'sensor', category: 'soil' });
    setShowAddForm(false);
  };

  const handleDeleteDevice = (deviceId) => {
    if (window.confirm('Bạn có chắc muốn xóa thiết bị này?')) {
      removeDevice(currentGarden.id, deviceId);
    }
  };

  const getDeviceIcon = (category) => {
    const icons = {
      soil: '🌱',
      air: '💨',
      temperature: '🌡️',
      light: '💡',
      water: '💧',
      buzzer: '🔔',
    };
    return icons[category] || '📱';
  };

  const getCategoryName = (category) => {
    const names = {
      soil: 'Độ ẩm đất',
      air: 'Chất lượng không khí',
      temperature: 'Nhiệt độ',
      light: 'Chiếu sáng',
      water: 'Tưới nước',
      buzzer: 'Cảnh báo',
    };
    return names[category] || category;
  };

  const styles = {
    container: {
      padding: '32px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    headerLeft: {
      flex: 1,
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
    addButton: {
      padding: '12px 24px',
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    deviceCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
      transition: 'all 0.3s',
    },
    deviceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px',
    },
    deviceIcon: {
      fontSize: '32px',
    },
    deviceInfo: {
      flex: 1,
      marginLeft: '12px',
    },
    deviceName: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '4px',
    },
    deviceCategory: {
      fontSize: '13px',
      color: '#6B7280',
    },
    deviceStatus: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
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
    deviceBody: {
      paddingTop: '16px',
      borderTop: '1px solid #F3F4F6',
    },
    deviceValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#10B981',
      marginBottom: '4px',
    },
    deviceUnit: {
      fontSize: '14px',
      color: '#9CA3AF',
      marginLeft: '4px',
    },
    deviceUpdate: {
      fontSize: '12px',
      color: '#9CA3AF',
      marginTop: '8px',
    },
    deviceActions: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px',
    },
    actionButton: {
      flex: 1,
      padding: '8px',
      border: '1px solid #E5E7EB',
      backgroundColor: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '500',
      transition: 'all 0.2s',
    },
    deleteButton: {
      color: '#EF4444',
      borderColor: '#FCA5A5',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '24px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      padding: '12px',
      fontSize: '15px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.3s',
    },
    select: {
      padding: '12px',
      fontSize: '15px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      outline: 'none',
      backgroundColor: 'white',
      cursor: 'pointer',
    },
    formActions: {
      display: 'flex',
      gap: '12px',
      marginTop: '8px',
    },
    submitButton: {
      flex: 1,
      padding: '14px',
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s',
    },
    cancelButton: {
      flex: 1,
      padding: '14px',
      backgroundColor: '#F3F4F6',
      color: '#6B7280',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s',
    },
  };

  const sensors = currentGarden.devices.filter(d => d.type === 'sensor');
  const actuators = currentGarden.devices.filter(d => d.type === 'actuator');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Quản lý thiết bị</h1>
          <p style={styles.subtitle}>
            {currentGarden.devices.length} thiết bị · {sensors.length} cảm biến · {actuators.length} bộ điều khiển
          </p>
        </div>
        <button
          style={styles.addButton}
          onClick={() => setShowAddForm(true)}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
        >
          <span>+</span>
          <span>Thêm thiết bị</span>
        </button>
      </div>

      <div style={styles.grid}>
        {currentGarden.devices.map((device) => (
          <div
            key={device.id}
            style={styles.deviceCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={styles.deviceHeader}>
              <span style={styles.deviceIcon}>{getDeviceIcon(device.category)}</span>
              <div style={styles.deviceInfo}>
                <div style={styles.deviceName}>{device.name}</div>
                <div style={styles.deviceCategory}>
                  {getCategoryName(device.category)} · {device.type === 'sensor' ? 'Cảm biến' : 'Điều khiển'}
                </div>
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

            {device.value !== undefined && (
              <div style={styles.deviceBody}>
                <div>
                  <span style={styles.deviceValue}>{device.value}</span>
                  <span style={styles.deviceUnit}>{device.unit}</span>
                </div>
                <div style={styles.deviceUpdate}>
                  Cập nhật lúc: {new Date(device.lastUpdate).toLocaleString('vi-VN')}
                </div>
              </div>
            )}

            <div style={styles.deviceActions}>
              <button
                style={styles.actionButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                ⚙️ Cấu hình
              </button>
              <button
                style={{ ...styles.actionButton, ...styles.deleteButton }}
                onClick={() => handleDeleteDevice(device.id)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FEE2E2'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                🗑️ Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Device Modal */}
      {showAddForm && (
        <div style={styles.modal} onClick={() => setShowAddForm(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Thêm thiết bị mới</h2>
            <form style={styles.form} onSubmit={handleAddDevice}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tên thiết bị</label>
                <input
                  type="text"
                  placeholder="VD: Cảm biến độ ẩm #3"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  style={styles.input}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#10B981'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Loại thiết bị</label>
                <select
                  value={newDevice.type}
                  onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                  style={styles.select}
                >
                  <option value="sensor">Cảm biến</option>
                  <option value="actuator">Bộ điều khiển</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Danh mục</label>
                <select
                  value={newDevice.category}
                  onChange={(e) => setNewDevice({ ...newDevice, category: e.target.value })}
                  style={styles.select}
                >
                  <option value="soil">Độ ẩm đất</option>
                  <option value="air">Chất lượng không khí</option>
                  <option value="temperature">Nhiệt độ</option>
                  <option value="light">Chiếu sáng</option>
                  <option value="water">Tưới nước</option>
                  <option value="buzzer">Cảnh báo</option>
                </select>
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowAddForm(false)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
                >
                  Thêm thiết bị
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
