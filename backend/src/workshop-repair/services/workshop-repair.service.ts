import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkshopRepairRepository } from '../repositories/workshop-repair.repository';
import { ClaimsRepository } from 'src/claims/repositories/claims.repository';
import { WorkshopsRepository } from 'src/workshops/repositories/workshops.repository';
import { ClaimStatus, RepairStatus } from '@prisma/client';
import { JwtUser } from 'src/common/interfaces/jwt-user.interface';

@Injectable()
export class WorkshopRepairService {
  constructor(
    private readonly repairRepository: WorkshopRepairRepository,
    private readonly claimsRepository: ClaimsRepository,
    private readonly workshopRepository: WorkshopsRepository,
  ) {}

  async getRepairByClaimId(claimId: string, user: JwtUser) {
    if (user.role !== 'WORKSHOP') {
      throw new BadRequestException(
        'Only workshop users can view repair details',
      );
    }

    const repair = await this.repairRepository.findByClaimId(claimId);

    if (!repair) {
      throw new NotFoundException('Repair not found for this claim');
    }

    return repair;
  }

  async getRepairById(repairId: string, user: JwtUser) {
    if (user.role !== 'WORKSHOP') {
      throw new BadRequestException(
        'Only workshop users can view repair details',
      );
    }

    const repair = await this.repairRepository.findById(repairId);

    if (!repair) {
      throw new NotFoundException('Repair not found');
    }

    return repair;
  }

  async updateRepair(
    repairId: string,
    status: RepairStatus | undefined,
    expectedDeliveryDate: Date | undefined,
    repairNotes: string | undefined,
    user: JwtUser,
  ) {
    if (user.role !== 'WORKSHOP') {
      throw new BadRequestException('Only workshop users can update repairs');
    }

    const repair = await this.repairRepository.findById(repairId);

    if (!repair) {
      throw new NotFoundException('Repair not found');
    }

    if (repair.claim.status !== ClaimStatus.REPAIR_IN_PROGRESS) {
      throw new BadRequestException(
        'Claim is not in repair-in-progress status',
      );
    }

    if (repair.status !== RepairStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Only an in-progress repair can be updated',
      );
    }

    if (status && status !== RepairStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Repair can only remain in progress. Use the complete repair endpoint to complete it.',
      );
    }

    return this.repairRepository.updateRepair(repairId, {
      status,
      expectedDeliveryDate,
      repairNotes,
    });
  }

  async startRepair(
    claimId: string,
    expectedDeliveryDate: Date | undefined,
    user: JwtUser,
  ) {
    if (user.role !== 'WORKSHOP') {
      throw new BadRequestException('Only workshop users can start repairs');
    }

    const claim = await this.claimsRepository.findById(claimId);

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.status !== ClaimStatus.APPROVED) {
      throw new BadRequestException('Only an approved claim can start repair');
    }

    if (!claim.workshopId) {
      throw new BadRequestException('No workshop is assigned to this claim');
    }

    const existing = await this.repairRepository.findByClaimId(claimId);

    if (existing) {
      throw new BadRequestException('Repair already exists for this claim');
    }

    const workshop = await this.workshopRepository.findById(claim.workshopId);

    if (!workshop || !workshop.isActive) {
      throw new BadRequestException('Assigned workshop is not active');
    }

    const repair = await this.repairRepository.create({
      claimId,
      workshopId: claim.workshopId,
      expectedDeliveryDate,
    });

    await this.repairRepository.updateStatus(
      repair.id,
      RepairStatus.IN_PROGRESS,
      {
        startedAt: new Date(),
      },
    );

    await this.claimsRepository.updateClaimStatus(
      claimId,
      ClaimStatus.REPAIR_IN_PROGRESS,
    );

    return this.repairRepository.findById(repair.id);
  }

  async completeRepair(
    repairId: string,
    finalBillAmount: number,
    repairNotes: string | undefined,
    user: JwtUser,
  ) {
    if (user.role !== 'WORKSHOP') {
      throw new BadRequestException('Only workshop users can complete repairs');
    }
    const repair = await this.repairRepository.findById(repairId);

    if (!repair) {
      throw new NotFoundException('Repair not found');
    }

    if (repair.claim.status !== ClaimStatus.REPAIR_IN_PROGRESS) {
      throw new BadRequestException(
        'Claim is not in repair-in-progress status',
      );
    }

    if (repair.status !== RepairStatus.IN_PROGRESS) {
      throw new BadRequestException('Repair is not in progress');
    }

    if (finalBillAmount < 0) {
      throw new BadRequestException('Final bill amount cannot be negative');
    }

    await this.repairRepository.updateStatus(repairId, RepairStatus.COMPLETED, {
      completedAt: new Date(),
      finalBillAmount,
      repairNotes,
    });

    await this.claimsRepository.updateClaimStatus(
      repair.claimId,
      ClaimStatus.PAYMENT_PENDING,
    );

    return this.repairRepository.findById(repairId);
  }
}
