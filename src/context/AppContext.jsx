import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { mockGardens } from "../data/mockData";
import apiService from "../services/apiService";
import websocketService from "../services/websocketService";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [gardens, setGardens] = useState(mockGardens);
  const [currentGardenId, setCurrentGardenId] = useState(mockGardens[0].id);
  const [useRealBackend, setUseRealBackend] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  const navigate = useNavigate();
  const currentGarden = gardens.find((g) => g.id === currentGardenId);

  // ===================== RESTORE USER FROM LOCALSTORAGE =====================
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // ===================== 1. LOGIN =====================
  const login = (email, password) => {
    // Kiểm tra credentials với localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.email === email) {
          setUser(userData);
          navigate("/dashboard");
          return;
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }

    // Nếu không tìm thấy user hoặc sai thông tin, tạo user mới
    const newUser = { id: Date.now().toString(), name: email.split('@')[0], email };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    navigate("/dashboard");
  };

  // ===================== LOGOUT =====================
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate("/");
  };

  const selectGarden = (id) => setCurrentGardenId(id);

  // ===================== UPDATE GARDEN SETTINGS =====================
  const updateGardenSettings = (gardenId, settings) => {
    setGardens((prev) =>
      prev.map((g) =>
        g.id === gardenId
          ? {
              ...g,
              settings: { ...g.settings, ...settings },
            }
          : g
      )
    );
  };

  // ===================== UPDATE GARDEN ALERTS =====================
  const updateGardenAlerts = (gardenId, alerts) => {
    setGardens((prev) =>
      prev.map((g) =>
        g.id === gardenId
          ? {
              ...g,
              alerts: { ...g.alerts, ...alerts },
            }
          : g
      )
    );
  };

  // ===================== UPDATE GARDEN INFO (name, location, description) =====================
  const updateGardenInfo = (gardenId, info) => {
    setGardens((prev) =>
      prev.map((g) => (g.id === gardenId ? { ...g, ...info } : g))
    );
  };

  // ===================== 2. CONTROL DEVICE =====================
  const controlDevice = async (gardenId, category, state) => {
    const stateInt = state ? 1 : 0;

    if (useRealBackend) {
      try {
        if (category === "light") await apiService.controlLight(stateInt);
        if (category === "water") await apiService.controlPump(stateInt);
      } catch (err) {
        console.error("Control device error:", err);
      }
    }

    // Optimistic UI
    setGardens((prev) =>
      prev.map((g) =>
        g.id === gardenId
          ? {
              ...g,
              devices: g.devices.map((d) =>
                d.category === category
                  ? { ...d, state: state ? "ON" : "OFF" }
                  : d
              ),
            }
          : g
      )
    );
  };

  // ===================== 3. TOGGLE BACKEND =====================
  const toggleBackend = async () => {
    if (!useRealBackend) {
      // Bật backend mode - kết nối WebSocket
      try {
        websocketService.connect();
        setUseRealBackend(true);
        // WebSocket sẽ tự động set connected khi onopen
      } catch (error) {
        console.error("Lỗi kết nối WebSocket:", error);
        alert("Không thể kết nối WebSocket (port 8080)");
      }
    } else {
      // Tắt backend mode
      websocketService.disconnect();
      setUseRealBackend(false);
      setBackendConnected(false);
    }
  };

  // ===================== TRACK WEBSOCKET CONNECTION =====================
  useEffect(() => {
    if (!useRealBackend) {
      setBackendConnected(false);
      return;
    }

    // Subscribe to connection changes
    const unsubscribe = websocketService.onConnectionChange((connected) => {
      setBackendConnected(connected);
    });

    // Check initial connection status
    setBackendConnected(websocketService.isConnected);

    return () => {
      unsubscribe();
    };
  }, [useRealBackend]);

  // ===================== 4. WEBSOCKET REALTIME =====================
  useEffect(() => {
    if (!useRealBackend || !currentGardenId) return;

    const unsubscribe = websocketService.onMessage((data) => {
      const topic = data.topic;
      const val = Number(data.value);

      if (Number.isNaN(val)) return;

      setGardens((prev) =>
        prev.map((g) => {
          if (g.id !== currentGardenId) return g;

          let env = { ...g.environmentalData };

          switch (topic) {
            case "light":
              env.lightLevel = val;
              break;

            case "temperature":
              env.temperature = val;
              break;

            case "humidity":
              env.humidity = val;
              break;

            case "co2":
              env.airQuality = val;
              break;

            case "soil_moisture":
              env.soilMoisture = [...env.soilMoisture.slice(1), val];
              break;

            case "pump":
              return {
                ...g,
                devices: g.devices.map((d) =>
                  d.category === "water"
                    ? { ...d, state: val === 1 ? "ON" : "OFF" }
                    : d
                ),
              };

            case "lamp":
              return {
                ...g,
                devices: g.devices.map((d) =>
                  d.category === "light"
                    ? { ...d, state: val === 1 ? "ON" : "OFF" }
                    : d
                ),
              };

            default:
              break;
          }

          return { ...g, environmentalData: env };
        })
      );
    });

    return () => unsubscribe();
  }, [useRealBackend, currentGardenId]);

  // ===================== 5. AUTO LIGHTING CONTROL =====================
  const lastLightCheck = useRef({ lightLevel: null, action: null });
  
  useEffect(() => {
    if (!currentGardenId || !gardens.length) return;

    const garden = gardens.find(g => g.id === currentGardenId);
    if (!garden) return;

    const lightDevice = garden.devices.find(d => d.category === 'light' && d.type === 'actuator');
    const currentLightState = lightDevice?.state === 'ON';
    const lightLevel = garden.environmentalData.lightLevel || 0;
    const threshold = garden.settings.lightingThreshold || 300;
    const autoLighting = garden.settings.autoLighting;

    // Chỉ tự động điều khiển khi bật chế độ autoLighting
    if (!autoLighting) {
      lastLightCheck.current = { lightLevel: null, action: null };
      return;
    }

    // Tránh kiểm tra lại nếu giá trị ánh sáng và action giống lần trước
    const shouldTurnOn = lightLevel < threshold && !currentLightState;
    const shouldTurnOff = lightLevel >= threshold && currentLightState;
    
    if (shouldTurnOn && lastLightCheck.current.action !== 'on') {
      console.log(`💡 Tự động bật đèn: Ánh sáng (${lightLevel.toFixed(1)} lux) < ngưỡng (${threshold} lux)`);
      controlDevice(garden.id, 'light', true);
      lastLightCheck.current = { lightLevel, action: 'on' };
    }
    else if (shouldTurnOff && lastLightCheck.current.action !== 'off') {
      console.log(`💡 Tự động tắt đèn: Ánh sáng (${lightLevel.toFixed(1)} lux) >= ngưỡng (${threshold} lux)`);
      controlDevice(garden.id, 'light', false);
      lastLightCheck.current = { lightLevel, action: 'off' };
    }
    else if (!shouldTurnOn && !shouldTurnOff) {
      // Reset khi không cần action
      lastLightCheck.current = { lightLevel, action: null };
    }
  }, [
    gardens,
    currentGardenId,
    controlDevice
  ]);

  // ===================== 6. AUTO WATERING CONTROL =====================
  const lastWateringCheck = useRef({ gardenId: null, nextWatering: null });
  
  useEffect(() => {
    if (!currentGardenId || !gardens.length) return;

    const interval = setInterval(() => {
      const garden = gardens.find(g => g.id === currentGardenId);
      if (!garden) return;

      const autoWatering = garden.settings.autoWatering;
      if (!autoWatering) {
        lastWateringCheck.current = { gardenId: null, nextWatering: null };
        return;
      }

      // Lấy chu kỳ tưới (có thể là số phút hoặc string cũ)
      const getWateringIntervalMinutes = () => {
        const schedule = garden.settings.wateringSchedule;
        if (typeof schedule === 'number') {
          return schedule;
        }
        // Convert từ string cũ
        switch (schedule) {
          case 'Mỗi 30 phút': return 30;
          case 'Mỗi 1 giờ': return 60;
          case 'Mỗi 2 giờ': return 120;
          case 'Mỗi 4 giờ': return 240;
          default: return 60;
        }
      };

      const intervalMinutes = getWateringIntervalMinutes();
      const intervalSeconds = intervalMinutes * 60;
      const currentNextWatering = garden.settings.nextWatering || intervalSeconds;

      // Nếu đã đến lúc tưới (nextWatering <= 0) và chưa tưới lần này
      if (currentNextWatering <= 0 && 
          (lastWateringCheck.current.gardenId !== garden.id || 
           lastWateringCheck.current.nextWatering !== currentNextWatering)) {
        
        console.log(`💧 Tự động tưới nước: Đã đến lúc tưới (chu kỳ: ${intervalMinutes} phút)`);
        
        // Đánh dấu đã kiểm tra
        lastWateringCheck.current = { gardenId: garden.id, nextWatering: currentNextWatering };
        
        // Bật bơm
        controlDevice(garden.id, 'water', true);
        
        // Tưới trong 3 giây
        setTimeout(() => {
          controlDevice(garden.id, 'water', false);
          console.log(`💧 Hoàn thành tưới nước`);
          
          // Reset nextWatering về chu kỳ mới
          setGardens((prev) =>
            prev.map((g) =>
              g.id === garden.id
                ? {
                    ...g,
                    settings: {
                      ...g.settings,
                      nextWatering: intervalSeconds,
                    },
                  }
                : g
            )
          );
          
          // Reset check để có thể tưới lần tiếp theo
          lastWateringCheck.current = { gardenId: null, nextWatering: null };
        }, 3000);
      }
    }, 1000); // Kiểm tra mỗi giây

    return () => clearInterval(interval);
  }, [gardens, currentGardenId, controlDevice]);

  // ===================== 7. COUNTDOWN NEXT WATERING =====================
  useEffect(() => {
    if (!currentGardenId || !gardens.length) return;

    const interval = setInterval(() => {
      setGardens((prev) =>
        prev.map((g) => {
          if (g.id !== currentGardenId) return g;
          if (!g.settings.autoWatering) return g;
          
          const currentNextWatering = g.settings.nextWatering || 0;
          if (currentNextWatering > 0) {
            return {
              ...g,
              settings: {
                ...g.settings,
                nextWatering: currentNextWatering - 1,
              },
            };
          }
          return g;
        })
      );
    }, 1000); // Đếm ngược mỗi giây

    return () => clearInterval(interval);
  }, [currentGardenId]);

  // ===================== PROVIDER =====================
  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        gardens,
        currentGarden,
        selectGarden,
        useRealBackend,
        backendConnected,
        controlDevice,
        toggleBackend,
        updateGardenSettings,
        updateGardenAlerts,
        updateGardenInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
