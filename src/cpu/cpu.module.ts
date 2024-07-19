import { Module, forwardRef } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { CpuController } from './cpu.controller';
import { EventModule } from '../events/event.module';

@Module({
  imports: [forwardRef(() => EventModule)],
  controllers: [CpuController],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
