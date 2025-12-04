import { AppProvider } from './context/AppContext';
import AppRouter from './components/AppRouter';

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
