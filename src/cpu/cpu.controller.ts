import { Controller, Get } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { EventService } from '../events/event.service';
@Controller('cpu')
export class CpuController {
  constructor(
    private readonly cpuService: CpuService,
    private readonly eventService: EventService,
  ) {}

  @Get('/')
  getCpuUsage() {
    const cpuUsage = this.cpuService.getCpuUsageMetricInPercentage();
    const freeMem = this.cpuService.getFreeMemory();
    const totalUsedMemory = this.cpuService.getTotalUsedMemory();
    const memory = Object.assign(totalUsedMemory, { freeMem });
    return { cpuUsage, memory };
  }

  // @Get('/apt')
  // aptUpdate() {
  //   this.eventService.eventTrigger('apt-update', true);
  //   return { message: 'event Trigger' };
  // }
  @Get('/read-log')
  readLog() {
    return this.cpuService.readLogFile();
  }

  // Get('/')
}
