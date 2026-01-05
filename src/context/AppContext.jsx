import { createContext, useContext, useEffect, useState } from "react";
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

  // ===================== 1. LOGIN =====================
  const login = (email) => {
    setUser({ id: "1", name: "Admin", email });
    navigate("/dashboard");
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

  // ===================== PROVIDER =====================
  return (
    <AppContext.Provider
      value={{
        user,
        login,
        gardens,
        currentGarden,
        selectGarden,
        useRealBackend,
        backendConnected,
        controlDevice,
        toggleBackend,
        updateGardenSettings,
        updateGardenAlerts,
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
