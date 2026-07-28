import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { ClaimStatus } from '@prisma/client';

@Injectable()
export class ClaimsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createClaimDto: CreateClaimDto & {
      customerId: string;
      claimNumber: string;
    },
  ) {
    return this.prismaService.claim.create({
      data: { ...createClaimDto },
    });
  }

  async count() {
    return this.prismaService.claim.count();
  }

  async findAll() {
    return this.prismaService.claim.findMany({
      include: {
        customer: true,
      },
    });
  }

  async findByCustomer(customerId: string) {
    return this.prismaService.claim.findMany({
      where: { customerId },
      include: {
        customer: true,
      },
    });
  }

  async findById(claimId: string) {
    return this.prismaService.claim.findUnique({
      where: { id: claimId },
      include: {
        customer: true,
      },
    });
  }

  async updateClaimStatus(claimId: string, status: ClaimStatus) {
    return this.prismaService.claim.update({
      where: { id: claimId },
      data: { status },
    });
  }

  async assignWorkshop(claimId: string, workshopId: string) {
    return this.prismaService.claim.update({
      where: { id: claimId },
      data: { workshopId },
      include: { workshop: true },
    });
  }
}
