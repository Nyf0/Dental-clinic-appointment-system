import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateClientDto): Promise<Client> {
    const client = this.clientRepo.create(dto);
    return await this.clientRepo.save(client); // DB handles id
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepo.find();
  }
}
