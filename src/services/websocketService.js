const WS_URL = 'ws://localhost:8080/ws/iot';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = [];
    this.connectionListeners = [];
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;
    
    // Đóng connection cũ nếu có
    if (this.ws) {
      this.ws.close();
    }
    
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log("%c ✅ ĐÃ KẾT NỐI WEBSOCKET", "color: #4caf50; font-weight: bold");
      this.notifyConnectionListeners(true);
    };

    this.ws.onmessage = (event) => {
      // DÒNG NÀY ĐỂ SOI DỮ LIỆU:
      console.log("%c 📥 DỮ LIỆU GỐC TỪ SERVER:", "background: #222; color: #bada55", event.data);

      try {
        const data = JSON.parse(event.data);
        this.listeners.forEach(cb => cb(data));
      } catch (err) {
        console.log("%c ⚠️ Server gửi chuỗi không phải JSON:", "color: red", event.data);
      }
    };

    this.ws.onclose = () => {
      console.log("🔌 Mất kết nối WS. Đang thử lại...");
      this.notifyConnectionListeners(false);
      
      // Chỉ auto-reconnect nếu đang trong useRealBackend mode
      // setTimeout(() => this.connect(), 5000);
    };

    this.ws.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
      this.notifyConnectionListeners(false);
    };
  }

  notifyConnectionListeners(connected) {
    this.connectionListeners.forEach(cb => cb(connected));
  }

  onConnectionChange(callback) {
    this.connectionListeners.push(callback);
    return () => {
      this.connectionListeners = this.connectionListeners.filter(cb => cb !== callback);
    };
  }

  onMessage(callback) {
    this.listeners.push(callback);
    return () => this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.notifyConnectionListeners(false);
    }
  }
  
  get isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

export default new WebSocketService();