const API_BASE_URL = "http://localhost:8080/api/v1";

// Mapping từ frontend endpoint name sang backend endpoint name
const endpointMapping = {
  temperature: "Temperature",
  humidity: "humidity",
  soil_moisture: "soil-moisture",
  light: "Light",
  co2: "co2",
};

export const apiService = {
  // Điều khiển Bơm/Đèn (Gửi 0 hoặc 1)
  controlLight: async (state) => {
    const res = await fetch(`${API_BASE_URL}/ctrl/light/${state}`, {
      method: "POST",
    });
    return await res.text();
  },

  controlPump: async (state) => {
    const res = await fetch(`${API_BASE_URL}/ctrl/pump/${state}`, {
      method: "POST",
    });
    return await res.text();
  },

  // Lấy lịch sử cảm biến (Dùng cho trang History và Vẽ biểu đồ)
  getSensorHistory: async (endpoint, page = 0, size = 20) => {
    try {
      // Map endpoint name từ frontend sang backend format
      const backendEndpoint = endpointMapping[endpoint] || endpoint;
      const url = `${API_BASE_URL}/${backendEndpoint}?page=${page}&size=${size}&sort=timestamp,desc`;
      console.log(`🔍 API Call: ${url}`);
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      // Backend trả về {meta: {...}, result: [...]}
      // Chuyển đổi thành format frontend expect: {result: [...]}
      const resultArray = Array.isArray(data.result) ? data.result : [];
      const reversedArray = [...resultArray].reverse(); // Đảo ngược để vẽ biểu đồ từ trái sang phải

      return {
        ...data,
        result: reversedArray,
        content: reversedArray, // Giữ compatibility với code cũ
      };
    } catch (e) {
      console.error("Lỗi lấy lịch sử:", e);
      return { result: [], content: [] };
    }
  },

  checkBackendConnection: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/device-status?page=0&size=1`);
      return res.ok;
    } catch (e) {
      return false;
    }
  },
};

export default apiService;
