import { useState } from 'react';
import apiService from '../../services/apiService';

export default function ESP32SetupWizard({ onComplete, onCancel, onSkip, gardenName }) {
  const [step, setStep] = useState(1); // 1: Enter Info, 2: Test Connection
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: '',
    ipAddress: '',
    name: '',
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      const result = await apiService.testESP32Connection(
        deviceInfo.deviceId,
        deviceInfo.ipAddress
      );

      setTestResult(result);

      if (result.success) {
        // Auto-fill device info từ kết quả test
        setDeviceInfo(prev => ({
          ...prev,
          name: prev.name || `ESP32 - ${gardenName}`,
        }));
      }
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Lỗi kết nối: ' + error.message,
      });
    } finally {
      setTesting(false);
    }
  };

  const handleComplete = () => {
    if (testResult?.success) {
      onComplete({
        ...deviceInfo,
        ...testResult.device,
      });
    }
  };

  const styles = {
    wizard: {
      width: '100%',
    },
    steps: {
      display: 'flex',
      marginBottom: '32px',
      position: 'relative',
    },
    stepItem: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    stepNumber: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '8px',
      zIndex: 2,
      position: 'relative',
    },
    stepNumberActive: {
      backgroundColor: '#10B981',
      color: 'white',
    },
    stepNumberInactive: {
      backgroundColor: '#E5E7EB',
      color: '#9CA3AF',
    },
    stepNumberCompleted: {
      backgroundColor: '#10B981',
      color: 'white',
    },
    stepLabel: {
      fontSize: '13px',
      fontWeight: '500',
      textAlign: 'center',
    },
    stepLabelActive: {
      color: '#10B981',
    },
    stepLabelInactive: {
      color: '#9CA3AF',
    },
    stepLine: {
      position: 'absolute',
      top: '20px',
      left: 'calc(50% + 20px)',
      right: 'calc(-50% + 20px)',
      height: '2px',
      backgroundColor: '#E5E7EB',
      zIndex: 1,
    },
    stepLineActive: {
      backgroundColor: '#10B981',
    },
    content: {
      marginTop: '24px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '15px',
      border: '2px solid #E5E7EB',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s',
    },
    hint: {
      fontSize: '12px',
      color: '#6B7280',
      marginTop: '4px',
    },
    testSection: {
      backgroundColor: '#F9FAFB',
      padding: '24px',
      borderRadius: '12px',
      marginTop: '24px',
    },
    testButton: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#3B82F6',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    testButtonDisabled: {
      backgroundColor: '#D1D5DB',
      cursor: 'not-allowed',
    },
    resultBox: {
      marginTop: '16px',
      padding: '16px',
      borderRadius: '10px',
      fontSize: '14px',
    },
    resultSuccess: {
      backgroundColor: '#ECFDF5',
      border: '1px solid #10B981',
      color: '#065F46',
    },
    resultError: {
      backgroundColor: '#FEE2E2',
      border: '1px solid #EF4444',
      color: '#991B1B',
    },
    deviceInfo: {
      marginTop: '12px',
      fontSize: '13px',
    },
    deviceInfoItem: {
      padding: '8px 0',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E5E7EB',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px',
    },
    button: {
      flex: 1,
      padding: '14px',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s',
    },
    buttonPrimary: {
      backgroundColor: '#10B981',
      color: 'white',
    },
    buttonSecondary: {
      backgroundColor: '#F3F4F6',
      color: '#6B7280',
    },
    buttonDisabled: {
      backgroundColor: '#D1D5DB',
      color: '#9CA3AF',
      cursor: 'not-allowed',
    },
    infoBox: {
      backgroundColor: '#DBEAFE',
      border: '1px solid #3B82F6',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '24px',
    },
    infoTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1E40AF',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    infoText: {
      fontSize: '13px',
      color: '#1E40AF',
      lineHeight: '1.5',
    },
  };

  const canTestConnection = deviceInfo.deviceId && deviceInfo.ipAddress;
  const canComplete = testResult?.success;

  return (
    <div style={styles.wizard}>
      {/* Progress Steps */}
      <div style={styles.steps}>
        <div style={styles.stepItem}>
          <div
            style={{
              ...styles.stepNumber,
              ...(step === 1 ? styles.stepNumberActive : step > 1 ? styles.stepNumberCompleted : styles.stepNumberInactive),
            }}
          >
            {step > 1 ? '✓' : '1'}
          </div>
          <div style={{ ...styles.stepLabel, ...(step >= 1 ? styles.stepLabelActive : styles.stepLabelInactive) }}>
            Nhập thông tin
          </div>
          <div
            style={{
              ...styles.stepLine,
              ...(step > 1 ? styles.stepLineActive : {}),
            }}
          />
        </div>

        <div style={styles.stepItem}>
          <div
            style={{
              ...styles.stepNumber,
              ...(step === 2 ? styles.stepNumberActive : step > 2 ? styles.stepNumberCompleted : styles.stepNumberInactive),
            }}
          >
            {step > 2 ? '✓' : '2'}
          </div>
          <div style={{ ...styles.stepLabel, ...(step >= 2 ? styles.stepLabelActive : styles.stepLabelInactive) }}>
            Kiểm tra kết nối
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div style={styles.content}>
        {step === 1 && (
          <>
            <div style={styles.infoBox}>
              <div style={styles.infoTitle}>
                <span>💡</span>
                <span>Cách tìm thông tin ESP32</span>
              </div>
              <div style={styles.infoText}>
                • <strong>Device ID:</strong> Kiểm tra trên Serial Monitor của ESP32<br />
                • <strong>IP Address:</strong> Tìm trong router hoặc Serial Monitor (vd: 192.168.1.100)<br />
                • ESP32 và máy tính phải cùng mạng WiFi
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Device ID của ESP32 *</label>
              <input
                type="text"
                placeholder="VD: ESP32-001, GARDEN-ESP-01"
                value={deviceInfo.deviceId}
                onChange={(e) =>
                  setDeviceInfo({ ...deviceInfo, deviceId: e.target.value })
                }
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
              />
              <div style={styles.hint}>ID duy nhất của thiết bị ESP32</div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>IP Address của ESP32 *</label>
              <input
                type="text"
                placeholder="VD: 192.168.1.100"
                value={deviceInfo.ipAddress}
                onChange={(e) =>
                  setDeviceInfo({ ...deviceInfo, ipAddress: e.target.value })
                }
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
              />
              <div style={styles.hint}>
                Địa chỉ IP của ESP32 trong mạng LAN
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Tên thiết bị (tùy chọn)</label>
              <input
                type="text"
                placeholder={`VD: ESP32 - ${gardenName}`}
                value={deviceInfo.name}
                onChange={(e) =>
                  setDeviceInfo({ ...deviceInfo, name: e.target.value })
                }
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
              />
              <div style={styles.hint}>Tên gợi nhớ cho thiết bị này</div>
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onClick={onCancel}
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
                type="button"
                style={{
                  ...styles.button,
                  ...(canTestConnection
                    ? styles.buttonPrimary
                    : styles.buttonDisabled),
                }}
                onClick={() => setStep(2)}
                disabled={!canTestConnection}
                onMouseEnter={(e) => {
                  if (canTestConnection)
                    e.target.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  if (canTestConnection)
                    e.target.style.backgroundColor = '#10B981';
                }}
              >
                Tiếp theo →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={styles.testSection}>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: '16px',
                }}
              >
                Thông tin thiết bị
              </h3>
              <div style={styles.deviceInfo}>
                <div style={styles.deviceInfoItem}>
                  <span style={{ color: '#6B7280' }}>Device ID:</span>
                  <span style={{ fontWeight: '600' }}>
                    {deviceInfo.deviceId}
                  </span>
                </div>
                <div style={styles.deviceInfoItem}>
                  <span style={{ color: '#6B7280' }}>IP Address:</span>
                  <span style={{ fontWeight: '600' }}>
                    {deviceInfo.ipAddress}
                  </span>
                </div>
                <div style={{ ...styles.deviceInfoItem, border: 'none' }}>
                  <span style={{ color: '#6B7280' }}>Tên:</span>
                  <span style={{ fontWeight: '600' }}>
                    {deviceInfo.name || `ESP32 - ${gardenName}`}
                  </span>
                </div>
              </div>

              <button
                style={{
                  ...styles.testButton,
                  ...(testing ? styles.testButtonDisabled : {}),
                }}
                onClick={handleTestConnection}
                disabled={testing}
                onMouseEnter={(e) => {
                  if (!testing) e.target.style.backgroundColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  if (!testing) e.target.style.backgroundColor = '#3B82F6';
                }}
              >
                {testing ? (
                  <>
                    <span>⏳</span>
                    <span>Đang kiểm tra kết nối...</span>
                  </>
                ) : (
                  <>
                    <span>🔌</span>
                    <span>Kiểm tra kết nối ESP32</span>
                  </>
                )}
              </button>

              {testResult && (
                <div
                  style={{
                    ...styles.resultBox,
                    ...(testResult.success
                      ? styles.resultSuccess
                      : styles.resultError),
                  }}
                >
                  <div
                    style={{
                      fontWeight: '600',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>{testResult.success ? '✅' : '❌'}</span>
                    <span>
                      {testResult.success
                        ? 'Kết nối thành công!'
                        : 'Kết nối thất bại'}
                    </span>
                  </div>
                  {testResult.success ? (
                    <div style={{ fontSize: '13px' }}>
                      • Firmware: {testResult.device.firmwareVersion}
                      <br />• Trạng thái: {testResult.device.status === 'online' ? 'Trực tuyến' : 'Ngoại tuyến'}
                    </div>
                  ) : (
                    <div style={{ fontSize: '13px' }}>
                      {testResult.error}
                      <br />
                      <br />
                      <strong>Gợi ý:</strong>
                      <br />• Kiểm tra ESP32 đã bật và kết nối WiFi
                      <br />• Xác nhận IP address chính xác
                      <br />• Đảm bảo cùng mạng với máy tính
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onClick={() => {
                  setStep(1);
                  setTestResult(null);
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#E5E7EB')
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#F3F4F6')
                }
              >
                ← Quay lại
              </button>
              <button
                type="button"
                style={{
                  ...styles.button,
                  ...(canComplete ? styles.buttonPrimary : styles.buttonDisabled),
                }}
                onClick={handleComplete}
                disabled={!canComplete}
                onMouseEnter={(e) => {
                  if (canComplete) e.target.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  if (canComplete) e.target.style.backgroundColor = '#10B981';
                }}
              >
                Hoàn tất & Thêm vườn
              </button>
              <button
                type="button"
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onClick={onSkip}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#E5E7EB')
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#F3F4F6')
                }
              >
                Bỏ qua
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}