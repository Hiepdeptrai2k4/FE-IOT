import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function MyGardensPage() {
  const { gardens, selectGarden, user, logout, addGarden } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGarden, setNewGarden] = useState({
    name: '',
    description: '',
    location: '',
    image: 'rooftop',
  });

  const handleAddGarden = (e) => {
    e.preventDefault();
    addGarden({
      ...newGarden,
      devices: [],
      settings: {
        autoWatering: true,
        autoLighting: true,
        lightingThreshold: 300,
        wateringSchedule: 'Mỗi 1 giờ',
        nextWatering: 3600,
      },
      environmentalData: {
        soilMoisture: [50, 50, 50, 50, 50, 50],
        airQuality: 75,
        temperature: 25,
        humidity: 60,
        lightLevel: 500,
      },
      alerts: {
        wateringAlert: false,
        buzzerActive: false,
        lowMoisture: false,
      },
    });
    setNewGarden({ name: '', description: '', location: '', image: 'rooftop' });
    setShowAddForm(false);
  };

  const gardenImages = {
    'rooftop': 'https://images.unsplash.com/photo-1535689077097-a8726b5ff822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwZ2FyZGVufGVufDF8fHx8MTc2NDgwNTg1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    'balcony': 'https://images.unsplash.com/photo-1486484290742-0ce4eb743a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwcGxhbnRzfGVufDF8fHx8MTc2NDgwNTg1MXww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#F3F4F6',
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #E5E7EB',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    logo: {
      fontSize: '32px',
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1F2937',
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    userName: {
      fontSize: '14px',
      color: '#6B7280',
    },
    logoutBtn: {
      padding: '8px 16px',
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
    },
    main: {
      padding: '40px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    headerSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    headerContent: {
      flex: 1,
    },
    pageTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '8px',
    },
    pageSubtitle: {
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      border: '2px solid transparent',
    },
    addCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      border: '2px dashed #10B981',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '340px',
    },
    addCardContent: {
      textAlign: 'center',
      padding: '40px',
    },
    addIcon: {
      fontSize: '64px',
      marginBottom: '16px',
    },
    addText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#10B981',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    cardContent: {
      padding: '20px',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '8px',
    },
    cardDescription: {
      fontSize: '14px',
      color: '#6B7280',
      marginBottom: '16px',
      lineHeight: '1.5',
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '16px',
      borderTop: '1px solid #F3F4F6',
    },
    location: {
      fontSize: '13px',
      color: '#10B981',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    deviceCount: {
      fontSize: '13px',
      color: '#6B7280',
      backgroundColor: '#F3F4F6',
      padding: '4px 12px',
      borderRadius: '12px',
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
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '550px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
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
      border: '2px solid #E5E7EB',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s',
    },
    textarea: {
      padding: '12px',
      fontSize: '15px',
      border: '2px solid #E5E7EB',
      borderRadius: '10px',
      outline: 'none',
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit',
      transition: 'all 0.3s',
    },
    select: {
      padding: '12px',
      fontSize: '15px',
      border: '2px solid #E5E7EB',
      borderRadius: '10px',
      outline: 'none',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s',
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

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>🌱</span>
          <span style={styles.headerTitle}>Eco Garden IoT</span>
        </div>
        <div style={styles.userSection}>
          <span style={styles.userName}>👋 {user?.name}</span>
          <button
            style={styles.logoutBtn}
            onClick={logout}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#DC2626'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#EF4444'}
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.headerSection}>
          <div style={styles.headerContent}>
            <h1 style={styles.pageTitle}>Vườn của tôi</h1>
            <p style={styles.pageSubtitle}>
              Chọn một vườn để bắt đầu giám sát và điều khiển
            </p>
          </div>
          <button
            style={styles.addButton}
            onClick={() => setShowAddForm(true)}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
          >
            <span>+</span>
            <span>Thêm vườn mới</span>
          </button>
        </div>

        <div style={styles.grid}>
          {gardens.map((garden) => (
            <div
              key={garden.id}
              style={styles.card}
              onClick={() => selectGarden(garden.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.borderColor = '#10B981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <img
                src={gardenImages[garden.image]}
                alt={garden.name}
                style={styles.cardImage}
              />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{garden.name}</h3>
                <p style={styles.cardDescription}>{garden.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.location}>
                    📍 {garden.location}
                  </span>
                  <span style={styles.deviceCount}>
                    {garden.devices.length} thiết bị
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Add Garden Card */}
          <div
            style={styles.addCard}
            onClick={() => setShowAddForm(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.2)';
              e.currentTarget.style.backgroundColor = '#F0FDF4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <div style={styles.addCardContent}>
              <div style={styles.addIcon}>➕</div>
              <div style={styles.addText}>Thêm vườn mới</div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Garden Modal */}
      {showAddForm && (
        <div style={styles.modal} onClick={() => setShowAddForm(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>
              <span>🌱</span>
              <span>Thêm vườn mới</span>
            </h2>
            <form style={styles.form} onSubmit={handleAddGarden}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tên vườn</label>
                <input
                  type="text"
                  placeholder="VD: Vườn Sân Sau"
                  value={newGarden.name}
                  onChange={(e) => setNewGarden({ ...newGarden, name: e.target.value })}
                  style={styles.input}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#10B981'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mô tả</label>
                <textarea
                  placeholder="Mô tả về vườn của bạn..."
                  value={newGarden.description}
                  onChange={(e) => setNewGarden({ ...newGarden, description: e.target.value })}
                  style={styles.textarea}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#10B981'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Vị trí</label>
                <input
                  type="text"
                  placeholder="VD: Tầng 2, Nhà riêng"
                  value={newGarden.location}
                  onChange={(e) => setNewGarden({ ...newGarden, location: e.target.value })}
                  style={styles.input}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#10B981'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Loại vườn</label>
                <select
                  value={newGarden.image}
                  onChange={(e) => setNewGarden({ ...newGarden, image: e.target.value })}
                  style={styles.select}
                >
                  <option value="rooftop">🏙️ Sân thượng</option>
                  <option value="balcony">🏡 Ban công</option>
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
                  Thêm vườn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
