import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './appointment.entity';
import { Client } from '../clients/client.entity';
import { Service } from '../services/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Client, Service])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
