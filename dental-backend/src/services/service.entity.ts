import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @ManyToMany(() => Appointment, (appointment) => appointment.services)
  appointments: Appointment[];
}
