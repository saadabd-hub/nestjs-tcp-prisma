import { Module } from '@nestjs/common';
import { PtnService } from './ptn.service';
import { PtnController } from './ptn.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [PtnController],
  providers: [PtnService, PrismaService],
})
export class PtnModule {}
