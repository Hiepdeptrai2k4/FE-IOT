# 👨‍💼 ADMIN DASHBOARD - DANH SÁCH CHỨC NĂNG

## 📊 Tổng quan

Admin Dashboard là trang quản lý tổng thể cho toàn bộ hệ thống, cho phép admin xem và quản lý tất cả users, gardens, devices.

---

## 🎯 CÁC CHỨC NĂNG CHÍNH

### 1. 📈 **DASHBOARD OVERVIEW (Trang chủ Admin)**

#### 1.1. Statistics Cards (Thẻ thống kê)

- ✅ **Tổng số Users**: Hiển thị số lượng users trong hệ thống
- ✅ **Tổng số Gardens**: Tổng số vườn của tất cả users
- ✅ **Tổng số Devices**: Tổng số ESP32 đang hoạt động
- ✅ **Devices Online/Offline**:
  - Số devices đang online (gửi data trong 5 phút gần nhất)
  - Số devices offline (không có data > 5 phút)
- ✅ **Tổng số Sensor Readings**: Tổng số bản ghi dữ liệu cảm biến (hôm nay/tuần này/tháng này)

#### 1.2. Charts & Graphs

- 📊 **User Growth Chart**: Biểu đồ tăng trưởng số lượng users theo thời gian
- 📊 **Devices Status Chart**: Pie chart (Online vs Offline)
- 📊 **Data Activity Chart**: Biểu đồ số lượng dữ liệu được gửi lên theo giờ/ngày
- 📊 **Garden Distribution**: Phân bố số lượng gardens theo users

#### 1.3. Recent Activity

- 🔔 **Recent Users**: Danh sách users mới đăng ký (7 ngày gần nhất)
- 🔔 **Recent Devices**: Devices mới được thêm vào hệ thống
- 🔔 **System Alerts**: Cảnh báo hệ thống (device offline lâu, lỗi kết nối...)

---

### 2. 👥 **USER MANAGEMENT (Quản lý Users)**

#### 2.1. User List (Danh sách Users)

- 📋 **Table hiển thị**:
  - ID
  - Email
  - Full Name
  - Role (USER/ADMIN)
  - Số lượng Gardens
  - Số lượng Devices
  - Ngày đăng ký
  - Status (Active/Banned)
  - Actions (Edit, Delete, View Details)

#### 2.2. User Details (Chi tiết User)

- 👤 **Thông tin cá nhân**:
  - Email, Full Name
  - Role
  - Ngày đăng ký
  - Last login
- 🌱 **Gardens của user**:
  - Danh sách tất cả gardens
  - Tên, mô tả, location
  - Số devices trong mỗi garden
- 📱 **Devices của user**:
  - Danh sách devices
  - Device ID, Name
  - Status (Online/Offline)
  - Last seen

#### 2.3. User Actions

- ✏️ **Edit User**:
  - Đổi full name
  - Đổi role (USER ↔ ADMIN)
  - Đổi password (nếu cần)
- 🗑️ **Delete User**:
  - Xóa user (cascade: xóa cả gardens và devices)
  - Cảnh báo trước khi xóa
- 🚫 **Ban/Unban User**:
  - Ban user (không thể login)
  - Unban user

#### 2.4. Create User (Tạo User mới)

- ➕ Form tạo user mới:
  - Email, Password
  - Full Name
  - Role (mặc định USER)

---

### 3. 🌱 **GARDEN MANAGEMENT (Quản lý Gardens)**

#### 3.1. Garden List (Danh sách Gardens)

- 📋 **Table hiển thị**:
  - ID
  - Garden Name
  - Owner (User email)
  - Location
  - Số lượng Devices
  - Ngày tạo
  - Actions (View, Edit, Delete)

#### 3.2. Garden Details (Chi tiết Garden)

- 📍 **Thông tin garden**:
  - Tên, mô tả, location
  - Owner
  - Ngày tạo
- 📱 **Devices trong garden**:
  - Danh sách devices
  - Device ID, Name
  - Status
  - Last sensor reading
- 📊 **Statistics**:
  - Tổng số sensor readings
  - Dữ liệu mới nhất (temperature, humidity...)

#### 3.3. Garden Actions

- ✏️ **Edit Garden**:
  - Đổi tên, mô tả, location
  - Reassign owner (chuyển sang user khác)
- 🗑️ **Delete Garden**:
  - Xóa garden (cascade: xóa devices trong garden)
- 📱 **Manage Devices**:
  - Thêm device vào garden
  - Xóa device khỏi garden
  - Move device sang garden khác

---

### 4. 📱 **DEVICE MANAGEMENT (Quản lý Devices)**

#### 4.1. Device List (Danh sách Devices)

- 📋 **Table hiển thị**:
  - Device ID (MAC address)
  - Device Name
  - Owner (User email)
  - Garden (Garden name)
  - Status (Online/Offline)
  - Last Seen (thời gian gần nhất gửi data)
  - Actions (View, Edit, Delete, Control)

#### 4.2. Device Details (Chi tiết Device)

- 🔧 **Thông tin device**:
  - Device ID
  - Name
  - Owner & Garden
  - Status
  - Last Seen
- 📊 **Sensor Data (Real-time)**:
  - Temperature, Humidity
  - Soil Moisture, Light, CO2
  - Pump & Lamp status
- 📈 **History Charts**:
  - Biểu đồ dữ liệu 24h/7d/30d
  - Các loại sensor

#### 4.3. Device Actions

- ✏️ **Edit Device**:
  - Đổi name
  - Reassign garden (chuyển sang garden khác)
  - Reassign owner (chuyển sang user khác)
