import si from "systeminformation";

class CalculateSystemMetrixService {
    async getSystemMetrics() {
        const [
            cpu,
            mem,
            disks,
        ] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
        ]);

        const diskUsagePercent = this.calculateDiskUsagePercent(disks);
        
        return {
            cpu: cpu?.currentLoad || 0,
            memory: (mem?.used / mem?.total) * 100 || 0,
            disk: diskUsagePercent,
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
}

export const calculateSystemMetrixService = new CalculateSystemMetrixService();