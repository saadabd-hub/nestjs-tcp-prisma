import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PtnService } from './ptn.service';

@Controller('ptn')
export class PtnController {
  constructor(private readonly ptnService: PtnService) {}

  @MessagePattern('list-ptn')
  async getListUniversitas(): Promise<any> {
    return await this.ptnService.getListUniversitas();
  }

  @MessagePattern('list-jurusan')
  async getListJurusan(@Payload() id: number): Promise<any> {
    return await this.ptnService.getListJurusan(id);
  }
}
