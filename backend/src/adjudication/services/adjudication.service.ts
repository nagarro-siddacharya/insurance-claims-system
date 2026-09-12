import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClaimStatus } from '@prisma/client';
import { ClaimsRepository } from '../../claims/repositories/claims.repository';
import { RoleName } from '../../common/enums/roles.enum';
import { JwtUser } from '../../common/interfaces/jwt-user.interface';
import { UsersService } from '../../users/services/users.service';
import { AdjudicateClaimDto } from '../dto/adjudicate-claim.dto';
import { AdjudicationRepository } from '../repositories/adjudication.repository';

@Injectable()
export class AdjudicationService {
  constructor(
    private readonly repository: AdjudicationRepository,
    private readonly claimsRepository: ClaimsRepository,
    private readonly usersService: UsersService,
  ) {}

  async getForReview(claimId: string, actor: JwtUser) {
    this.assertAdjuster(actor);

    const claim = await this.repository.findClaimForReview(claimId);
    if (!claim) throw new NotFoundException('Claim not found');

    if (claim.status !== ClaimStatus.ADJUDICATION_PENDING) {
      throw new BadRequestException('Claim is not pending adjudication');
    }

    if (!claim.survey) {
      throw new BadRequestException('Survey assessment is required before adjudication');
    }

    return claim;
  }

  async adjudicate(claimId: string, dto: AdjudicateClaimDto, actor: JwtUser) {
    this.assertAdjuster(actor);

    const claim = await this.repository.findClaimForReview(claimId);
    if (!claim) throw new NotFoundException('Claim not found');

    if (claim.status !== ClaimStatus.ADJUDICATION_PENDING) {
      throw new BadRequestException('Claim is not pending adjudication');
    }

    if (!claim.survey) {
      throw new BadRequestException('Survey assessment is required before adjudication');
    }

    const existing = await this.repository.findByClaimId(claimId);
    if (existing) {
      throw new BadRequestException('Claim has already been adjudicated');
    }

    if (dto.decision === ClaimStatus.APPROVED && dto.approvedAmount == null) {
      throw new BadRequestException('Approved amount is required for an approved claim');
    }

    if (dto.decision === ClaimStatus.REJECTED && dto.approvedAmount != null) {
      throw new BadRequestException('Approved amount must not be supplied for a rejected claim');
    }

    const adjuster = await this.usersService.findById(actor.id);
    if (!adjuster || adjuster.role.name !== RoleName.ADJUSTER) {
      throw new UnauthorizedException('Authenticated user is not an adjuster');
    }

    const adjudication = await this.repository.create({
      claimId,
      adjusterId: actor.id,
      decision: dto.decision,
      approvedAmount: dto.approvedAmount,
      decisionReason: dto.decisionReason,
    });

    await this.claimsRepository.updateClaimStatus(claimId, dto.decision);

    return adjudication;
  }

  private assertAdjuster(actor: JwtUser) {
    if (actor.role !== RoleName.ADJUSTER && actor.role !== RoleName.ADMIN) {
      throw new UnauthorizedException('Only adjusters or administrators can adjudicate claims');
    }
  }
}
