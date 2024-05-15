import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { GatewayModule } from '../gateway/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CpuModule } from '../cpu/cpu.module';

@Module({
  imports: [EventEmitterModule.forRoot(), GatewayModule, CpuModule],
  providers: [CronService],
})
export class CronModule {}
