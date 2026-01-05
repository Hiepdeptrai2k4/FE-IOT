import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ServiceInfo from './ServiceInfo';

export default function SettingsPage() {
  const { currentGarden, updateGardenSettings } = useApp();
  const [activeTab, setActiveTab] = useState('general'); // 'general' hoặc 'service'

  if (!currentGarden) return null;

  const handleScheduleChange = (schedule) => {
    let seconds;
    switch (schedule) {
      case 'Mỗi 30 phút':
        seconds = 1800;
        break;
      case 'Mỗi 1 giờ':
        seconds = 3600;
        break;
      case 'Mỗi 2 giờ':
        seconds = 7200;
        break;
      case 'Mỗi 4 giờ':
        seconds = 14400;
        break;
      default:
        seconds = 3600;
    }
    updateGardenSettings(currentGarden.id, {
      wateringSchedule: schedule,
      nextWatering: seconds,
    });
  };

  const styles = {
    container: {
      padding: '32px',
      maxWidth: '900px',
    },
    tabContainer: {
      marginBottom: '24px',
      borderBottom: '2px solid #F3F4F6',
    },
    tabList: {
      display: 'flex',
      gap: '8px',
    },
    tab: {
      padding: '12px 24px',
      fontSize: '15px',
      fontWeight: '500',
      color: '#6B7280',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.3s',
      marginBottom: '-2px',
    },
    tabActive: {
      color: '#10B981',
      borderBottomColor: '#10B981',
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
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    settingRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 0',
      borderBottom: '1px solid #F3F4F6',
    },
    settingRowLast: {
      borderBottom: 'none',
    },
    settingLeft: {
      flex: 1,
    },
    settingLabel: {
      fontSize: '15px',
      fontWeight: '500',
      color: '#1F2937',
      marginBottom: '4px',
    },
    settingDescription: {
      fontSize: '13px',
      color: '#6B7280',
      lineHeight: '1.5',
    },
    select: {
      padding: '10px 16px',
      fontSize: '14px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      outline: 'none',
      backgroundColor: 'white',
      cursor: 'pointer',
      minWidth: '180px',
    },
    input: {
      padding: '10px 16px',
      fontSize: '14px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      outline: 'none',
      width: '120px',
      textAlign: 'right',
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
    infoBox: {
      backgroundColor: '#F0FDF4',
      border: '1px solid #BBF7D0',
      borderRadius: '12px',
      padding: '16px',
      marginTop: '20px',
    },
    infoTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#166534',
      marginBottom: '8px',
    },
    infoText: {
      fontSize: '13px',
      color: '#166534',
      lineHeight: '1.6',
    },
    dangerZone: {
      backgroundColor: '#FEF2F2',
      border: '1px solid #FCA5A5',
    },
    dangerButton: {
      padding: '10px 20px',
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s',
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

  // Render Service Info tab
  if (activeTab === 'service') {
    return <ServiceInfo />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.tabContainer}>
        <div style={styles.tabList}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'general' ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab('general')}
          >
            ⚙️ Cài đặt chung
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'service' ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab('service')}
          >
            🔧 Service & API
          </button>
        </div>
      </div>
      <div style={styles.header}>
        <h1 style={styles.title}>Cài đặt</h1>
        <p style={styles.subtitle}>Tùy chỉnh các thông số và cấu hình hệ thống</p>
      </div>

      {/* Garden Information */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span>🌱</span>
          <span>Thông tin vườn</span>
        </h2>
        <div style={styles.settingRow}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Tên vườn</div>
            <div style={styles.settingDescription}>Tên hiển thị của vườn</div>
          </div>
          <input
            type="text"
            value={currentGarden.name}
            readOnly
            style={{ ...styles.input, width: '200px' }}
          />
        </div>
        <div style={{ ...styles.settingRow, ...styles.settingRowLast }}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Vị trí</div>
            <div style={styles.settingDescription}>Địa chỉ hoặc vị trí của vườn</div>
          </div>
          <input
            type="text"
            value={currentGarden.location}
            readOnly
            style={{ ...styles.input, width: '250px' }}
          />
        </div>
      </div>

      {/* Watering Settings */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span>💧</span>
          <span>Cài đặt tưới nước</span>
        </h2>
        <div style={styles.settingRow}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Tưới tự động</div>
            <div style={styles.settingDescription}>
              Bật/tắt chế độ tưới tự động theo lịch
            </div>
          </div>
          <Toggle
            checked={currentGarden.settings.autoWatering}
            onChange={(value) => updateGardenSettings(currentGarden.id, { autoWatering: value })}
          />
        </div>
        <div style={{ ...styles.settingRow, ...styles.settingRowLast }}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Lịch tưới</div>
            <div style={styles.settingDescription}>
              Chu kỳ tưới nước tự động
            </div>
          </div>
          <select
            value={currentGarden.settings.wateringSchedule}
            onChange={(e) => handleScheduleChange(e.target.value)}
            style={styles.select}
          >
            <option value="Mỗi 30 phút">Mỗi 30 phút</option>
            <option value="Mỗi 1 giờ">Mỗi 1 giờ</option>
            <option value="Mỗi 2 giờ">Mỗi 2 giờ</option>
            <option value="Mỗi 4 giờ">Mỗi 4 giờ</option>
          </select>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoTitle}>ℹ️ Thông tin</div>
          <div style={styles.infoText}>
            Hệ thống sẽ tự động bật van tưới theo lịch đã cài đặt. Bạn vẫn có thể tưới thủ công bất cứ lúc nào.
          </div>
        </div>
      </div>

      {/* Lighting Settings */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span>💡</span>
          <span>Cài đặt chiếu sáng</span>
        </h2>
        <div style={styles.settingRow}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Đèn tự động</div>
            <div style={styles.settingDescription}>
              Tự động bật đèn khi ánh sáng yếu
            </div>
          </div>
          <Toggle
            checked={currentGarden.settings.autoLighting}
            onChange={(value) => updateGardenSettings(currentGarden.id, { autoLighting: value })}
          />
        </div>
        <div style={{ ...styles.settingRow, ...styles.settingRowLast }}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Ngưỡng ánh sáng</div>
            <div style={styles.settingDescription}>
              Bật đèn khi ánh sáng thấp hơn giá trị này (lux)
            </div>
          </div>
          <input
            type="number"
            min="100"
            max="1000"
            step="50"
            value={currentGarden.settings.lightingThreshold}
            onChange={(e) => updateGardenSettings(currentGarden.id, { lightingThreshold: parseInt(e.target.value) })}
            style={styles.input}
          />
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoTitle}>💡 Gợi ý</div>
          <div style={styles.infoText}>
            Ngưỡng 300-500 lux phù hợp cho hầu hết các loại cây trồng. Giá trị thấp hơn sẽ bật đèn sớm hơn.
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span>⚙️</span>
          <span>Cài đặt hệ thống</span>
        </h2>
        <div style={styles.settingRow}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Thông báo cảnh báo</div>
            <div style={styles.settingDescription}>
              Hiển thị cảnh báo khi có sự cố
            </div>
          </div>
          <Toggle checked={true} onChange={() => {}} />
        </div>
        <div style={styles.settingRow}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Âm thanh cảnh báo</div>
            <div style={styles.settingDescription}>
              Bật còi khi có cảnh báo quan trọng
            </div>
          </div>
          <Toggle checked={true} onChange={() => {}} />
        </div>
        <div style={{ ...styles.settingRow, ...styles.settingRowLast }}>
          <div style={styles.settingLeft}>
            <div style={styles.settingLabel}>Cập nhật tự động</div>
            <div style={styles.settingDescription}>
              Tự động cập nhật dữ liệu từ cảm biến
            </div>
          </div>
          <Toggle checked={true} onChange={() => {}} />
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ ...styles.section, ...styles.dangerZone }}>
        <h2 style={{ ...styles.sectionTitle, color: '#991B1B' }}>
          <span>⚠️</span>
          <span>Vùng nguy hiểm</span>
        </h2>
        <div style={{ ...styles.settingRow, ...styles.settingRowLast }}>
          <div style={styles.settingLeft}>
            <div style={{ ...styles.settingLabel, color: '#991B1B' }}>Đặt lại cài đặt</div>
            <div style={{ ...styles.settingDescription, color: '#991B1B' }}>
              Khôi phục tất cả cài đặt về giá trị mặc định
            </div>
          </div>
          <button
            style={styles.dangerButton}
            onClick={() => alert('Tính năng đang phát triển')}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#DC2626'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#EF4444'}
          >
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
}