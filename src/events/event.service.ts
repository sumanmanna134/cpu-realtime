import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CpuService } from '../cpu/cpu.service';
import { GatewayService } from '../gateway/gateway.service';
import { SystemConstant } from '../common/constant';
import { async } from 'rxjs';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventService {
  constructor(
    private readonly ws: GatewayService,
    private readonly cpuService: CpuService,
    private eventEmitter: EventEmitter2,
  ) {}

  updateCpuUsageTrigger() {
    const cpuUsageMetric = this.cpuService.getCpuUsageMetricInPercentage();
    this.ws.sendMessage(cpuUsageMetric, SystemConstant.EMIT_SYSTEM_EV);
  }

  eventTrigger(event: string, command: string, isProgress?: boolean) {
    this.eventEmitter.emit(event, command);
    if (isProgress) {
      this.eventEmitter.emit(SystemConstant.IS_PROGRESS_EVENT, command);
    }
  }

  @OnEvent('apt-update')
  async aptUpdateTrigger(event: any) {}

  private async systemCommandTrigger(
    command: () =>
      | string
      | {
          error: any;
        },
    event?: string,
  ) {
    const systemCommandResult = command;
    this.ws.sendMessage(
      systemCommandResult,
      event ?? SystemConstant.SYSTEM_COMMAND_CHANNEL,
    );
    this.hasCompleted();
  }

  @OnEvent(SystemConstant.IS_PROGRESS_EVENT)
  isProgress(data: string) {
    this.ws.sendMessage(true, SystemConstant.IS_PROGRESS_EVENT);
  }

  @OnEvent(SystemConstant.HAS_COMPLETED)
  hasCompleted() {
    this.ws.sendMessage(false, SystemConstant.IS_PROGRESS_EVENT);
  }
}
