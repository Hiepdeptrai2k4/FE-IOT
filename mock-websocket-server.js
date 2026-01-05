/**
 * WebSocket + REST API Server đơn giản để test Frontend
 * Gửi dữ liệu cảm biến giả lập trực tiếp đến Frontend
 * KHÔNG CẦN Backend Spring Boot
 *
 * Cách chạy:
 * 1. npm install ws
 * 2. node mock-websocket-server.js
 */

import http from "http";
import url from "url";
import { WebSocketServer } from "ws";

// ===================== CẤU HÌNH =====================
const CONFIG = {
  port: 8080, // Port WebSocket server
  interval: 2000, // Gửi mỗi 2 giây
};

// ===================== GIÁ TRỊ GIẢ LẬP =====================
let mockData = {
  temperature: 25.0,
  humidity: 60.0,
  soilMoisture: 50.0,
  light: 500.0,
  co2: 400.0,
  pump: 0,
  lamp: 0,
};

// Counter để tạo pattern thay đổi dễ thấy
let counter = 0;

// Thay đổi giá trị để dễ thấy trên frontend
function updateMockData() {
  counter++;
  const time = counter * 0.1;

  // Nhiệt độ: 22-28°C, dao động theo sin wave
  mockData.temperature = 25 + Math.sin(time) * 3;
  mockData.temperature = Math.round(mockData.temperature * 10) / 10;

  // Độ ẩm: 55-75%, dao động theo sin wave
  mockData.humidity = 65 + Math.sin(time * 0.8) * 10;
  mockData.humidity = Math.round(mockData.humidity * 10) / 10;

  // Độ ẩm đất: 40-65%, dao động chậm
  mockData.soilMoisture = 52.5 + Math.sin(time * 0.5) * 12.5;
  mockData.soilMoisture = Math.round(mockData.soilMoisture * 10) / 10;

  // Ánh sáng: 300-800 lux
  mockData.light = 550 + Math.sin(time * 1.2) * 250;
  mockData.light = Math.max(0, Math.min(1000, Math.round(mockData.light)));

  // CO2: 350-500 ppm
  mockData.co2 = 425 + Math.sin(time * 0.3) * 75;
  mockData.co2 = Math.round(mockData.co2);

  // Pump và Lamp: Thay đổi định kỳ
  if (counter % 20 === 0) {
    mockData.pump = mockData.pump === 0 ? 1 : 0;
  }
  if (counter % 25 === 0) {
    mockData.lamp = mockData.lamp === 0 ? 1 : 0;
  }
}

// ===================== LƯU TRỮ LỊCH SỬ =====================
// Lưu trữ lịch sử dữ liệu để trả về qua REST API
const historyData = {
  temperature: [],
  humidity: [],
  soil_moisture: [],
  light: [],
  co2: [],
};

// Endpoint mapping từ backend format sang internal
const endpointMapping = {
  Temperature: "temperature",
  humidity: "humidity",
  "soil-moisture": "soil_moisture",
  Light: "light",
  co2: "co2",
};

// Lưu dữ liệu vào lịch sử
function saveToHistory(topic, value) {
  const now = new Date();
  const historyItem = {
    id: (historyData[topic]?.length || 0) + 1,
    value: parseFloat(value),
    timestamp: now.toISOString(),
  };

  if (!historyData[topic]) {
    historyData[topic] = [];
  }

  historyData[topic].unshift(historyItem); // Thêm vào đầu

  // Giữ tối đa 2000 điểm dữ liệu mỗi sensor
  if (historyData[topic].length > 2000) {
    historyData[topic] = historyData[topic].slice(0, 2000);
  }
}

// ===================== HTTP SERVER =====================
const server = http.createServer();

// HTTP request handler
server.on("request", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // REST API: GET /api/v1/{sensor}
  const apiMatch = path.match(/^\/api\/v1\/(.+)$/);
  if (apiMatch && req.method === "GET") {
    const endpoint = apiMatch[1];

    // Handle control endpoints (POST requests will be handled separately)
    if (path.startsWith("/api/v1/ctrl/")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "OK", message: "Command sent" }));
      return;
    }

    // Handle device-status endpoint
    if (endpoint === "device-status") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          meta: { page: 0, size: 1, totalElements: 1 },
          result: [{ status: "online" }],
        })
      );
      return;
    }

    // Map endpoint name
    const sensorKey = endpointMapping[endpoint] || endpoint.toLowerCase();
    const sensorHistory = historyData[sensorKey] || [];

    // Parse pagination
    const page = parseInt(query.page) || 0;
    const size = parseInt(query.size) || 20;
    const start = page * size;
    const end = start + size;
    const paginatedData = sensorHistory.slice(start, end);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        meta: {
          page,
          size,
          totalElements: sensorHistory.length,
          totalPages: Math.ceil(sensorHistory.length / size || 1),
        },
        result: paginatedData,
      })
    );
    return;
  }

  // Handle POST requests (control commands)
  if (req.method === "POST" && path.startsWith("/api/v1/ctrl/")) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "OK", message: "Command received" }));
    });
    return;
  }

  // 404 for other paths
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

