import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const initialState = {
  // Connection state
  isConnected: false,
  isConnecting: false,
  connectionError: null,
  
  // Data state
  data: null,
  lastUpdate: null,
  
  // UI state
  isLoading: true,
  error: null,
  
  // Historical data for charts
  historicalData: [],
  maxHistoryLength: 50,
};

export const useDashboardStore = create(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    
    // Connection actions
    setConnecting: (isConnecting) => set({ isConnecting }),
    setConnected: (isConnected) => set({ 
      isConnected, 
      isConnecting: false,
      connectionError: null 
    }),
    setConnectionError: (error) => set({ 
      connectionError: error,
      isConnecting: false,
      isConnected: false 
    }),
    
    // Data actions
    updateData: (data) => {
      const { historicalData, maxHistoryLength } = get();
      const timestamp = new Date().toISOString();
      
      // Add to historical data
      const newHistoricalData = [
        ...historicalData,
        { ...data, timestamp }
      ].slice(-maxHistoryLength);
      
      set({
        data,
        lastUpdate: timestamp,
        historicalData: newHistoricalData,
        isLoading: false,
        error: null
      });
    },
    
    setError: (error) => set({ error, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
    
    // Reset state
    reset: () => set(initialState),
    
    // Utility getters
    getConnectionStatus: () => {
      const { isConnected, isConnecting, connectionError } = get();
      if (isConnected) return 'connected';
      if (isConnecting) return 'connecting';
      if (connectionError) return 'error';
      return 'disconnected';
    },
    
    getMetricsData: () => {
      const { historicalData } = get();
      return historicalData.map(item => ({
        timestamp: new Date(item.timestamp),
        cpu: item.metrics?.cpu,
        memory: item.metrics?.memory,
        network: item.metrics?.network,
        disk: item.metrics?.disk,
      }));
    },
  }))
); 