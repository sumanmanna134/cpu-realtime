import { Injectable } from '@nestjs/common';
import { ICpuUsage } from '../common/cpu.usage.interface';
import * as os from 'os';
import { ITotalUsedMemory } from '../common/used.memeory.interface';
import { ICpuUsageMetric } from '../common/metric.cpu.interface';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
const execPromise = promisify(exec);
@Injectable()
export class CpuService {
  getCpuMetric(): number {
    const { user, system } = this.getCpuUsageInMilliSeconds();
    const totalCores = this.getCpuCoreCount();
    const cpuPercent = ((user + system) / 1000 / totalCores) * 100;
    return cpuPercent;
  }

  getMemoryMetric(): number {
    const { usedMemory, totalMemory } = this.getTotalUsedMemory();
    const memoryPercent = (usedMemory / totalMemory) * 100;
    return memoryPercent;
  }

  getTotalMemory(): number {
    return this.bytesToGB(os.totalmem());
  }

  getFreeMemory(): number {
    return this.bytesToGB(os.freemem());
  }

  getPlatFrom(): NodeJS.Platform {
    return os.platform();
  }

  getCpuUsageInMilliSeconds(): ICpuUsage {
    const { user, system } = process.cpuUsage();
    const userInMilliSeconds = this.convertMicroToMilliSeconds(user);
    const systemInMilliSeconds = this.convertMicroToMilliSeconds(system);
    return { user: userInMilliSeconds, system: systemInMilliSeconds };
  }

  convertMicroToMilliSeconds(micro: number) {
    return micro / 1000;
  }

  getCpuCoreCount(): number {
    return os.cpus().length;
  }

  getTotalUsedMemory(): ITotalUsedMemory {
    const totalMemory = this.getTotalMemory();
    const freeMemory = this.getFreeMemory();
    const usedMemory = totalMemory - freeMemory;
    return { usedMemory, totalMemory };
  }

  getCpuUsageMetricInPercentage(): ICpuUsageMetric {
    const cpuMetric = this.getCpuMetric();
    const memMetric = this.getMemoryMetric();
    return { cpuMetric, memMetric };
  }
  bytesToGB(bytes: number): number {
    return bytes / Math.pow(1024, 3);
  }

  async runSystemCommand(command: string) {
    try {
      const { stdout, stderr } = await execPromise(command);
      if (stderr) {
        throw new Error(stderr);
      }
      await fs.appendFile('output.log', stdout + '\n');
      return stdout;
    } catch (error) {
      // Handle any errors that occurred during execution
      return { error: error };
    }
  }
  async readLogFile(): Promise<any | { error: string }> {
    try {
      const logContent = await fs.readFile('output.log', 'utf8');
      return logContent;
    } catch (error) {
      return { error: error.message };
    }
  }
}
