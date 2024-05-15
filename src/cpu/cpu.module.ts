import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { GatewayModule } from '../gateway/gateway.module';
import { GatewayService } from '../gateway/gateway.service';
import { CpuController } from './cpu.controller';

@Module({
  controllers: [CpuController],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
