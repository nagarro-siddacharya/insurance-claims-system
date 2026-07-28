import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SurveysRepository } from '../repositories/surveys.repository';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { ClaimsRepository } from 'src/claims/repositories/claims.repository';
import { RoleName } from 'src/common/enums/roles.enum';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class SurveysService {
  constructor(
    private readonly surveysRepository: SurveysRepository,
    private readonly claimsRepository: ClaimsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    const claim = await this.claimsRepository.findById(createSurveyDto.claimId);

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    const surveyor = await this.usersService.findById(
      createSurveyDto.surveyorId,
    );

    if (!surveyor) {
      throw new NotFoundException('Surveyor not found');
    }

    if (surveyor.role.name !== RoleName.SURVEYOR) {
      throw new BadRequestException('Selected user is not a surveyor');
    }

    const existing = await this.surveysRepository.findByClaimId(claim.id);

    if (existing) {
      throw new BadRequestException('Survey already exists for this claim');
    }

    return this.surveysRepository.create({
      claimId: claim.id,
      surveyorId: surveyor.id,
      damageDescription: createSurveyDto.damageDescription,
      estimatedCost: createSurveyDto.estimatedCost,
    });
  }

  async findById(id: string) {
    const survey = await this.surveysRepository.findById(id);

    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    return survey;
  }

  async findByClaimId(claimId: string) {
    const survey = await this.surveysRepository.findByClaimId(claimId);

    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    return survey;
  }
}
