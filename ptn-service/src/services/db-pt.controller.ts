import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Controller('ptn')
@ApiTags('service')
export class dbPtController {
  private readonly _dbPtProxy: ClientProxy;

  constructor(@Inject('DB_PT') dbPtClient: ClientProxy) {
    this._dbPtProxy = dbPtClient;
  }

  @Get()
  async listPtn(): Promise<Observable<any>> {
    return this._dbPtProxy.send<string, object>('list-ptn', {});
  }

  @Get(':id')
  public listJurusan(@Param('id') id: number): Observable<any> {
    return this._dbPtProxy.send<string, number>('list-jurusan', id);
  }
}
