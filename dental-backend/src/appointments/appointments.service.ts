import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  private appointments: any[] = [];

  create(dto: CreateAppointmentDto) {
    const newAppointment = {
      id: Date.now(),
      ...dto,
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  findAll() {
    return this.appointments;
  }
}