// ===================== WEBSOCKET SERVER =====================
const wss = new WebSocketServer({
  noServer: true,
  perMessageDeflate: false,
});

// Upgrade HTTP request thành WebSocket connection
server.on("upgrade", (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  if (pathname === "/ws/iot") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

// Danh sách clients đang kết nối
const clients = new Set();

wss.on("connection", (ws, req) => {
  const clientId = Math.random().toString(36).substring(7);
  clients.add(ws);

  console.log(`✅ Client kết nối: ${clientId} (Tổng: ${clients.size} clients)`);

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(`📩 Nhận từ client ${clientId}:`, data);
      // Echo lại nếu cần
      ws.send(JSON.stringify({ status: "OK", received: data }));
    } catch (error) {
      console.error("❌ Lỗi parse message:", error.message);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log(
      `❌ Client ngắt kết nối: ${clientId} (Còn lại: ${clients.size} clients)`
    );
  });

  ws.on("error", (error) => {
    console.error(`❌ WebSocket error (${clientId}):`, error.message);
  });

  // Gửi welcome message
  ws.send(
    JSON.stringify({
      topic: "status",
      value: "connected",
    })
  );
});

// Gửi dữ liệu định kỳ đến tất cả clients
let sendInterval = setInterval(() => {
  updateMockData();

  // Format giống backend gửi: {topic: "...", value: "..."}
  const messages = [
    { topic: "temperature", value: mockData.temperature.toFixed(1) },
    { topic: "humidity", value: mockData.humidity.toFixed(1) },
    { topic: "soil_moisture", value: mockData.soilMoisture.toFixed(1) },
    { topic: "light", value: mockData.light.toFixed(1) },
    { topic: "co2", value: mockData.co2.toString() },
    { topic: "pump", value: mockData.pump.toString() },
    { topic: "lamp", value: mockData.lamp.toString() },
  ];

  // Lưu vào lịch sử (chỉ lưu sensor data, không lưu pump/lamp)
  ["temperature", "humidity", "soil_moisture", "light", "co2"].forEach(
    (topic) => {
      const msg = messages.find((m) => m.topic === topic);
      if (msg) {
        saveToHistory(topic, msg.value);
      }
    }
  );

  // Gửi đến tất cả clients
  if (clients.size > 0) {
    messages.forEach((msg) => {
      const jsonMessage = JSON.stringify(msg);
      clients.forEach((client) => {
        if (client.readyState === 1) {
          // WebSocket.OPEN
          client.send(jsonMessage);
        }
      });
    });
  }

  // Log khi có clients
  if (clients.size > 0) {
    console.log(
      `📊 [${new Date().toLocaleTimeString("vi-VN")}] ✅ Gửi đến ${
        clients.size
      } client(s):`
    );
    console.log(`   🌡️  temperature: ${mockData.temperature.toFixed(1)}°C`);
    console.log(`   💧 humidity: ${mockData.humidity.toFixed(1)}%`);
    console.log(`   🌱 soil_moisture: ${mockData.soilMoisture.toFixed(1)}%`);
    console.log(`   💡 light: ${mockData.light.toFixed(1)} lux`);
    console.log(`   🌿 co2: ${mockData.co2} ppm`);
    console.log(
      `   🚰 pump: ${mockData.pump} ${mockData.pump === 1 ? "🔴" : "⚪"}`
    );
    console.log(
      `   💡 lamp: ${mockData.lamp} ${mockData.lamp === 1 ? "🔴" : "⚪"}\n`
    );
  }
}, CONFIG.interval);

// Start server
server.listen(CONFIG.port, () => {
  console.log("🚀 Mock WebSocket + REST API Server - Test Frontend");
  console.log("=".repeat(60));
  console.log(`📡 WebSocket Server: ws://localhost:${CONFIG.port}/ws/iot`);
  console.log(`🌐 REST API Server: http://localhost:${CONFIG.port}/api/v1`);
  console.log(
    `⏱️  Interval: ${CONFIG.interval}ms (mỗi ${CONFIG.interval / 1000} giây)`
  );
  console.log("=".repeat(60));
  console.log("\n💡 Hỗ trợ:");
  console.log("   - WebSocket: ws://localhost:8080/ws/iot");
  console.log("   - REST API: http://localhost:8080/api/v1/{sensor}");
  console.log("   - Lịch sử dữ liệu được lưu tự động");
  console.log("   - KHÔNG CẦN Backend Spring Boot!\n");
});

// Cleanup khi tắt chương trình
process.on("SIGINT", () => {
  console.log("\n\n👋 Đang dừng Server...");
  clearInterval(sendInterval);

  // Đóng tất cả connections
  clients.forEach((client) => {
    client.close();
  });
  clients.clear();

  // Đóng server
  wss.close(() => {
    server.close(() => {
      console.log("✅ Đã đóng Server");
      process.exit(0);
    });
  });
});
