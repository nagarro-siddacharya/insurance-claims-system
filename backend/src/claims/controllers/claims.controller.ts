import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClaimsService } from '../services/claims.service';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtUser } from 'src/common/interfaces/jwt-user.interface';
import { UpdateClaimStatusDto } from '../dto/update-claim-status.dto';

@ApiTags('Claims')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new claim' })
  async create(@Body() createClaimDto: CreateClaimDto, @Request() req: any) {
    const customerId = req.user.id;
    return this.claimsService.create(createClaimDto, customerId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all claims for the authenticated user' })
  async findAll(@Request() req: { user: JwtUser }) {
    const user = req.user;
    return this.claimsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a claim by ID' })
  async findById(
    @Request() req: { user: JwtUser },
    @Param('id') claimId: string,
  ) {
    const user = req.user;
    return this.claimsService.findById(claimId, user);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of a claim' })
  async updateClaimStatus(
    @Request() req: { user: JwtUser },
    @Param('id') claimId: string,
    @Body() dto: UpdateClaimStatusDto,
  ) {
    const user = req.user;
    return this.claimsService.updateClaimStatus(claimId, dto, user);
  }
}
