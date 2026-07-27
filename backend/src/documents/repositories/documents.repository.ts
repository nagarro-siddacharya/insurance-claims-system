import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: {
    fileName: string;
    originalName: string;
    mimeType: string;
    fileSize: number;
    filePath: string;
    claimId: string;
  }) {
    return this.prismaService.document.create({
      data,
    });
  }

  async fetchAllByClaimId(claimId: string) {
    return this.prismaService.document.findMany({
      where: { claimId },
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return this.prismaService.document.findUnique({
      where: { id },
    });
  }

  async deleteById(id: string) {
    return this.prismaService.document.delete({
      where: { id },
    });
  }
}
