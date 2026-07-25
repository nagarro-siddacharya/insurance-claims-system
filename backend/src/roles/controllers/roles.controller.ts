import { Controller, Get } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all roles',
    description: 'Returns a list of all available roles.',
  })
  @ApiResponse({
    status: 200,
    description: 'Roles retrieved successfully.',
  })
  async findAll() {
    return this.rolesService.findAll();
  }
}
