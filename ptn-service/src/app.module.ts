import { Module } from '@nestjs/common';
import { dbPtController } from './services/db-pt.controller';
import { ConfigService } from './services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [dbPtController],
  providers: [
    ConfigService,
    {
      provide: 'DB_PT',
      useFactory: (config: ConfigService) => {
        const dbPtConfig = config.get('dbPtn');
        return ClientProxyFactory.create(dbPtConfig);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
