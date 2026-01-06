import { useDashboardStore } from '../store/useDashboardStore';
import MetricsCards from './MetricsCards';
import MetricsChart from './MetricsChart';

const Dashboard = () => {
  const { data, isLoading, error, isConnected } = useDashboardStore();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-medium text-gray-600 mb-2">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium mb-2">
          Error loading dashboard
        </div>
        <div className="text-gray-600">{error}</div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 text-lg font-medium mb-2">
          Connecting to server...
        </div>
        <div className="text-gray-500">
          Please wait while we establish a connection
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <MetricsCards />
      
      {/* Charts Section */}
      <div className="w-full">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            System Metrics
          </h2>
          <MetricsChart />
        </div>
      </div>
      
      {/* Last Update Info */}
      {data && (
        <div className="text-center text-sm text-gray-500">
          Last updated: {new Date(data.timestamp).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 