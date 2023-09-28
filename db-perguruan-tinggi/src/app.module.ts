import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PtnModule } from './ptn/ptn.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PtnModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
