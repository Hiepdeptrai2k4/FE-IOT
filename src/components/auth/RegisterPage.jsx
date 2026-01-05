import { useState } from 'react';

export default function RegisterPage({ onBack, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    // Mock API call - trong thực tế sẽ gọi API đăng ký
    setTimeout(() => {
      setIsLoading(false);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      onRegisterSuccess();
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
    footer: {
      marginTop: '24px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#6B7280',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>🌱</div>
          <h1 style={styles.title}>Đăng ký tài khoản</h1>
          <p style={styles.subtitle}>Tạo tài khoản Eco Garden IoT mới</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Họ và tên</label>
            <input
              type="text"
              name="name"
              placeholder="Nguyễn Văn A"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
              onFocus={(e) => e.target.style.borderColor = errors.name ? '#EF4444' : '#10B981'}
              onBlur={(e) => e.target.style.borderColor = errors.name ? '#EF4444' : '#E5E7EB'}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              onFocus={(e) => e.target.style.borderColor = errors.email ? '#EF4444' : '#10B981'}
              onBlur={(e) => e.target.style.borderColor = errors.email ? '#EF4444' : '#E5E7EB'}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
              onFocus={(e) => e.target.style.borderColor = errors.password ? '#EF4444' : '#10B981'}
              onBlur={(e) => e.target.style.borderColor = errors.password ? '#EF4444' : '#E5E7EB'}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {}),
              }}
              onFocus={(e) => e.target.style.borderColor = errors.confirmPassword ? '#EF4444' : '#10B981'}
              onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#EF4444' : '#E5E7EB'}
            />
            {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
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
            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
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

        <div style={styles.footer}>
          <p>Bằng việc đăng ký, bạn đồng ý với điều khoản sử dụng</p>
        </div>
      </div>
    </div>
  );
}
