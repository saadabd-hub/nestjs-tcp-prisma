import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PtnService {
  constructor(private prisma: PrismaService) {}

  async getListUniversitas(): Promise<any> {
    const listPtn = await this.prisma.prisma.t_perguruan_tinggi.findMany({
      where: {
        c_jenis: 'Negeri',
      },
      select: {
        c_id_perguruan_tinggi: true,
        c_nama_perguruan_tinggi: true,
        c_akronim: true,
        c_jenis: true,
        t_jurusan: {
          select: {
            c_id_jurusan: true,
          },
        },
      },
      orderBy: {
        c_nama_perguruan_tinggi: 'asc',
      },
    });

    const result = listPtn.map((item) => {
      return {
        id_universitas: item.c_id_perguruan_tinggi,
        nama_universitas: item.c_nama_perguruan_tinggi,
        akronim_universitas: item.c_akronim,
        jenis: item.c_jenis,
      };
    });

    return Promise.resolve(result);
  }

  async getListJurusan(id: number): Promise<any> {
    const listJurusan = await this.prisma.prisma.t_jurusan.findMany({
      where: {
        c_id_perguruan_tinggi: Number(id),
      },
      select: {
        c_id_perguruan_tinggi: true,
        t_perguruan_tinggi: {
          select: {
            c_nama_perguruan_tinggi: true,
            c_akronim: true,
          },
        },
        c_id_jurusan: true,
        c_nama_jurusan: true,
        c_kode_kelompok_jurusan: true,
        t_kelompok_jurusan: {
          select: {
            c_deskripsi: true,
          },
        },
        c_kode_rumpun_jurusan: true,
        t_rumpun_jurusan: {
          select: {
            c_deskripsi: true,
          },
        },
        c_keterangan: true,
        c_pg: true,
        c_lintas_jurusan: true,
        t_jurusan_deskripsi: {
          select: {
            c_deskripsi: true,
            c_lapangan_kerja: true,
          },
        },
      },
    });

    const result = listJurusan.map((item) => {
      return {
        id_universitas: item.c_id_perguruan_tinggi,
        nama_universitas: item.t_perguruan_tinggi.c_nama_perguruan_tinggi,
        akronim_universitas: item.t_perguruan_tinggi.c_akronim,
        id_jurusan: item.c_id_jurusan,
        nama_jurusan: item.c_nama_jurusan,
        kelompok_jurusan: item.t_kelompok_jurusan.c_deskripsi,
        rumpun_jurusan: item.t_rumpun_jurusan.c_deskripsi,
        info: item.c_keterangan,
        passing_grade: item.c_pg,
        lintas_jurusan: item.c_lintas_jurusan === 'Y' ? true : false,
        deskripsi: item.t_jurusan_deskripsi
          ? item.t_jurusan_deskripsi.c_deskripsi
          : 'Deskripsi jurusan belum tersedia',
        lapangan_kerja: item.t_jurusan_deskripsi
          ? item.t_jurusan_deskripsi.c_lapangan_kerja
          : 'Info lapangan kerja belum tersedia',
      };
    });
    return Promise.resolve(result);
  }
}
