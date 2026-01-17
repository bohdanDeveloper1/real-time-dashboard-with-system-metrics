import { useEffect } from 'react';
import { useDashboardStore } from './store/useDashboardStore';
import { websocketService } from './services/websocketService';
import Dashboard from './components/Dashboard';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  const {
    setConnecting,
    setConnected,
    setConnectionError,
    updateData,
    setError,
    reset
  } = useDashboardStore();

  useEffect(() => {
    const connectToWebSocket = async () => {
      try {
        setConnecting(true);
        setError(null);
        
        const socket = websocketService.connect();
        // Listen for connection events
        socket.on('connect', () => {
          setConnected(true);
          console.log('Connected to dashboard server');
        });
        
        socket.on('disconnect', () => {
          setConnected(false);
          console.log('Disconnected from dashboard server');
        });
        
        socket.on('connect_error', (error) => {
          setConnectionError(error.message);
          console.error('Connection error:', error);
        });
        
        // Listen for data updates
        socket.on('data', (data) => {
          updateData(data);
        });
        
        // Handle errors
        socket.on('error', (error) => {
          setError(error.message);
          console.error('Socket error:', error);
        });
        
      } catch (error) {
        setConnectionError(error.message);
        setError('Failed to connect to server');
        console.error('Failed to connect:', error);
      }
    };

    connectToWebSocket();

    // Cleanup on unmount
    return () => {
      websocketService.disconnect();
      reset();
    };
  }, [setConnecting, setConnected, setConnectionError, updateData, setError, reset]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Real-time Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Live system metrics and monitoring
              </p>
            </div>
            <ConnectionStatus />
          </div>
        </header>
        
        <Dashboard />
      </div>
    </div>
  );
}

export default App; 