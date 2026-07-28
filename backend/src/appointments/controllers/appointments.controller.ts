import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppointmentsService } from '../services/appointments.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment for claim' })
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an appointment by ID' })
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findById(id);
  }

  @Get('claim/:claimId')
  @ApiOperation({ summary: 'Get an appointment by claim ID' })
  async findByClaimId(@Param('claimId') claimId: string) {
    return this.appointmentsService.findByClaimId(claimId);
  }
}
