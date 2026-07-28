import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AppointmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    claimId: string;
    workshopId: string;
    appointmentDate: Date;
  }) {
    return this.prisma.appointment.create({
      data: {
        claimId: data.claimId,
        workshopId: data.workshopId,
        appointmentDate: data.appointmentDate,
      },
      include: {
        claim: true,
        workshop: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        claim: true,
        workshop: true,
      },
    });
  }

  async findByClaimId(claimId: string) {
    return this.prisma.appointment.findUnique({
      where: {
        claimId,
      },
      include: {
        workshop: true,
      },
    });
  }

  async updateStatus(
    id: string,
    status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED',
  ) {
    return this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
