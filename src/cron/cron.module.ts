import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from '../events/event.module';

@Module({
  imports: [EventEmitterModule.forRoot(), EventModule],
  providers: [CronService],
})
export class CronModule {}
