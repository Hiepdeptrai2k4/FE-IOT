import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardOverview from './DashboardOverview';
import EnvironmentalMonitoring from './EnvironmentalMonitoring';
import SmartControls from './SmartControls';
import DeviceManager from './DeviceManager';
import SettingsPage from './SettingsPage';
import SchedulePage from './SchedulePage';
import HistoryPage from './HistoryPage';
import BackendToggle from '../BackendToggle';

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
    },
    main: {
      flex: 1,
      marginLeft: sidebarOpen ? '280px' : '0',
      transition: 'margin-left 0.3s',
    },
    mobileMenuBtn: {
      display: 'none',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '24px',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
      zIndex: 1000,
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'monitoring':
        return <EnvironmentalMonitoring />;
      case 'controls':
        return <SmartControls />;
      case 'schedule':
        return <SchedulePage />;
      case 'history':
        return <HistoryPage />;
      case 'devices':
        return <DeviceManager />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div style={styles.container}>
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div style={styles.main}>{renderContent()}</div>
      <BackendToggle />
      <button
        style={styles.mobileMenuBtn}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
    </div>
  );
}