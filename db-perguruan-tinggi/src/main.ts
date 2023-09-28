import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, TcpOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: port,
      } as TcpOptions,
    },
    {
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();
}
bootstrap();
