import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { AppointmentsRepository } from '../repositories/appointments.repository';
import { ClaimsRepository } from 'src/claims/repositories/claims.repository';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly claimsRepository: ClaimsRepository,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const claim = await this.claimsRepository.findById(
      createAppointmentDto.claimId,
    );
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (!claim.workshopId) {
      throw new BadRequestException('Workshop not assigned to the claim');
    }
    const existing = await this.appointmentsRepository.findByClaimId(
      createAppointmentDto.claimId,
    );
    if (existing) {
      throw new BadRequestException(
        'An appointment already exists for this claim.',
      );
    }
    return this.appointmentsRepository.create({
      claimId: createAppointmentDto.claimId,
      workshopId: claim.workshopId,
      appointmentDate: new Date(createAppointmentDto.appointmentDate),
    });
  }

  async findById(id: string) {
    const appointment = await this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async findByClaimId(claimId: string) {
    const appointment =
      await this.appointmentsRepository.findByClaimId(claimId);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }
}
