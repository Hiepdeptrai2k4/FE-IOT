import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import bkLogo from "../../assets/images/image.png"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('login'); // 'login', 'register', 'forgot'
  const { login } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra xem có user đã đăng ký không
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.email === email) {
          // Đăng nhập với user đã đăng ký
          login(email, password);
          return;
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }

    // Nếu không tìm thấy user hoặc email khác, tạo user mới (auto register)
    login(email, password);
  };

  // Hiển thị trang đăng ký
  if (view === 'register') {
    return (
      <RegisterPage
        onBack={() => setView('login')}
        onRegisterSuccess={() => setView('login')}
      />
    );
  }

  // Hiển thị trang quên mật khẩu
  if (view === 'forgot') {
    return (
      <ForgotPasswordPage
        onBack={() => setView('login')}
      />
    );
  }

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
      padding: '12px',
      objectFit: 'contain',
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
    footer: {
      marginTop: '24px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#6B7280',
    },
    links: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '16px',
      fontSize: '14px',
    },
    link: {
      color: '#10B981',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>
            <img src={bkLogo} alt="Logo Bách Khoa" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 style={styles.title}>Eco Garden IoT</h1>
          <p style={styles.subtitle}>Hệ thống quản lý vườn thông minh</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              onFocus={(e) => e.target.style.borderColor = '#10B981'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              onFocus={(e) => e.target.style.borderColor = '#10B981'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
          >
            Đăng nhập
          </button>

          <div style={styles.links}>
            <span
              style={styles.link}
              onClick={() => setView('forgot')}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Quên mật khẩu?
            </span>
            <span
              style={styles.link}
              onClick={() => setView('register')}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Đăng ký tài khoản
            </span>
          </div>
        </form>

        <div style={styles.footer}>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            Nhập email và mật khẩu để tiếp tục
          </p>
        </div>
      </div>
    </div>
  );
}