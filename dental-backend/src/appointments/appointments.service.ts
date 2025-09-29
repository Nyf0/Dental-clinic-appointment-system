import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Client } from '../clients/client.entity';
import { Service } from '../services/service.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    // 1. Get the client entity
    const client = await this.clientRepo.findOneBy({ id: dto.clientId });
    if (!client) throw new Error('Client not found');

    // 2. Get the services (using In() for multiple IDs)
    const services = await this.serviceRepo.find({
      where: { id: In(dto.serviceIds) },
    });
    if (services.length !== dto.serviceIds.length) {
      throw new Error('One or more services not found');
    }

    // 3. Build the appointment entity
    const appointment = this.appointmentRepo.create({
      date: new Date(dto.date), // convert ISO string -> Date object
      client,
      services,
    });

    // 4. Save it to the database
    return await this.appointmentRepo.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    // Return appointments with their related client and services
    return await this.appointmentRepo.find({
      relations: ['client', 'services'],
    });
  }
}
