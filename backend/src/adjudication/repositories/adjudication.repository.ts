import { Injectable } from '@nestjs/common';
import { ClaimStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdjudicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByClaimId(claimId: string) {
    return this.prisma.adjudication.findUnique({
      where: { claimId },
      include: { adjuster: true },
    });
  }

  async findClaimForReview(claimId: string) {
    return this.prisma.claim.findUnique({
      where: { id: claimId },
      include: {
        customer: true,
        documents: true,
        survey: { include: { surveyor: true } },
        caseAssignment: {
          include: { caseManager: true, surveyor: true },
        },
        workshop: true,
      },
    });
  }

  async create(data: {
    claimId: string;
    adjusterId: string;
    decision: 'APPROVED' | 'REJECTED';
    approvedAmount?: number;
    decisionReason: string;
  }) {
    return this.prisma.adjudication.create({
      data,
      include: { adjuster: true, claim: true },
    });
  }
}
