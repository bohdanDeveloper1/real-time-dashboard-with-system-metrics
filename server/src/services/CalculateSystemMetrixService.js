import si from "systeminformation";

class CalculateSystemMetrixService {
    async getSystemMetrics() {
        const [
            cpu,
            mem,
            disks,
            network,
        ] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
            si.networkStats(),
        ]);

        const diskUsagePercent = this.calculateDiskUsagePercent(disks);
        const networkMBps = this.calculateNetworkMBps(network);
        
        return {
            cpu: cpu?.currentLoad || 0, // %
            memory: (mem?.used / mem?.total) * 100 || 0, // %
            disk: diskUsagePercent, // %
            network: networkMBps, // MB/s
        };
    }

    calculateDiskUsagePercent(disks) {
        let totalSize = 0;
        let totalUsed = 0;
      
        for (const d of disks) {
          totalSize += d.size;
          totalUsed += d.used;
        }
      
        return totalSize === 0 ? 0 : (totalUsed / totalSize) * 100;
    }

    calculateNetworkMBps(networkStats) {
        let totalBytesPerSec = 0;
      
        for (const n of networkStats) {
          totalBytesPerSec += n.rx_sec + n.tx_sec;
        }
      
        return totalBytesPerSec / 1024 / 1024; // MB/s
    }
}

export const calculateSystemMetrixService = new CalculateSystemMetrixService();