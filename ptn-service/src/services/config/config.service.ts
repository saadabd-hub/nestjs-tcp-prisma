import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  private readonly dbPtnHost = 'localhost';

  constructor() {
    this.envConfig = {};
    this.envConfig.dbPtn = {
      options: {
        port: 3000,
        host: this.dbPtnHost,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
