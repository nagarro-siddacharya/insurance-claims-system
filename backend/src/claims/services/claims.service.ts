import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClaimsRepository } from '../repositories/claims.repository';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { RoleName } from 'src/common/enums/roles.enum';
import { JwtUser } from 'src/common/interfaces/jwt-user.interface';
import { ClaimStatus } from '@prisma/client';
import { UpdateClaimStatusDto } from '../dto/update-claim-status.dto';

@Injectable()
export class ClaimsService {
  constructor(private readonly claimsRepository: ClaimsRepository) {}

  async create(createClaimDto: CreateClaimDto, customerId: string) {
    const claimNumber = await this.generateClaimNumber();
    return this.claimsRepository.create({
      ...createClaimDto,
      customerId,
      claimNumber,
    });
  }

  private async generateClaimNumber(): Promise<string> {
    const count = await this.claimsRepository.count();
    const nextNumber = count + 1;
    const year = new Date().getFullYear();
    return `CLM-${year}-${nextNumber.toString().padStart(6, '0')}`;
  }

  async findAll(user: JwtUser) {
    switch (user.role) {
      case RoleName.ADMIN:
      case RoleName.CASE_MANAGER:
        return this.claimsRepository.findAll();
      case RoleName.CUSTOMER:
        return this.claimsRepository.findByCustomer(user.id);
      default:
        throw new UnauthorizedException('Unauthorized Access');
    }
  }

  async findById(claimId: string, user: JwtUser) {
    const claim = await this.claimsRepository.findById(claimId);
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (
      user.role === RoleName.ADMIN ||
      user.role === RoleName.CASE_MANAGER ||
      claim.customerId === user.id
    ) {
      return claim;
    }
    throw new UnauthorizedException('Unauthorized Access');
  }

  async updateClaimStatus(
    claimId: string,
    dto: UpdateClaimStatusDto,
    user: JwtUser,
  ) {
    const claim = await this.claimsRepository.findById(claimId);
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (user.role === RoleName.ADMIN || user.role === RoleName.CASE_MANAGER) {
      const isValidTransition = await this.isValidTransition(
        claim.status,
        dto.status,
      );
      if (!isValidTransition) {
        throw new UnauthorizedException('Invalid status transition');
      }
      return this.claimsRepository.updateClaimStatus(claimId, dto.status);
    }
    throw new UnauthorizedException('Unauthorized Access');
  }

  private async isValidTransition(
    current: ClaimStatus,
    next: ClaimStatus,
  ): Promise<boolean> {
    const validTransitions: Record<ClaimStatus, ClaimStatus[]> = {
      SUBMITTED: [ClaimStatus.UNDER_REVIEW],
      UNDER_REVIEW: [ClaimStatus.APPROVED, ClaimStatus.REJECTED],
      APPROVED: [ClaimStatus.CLOSED],
      REJECTED: [],
      CLOSED: [],
    };
    return validTransitions[current].includes(next);
  }
}
