import { Module } from '@nestjs/common';
import { GatewayModule } from '../gateway/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CpuModule } from '../cpu/cpu.module';
import { EventService } from './event.service';

@Module({
  imports: [GatewayModule, CpuModule, EventEmitterModule.forRoot()],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
