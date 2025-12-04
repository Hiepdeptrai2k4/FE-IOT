import { useApp } from '../context/AppContext';
import LoginPage from './auth/LoginPage';
import MyGardensPage from './gardens/MyGardensPage';
import DashboardLayout from './dashboard/DashboardLayout';

export default function AppRouter() {
  const { user, currentGarden } = useApp();

  if (!user) {
    return <LoginPage />;
  }

  if (!currentGarden) {
    return <MyGardensPage />;
  }

  return <DashboardLayout />;
}
