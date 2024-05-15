import { Controller, Get } from '@nestjs/common';
import { GatewayService } from '../gateway/gateway.service';
import { SystemConstant } from '../common/constant';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CpuService } from './cpu.service';
@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}

  @Get('/')
  getCpuUsage() {
    const cpuUsage = this.cpuService.getCpuUsageMetricInPercentage();
    const freeMem = this.cpuService.getFreeMemory();
    const totalUsedMemory = this.cpuService.getTotalUsedMemory();
    const memory = Object.assign(totalUsedMemory, { freeMem });
    return { cpuUsage, memory };
  }

  // Get('/')
}
