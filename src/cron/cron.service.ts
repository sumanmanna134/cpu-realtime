import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GatewayService } from '../gateway/gateway.service';
import { SystemConstant } from '../common/constant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CpuService } from '../cpu/cpu.service';

@Injectable()
export class CronService {
  constructor(
    private readonly ws: GatewayService,
    private readonly cpuService: CpuService,
  ) {}
  @Cron(CronExpression.EVERY_SECOND)
  updateCpuUsage() {
    const cpuUsageMetric = this.cpuService.getCpuUsageMetricInPercentage();
    this.ws.sendMessage(cpuUsageMetric, SystemConstant.EMIT_SYSTEM_EV);
  }
}
