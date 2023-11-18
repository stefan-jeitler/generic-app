import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const environment = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        environment === 'production'
          ? '.env.production'
          : `.env.${environment}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
