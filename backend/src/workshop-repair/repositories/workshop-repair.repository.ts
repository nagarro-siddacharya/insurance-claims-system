import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RepairStatus } from '@prisma/client';

@Injectable()
export class WorkshopRepairRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByClaimId(claimId: string) {
    return this.prisma.repair.findUnique({
      where: { claimId },
      include: {
        claim: true,
        workshop: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.repair.findUnique({
      where: { id },
      include: {
        claim: true,
        workshop: true,
      },
    });
  }

  async create(data: {
    claimId: string;
    workshopId: string;
    expectedDeliveryDate?: Date;
  }) {
    return this.prisma.repair.create({
      data: {
        claimId: data.claimId,
        workshopId: data.workshopId,
        expectedDeliveryDate: data.expectedDeliveryDate,
      },
      include: {
        claim: true,
        workshop: true,
      },
    });
  }

  async updateStatus(
    id: string,
    status: RepairStatus,
    data?: {
      expectedDeliveryDate?: Date;
      startedAt?: Date;
      completedAt?: Date;
      finalBillAmount?: number;
      repairNotes?: string;
    },
  ) {
    return this.prisma.repair.update({
      where: { id },
      data: {
        status,
        ...data,
      },
      include: {
        claim: true,
        workshop: true,
      },
    });
  }

  async updateRepair(
    id: string,
    data: {
      status?: RepairStatus;
      expectedDeliveryDate?: Date;
      repairNotes?: string;
    },
  ) {
    return this.prisma.repair.update({
      where: { id },
      data,
      include: {
        claim: true,
        workshop: true,
      },
    });
  }
}
