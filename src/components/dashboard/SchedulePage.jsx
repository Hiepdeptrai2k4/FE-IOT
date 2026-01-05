import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function SchedulePage() {
  const { currentGarden, updateGardenSettings } = useApp();
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: 'Tưới sáng',
      time: '06:00',
      duration: 10,
      enabled: true,
      days: ['Mon', 'Wed', 'Fri'],
    },
    {
      id: 2,
      name: 'Tưới chiều',
      time: '18:00',
      duration: 15,
      enabled: true,
      days: ['Tue', 'Thu', 'Sat'],
    },
    {
      id: 3,
      name: 'Tưới tối',
      time: '22:00',
      duration: 5,
      enabled: false,
      days: ['Sun'],
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    time: '08:00',
    duration: 10,
    enabled: true,
    days: [],
  });

  const daysOfWeek = [
    { id: 'Mon', label: 'T2' },
    { id: 'Tue', label: 'T3' },
    { id: 'Wed', label: 'T4' },
    { id: 'Thu', label: 'T5' },
    { id: 'Fri', label: 'T6' },
    { id: 'Sat', label: 'T7' },
    { id: 'Sun', label: 'CN' },
  ];

  const toggleSchedule = (id) => {
    setSchedules(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const deleteSchedule = (id) => {
    if (confirm('Bạn có chắc muốn xóa lịch hẹn giờ này?')) {
      setSchedules(prev => prev.filter(s => s.id !== id));
    }
  };

  const toggleDay = (day) => {
    setNewSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (newSchedule.days.length === 0) {
      alert('Vui lòng chọn ít nhất một ngày trong tuần');
      return;
    }
    const schedule = {
      ...newSchedule,
      id: Date.now(),
    };
    setSchedules(prev => [...prev, schedule]);
    setNewSchedule({
      name: '',
      time: '08:00',
      duration: 10,
      enabled: true,
      days: [],
    });
    setShowAddForm(false);
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
      marginBottom: '24px',
    },
    scheduleList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    scheduleCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid #F3F4F6',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    scheduleCardDisabled: {
      opacity: 0.6,
    },
    toggle: {
      width: '52px',
      height: '28px',
      borderRadius: '14px',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.3s',
    },
    toggleKnob: {
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      backgroundColor: 'white',
      position: 'absolute',
      top: '3px',
      transition: 'all 0.3s',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    scheduleInfo: {
      flex: 1,
    },
    scheduleName: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '8px',
    },
    scheduleDetails: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px',
      color: '#6B7280',
    },
    icon: {
      fontSize: '16px',
    },
    days: {
      display: 'flex',
      gap: '6px',
      marginTop: '8px',
    },
    dayBadge: {
      padding: '4px 10px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '500',
      backgroundColor: '#ECFDF5',
      color: '#10B981',
    },
    actions: {
      display: 'flex',
      gap: '8px',
    },
    actionBtn: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s',
    },
    deleteBtn: {
      backgroundColor: '#FEE2E2',
      color: '#DC2626',
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
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      maxHeight: '90vh',
      overflowY: 'auto',
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
    daysSelector: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '8px',
    },
    dayButton: {
      padding: '12px 8px',
      border: '2px solid #E5E7EB',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s',
      textAlign: 'center',
    },
    dayButtonSelected: {
      backgroundColor: '#ECFDF5',
      borderColor: '#10B981',
      color: '#10B981',
    },
    dayButtonUnselected: {
      backgroundColor: 'white',
      color: '#6B7280',
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
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'white',
      borderRadius: '16px',
      border: '2px dashed #E5E7EB',
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '16px',
    },
    emptyText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#6B7280',
      marginBottom: '8px',
    },
    emptySubtext: {
      fontSize: '14px',
      color: '#9CA3AF',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>⏰ Hẹn giờ tưới nước</h1>
        <p style={styles.subtitle}>
          Thiết lập lịch tưới tự động cho vườn {currentGarden?.name}
        </p>
      </div>

      <button
        style={styles.addButton}
        onClick={() => setShowAddForm(true)}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#059669')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#10B981')}
      >
        <span>+</span>
        <span>Thêm lịch mới</span>
      </button>

      {schedules.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>⏰</div>
          <div style={styles.emptyText}>Chưa có lịch hẹn giờ nào</div>
          <div style={styles.emptySubtext}>
            Nhấn "Thêm lịch mới" để tạo lịch tưới tự động
          </div>
        </div>
      ) : (
        <div style={styles.scheduleList}>
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              style={{
                ...styles.scheduleCard,
                ...(schedule.enabled ? {} : styles.scheduleCardDisabled),
              }}
            >
              <div
                style={{
                  ...styles.toggle,
                  backgroundColor: schedule.enabled ? '#10B981' : '#D1D5DB',
                }}
                onClick={() => toggleSchedule(schedule.id)}
              >
                <div
                  style={{
                    ...styles.toggleKnob,
                    left: schedule.enabled ? '27px' : '3px',
                  }}
                />
              </div>

              <div style={styles.scheduleInfo}>
                <div style={styles.scheduleName}>{schedule.name}</div>
                <div style={styles.scheduleDetails}>
                  <div style={styles.detailItem}>
                    <span style={styles.icon}>🕐</span>
                    <span>{schedule.time}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.icon}>⏱️</span>
                    <span>{schedule.duration} phút</span>
                  </div>
                </div>
                <div style={styles.days}>
                  {schedule.days.map((day) => (
                    <div key={day} style={styles.dayBadge}>
                      {daysOfWeek.find((d) => d.id === day)?.label}
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.actions}>
                <button
                  style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                  onClick={() => deleteSchedule(schedule.id)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#FECACA')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = '#FEE2E2')
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Schedule Modal */}
      {showAddForm && (
        <div style={styles.modal} onClick={() => setShowAddForm(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>
              <span>⏰</span>
              <span>Thêm lịch hẹn giờ</span>
            </h2>
            <form style={styles.form} onSubmit={handleAddSchedule}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tên lịch</label>
                <input
                  type="text"
                  placeholder="VD: Tưới sáng"
                  value={newSchedule.name}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, name: e.target.value })
                  }
                  style={styles.input}
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Thời gian</label>
                <input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, time: e.target.value })
                  }
                  style={styles.input}
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Thời lượng (phút)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={newSchedule.duration}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      duration: parseInt(e.target.value),
                    })
                  }
                  style={styles.input}
                  required
                  onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Chọn các ngày trong tuần</label>
                <div style={styles.daysSelector}>
                  {daysOfWeek.map((day) => (
                    <div
                      key={day.id}
                      style={{
                        ...styles.dayButton,
                        ...(newSchedule.days.includes(day.id)
                          ? styles.dayButtonSelected
                          : styles.dayButtonUnselected),
                      }}
                      onClick={() => toggleDay(day.id)}
                    >
                      {day.label}
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowAddForm(false)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#E5E7EB')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = '#F3F4F6')
                  }
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = '#059669')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = '#10B981')
                  }
                >
                  Thêm lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
