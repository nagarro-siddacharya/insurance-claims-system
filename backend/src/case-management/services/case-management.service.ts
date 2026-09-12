import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClaimStatus } from '@prisma/client';
import { ClaimsRepository } from 'src/claims/repositories/claims.repository';
import { RoleName } from 'src/common/enums/roles.enum';
import { JwtUser } from 'src/common/interfaces/jwt-user.interface';
import { UsersService } from 'src/users/services/users.service';
import { AssignCaseDto } from '../dto/assign-case.dto';
import { CaseManagementRepository } from '../repositories/case-management.repository';

@Injectable()
export class CaseManagementService {
  constructor(
    private readonly repository: CaseManagementRepository,
    private readonly claimsRepository: ClaimsRepository,
    private readonly usersService: UsersService,
  ) {}

  async assign(claimId: string, dto: AssignCaseDto, actor: JwtUser) {
    if (![RoleName.ADMIN, RoleName.CASE_MANAGER].includes(actor.role as RoleName)) {
      throw new UnauthorizedException('Only administrators or case managers can assign cases');
    }

    const claim = await this.claimsRepository.findById(claimId);
    if (!claim) throw new NotFoundException('Claim not found');

    const caseManager = await this.usersService.findById(dto.caseManagerId);
    if (!caseManager || caseManager.role.name !== RoleName.CASE_MANAGER || caseManager.status !== 'ACTIVE') {
      throw new BadRequestException('Selected user is not an active case manager');
    }

    if (dto.surveyorId) {
      const surveyor = await this.usersService.findById(dto.surveyorId);
      if (!surveyor || surveyor.role.name !== RoleName.SURVEYOR || surveyor.status !== 'ACTIVE') {
        throw new BadRequestException('Selected user is not an active surveyor');
      }
    }

    const assignment = await this.repository.assign(claimId, dto.caseManagerId, dto.surveyorId);
    if (claim.status === ClaimStatus.SUBMITTED) {
      await this.claimsRepository.updateClaimStatus(claimId, ClaimStatus.CASE_ASSIGNED);
    }
    return assignment;
  }

  async getAssignment(claimId: string, actor: JwtUser) {
    const claim = await this.claimsRepository.findById(claimId);
    if (!claim) throw new NotFoundException('Claim not found');
    if (actor.role === RoleName.CUSTOMER && claim.customerId !== actor.id) {
      throw new UnauthorizedException('Unauthorized Access');
    }
    const assignment = await this.repository.findByClaimId(claimId);
    if (!assignment) throw new NotFoundException('Case assignment not found');
    return assignment;
  }
}