- 🗑️ **Delete Device**:
  - Xóa device (cascade: xóa sensor data)
- 🎛️ **Control Device** (Điều khiển từ xa):
  - Bật/Tắt Pump
  - Bật/Tắt Lamp
  - Gửi command qua MQTT

#### 4.4. Device Registration (Đăng ký Device mới)

- ➕ Form thêm device:
  - Device ID (từ ESP32)
  - Name
  - Chọn Owner (User)
  - Chọn Garden

---

### 5. 📊 **ANALYTICS & REPORTS (Phân tích & Báo cáo)**

#### 5.1. System Statistics

- 📈 **User Statistics**:
  - Users theo thời gian
  - Users mới/hoạt động/tích cực
- 📈 **Device Statistics**:
  - Devices online/offline rate
  - Devices theo thời gian
  - Devices activity
- 📈 **Data Statistics**:
  - Số lượng sensor readings
  - Data size
  - Peak times (giờ cao điểm)

#### 5.2. Reports

- 📄 **Daily Report**: Báo cáo hôm nay
- 📄 **Weekly Report**: Báo cáo tuần này
- 📄 **Monthly Report**: Báo cáo tháng này
- 📥 **Export**: Export report ra Excel/PDF

#### 5.3. Charts

- 📊 **User Activity**: Users đăng nhập theo ngày
- 📊 **Device Usage**: Devices gửi data nhiều nhất
- 📊 **System Health**: Uptime, errors, warnings

---

### 6. ⚙️ **SYSTEM SETTINGS (Cấu hình Hệ thống)**

#### 6.1. General Settings

- ⚙️ **System Info**:
  - Version
  - Uptime
  - Database info
- ⚙️ **MQTT Settings**:
  - Broker URL
  - Connection status
  - Topics overview

#### 6.2. Maintenance

- 🔧 **Database**:
  - Cleanup old data (xóa data cũ)
  - Backup database
  - Restore database
- 🔧 **Cache**:
  - Clear cache
  - Refresh data

#### 6.3. Notifications

- 🔔 **Email Settings**:
  - SMTP config
  - Email templates
- 🔔 **Alert Rules**:
  - Device offline threshold
  - Error notification settings

---

### 7. 🔐 **SECURITY & LOGS (Bảo mật & Nhật ký)**

#### 7.1. Security

- 🔒 **Audit Logs**:
  - User actions (login, logout, edit, delete)
  - Admin actions
  - Security events
- 🔒 **Access Control**:
  - IP whitelist/blacklist
  - Rate limiting settings

#### 7.2. System Logs

- 📋 **Application Logs**:
  - Error logs
  - Warning logs
  - Info logs
- 📋 **MQTT Logs**:
  - Connection logs
  - Message logs
- 📋 **API Logs**:
  - API requests/responses
  - Performance metrics

---

## 🎨 UI/UX Design

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Header: Logo | Search | Notifications | Avatar │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │      Main Content Area              │
│          │                                      │
│ - Home   │  - Dashboard Overview               │
│ - Users  │  - Charts & Statistics              │
│ - Gardens│  - Tables & Lists                   │
│ - Devices│  - Forms & Modals                   │
│ - Reports│                                      │
│ - Settings│                                     │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

### Color Coding

- 🟢 **Green**: Online, Active, Success
- 🔴 **Red**: Offline, Error, Danger
- 🟡 **Yellow**: Warning, Pending
- 🔵 **Blue**: Info, Primary actions
- ⚪ **Gray**: Inactive, Disabled

---

## 📋 PRIORITY (Ưu tiên)

### ✅ **Phase 1 - Essential (Cần thiết nhất)**

1. Dashboard Overview (Statistics)
2. User Management (List, View, Edit, Delete)
3. Device Management (List, View, Status)

### ✅ **Phase 2 - Important (Quan trọng)**

4. Garden Management
5. Device Control (Remote control)
6. Analytics & Charts

### ✅ **Phase 3 - Nice to have (Tốt có)**

7. Reports & Export
8. System Settings
9. Security & Logs

---

## 🔗 API Endpoints Cần Có

```javascript
// Authentication
GET / api / admin / auth / me; // Admin info
POST / api / admin / auth / login; // Admin login

// Users
GET / api / admin / users; // List all users
GET / api / admin / users / { id }; // User details
PUT / api / admin / users / { id }; // Edit user
DELETE / api / admin / users / { id }; // Delete user
POST / api / admin / users; // Create user

// Gardens
GET / api / admin / gardens; // List all gardens
GET / api / admin / gardens / { id }; // Garden details
PUT / api / admin / gardens / { id }; // Edit garden
DELETE / api / admin / gardens / { id }; // Delete garden

// Devices
GET / api / admin / devices; // List all devices
GET / api / admin / devices / { id }; // Device details
PUT / api / admin / devices / { id }; // Edit device
DELETE / api / admin / devices / { id }; // Delete device
POST / api / admin / devices / { id } / control; // Control device

// Statistics
GET / api / admin / stats / overview; // Dashboard stats
GET / api / admin / stats / users; // User statistics
GET / api / admin / stats / devices; // Device statistics
```

---

## 💡 TIPS

1. **Permissions**: Chỉ user có role `ADMIN` mới truy cập được
2. **Real-time**: Dùng WebSocket để update status real-time
3. **Pagination**: Table lớn cần phân trang
4. **Search & Filter**: Tìm kiếm users/gardens/devices
5. **Export**: Cho phép export data ra CSV/Excel
6. **Responsive**: Mobile-friendly design

---

**Tóm lại: Admin Dashboard cần quản lý được TẤT CẢ users, gardens, devices trong hệ thống!** 🎯
