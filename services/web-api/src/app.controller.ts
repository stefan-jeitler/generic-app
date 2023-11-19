import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { version } from '../package.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('version')
  getVersion(): string {
    return version;
  }
}
