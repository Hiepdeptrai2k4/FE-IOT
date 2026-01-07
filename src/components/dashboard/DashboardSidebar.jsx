import { useApp } from '../../context/AppContext';
import bkLogo from "../../assets/images/image.png"

export default function DashboardSidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const { currentGarden, gardens, selectGarden, logout, user } = useApp();

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Tổng quan' },
    { id: 'monitoring', icon: '🌡️', label: 'Giám sát môi trường' },
    { id: 'controls', icon: '🎛️', label: 'Điều khiển thông minh' },
    { id: 'schedule', icon: '⏰', label: 'Hẹn giờ tưới nước' },
    { id: 'history', icon: '📈', label: 'Lịch sử & Biểu đồ' },
    { id: 'settings', icon: '⚙️', label: 'Cài đặt' },
  ];

  const styles = {
    sidebar: {
      width: '280px',
      backgroundColor: 'white',
      borderRight: '1px solid #E5E7EB',
      position: 'fixed',
      left: sidebarOpen ? '0' : '-280px',
      top: 0,
      bottom: 0,
      transition: 'left 0.3s',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      overflowY: 'auto',
    },
    header: {
      padding: '24px 20px',
      borderBottom: '1px solid #E5E7EB',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
    },
    logoIcon: {
      fontSize: '28px',
      width: '40px',
      height: '40px',
      objectFit: 'contain',
    },
    logoText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    gardenSelector: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#F3F4F6',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      outline: 'none',
    },
    backButton: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: '#DBEAFE',
      color: '#1E40AF',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '500',
      marginTop: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    nav: {
      flex: 1,
      padding: '20px 12px',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '4px',
      transition: 'all 0.2s',
      fontSize: '14px',
      fontWeight: '500',
    },
    navItemActive: {
      backgroundColor: '#ECFDF5',
      color: '#10B981',
    },
    navItemInactive: {
      color: '#6B7280',
    },
    footer: {
      padding: '20px',
      borderTop: '1px solid #E5E7EB',
    },
    userInfo: {
      marginBottom: '12px',
    },
    userName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1F2937',
      marginBottom: '4px',
    },
    userEmail: {
      fontSize: '12px',
      color: '#6B7280',
    },
    logoutBtn: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#FEE2E2',
      color: '#DC2626',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s',
    },
    toggleBtn: {
      position: 'absolute',
      right: '-40px',
      top: '24px',
      width: '32px',
      height: '32px',
      backgroundColor: 'white',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <div style={styles.logo}>
          <img src={bkLogo} alt="Logo" style={styles.logoIcon} />
          <span style={styles.logoText}>Eco Garden IoT</span>
        </div>
        
        <select
          style={styles.gardenSelector}
          value={currentGarden?.id || ''}
          onChange={(e) => selectGarden(e.target.value)}
        >
          {gardens.map((garden) => (
            <option key={garden.id} value={garden.id}>
              {garden.name}
            </option>
          ))}
        </select>
        
        <button
          style={styles.backButton}
          onClick={() => selectGarden(null)}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#BFDBFE'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#DBEAFE'}
        >
          <span>←</span>
          <span>Quay lại danh sách vườn</span>
        </button>
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            style={{
              ...styles.navItem,
              ...(activeTab === item.id ? styles.navItemActive : styles.navItemInactive),
            }}
            onClick={() => setActiveTab(item.id)}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div style={styles.footer}>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user?.name || 'User'}</div>
          <div style={styles.userEmail}>{user?.email || 'user@example.com'}</div>
        </div>
        <button
          style={styles.logoutBtn}
          onClick={logout}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FECACA'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FEE2E2'}
        >
          🚪 Đăng xuất
        </button>
      </div>

      <button
        style={styles.toggleBtn}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '◀' : '▶'}
      </button>
    </aside>
  );
}