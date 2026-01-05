import { useState } from 'react';

export default function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError('Vui lòng nhập email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    // Mock API call - trong thực tế sẽ gọi API reset password
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      padding: '20px',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '48px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
      maxWidth: '440px',
      width: '100%',
      backdropFilter: 'blur(10px)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    icon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 16px',
      backgroundColor: '#10B981',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '40px',
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
      lineHeight: '1.5',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
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
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #E5E7EB',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s',
      backgroundColor: 'white',
      boxSizing: 'border-box',
    },
    inputError: {
      borderColor: '#EF4444',
    },
    error: {
      fontSize: '13px',
      color: '#EF4444',
      marginTop: '4px',
    },
    button: {
      width: '100%',
      padding: '14px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      backgroundColor: '#10B981',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      marginTop: '8px',
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    backButton: {
      width: '100%',
      padding: '14px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#10B981',
      backgroundColor: 'transparent',
      border: '2px solid #10B981',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    successBox: {
      backgroundColor: '#D1FAE5',
      border: '2px solid #10B981',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px',
    },
    successIcon: {
      fontSize: '48px',
      textAlign: 'center',
      marginBottom: '12px',
    },
    successText: {
      color: '#065F46',
      fontSize: '15px',
      lineHeight: '1.6',
      textAlign: 'center',
      margin: 0,
    },
  };

  if (isSuccess) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.icon}>🌱</div>
            <h1 style={styles.title}>Kiểm tra email</h1>
          </div>

          <div style={styles.successBox}>
            <div style={styles.successIcon}>✅</div>
            <p style={styles.successText}>
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email <strong>{email}</strong>.
              <br /><br />
              Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu của bạn.
            </p>
          </div>

          <button
            type="button"
            style={styles.button}
            onClick={onBack}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>🔒</div>
          <h1 style={styles.title}>Quên mật khẩu</h1>
          <p style={styles.subtitle}>
            Nhập email đã đăng ký, chúng tôi sẽ gửi hướng dẫn để đặt lại mật khẩu
          </p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              style={{
                ...styles.input,
                ...(error ? styles.inputError : {}),
              }}
              onFocus={(e) => e.target.style.borderColor = error ? '#EF4444' : '#10B981'}
              onBlur={(e) => e.target.style.borderColor = error ? '#EF4444' : '#E5E7EB'}
            />
            {error && <span style={styles.error}>{error}</span>}
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {}),
            }}
            disabled={isLoading}
            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#059669')}
            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#10B981')}
          >
            {isLoading ? 'Đang xử lý...' : 'Gửi hướng dẫn'}
          </button>

          <button
            type="button"
            style={styles.backButton}
            onClick={onBack}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F0FDF4';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            Quay lại đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
