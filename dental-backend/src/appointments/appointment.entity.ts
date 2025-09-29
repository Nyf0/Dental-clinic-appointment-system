import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Client } from '../clients/client.entity';
import { Service } from '../services/service.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })  // Postgres timestamp with timezone
  date: Date;

  @ManyToOne(() => Client, (client) => client.appointments, { eager: true })
  client: Client;

  @ManyToMany(() => Service, (service) => service.appointments, { eager: true })
  @JoinTable()
  services: Service[];
}
