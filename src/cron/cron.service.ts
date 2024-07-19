import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventService } from '../events/event.service';

@Injectable()
export class CronService {
  constructor(private readonly eventService: EventService) {}
  @Cron(CronExpression.EVERY_SECOND)
  updateCpuUsage() {
    this.eventService.updateCpuUsageTrigger();
  }
}
