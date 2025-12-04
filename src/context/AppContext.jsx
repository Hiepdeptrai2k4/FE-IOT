import { createContext, useContext, useState, useEffect } from 'react';
import { mockGardens } from '../data/mockData';

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [gardens, setGardens] = useState(mockGardens);
  const [currentGardenId, setCurrentGardenId] = useState(null);

  const currentGarden = gardens.find(g => g.id === currentGardenId) || null;

  const login = (email, password) => {
    // Mock login
    setUser({
      id: '1',
      name: 'Nguyễn Văn An',
      email: email,
    });
  };

  const logout = () => {
    setUser(null);
    setCurrentGardenId(null);
  };

  const selectGarden = (gardenId) => {
    setCurrentGardenId(gardenId);
  };

  const addGarden = (garden) => {
    const newGarden = {
      ...garden,
      id: `garden-${Date.now()}`,
    };
    setGardens(prev => [...prev, newGarden]);
  };

  const updateGardenSettings = (gardenId, settings) => {
    setGardens(prev =>
      prev.map(g =>
        g.id === gardenId
          ? { ...g, settings: { ...g.settings, ...settings } }
          : g
      )
    );
  };

  const updateGardenAlerts = (gardenId, alerts) => {
    setGardens(prev =>
      prev.map(g =>
        g.id === gardenId
          ? { ...g, alerts: { ...g.alerts, ...alerts } }
          : g
      )
    );
  };

  const addDevice = (gardenId, device) => {
    const newDevice = {
      ...device,
      id: `device-${Date.now()}`,
    };
    setGardens(prev =>
      prev.map(g =>
        g.id === gardenId
          ? { ...g, devices: [...g.devices, newDevice] }
          : g
      )
    );
  };

  const removeDevice = (gardenId, deviceId) => {
    setGardens(prev =>
      prev.map(g =>
        g.id === gardenId
          ? { ...g, devices: g.devices.filter(d => d.id !== deviceId) }
          : g
      )
    );
  };

  // Simulate real-time updates for current garden
  useEffect(() => {
    if (!currentGarden) return;

    const interval = setInterval(() => {
      setGardens(prev =>
        prev.map(g => {
          if (g.id !== currentGardenId) return g;

          // Update soil moisture
          const lastMoisture = g.environmentalData.soilMoisture[g.environmentalData.soilMoisture.length - 1];
          const newMoisture = Math.max(20, Math.min(80, lastMoisture + (Math.random() - 0.5) * 5));
          const updatedMoistureData = [...g.environmentalData.soilMoisture.slice(1), newMoisture];

          // Update countdown
          const newNextWatering = g.settings.nextWatering > 0 ? g.settings.nextWatering - 1 : 0;
          
          // Trigger alert when countdown reaches 0
          let newAlerts = { ...g.alerts };
          if (newNextWatering === 0 && g.settings.autoWatering) {
            newAlerts = {
              ...newAlerts,
              wateringAlert: true,
              buzzerActive: true,
            };
            // Auto-dismiss after 10 seconds
            setTimeout(() => {
              updateGardenAlerts(g.id, { wateringAlert: false, buzzerActive: false });
              updateGardenSettings(g.id, { nextWatering: 3600 });
            }, 10000);
          }

          return {
            ...g,
            environmentalData: {
              ...g.environmentalData,
              soilMoisture: updatedMoistureData,
            },
            settings: {
              ...g.settings,
              nextWatering: newNextWatering,
            },
            alerts: newAlerts,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [currentGardenId]);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        gardens,
        currentGarden,
        selectGarden,
        addGarden,
        updateGardenSettings,
        updateGardenAlerts,
        addDevice,
        removeDevice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
