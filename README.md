# 🌱 IoT Agriculture Monitoring System

Hệ thống giám sát và điều khiển nông nghiệp thông minh sử dụng ESP32, React Frontend và Spring Boot Backend.

## 🚀 Quick Start

### Frontend (React + Vite)

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Mở trình duyệt: http://localhost:5173
```

### Backend (Spring Boot)

```bash
cd Back_end/IOT_agri_20251/backend

# Cần Java 17+ và Maven
mvn spring-boot:run

# Backend chạy tại: http://localhost:8080
```

### Mock Server (Test không cần hardware)

```bash
# Cài ws library
npm install ws

# Chạy mock WebSocket + REST API server
npm run mock:ws

# Mock server chạy tại: http://localhost:8080
```

## 📁 Cấu trúc Project

```
├── src/                    # Frontend React
│   ├── components/         # React components
│   ├── context/           # App context (state management)
│   └── services/          # API & WebSocket services
│
├── Back_end/
│   └── IOT_agri_20251/
│       ├── backend/       # Spring Boot backend
│       └── esp32_firmware/ # ESP32 Arduino code
│
├── mock-websocket-server.js  # Mock server để test
└── package.json           # Frontend dependencies
```

## 🎯 Tính năng

- ✅ **Real-time monitoring**: Giám sát nhiệt độ, độ ẩm, ánh sáng, CO2
- ✅ **Smart controls**: Điều khiển bơm nước và đèn tự động
- ✅ **History & Charts**: Xem lịch sử dữ liệu và biểu đồ
- ✅ **Multiple gardens**: Hỗ trợ nhiều vườn (cần config device_id)
- ✅ **WebSocket**: Cập nhật dữ liệu real-time

## 🔧 Cấu hình

### Frontend

- Port: `5173` (Vite default)
- API Base URL: `http://localhost:8080/api/v1`
- WebSocket URL: `ws://localhost:8080/ws/iot`

### Backend

- Port: `8080`
- Database: MySQL (port 3306)
- MQTT: HiveMQ Cloud

### ESP32

- Xem file: `Back_end/IOT_agri_20251/esp32_firmware/WIRING.md`

## 📖 Tài liệu

- **ESP32 Firmware**: `Back_end/IOT_agri_20251/esp32_firmware/README.md`
- **Backend API**: `Back_end/IOT_agri_20251/backend/README.md`
- **Wokwi Setup**: `Back_end/IOT_agri_20251/esp32_firmware/WOKWI_SETUP.md`
- **Device ID**: `Back_end/IOT_agri_20251/esp32_firmware/DEVICE_ID_IMPLEMENTATION.md`

## 🧪 Test không cần hardware

1. Chạy mock server: `npm run mock:ws`
2. Bật frontend: `npm run dev`
3. Bật toggle "Backend" trong frontend
4. Xem dữ liệu real-time!

## 📝 Scripts

```bash
npm run dev          # Chạy frontend
npm run build        # Build production
npm run mock:ws      # Chạy mock WebSocket server
```

## 🔗 Links

- **Wokwi Simulator**: https://wokwi.com (Test ESP32 online)
- **MQTT Test Client**: https://www.hivemq.com/demos/websocket-client/

## 💡 Tips

- Dùng mock server để test frontend không cần backend
- Wokwi để test ESP32 firmware không cần hardware
- Device ID tự động từ MAC address để phân biệt nhiều ESP32

---

**Made with ❤️ for Smart Agriculture**
