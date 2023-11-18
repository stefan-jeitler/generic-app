import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

const environment = process.env.NODE_ENV;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/dist'),
    }),
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
