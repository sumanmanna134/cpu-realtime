import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { cpu_metric: 0, mem_metric: 0, message: 'HEY' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
